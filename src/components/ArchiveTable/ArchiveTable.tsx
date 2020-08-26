import React from 'react'
import styled from 'styled-components'
import ArchiveElement from './ArchiveElement';
import { Colors } from '../../utils/index'
import { Box, useBoxStore } from '../../store/documents.store';
import { useAppState } from '../../store/window.store';
import { motion } from 'framer-motion'






interface ArchiveTableProps {
  elements: Box[];
  className?: string;
}

let ArchiveTable: React.FC<ArchiveTableProps> = ({elements}) => {

  // console.log({elements})

  const { setSelectedBox } = useAppState((state) => ({
    setSelectedBox: state.setSelectedBox,
  }));

  const { deleteBox } = useBoxStore(state => ({ deleteBox: state.deleteBox }));
  // console.log({deleteBox, setSelectedBox})
  const selectBox = (id:string) => {
    const selectedBox = elements.find(el => el.id === id);
    setSelectedBox(selectedBox);
  }

  const sortBoxes = (a: Box, b: Box) => {
    let result = 0;
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      result = 1
    }
    else if (a.name.toLowerCase() < b.name.toLowerCase()) {
      result = -1
    }
    return result
  }

  const tableVariants = {
    initial: { y: 0 },
    animate: {
      y: 0,
      transition: {
        type: "tween",
        duration: 0.2,
        ease: "easeOut",
        staggerChildren: 2
      }
    }
  }

  return (
    <motion.section
      variants={tableVariants}
      initial="initial"
      animate="animate"
    >
      <Titles className="titles">
        {
          ["boite", "date d'ajout", "statut"].map(el => {
            return <span key={el}>{el}</span>
          })
        }
      </Titles>
      <Elements variants={tableVariants}>

        {
          [...elements].sort(sortBoxes).map(el => {
            return (
              <ArchiveElement
                status={el.status}
                color={Colors[el.status]}
                name={el.name}
                date={el.dateAdded}
                selectBox={selectBox}
                deleteBox={deleteBox}
                boxId={el.id}
                key={el.id} />
            );
          })
        }

      </Elements>
    </motion.section>
  )
}


let Elements = styled(motion.div)`
  overflow-y: scroll;
  height: 39vh;

`;

let Titles = styled.div`
  width: 85%;
  display: flex;
  justify-content: space-between;
  color: var(--text-color-dimmed);
  font-size: var(--font-titles);
  padding: 8px;
  font-weight: bold;
  
  & span:last-child {
    margin-right: 60px;
  }

`;

ArchiveTable = styled(ArchiveTable)`

  margin-top: 20px;
  width: 100%;

`;



export default ArchiveTable
