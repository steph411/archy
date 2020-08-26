import React from 'react'
import styled from 'styled-components'
import { Status } from '../utils';

interface BadgeProps {
  inverted?: boolean;
  color: string;
  text: string;
  className?: string;
  pointer?: boolean;
  small?: boolean;
  filterId?: Status;
  onFilter?: any;
  activeFilter?: Status | undefined;
}

let Badge: React.FC<BadgeProps> = ({ className, text, filterId, onFilter, inverted, activeFilter }) => {
  
  const onClick = (event: React.MouseEvent) => {
    if (!activeFilter || (activeFilter !== filterId)) {
      onFilter(filterId);
    }
    else {
      onFilter(undefined);
    }
  }

  return (
    <span className={className} onClick={onClick}>
      {text}
    </span>
  )
}

Badge = styled(Badge)`
  font-size: ${(props) => props.small? "12px": "14px"};
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  transition: all 200ms ease-in-out;
  color: ${(props) => {
      if (props.inverted) {
        return "var(--white)"
      }
      else return "var(--text-color)"
    }
  }; 
  width: ${(props) => props.small? "75px": "104px"};
  background: ${(props) => {
    if (props.inverted) return props.color;
  }};
  border: ${(props) => {
  if (props.inverted) {
    return "none"
  }
  else return "2px solid " + props.color;
    }
  };
  border-radius: 24px;
  /* padding: 4px 8px; */
  font-weight: ${(props) => {
    if (props.inverted) {
      return "bold"
    }
    else return "normal"
  }};
  height: ${(props) => props.small ? "20px": "30px"}
  width: 92px;
  cursor: ${(props) => props.pointer ? "pointer": "initial"};
  



`;


export default Badge
