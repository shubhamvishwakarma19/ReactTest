import React from 'react'
import { Provider, Subscribe } from 'unstated'

import styled from 'styled-components'

import TodosContainer from './store'

import TodoList from './components/TodoList'
import AddTodo from './components/AddTodo'
import FilterTodo from './components/FilterTodo'
import AddNewList from './components/AddNewList'

function App () {
  return (
    <Provider>
      <Wrapper>
        <Subscribe to={[TodosContainer]}>
          {todos => {
            let list = todos.getList();

            return (
              <TodosWrapper>

                <AddNewList  createNewList={todos.createNewList} showNewInput={todos.showNewInput} newList={todos.state} />
                <FilterTodo onFilterTodo={todos.createFilterTodo}/>
                <TodoList items={list} toggleComplete={todos.toggleComplete} onAddTodo={todos.createTodo} />
              </TodosWrapper>
            )
          }}
        </Subscribe>
      </Wrapper>
    </Provider>
  )
}

const Wrapper = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
`

const TodosWrapper = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
`

export default App
