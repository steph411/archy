import React from 'react'
import styled from 'styled-components'
import { Status, Colors } from '../../utils/index'
import Badge from '../Badge'

interface FiltersProps {
  className?: string;
  onStatusFilter: any;
  activeFilter?: Status;
}

let Filters: React.FC<FiltersProps> = ({className, activeFilter, onStatusFilter}) => {
  
  return (
    <div className={className}>
      <span className="title">filtres:</span>
      {Object.values(Status).map(value => (
        <Badge
          className="filter-el"
          filterId={value}
          onFilter={onStatusFilter}
          small
          pointer
          activeFilter={activeFilter}
          inverted={activeFilter === value}
          text={value}
          color={Colors[value]}
          key={value} />
      ))}
    </div>
  )
}

Filters = styled(Filters)`

  width: 100%;
  display: flex;
  margin-top: 42px;
  justify-content: flex-end;
  & .title{
    font-size: 18px;
    font-weight: bold;
    color: var(--text-color-dimmed);
    height: 15px;
  }
  & .filter-el{
    margin-left: 10px;
  }


`;

export default Filters
