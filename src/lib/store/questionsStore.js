import { create } from 'zustand'

export const useQuestionsStore = create((set) => ({
  questions : [],
  currentQuestion : null,
  setQuestions: (questions) => {
    set({ questions})
  },
    setCurrentQuestion: (currentQuestion) =>{
        set({ currentQuestion })
    }
}))