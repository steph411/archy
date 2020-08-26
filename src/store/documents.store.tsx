import create from 'zustand'
import { Status } from '../utils/index';

export interface Borrower{

  nom: string;
  email: string;
  telephone: string;
  service: string;
  returnDate?: string;
}

export interface Box {
  id: string;
  name: string;
  dateAdded: string;
  dateValidity: string;
  dateBorrowed?: string;
  status: Status 
  documents: string[];
  borrower?: Borrower;


}

const getInitialBoxes = (): Box[] | undefined => {
  const storedBoxes = window.localStorage.getItem("boxes")
  if (!storedBoxes) {
    return undefined
  }
  else if (JSON.parse(storedBoxes).length < 1) {
    return undefined
  }
  console.log({initboxes: JSON.parse(storedBoxes)})
  return JSON.parse(storedBoxes)
  // return undefined;
}

export const useBoxStore = create((set, get) => ({

  boxes: getInitialBoxes() || [],
  addBox: (box: Box) => {
    let currentBoxes = get().boxes;
    console.log({ boxesss: currentBoxes });
    set((old) => ({ boxes: currentBoxes.concat([box])}));
    console.log({ boxesupdated: get().boxes });
  },
  editBox: (box: Box) => {
    const boxes = get().boxes
    const filteredBoxes = boxes.filter((el: Box) => el.id !== box.id);
    const newBoxes = filteredBoxes.concat([box]);
    set(() => ({ boxes: newBoxes }));
    console.log("box edited")
  },

  deleteBox: (boxId: string) => {
    const boxes = get().boxes;
    const newBoxes = boxes.filter((el: Box) => el.id !== boxId);
    set(() => ({ boxes: newBoxes }));
    console.log(`box ${boxId} deleted successfully`)
  }


}))


useBoxStore.subscribe(state => {
  console.log({ stateupdate: state });
  window.localStorage.setItem("boxes", JSON.stringify(state.boxes));
})