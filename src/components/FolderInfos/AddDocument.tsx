import React from 'react'
import styled from "styled-components"

import { ReactComponent as AddDocIcon } from "../../assets/add_document.svg"

interface Props {
  value: string
  onChange: any;
  onAdd: any;
  className?: string;
  
}

const Container = styled.div`
  width: 100%;
  height: 45px;
  margin-top: 2rem;
  position: relative;
  border-radius: 10px;
  background: var(--input-background);
  border: none;
  font-size: 1rem;
  color: var(--text-color);
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  padding: 10px;

  &:focus-within{
    border: none;
    border: 2px solid var(--text-color-dimmed);
  };

  & input {
    background: inherit;
    border: none;
    /* border-right: 3px solid var(--text-color-dimmed); */
    margin-left: 2px;
    padding-right: 16px;
    color: inherit;
    font-size: 1rem;
    &:focus{
      border: none;
      outline: none;
    }
    flex-basis: 92%;

  }
  & .divider{
    display: inline-block;
    position: absolute;
    width: 0px;
    height: 45px;
    left: 84%;
    border-right: 3px solid var(--text-color-dimmed);
  };

  & .add-icon{
    cursor: pointer;
  }
`

const AddDocument = (props: Props) => {
  return (
    <Container>
      <input type="text" value={props.value} onChange={props.onChange}/>
      <AddDocIcon className="add-icon" onClick={props.onAdd} />
      <span className="divider"/>
    </Container>
  )
}


export default AddDocument;

