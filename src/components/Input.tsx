import React from 'react'
import styled from 'styled-components'

interface InputProps {
  className?: string;
  label?: string;
  value?: string;
  onChange?: any;
  name?:string;
  reference?: any;
  type?: string | any;
}

// const defaultonChange = () => undefined;

let Input: React.FC<InputProps> = ({className, reference, onChange,value, type="text", label="", name=""}) => {
  return (
    <div className={className}>
      { label && <Label>{label}</Label>}
      <input
        className="input"
        type={type}
        value={value && value}
        name={name}
        ref={reference && reference}
        onChange={onChange && onChange} />
    </div>
  )
}

export const Label = styled.label`
  font-size: 1rem;
  display: inline-block;
  font-weight: bold;
  padding: 2px;
  margin-bottom: 8px;
  color: var(--text-color-dimmed);
`;

Input = styled(Input)`
  & input{
    width: 100%;
    height: 42px;
    border-radius: 10px;
    padding: 0px 8px;
    color: var(--gray-300);
    background: var(--input-background);
    font-size: 16px;
  
    &:focus{
      outline: none;
      border: var(--border-focus);
    }
  }

`;

export default Input
