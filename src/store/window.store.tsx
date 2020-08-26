import create from 'zustand'
import { Box } from './documents.store';



export const useAppState = create((set) => ({

  boxInfoOpened: false,
  toggleBoxInfo: () => set(({ boxInfoOpened }) => ({ boxInfoOpened: !boxInfoOpened })),
  borrowWindowOpened: false,
  toggleBorrowWindow: () => set(({ borrowWindowOpened }) => ({ borrowWindowOpened: !borrowWindowOpened })),
  selectedBox: undefined,
  setSelectedBox: (box: Box | undefined) => set(() => {
    if (box) {
      return { boxInfoOpened: true, selectedBox: box }
    }
    return { boxInfoOpened: false, selectedBox: undefined }
  }),
  resetSelectedBox: () => set(() => ({ boxInfoOpened: false, borrowWindowOpened: false, selectedBox: undefined }))


}))