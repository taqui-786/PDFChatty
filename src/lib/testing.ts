'use server'

import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { getRetriever } from "./reteriver";
import { RunnableSequence } from "@langchain/core/runnables";
import { combineDocuments } from "./helperFunc";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  temperature: 0,
  apiKey: process.env.GOOGLE_API_KEY,
});

// This prompt focuses on turning the document into structured markdown sections
const docAnalysisPrompt = `You are a professional document analysis assistant. 
Your job is to **analyze the content of the PDF document** provided and generate a full structured documentation in a stringified array format like: 

\`\`\`ts
[
  {{{{ label: "Summary", content: "..." }}}},
  {{{{ label: "Key Points", content: "..." }}}},
  {{{{ label: "Questions", content: "..." }}}},
  {{{{ label: "Action Items", content: "..." }}}},
  {{{{ label: "Insights", content: "..." }}}}
]
\`\`\`

**Important Instructions:**
- Each "content" must be **written in markdown format** with appropriate headers, bullet points, bold text, and code blocks when helpful.
- Make the summary concise and insightful.
- Key Points should highlight bullet-based ideas or sections from the document.
- Add likely questions that could be asked about the document.
- Action Items should contain any steps or recommendations (if applicable).
- Insights can include any high-level observations or implications.
- If a section is not applicable, return it with an empty string like: \`{{{{ label: "Action Items", content: "" }}}}\`
- Do not fabricate information. Only use the context provided.
- Return only the structured array string. No extra commentary.

Context: {context}

Structured Documentation: `;


const docPromptTemplate = PromptTemplate.fromTemplate(docAnalysisPrompt);

export const getStructuredDoc = async (pdfId: string) => {
  try {
    console.log('host');
         
    const docPromptChain = docPromptTemplate.pipe(llm).pipe(new StringOutputParser());

    const retriever = getRetriever(pdfId);
    const reterivalChain = RunnableSequence.from([
     () => "document content",
      retriever,
      combineDocuments,
    ]);

    const chain = RunnableSequence.from([
      {
        context: reterivalChain,
      },
      docPromptChain,
    ]);

    const response = await chain.invoke({});
         
    return { success: true, structuredDocs: response };
  } catch (error) {
    console.log(error);
    return { success: false, error: (error as Error).message };
  }
};

