import React from 'react'
import styled from 'styled-components'
import Badge  from '../Badge'
import Button from '../Button'
import { Status } from '../../utils/index'
import { ReactComponent as EditIcon } from '../../assets/edit.svg'
import { ReactComponent as DeleteIcon } from '../../assets/trash.svg'
import { motion } from 'framer-motion'

interface ArchiveElementProps {
  className?: string;
  name: string;
  date: string;
  status: Status;
  color: string;
  selectBox: any;
  boxId: string;
  deleteBox: any;
  
}

let ArchiveElement: React.FC<ArchiveElementProps> = ({className, deleteBox, name, date, status, boxId, color, selectBox}) => {

  const selectArchiveElement = (event: React.MouseEvent) => {
    // console.log(`selecting box ${boxId}`);
    selectBox(boxId)
  }

  const deleteArchiveElement = (event: React.MouseEvent) => {
    // console.log(`deleting box ${boxId}`)
    deleteBox(boxId)
  }

  const variants = {
    initial: { y: "39vh" },
    animate: {
      y: 0,
      transition: {
        type: "tween",
        duration: 0.2,
        ease: "easeOut",
      }
    }
  }

  return (
    <motion.section
      variants={variants}
      initial="initial"
      animate="animate"
      className={className}>
      <div className="archive-element" onClick={selectArchiveElement}>
        <span>{name}</span>
        <span>{date}</span>
        <Badge
          inverted
          text={status}
          color={color}
        />
      </div>
      <Button onClick={selectArchiveElement} fab icon={<EditIcon/>}></Button>
      <Button onClick={deleteArchiveElement} fab icon={<DeleteIcon/>}></Button>

    </motion.section>

  )
}


ArchiveElement = styled(ArchiveElement)`
  height: 66px;
  display: flex;
  justify-content: space-between;
  margin: 2px 0;
  font-size: 18px;
  font-weight: 500;
  & div{
    padding: 22px 24px;
    width: 85%;
    display: flex;
    cursor: pointer;
    justify-content: space-between;
    background: var(--background-lighter);
    border-radius: var(--radius);

  }
  
`;

export default ArchiveElement
