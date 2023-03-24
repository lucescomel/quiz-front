import { create } from 'zustand'

export const useReponsesStore = create((set) => ({
  reponses : [],
  currentReponse : null,
  setReponses: (reponses) => {
    set({ reponses})
  },
    setCurrentReponse: (currentReponse) =>{
        set({ currentReponse })
    }
}))