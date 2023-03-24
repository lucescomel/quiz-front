import { create } from 'zustand'

export const useHistoriquesStore = create((set) => ({
  historiques : [],
  currentHistorique : null,
  setHistoriques: (historiques) => {
    set({ historiques})
  },
    setCurrentHistorique: (currentHistorique) =>{
        set({ currentHistorique })
    }
}))