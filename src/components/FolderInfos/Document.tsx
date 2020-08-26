import React from 'react'
import styled from 'styled-components';
import { ReactComponent as DeleteDocIcon } from '../../assets/deletedoc.svg'
import { motion } from 'framer-motion'



interface DocumentProps {
  className?: string;
  name: string;
  onDelete: any;
  key?: string;
}

let Document: React.FC<DocumentProps> = ({className, name, onDelete, key}) => {


  const deleteDocument = (event: React.MouseEvent) => {
    console.log(event);
    onDelete(name);
  }
  return (
    <motion.div
      initial={{ y: 349 }}
      animate={{ y: 0 }}
      transition={{type: "tween", duration: 0.2, ease: "easeOut"}}
      className={className}>
      <span className="name">{name}</span>
      <DeleteDocIcon className="delete-icon" onClick={deleteDocument}/>
      
    </motion.div>
  )
}




Document = styled(Document)`
  display: flex;
  & .name{
    display: inline-block;
    flex-basis: 92%;
    color: var(--text-color);
    font-size: 16px;
    font-weight: 500;
  };

  & .delete-icon{
    cursor: pointer;
  }

`;

export default Document 
