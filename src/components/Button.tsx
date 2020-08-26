import React from 'react'
import styled from "styled-components"

interface Props {
  icon?: any;
  fab?: boolean;
  fabSmall?: boolean;
  className?: string;
  onClick?: any;
  type?: "button" | "submit" | "reset" | undefined;
}

const AppButton = styled.button`
  display: inline-block;
  background: ${(props: Props) => (props.fab || props.fabSmall)? "var(--background-lighter)": "var(--green)"} ;
  width: ${(props: Props) => {
    if (props.fab) return "82px";
    if (props.fabSmall) return "54px";
    return "82px";
  }};
  height: ${(props: Props) => {
    if (props.fab) return "66px";
    if (props.fabSmall) return "42px";
    return "42px";
  }};
  padding: ${(props: Props) => {
    if (props.fab) return "27px";
    if (props.fabSmall) return "16px";
    return "16px";
  }};
  /* padding: 16px; */
  color: var(--white);
  border: none;
  border-radius: var(--radius);
  outline: none;
  &:focus{
    outline: none;
    /* border: var(--border-focus); */
  }
  display: flex;
  justify-content: space-between;
  /* justify-items: space-between; */
  align-items: center;
  justify-items: center;
  text-align: center;
  font-size: var(--font-18);
  cursor: pointer;

`;

const Button: React.FC<Props> = ({children, icon, className, onClick, type=undefined, fab=false, fabSmall=false}) => {
  return (
    <AppButton
      className={className}
      fab={fab}
      type={type}
      onClick={onClick}
      fabSmall={fabSmall}>
        <span>{children}</span>
        {icon && icon}
    </AppButton>
  )
}




export default Button;