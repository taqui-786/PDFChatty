"use server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { } from "@langchain/community/load";
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

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  temperature: 0,
  apiKey: process.env.GOOGLE_API_KEY,
});

const convHistory = [];


const systemPrompt = `You are an intelligent assistant designed to help users ask clear questions about a PDF document. Given a conversation history and a follow-up question, rephrase the question into a complete standalone question that includes all relevant context from the conversation.

Only include the necessary context to clarify the question. Keep the phrasing natural and concise.

conversation history: {conv_history}
follow-up question: {question}
standalone question:`;

const answerTemplate = `You are a smart, friendly PDF expert assistant. You're here to answer questions based on the content of a specific PDF document. Imagine you *are* the document—answer as if you're explaining its content clearly and helpfully to a curious friend.

Your answers must:
- Be based **only** on the context provided.
- Be **formatted in markdown** (use bullet points, bold, headings, etc. when useful).
- Be clear, conversational, and informative.
- **Never** make up information. If the answer isn't in the context, reply:  
  *"I'm sorry, I don't know the answer to that based on the document. You can email mdtaqui.jhar@gmail.com for further help."*
Context: {context}
Conversation History: {conv_history}
Question: {question}
Answer:
`;

const systemPromptTemplate = PromptTemplate.fromTemplate(systemPrompt);
const answerPromptTemplate = PromptTemplate.fromTemplate(answerTemplate);



export const storeToVectorDB = async (file: File) => {
  try {
    // Convert File to a Blob URL or local path
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
    
    const pdf_id = `pdf-${Date.now()}`; // Unique ID per PDF upload
    const userId = `user-${file.name}`; // Optional for tracking

    // Add metadata to existing documents (don't create new Document instances)
    const docsWithMetadata = splittedDocs.map(doc => ({
      ...doc,
      metadata: {
        ...doc.metadata, // Keep existing metadata
        user_id: userId,
        pdf_id: pdf_id,
      },
    }));

    await uploadToSupabase(docsWithMetadata); // Use the modified docs
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: (error as Error).message };
  }
};


export const getAnswer = async (question: string, namespace: string) => {
  try {

    const systemPromptChain = systemPromptTemplate
      .pipe(llm)
      .pipe(new StringOutputParser());
    const answerPromptChain = answerPromptTemplate
      .pipe(llm)
      .pipe(new StringOutputParser());
    const retriever = getRetriever(namespace);
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
      conv_history: formatConvHistory(convHistory),
    });
    convHistory.push(myQuestion);
    convHistory.push(response);
    
    return { success: true, answer: response };
  } catch (error) {
    console.log(error);
    
    return { success: false, error: (error as Error).message };
  }
};
