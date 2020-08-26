import React from 'react'
import styled from "styled-components"

import { ReactComponent as SearchIcon } from "../assets/search.svg"

interface Props {
  value: string
  onSearch: any;
  
}

const SearchContainer = styled.div`
  width: 259px;
  height: 45px;
  border-radius: 10px;
  background: var(--background-lighter);
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
    margin-left: 10px;
    color: inherit;
    font-size: 1rem;
    &:focus{
      border: none;
      outline: none;
    }
    flex-basis: 92%;

  }
`

const Search = (props: Props) => {
  return (
    <SearchContainer>
      <SearchIcon />
      <input type="text" value={props.value} onChange={props.onSearch}/>
    </SearchContainer>
  )
}


export default Search;

