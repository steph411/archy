import create from 'zustand'
import { Status } from '../utils/index';
import icon from '../assets/icon.png'
// import { ipcRenderer } from 'electron';


const electron = window.require('electron') 
const { ipcRenderer } = electron


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

export interface Notif {
  title?: string;
  body: string;
}
const notify = (data: Notif) => {
  Notification.requestPermission().then(() => {
    const notif = new Notification("Archy", {
      body: data.body,
      icon: icon
    })
    console.log(notif)
  })
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
  // return undefined;
  const boxes = JSON.parse(storedBoxes);
  

  // Notifications for nearly expired boxes and boxes not returned yet
  const nearlyInvalidBoxes = boxes.filter((box: Box) => {
    // date.setDate(date.getDate() + 30);
    const now = new Date();
    const validity = new Date(box.dateValidity);
    validity.setDate(validity.getDate() - 3)
    return (validity <= now) && (now <= new Date(box.dateValidity));
  })
  console.log({nearlyInvalidBoxes})
  nearlyInvalidBoxes.forEach((el: Box) => {
    ipcRenderer.send("send-notification", {
      title: "Archy",
      body: `La boite ${el.name} arrive a expiration le ${el.dateValidity}`
    })
    notify({body: `La boite ${el.name} arrive a expiration le ${el.dateValidity}`})
  })
  
  const mustReturnBoxes = boxes.filter((box: Box) => {
    const now = new Date();
    const returnDate = new Date(box.borrower?.returnDate);
    returnDate.setDate(returnDate.getDate() - 3);
    return (returnDate <= now) && (now <= new Date(box.borrower.returnDate));
  })
  mustReturnBoxes.forEach((el: Box) => {
    ipcRenderer.send("send-notification", {
      title: "Archy",
      body: `La boite ${el.name} doit etre retournée le ${el.dateValidity}`
    })
    notify({ body: `La boite ${el.name} doit etre retournée le ${el.dateValidity}` });

  })
  return JSON.parse(storedBoxes)
}

export const useBoxStore = create((set, get) => ({

  boxes: getInitialBoxes() || [],
  addBox: (box: Box) => {
    let currentBoxes = get().boxes;
    console.log({ boxesss: currentBoxes });
    set((old) => ({ boxes: currentBoxes.concat([box])}));
    // console.log({ boxesupdated: get().boxes });
  },
  editBox: (box: Box) => {
    const boxes = get().boxes
    const filteredBoxes = boxes.filter((el: Box) => el.id !== box.id);
    const newBoxes = filteredBoxes.concat([box]);
    set(() => ({ boxes: newBoxes }));
    // console.log("box edited")
  },

  deleteBox: (boxId: string) => {
    const boxes = get().boxes;
    const newBoxes = boxes.filter((el: Box) => el.id !== boxId);
    set(() => ({ boxes: newBoxes }));
    // console.log(`box ${boxId} deleted successfully`)
  }


}))


useBoxStore.subscribe(state => {
  // console.log({ stateupdate: state });
  window.localStorage.setItem("boxes", JSON.stringify(state.boxes));
  
  
  // notifications when the box is nearly invalid
  


})




// notifications when the box returnDate is near