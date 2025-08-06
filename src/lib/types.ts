export type Chat = {
  id: string; // UUID
  userid: string; // UUID
  pdfname: string;
  pdfsize: string; // e.g., '4.15 KB'
  messages: unknown[]; // if you know the structure, replace 'unknown'
  createdat: string; // ISO date string
  updatedat: string; // ISO date string
  pdfurl: string; // URL
};

type DocSection = {
  label: "Summary" | "Key Points" | "Questions" | "Action Items" | "Insights";
  content: string;
};

export type StructuredDocs = DocSection[];

