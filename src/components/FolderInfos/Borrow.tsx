import React, { useRef } from 'react'
import styled from 'styled-components'
import Button from '../Button'
import Input, { Label } from '../Input'
import { useForm } from 'react-hook-form'
import { useAppState } from '../../store/window.store';
import { Borrower } from '../../store/documents.store'
import {motion, AnimatePresence } from 'framer-motion'



interface BorrowProps {
  className?: string;
  onBorrow: any;
  details?: Borrower;
  exit?: any;
  visible: boolean
}

interface Formelements {
  "nom": { type: string };
  "téléphone": { type: string };
  "email": { type: string };
  "numéro de service": { type: string };
}

let Borrow: React.FC<BorrowProps> = ({ className, onBorrow, details, exit, visible}) => {
  console.log(details);

  const { toggleBorrowWindow } = useAppState((state) => ({toggleBorrowWindow: state.toggleBorrowWindow}))

  const datepickerRef = useRef<HTMLInputElement>(null);

  const formElements: Formelements = {
    "nom": {type: "text"},
    "email": {type: "email"},
    "téléphone": {type: "tel"},
    "numéro de service": {type: "text"},
  }
  const detailValues = {
    "nom": details && details.nom,
    "email": details && details.email,
    "téléphone": details && details.telephone,
    "numéro de service": details && details.service,
    "returnDate": details && details.returnDate

  }
  const { register, handleSubmit } = useForm();


  // const [formValues, setformValues] = useState({
  //   "nom": "",
  //   "email": "",
  //   "téléphone": "",
  //   "numéro de service": "",
  // })


  const onSubmit = (data:any) => {
    console.log(data)
    data["returnDate"] = datepickerRef.current?.value
    onBorrow(data);
    toggleBorrowWindow();
  }

  const resetOverlay = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    console.log(target.id)
    if (target.id === "borrow-overlay") {
      // toggleBoxInfo();
      toggleBorrowWindow();
      // setSelectedBox(undefined);

    }
  }

  const datepickerStyles = {
    width: "100%",
    background: "var(--input-background)",
    "marginBottom": "10px",
    color: "white",
    "borderRadius": "10px"
  }

  
  return (
    <AnimatePresence>
      {
        visible && (
        <Overlay
          id="borrow-overlay"
          exit={{
            y: 10
          }}
          
          onClick={resetOverlay}>
            
            <motion.div
              initial={{
                y: 543
              }}
              transition={{
                type: "tween",
                duration: 0.2,
                ease: "easeIn"
              }}
              animate={{
                y: 0
              }}
              key={"borrow-window"}
              exit={{y: 543}}
              className={className}>
              <form onSubmit={handleSubmit(onSubmit)}>

                <Label className="label-validity">date de retour</Label>
                <vaadin-date-picker
                  theme="overlay-style"
                  id="date-picker"
                  style={datepickerStyles}
                  value={details && detailValues.returnDate}
                  className="date-picker"
                  ref={datepickerRef}></vaadin-date-picker>

                {
                  Object.keys(formElements).map(key => (
                    <Input
                      className="input-element"
                      label={key}
                      name={key}
                      reference={register}
                      value={details && detailValues[key]}
                      type={formElements[key].type as string}
                      key={key} />))
                }

                { !details && <Button onClick={handleSubmit(onSubmit)}  className="borrow-button">Emprunter</Button>}
              </form>
            </motion.div>
        </Overlay>
        )
      }

    </AnimatePresence>
  )
}

const Overlay = styled(motion.div)`
  position: absolute;
  width: 368px;
  height: 100vh;
  right: 0;
  left: 0;
  bottom: 0;
  top: 0;

`;

Borrow = styled(Borrow)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: var(--radius);
  background: var(--background-dark);
  width: 368px;
  height: 543px;
  padding: 18px;


  filter: drop-shadow(0px -5px 4px rgba(0, 0, 0, 0.5));
  & .input-element{
    margin-bottom: 20px;
  }
  & .borrow-button{
    width: 120px;
    margin-top: 2.5rem;
    margin-left: auto;
  }

`;

export default Borrow 
