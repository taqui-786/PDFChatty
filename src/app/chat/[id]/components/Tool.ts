interface ToolColor {
  background: string;
  text: string;
  border: string;
  hover: string;
}

export interface Tool {
  id: string;
  label: string;
  type: string;
  description: string;
  prompt: string;
  color: ToolColor;
}

export const Tools: Tool[] = [
  {
    id: "node-summarize",
    type: "SummaryNode",
    label: "Summary",
    prompt: "Create a comprehensive summary of the document content focusing on main themes, key arguments, conclusions, and significant findings. Structure as coherent paragraphs with bolded important concepts.",
    color: {
      background: "#f8fafc",
      text: "#0f172a",
      border: "#e2e8f0",
      hover: "#f1f5f9",
    },
    description: "Drag to add tool to summarize a document",
  },
  {
    id: "node-keypoint",
    type: "KeyPointNode",
    label: "Key Points",
    prompt: "Extract the most important points from the document content. Present as bulleted list with each point being substantive and actionable. Include supporting details where relevant.",
    color: {
      background: "#f0f9ff",
      text: "#0c4a6e",
      border: "#bae6fd",
      hover: "#e0f2fe",
    },
    description: "Drag to add tool to extract key points from a document",
  },
  {
    id: "node-question",
    type: "QuestionNode",
    label: "Important Questions",
    prompt: "Generate important questions that arise from or can be answered by the document content. Format as Q.1, Q.2, etc. Include both factual and analytical questions that demonstrate understanding of the material.",
    color: {
      background: "#fffbeb",
      text: "#78350f",
      border: "#fed7aa",
      hover: "#ffedd5",
    },
    description: "Drag to add tool to extract important questions from a document",
  },
  {
    id: "node-ner",
    type: "NERNode",
    label: "Named Entities",
    prompt: "Extract named entities from the document content. Organize by categories: People (names and roles), Organizations (companies, institutions), Locations (places, addresses), Dates (significant dates and timeframes), and Other relevant entities.",
    color: {
      background: "#f0fdf4",
      text: "#166534",
      border: "#bbf7d0",
      hover: "#dcfce7",
    },
    description: "Extract people, organizations, locations, and dates",
  },
  {
    id: "node-keywords",
    type: "KeywordNode",
    label: "Keywords",
    prompt: "Extract the most significant keywords and phrases from the document. Focus on technical terms, key concepts, and domain-specific vocabulary.",
    color: {
      background: "#eff6ff",
      text: "#1e3a8a",
      border: "#bfdbfe",
      hover: "#dbeafe",
    },
    description: "Extract most important keywords and phrases",
  },
  {
    id: "node-classification",
    type: "ClassificationNode",
    label: "Document Classification",
    prompt: "Analyze and categorize the document. Provide primary category, secondary categories if applicable, confidence level (High/Medium/Low), reasoning for classification, and key indicators that support the categorization.",
    color: {
      background: "#fff7ed",
      text: "#9a3412",
      border: "#fed7aa",
      hover: "#ffedd5",
    },
    description: "Categorize document into predefined categories",
  },
];