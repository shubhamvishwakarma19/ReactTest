import React from 'react'

import styled from 'styled-components'

const FilterTodo = ({ onFilterTodo }) => {
  const handlefilter= (value)=> {
    onFilterTodo(value)
  }

  return (
    <div>
      <Button onClick={()=>handlefilter('all')}>All</Button>
      <Button onClick={()=>handlefilter('complete')}>Completed</Button>
      <Button onClick={()=>handlefilter('active')}>Active</Button>
    </div>

  )
}

const Button = styled.button`
  color: palevioletred;
  font-size: 1em;
  margin: 1px;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  margin-bottom:20px;
  margin-top:20px;
`;

export default FilterTodo
