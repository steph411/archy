/* eslint-disable react-hooks/exhaustive-deps */
import React , {useRef, useState, useEffect} from 'react'
import { useForm } from "react-hook-form";
import styled from 'styled-components'
import Input, { Label } from '../Input';
import Documents from './Documents';
import Button from '../Button';
import Borrow from './Borrow';
import "@vaadin/vaadin-date-picker"
import { Borrower, Box, useBoxStore } from '../../store/documents.store';
import { v4 as uuid4 } from 'uuid'
import { Status } from '../../utils';
import { useAppState } from '../../store/window.store';
import { motion } from "framer-motion"




interface FolderInfoProps {
  className?: string;
  box?: Box;
  exit?: any;
  
}



let FolderInfo: React.FC<FolderInfoProps> = ({className, box, exit}) => {


  const { addBox, editBox } = useBoxStore((state) => ({
    addBox: state.addBox,
    editBox: state.editBox,
    boxes: state.boxes
  }))
  const {
    borrowWindowOpened,
    toggleBorrowWindow,
    toggleBoxInfo,
    resetSelectedBox,
    // setSelectedBox
   } = useAppState((state) => ({
    borrowWindowOpened: state.borrowWindowOpened,
    toggleBorrowWindow: state.toggleBorrowWindow,
    toggleBoxInfo: state.toggleBoxInfo,
    resetSelectedBox: state.resetSelectedBox,
    setSelectedBox: state.setSelectedBox
  }))

  // when the component is removed from the dom, save the changes
  
  const { register, handleSubmit, watch } = useForm();
  const datepickerRef = useRef<HTMLInputElement>(null);
  const datepickerAddedRef = useRef<HTMLInputElement>(null);
  
  
  
  // const [borrowing, setBorrowing] = useState(false);

  const initialButtonText = () => {
    if (!box) {
      return "ajouter"
    }
    else if (box && box.status === Status.PRESENT) {
      return "emprunter"
    }
    else if (box && box.status === Status.EMPRUNTE) {
      return "détails"
    }
  }
  
  const [buttonText, setbuttonText] = useState(initialButtonText());
  const [borrowerDetails, setborrowerDetails] = useState(box?.borrower);

  const initialDocuments: string[] = [
    // "attestation de réussite",
    // "certificat de scolarité",
    // "acte",
    // "vente ",
    // "vente ",
    // "vente ",
    // "vente ",
  ]
  const [documents, setDocuments] = useState<string[]>(box?.documents || initialDocuments);
  
  const onChange = (event: React.ChangeEvent<HTMLInputElement>)=> {
    console.log(event)
    
  }
  
  const addDocument = (doc: string) => {
    setDocuments(old => old.concat([doc]));
    
  }
  
  const deleteDocument = (id: string) => {
    if (box) {
      console.log({ editdocus: box });
      console.log({ editboxdocid: id });
      const newBoxDocuments = box?.documents.filter(el => el !== id);
      // box.documents = newBoxDocuments;
      const newBox = { ...box, documents: newBoxDocuments };
      console.log({ newdocsbox: newBox });
      setDocuments(newBoxDocuments);
      editBox(newBox);
    }
  }

  useEffect(() => {
    const datepicker = datepickerRef;
    // const docs = documents;
    return () => {
      console.log({ documents })
      if (box) {
        let actualBox = useBoxStore.getState().boxes.find((el: Box) => el.id === box.id)
        console.log({ actualBox })
        const editedBox: Box = {
          ...actualBox,
          name: watch("name"),
          dateAdded: actualBox.dateAdded,
          dateValidity: (datepicker.current.value) || box.dateValidity,
          id: actualBox.id,
          documents: documents,
          status: actualBox.status,

        }
        console.log(editedBox);
        editBox(editedBox);
        // resetSelectedBox();
      }
    }
  },[documents]);
  
  const handleAddBox = (data: any) => {
    if (box) {
      toggleBorrowWindow();
      return;
    }
    console.log({ name: data.name, date: datepickerRef.current?.value });
    const dateAddedValue = datepickerAddedRef.current?.value;
    const dateAdded = dateAddedValue ? new Date(dateAddedValue) : new Date();
    const defaultValidity = () => {
      const date = new Date();
      date.setDate(date.getDate() + 30);
      return date.toISOString();
    }
    const newBox: Box = {
      id: uuid4(),
      dateAdded: dateAdded.toISOString(),
      name: data.name,
      dateValidity: datepickerRef.current?.value || defaultValidity(),
      status:  Status.PRESENT,
      documents: documents
    }
    if (new Date(newBox.dateValidity) < new Date()) {
      newBox.status = Status.INVALIDE;
    }
    // newBox.dateValidity 
    console.log(newBox);
    addBox(newBox)
    toggleBoxInfo();

  }

  const handleBorrow = (borrowData: any) => {
    const borrowerinfo: Borrower = {
      nom: borrowData["nom"],
      email: borrowData["email"],
      telephone: borrowData["téléphone"],
      service: borrowData["numéro de service"],
      returnDate: borrowData["returnDate"]
    }
    const editedBox: Box = {
      ...box,
      borrower: borrowerinfo,
      dateBorrowed: new Date().toISOString(),
      status: Status.EMPRUNTE

    }
    console.log(editedBox);
    editBox(editedBox);
    // setSelectedBox(editedBox);
    setbuttonText("détails");
    setborrowerDetails(borrowerinfo);
  }

  const inputBackground = window.getComputedStyle(document.documentElement).getPropertyValue("--input-background");
  // const textColor = window.getComputedStyle(document.documentElement).getPropertyValue("--text-color");

  const datepickerStyles = {
    width: "100%",
    background: inputBackground,
    "marginBottom": "14px",
    color: "white",
    "borderRadius": "10px"
  }


  const resetOverlay = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    console.log(target.id)
    if (target.id === "folder-info-overlay") {
      resetSelectedBox();

    }
  }

  return (
      <Overlay
        exit={exit}
        onClick={resetOverlay}
        id="folder-info-overlay">
        <motion.section
          initial={{
            x: 368
          }}
          animate={{
            x: 0
          }}
          transition={{
            type: "tween",
            ease: "easeIn",
            duration: 0.2
          }}
          className={className} >
          <form>
             
            <Input
              onChange={onChange}
              name="name"
              value={box?.name}
              reference={register}
              className="margin-input"
              label="nom" />

            <Label >date d'ajout</Label>
            <vaadin-date-picker
              theme="overlay-style"
              id="date-picker"
              style={datepickerStyles}
              value={box?.dateAdded}
              className="date-picker"
              ref={datepickerAddedRef} />

            <Label >date de validité</Label>
            <vaadin-date-picker
              theme="overlay-style"
              id="date-picker"
              style={datepickerStyles}
              value={box?.dateValidity}
              className="date-picker"
              ref={datepickerRef} />

            <Documents documents={documents} addDocument={addDocument} deleteDocument={deleteDocument} />
            <Button className="add-button" onClick={handleSubmit(handleAddBox)} >{buttonText}</Button>

          </form>

          { borrowWindowOpened && (<Borrow visible={borrowWindowOpened} onBorrow={handleBorrow} details={borrowerDetails} />)}
          
        </motion.section>
      </Overlay>
  )
}


FolderInfo = styled(FolderInfo)`
  position: absolute;
  padding: 20px;
  width: 368px;
  z-index: 100;
  height: 100vh;
  right: 0px;
  top: 0px;
  background: var(--background-dark);
  filter: drop-shadow(-5px 0px 4px rgba(0, 0, 0, 0.5));

  & .label-validity{


  }
  & .margin-input{
    margin-bottom: 14px;
  }

  & .date-picker{
    /* width: 1000px; */
  }

  & #date-picker{
    --lumo-body-text-color: var(--text-color);
    height: 42px;
  }

  & .add-button{
    margin-left: auto;
    margin-top: 16px;
    height: 38px;
    width: 110px;
    text-align: center;
    display: flex;
    justify-content: center;

  }

`;

const Overlay = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

`

export default FolderInfo
