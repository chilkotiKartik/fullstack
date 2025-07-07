// Helper functions for MainAppScreen
export const quickActionHandlers = {
  // Quick action handlers
  toggleChatSelection: (
    chatId: number,
    selectedChats: number[],
    setSelectedChats: React.Dispatch<React.SetStateAction<number[]>>,
  ) => {
    setSelectedChats((prev) =>
      prev.includes(chatId)
        ? prev.filter((id) => id !== chatId)
        : [...prev, chatId],
    );
  },

  togglePinChat: (
    chatId: number,
    pinnedChats: number[],
    setPinnedChats: React.Dispatch<React.SetStateAction<number[]>>,
  ) => {
    setPinnedChats((prev) =>
      prev.includes(chatId)
        ? prev.filter((id) => id !== chatId)
        : [...prev, chatId],
    );
  },

  toggleMuteChat: (
    chatId: number,
    mutedChats: number[],
    setMutedChats: React.Dispatch<React.SetStateAction<number[]>>,
  ) => {
    setMutedChats((prev) =>
      prev.includes(chatId)
        ? prev.filter((id) => id !== chatId)
        : [...prev, chatId],
    );
  },

  archiveSelectedChats: (
    selectedChats: number[],
    setArchivedChats: React.Dispatch<React.SetStateAction<number[]>>,
    setSelectedChats: React.Dispatch<React.SetStateAction<number[]>>,
    setIsSelectionMode: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    setArchivedChats((prev) => [...prev, ...selectedChats]);
    setSelectedChats([]);
    setIsSelectionMode(false);
  },

  deleteSelectedChats: (
    setSelectedChats: React.Dispatch<React.SetStateAction<number[]>>,
    setIsSelectionMode: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    // In real app, this would delete from backend
    setSelectedChats([]);
    setIsSelectionMode(false);
  },
};
