import React from 'react'
import styled from 'styled-components';


interface DividerProps {
  className?: string;
}

let Divider: React.FC<DividerProps> = ({className }) => {
  return (
    <hr className={className} />
  )
}

Divider = styled(Divider)`
  width: 100%;
  height: 2px;
  margin: 10px 0px 14px 0px;
  color: var(--input-background);
  background: var(--input-background);
  &:last-child{
    margin-bottom: 0px;
  }

`;

export default Divider
