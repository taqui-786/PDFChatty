import { useMutation } from "@tanstack/react-query";
import { getAnswer, getAnswerTesting, getChatBotAnswer } from "../action";
export const useGetAnswer = () => {
  
  return useMutation({
    mutationFn: getAnswerTesting,
    onSuccess: (data, variables) => {
      console.log(`Request ${variables.requestId} completed successfully`);
      // Optionally invalidate related queries
      // queryClient.invalidateQueries({ queryKey: ['documents', variables.pdfId] });
    },
    onError: (error, variables) => {
      console.error(`Request ${variables.requestId} failed:`, error);
    },
  });
};
export const useGetChatbotAnswer = () => {
  
  return useMutation({
    mutationFn: getChatBotAnswer,
    onSuccess: (data, variables) => {
      console.log(`Request ${variables.requestId} completed successfully`);
      // Optionally invalidate related queries
      // queryClient.invalidateQueries({ queryKey: ['documents', variables.pdfId] });
    },
    onError: (error, variables) => {
      console.error(`Request  failed:`, error);
    },
  });
};



function generateId() {
  return 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).substr(2, 5);
}
