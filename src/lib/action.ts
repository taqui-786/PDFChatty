"use server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { getRetriever, uploadToSupabase } from "./reteriver";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import {
  RunnableSequence,
  RunnablePassthrough,
} from "@langchain/core/runnables";
import { combineDocuments, formatConvHistory } from "./helperFunc";
import { createClient } from "./db/supabaseServer";

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  temperature: 0,
  apiKey: process.env.GOOGLE_API_KEY,
});
interface GetAnswerParams {
  question: string;
  pdfId: string;
  requestId?: string; // Add unique identifier for each request
}

interface GetAnswerResponse {
  success: boolean;
  answer?: string;
  error?: string;
  requestId?: string;
}

const convHistory: Array<string> = [];

// Optimized System Prompt - keeping original input/output structure
const systemPrompt = `You are a query reformulation specialist. Transform the user's request into a clear, actionable instruction for generating direct content. 

Given a conversation history and a follow-up question, create a standalone instruction that captures the user's intent for content generation. Focus on the core deliverable the user wants. Remove any conversational elements and make it a direct content generation task.

GUIDELINES:
- Preserve the original intent and scope
- Make it contextually complete using conversation history
- Remove conversational artifacts ("you mentioned", "as discussed")
- Keep technical terms and specific requirements intact
- Ensure the instruction is actionable

conversation history: {conv_history}
follow-up question: {question}
content instruction:`;

// Optimized Answer Template - keeping original input/output structure
const answerTemplate = `You are a document analysis expert. Generate direct, actionable content based on the provided context. Deliver immediate value without introductions, explanations of what you're doing, or assistant-style responses.

Content requirements:
- **Start immediately** with the requested content
- **Format in clean markdown** with proper structure
- **For questions**: Generate a bullet list of questions with each point starting with the format "Q.1 What is...?", "Q.2 Explain...", etc.
- **For summaries**: Provide a concise overview paragraph with **bolding important words** of highlighted concepts
- **For key points**: Create a bulleted list of key points
- **For named entities**: Group by category (People:, Organizations:, Locations:, Dates:) use table for this
- **For keywords**: Present a table with max 4 columns and divide the kewwords eqully to each
- **For classification**: State category with confidence level and reasoning
- **No chatbot language unit user tell to act as chatbot** ("I'll help you...", "Here's what I found...", "As an assistant...")
- **No meta-commentary** about the task or process
- **Direct, professional tone** focused on delivering value
- **Use context strictly** - only include information from the provided material
- **Quote exact phrases** when citing specific information
- **Indicate uncertainty** with "The document suggests..." or "Based on available context..."
- **If information is missing**: Simply state "Information not available in provided context. Contact mdtaqui.jhar@gmail.com for additional details."

Context: {context}
Conversation History: {conv_history}
Request: {question}

Content:
`;

const systemPromptTemplate = PromptTemplate.fromTemplate(systemPrompt);
const answerPromptTemplate = PromptTemplate.fromTemplate(answerTemplate);

export const getAnswer = async (
  params: GetAnswerParams
): Promise<GetAnswerResponse> => {
  const { pdfId, requestId,question } = params;

  try {
    const systemPromptChain = systemPromptTemplate
      .pipe(llm)
      .pipe(new StringOutputParser());
    const answerPromptChain = answerPromptTemplate
      .pipe(llm)
      .pipe(new StringOutputParser());
    const retriever = getRetriever(pdfId);
    const reterivalChain = RunnableSequence.from([
      (prevResult) => prevResult.standalone_question,
      retriever,
      combineDocuments,
    ]);
    const chain = RunnableSequence.from([
      {
        standalone_question: systemPromptChain,
        original_input: new RunnablePassthrough(),
      },
      {
        context: reterivalChain,
        question: ({ original_input }) => original_input.question,
        conv_history: ({ original_input }) => original_input.conv_history,
      },
      answerPromptChain,
    ]);

    const response = await chain.invoke({
      question: question,
      conv_history: formatConvHistory(convHistory),
    });

    convHistory.push(question);
    convHistory.push(response);

    return { success: true, answer: response, requestId };
  } catch (error) {
    console.log(`Error in request ${requestId}:`, error);
    return {
      success: false,
      error: (error as Error).message,
      requestId,
    };
  }
};

const chatBotConventionalHistory: Array<string> = [];
export const getChatBotAnswer = async (
  params: GetAnswerParams
): Promise<GetAnswerResponse> => {
  const { pdfId, requestId, question } = params;

  try {
    const chatbotSystemPrompt = `You are an intelligent assistant designed to help users ask clear questions about a PDF document. Given a conversation history and a follow-up question, rephrase the question into a complete standalone question that includes all relevant context from the conversation.

Only include the necessary context to clarify the question. Keep the phrasing natural and concise.

conversation history: {conv_history}
follow-up question: {question}
standalone question:`;

    const chatbotAnswerTemplate = `You are a smart, friendly PDF expert assistant. You're here to answer questions based on the content of a specific PDF document. Imagine you *are* the document—answer as if you're explaining its content clearly and helpfully to a curious friend.

Your answers must:
- Be based **only** on the context provided.
- Be **formatted in markdown** (use bullet points, bold, headings, etc. when useful).
- Be clear, conversational, and informative.
- if they tell you to remember something then store it to conversation history and remember it.
- **Never** make up information. If the answer isn't in the context or not in the conversation history, reply:  
  *"I'm sorry, I don't know the answer to that based on the document. You can email mdtaqui.jhar@gmail.com for further help."*
Context: {context}
Conversation History: {conv_history}
Question: {question}
Answer:
`;
    const chatbotSystemPromptTemplate =
      PromptTemplate.fromTemplate(chatbotSystemPrompt);
    const chatBotAnswerPromptTemplate = PromptTemplate.fromTemplate(
      chatbotAnswerTemplate
    );
    const systemPromptChain = chatbotSystemPromptTemplate
      .pipe(llm)
      .pipe(new StringOutputParser());
    const answerPromptChain = chatBotAnswerPromptTemplate
      .pipe(llm)
      .pipe(new StringOutputParser());
    const retriever = getRetriever(pdfId);
    const reterivalChain = RunnableSequence.from([
      (prevResult) => prevResult.standalone_question,
      retriever,
      combineDocuments,
    ]);

    const chain = RunnableSequence.from([
      {
        standalone_question: systemPromptChain,
        original_input: new RunnablePassthrough(),
      },
      {
        context: reterivalChain,
        question: ({ original_input }) => original_input.question,
        conv_history: ({ original_input }) => original_input.conv_history,
      },
      answerPromptChain,
    ]);

    const myQuestion = question;
    const response = await chain.invoke({
      question: myQuestion,
      conv_history: formatConvHistory(chatBotConventionalHistory),
    });
    chatBotConventionalHistory.push(myQuestion);
    chatBotConventionalHistory.push(response);

    return { success: true, answer: response, requestId };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: (error as Error).message,
      requestId,
    };
  }
};

export const storeToVectorDB = async (
  file: File,
  pdf_id: string,
  user_id: string
) => {
  try {
    if (!file) {
      throw new Error("No file provided");
    }
    const buffer = await file.arrayBuffer();
    const loader = new PDFLoader(new Blob([buffer]), {
      splitPages: true,
    });

    const pages = await loader.load();
    console.log(`✅ Loaded ${pages.length} pages`);

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
    });
    const splittedDocs = await splitter.splitDocuments(pages);
    console.log(`✅ Created ${splittedDocs.length} chunks`);

    const docsWithMetadata = splittedDocs.map((doc) => ({
      ...doc,
      metadata: {
        ...doc.metadata,
        user_id,
        pdf_id,
      },
    }));

    await uploadToSupabase(docsWithMetadata); // Use the modified docs
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: (error as Error).message };
  }
};

