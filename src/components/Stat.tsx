import React from 'react'
import styled from 'styled-components'

interface StatProps {
  text: string;
  value: number;
  color: string;
  className?: string;
}






let Stat: React.FC<StatProps> = ({value, text, className }) => {
  return (
    <div className={className}>
      <h3>{value}</h3>
      <p>{text}</p>
    </div>
  )
}

Stat = styled(Stat)`
  height: 100%;
  /* padding: 22px 16px; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  & h3{
    font-size: var(--font-stat);
    color: ${(props) => props.color || "var(--text-color)"};
  }

  & p{
    font-size: 20px;
    line-height: 24px;
    font-weight: 500;
    color: var(--text-color);
  }

`;

export default Stat