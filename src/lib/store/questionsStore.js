import { create } from "zustand";

export const useQuestionsStore = create((set) => ({
  questions: [],
  currentQuestion: null,
  point: 0,
  setQuestions: (questions) => {
    set({ questions });
  },
  setCurrentQuestion: (currentQuestion) => {
    set({ currentQuestion });
  },
  increasePoints: () => set((state) => ({ point: state.point + 1 })),
}));
