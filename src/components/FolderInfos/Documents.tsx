import React, { useState } from 'react'
import styled from 'styled-components'
import Document from './Document';
import Divider from './Divider';
import AddDocument from './AddDocument';

interface Doc {
  name: string;
}


interface DocumentsProps {
  className?: string;
  documents: string[];
  addDocument: any;
  deleteDocument: any;
  
}

let Documents: React.FC<DocumentsProps> = ({className, deleteDocument, addDocument, documents=[]}) => {

  const [inputValue, setinputValue] = useState("");

  const onDelete = (id: string) => {
    deleteDocument(id)
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue(event.target.value);
    console.log(event)
  }
  const onAdd = (event: React.MouseEvent) => {
    console.log(event);
    addDocument(inputValue);
    setinputValue("");
    
  }


  return (
    <div className={className}>
      <span>Documents</span>
      <div className="documents">
        <div className="document-list">
          {
            documents.map(el => {
              return (
                <React.Fragment key={el}>
                  <Document onDelete={onDelete} key={el} name={el} />
                  <Divider/>
                </React.Fragment>
              )
            })
          }
        </div>
        <AddDocument onChange={onChange} value={inputValue} onAdd={onAdd}/>
      </div>
      
    </div>
  )
}


Documents = styled(Documents)`
  & span{
    font-size: 16px;
    padding: 2px;
    font-weight: bold;
    display: inline-block;
    margin-bottom: 8px;
    color: var(--text-color-dimmed);
  };
  
  & .documents{
    height: 328px;
    /* overflow-y: scroll; */
    border-radius: var(--radius);
    background: var(--background-lighter);
    padding: 14px 10px 10px 10px;
  };
  
  & .document-list{
    height: 75%;
    overflow-y: scroll;
    border: 1px solid var(--text-color-dimmed);
    border-radius: var(--radius);
    padding: 17px 8px 0px 8px;
  }




`;

export default Documents
