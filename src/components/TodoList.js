import React from 'react'

import styled from 'styled-components'

import TodoItem from './TodoItem'
import AddTodo from './AddTodo'


const TodoList = ({ items, toggleComplete ,onAddTodo}) => (
  <Wrapper>
    {items && !items.category && <AddTodo onAddTodo={onAddTodo} catId={0}/>}
    {items && !items.category && items.list.map((item ,i)=> {
      
      const onComplete = e => {
        toggleComplete(item.id,0)
      }

      return (
          <div key={i} >
          
             <TodoItem  {...item} onComplete={onComplete} />
          </div>
        )
    })}

    {items && items.category && items.category.map((item,index )=> {
     
      
      
      return (
        
            <div  key={index}>
                <p>{item.category ? item.category : "Default Category"}</p> 

                <AddTodo onAddTodo={onAddTodo} catId={item.categoryid}/>
               {item.todoList && item.todoList.map((todoList,i) => {
                const onComplete = e => {
                  toggleComplete(todoList.id,item.categoryid)
                }
                 return(
                  <TodoItem  key={i} {...todoList}  onComplete={onComplete}/>
                 )
               })
                }
          </div>
        )
    })}
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export default TodoList
