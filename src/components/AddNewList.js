import React from 'react'

import styled from 'styled-components'

const AddNewList = ({ createNewList,showNewInput,newList }) => {
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      createNewList(e.target.value)
    }
  }
  const addnewList =(status) => {
    showNewInput(status);
  }

  return (
    <div>
    <Button onClick={()=>addnewList(true)}>Add new list</Button>
       {newList.addNewList &&<Input  type='text'  onKeyPress={handleKeyPress} placeholder='Add new lists...'
      />}
    </div>

  )
}

const Input = styled.input`
  background: #3b4049;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 10px 18px;
  font-size: 24px;
  height: 40px;
  width: 500px;
  margin-bottom: 16px;

  &::placeholder {
    color: #8d96a8;
  }
`
const Button = styled.button`
  color: #32CD32;
  font-size: 1em;
  margin: 1px;
  padding: 0.25em 1em;
  border: 2px solid #32CD32;
  border-radius: 3px;
  margin-bottom:20px;
  margin-top:20px;
  float:right;
  cursor: pointer;
`;

export default AddNewList
