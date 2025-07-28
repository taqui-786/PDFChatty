import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { createClient } from "@supabase/supabase-js";
// Configuration
const CONFIG = {
  geminiApiKey: process.env.GOOGLE_API_KEY!,
  pineconeApiKey: process.env.PINECONE_API_KEY!,
  indexName: "pdfchat",
};
const sbApiKey = process.env.SUPABASE_API_KEY as string;
const sbUrl = process.env.SUPABASE_URL as string;

const client = createClient(sbUrl, sbApiKey);

// Embeddings instance (singleton is fine)
const embeddings = new GoogleGenerativeAIEmbeddings({
  model: "gemini-embedding-001",
  apiKey: CONFIG.geminiApiKey,
});

// Pinecone client instance
const pinecone = new PineconeClient({
  apiKey: CONFIG.pineconeApiKey,
});

// Initialize Pinecone index (reused)
const pineconeIndex = pinecone.Index(CONFIG.indexName);

export const vectorStore = new SupabaseVectorStore(embeddings, {
    client,
    tableName: 'documents',
    queryName: 'match_documents'
})

export const getRetriever =  (id:string) => vectorStore.asRetriever({
  filter:{
    "metadata->>'user_id'":id
  }
})

export const uploadToSupabase = async (output: any) => {
  await SupabaseVectorStore.fromDocuments(output, embeddings, {
    client,
    tableName: "documents",
  
  });
};
