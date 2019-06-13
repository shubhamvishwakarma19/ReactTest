import { Container } from 'unstated'

const defaultState = {
  list: [
    {
      id: 1,
      completed: false,
      text: 'Read README'
    },
    {
      id: 2,
      completed: false,
      text: 'Add one todo'
    },
    {
      id: 3,
      completed: false,
      text: 'Add filters'
    },
    {
      id: 4,
      completed: false,
      text: 'Add multiple lists'
    },
    {
      id: 5,
      completed: false,
      text: 'Optional: add tests'
    }
  ]
}

class TodosContainer extends Container {
  constructor (props) {
    super(props)

    this.state = this.readStorage()
  }

  readStorage () {
    if (window && window.localStorage) {
      const state = window.localStorage.getItem('appState')
      if (state) {
        return JSON.parse(state)
      }
    }

    let defaultList={
      list: defaultState.list,
      tempList: defaultState.list
    }

    return defaultList
  }

  syncStorage () {
    if (window && window.localStorage) {
      const state = JSON.stringify(this.state)
      window.localStorage.setItem('appState', state)
      
    }
  }

  getList () {
    return this.state
  }

  toggleComplete = async (id,catid) => {
    if(catid==0){
      const item = this.state.list.find(i => i.id === id)
      const completed = !item.completed
      await this.setState(state => {
        const list = state.list.map(item => {
          if (item.id !== id) return item
          return {
            ...item,
            completed
          }
        })
        const tempList = list
        
        return { list ,tempList}
      })

    }else{

      await this.setState(state => {
        for(let item of state.category){
          if(item.categoryid==catid){
            const items =item.todoList.find(i => i.id === id)
            if(items.completed){
              items.completed =false
            }else{
              items.completed = true
            }
          }
        }
        const category = state.category;
        const tempList = state.category;
  
      return { category, tempList };
      })

    }

    this.syncStorage()
  }


  createTodo = async  ( text , id )=> {
    if(id==0){
      await this.setState(state => {
      const item = {
        completed: false,
        text,
        id: state.list.length + 1
      }

      const list = state.list.concat(item)
      const tempList = list

      return { list, tempList }
    })

    }else{

      await this.setState(state => {
        for(let item of state.category){
          if(item.categoryid==id){
            const items = {
              completed: false,
              text,
              id: item.todoList.length + 1
            }
            item.todoList.push(items)
          }
        }
        const category = state.category;
        const tempList = state.category;
  
      return { category, tempList };
      })
    }
    

    this.syncStorage()
  }
  createFilterTodo = async filterBy => {
    let list=[];
    await this.setState(state => {
      if(!state.category){
          if(filterBy!=='all'){
            for(let items of state.tempList){
              if(filterBy==='complete'){
                if(items.completed){
                  list.push(items)
                }
              }
              if(filterBy==='active'){
                if(!items.completed){
                  list.push(items)
                }
              }
          }
          
        }else{
          list= state.tempList;
        }
        return { list }

      }else{
          let category=[];
          if(filterBy!=='all'){
            for(let items of state.tempList){
                let temp=[]
                if(items.todoList){
                    for(let item of items.todoList){
                      if(filterBy==='complete'){
                        if(item.completed){
                          temp.push(item)
                        }
                      }
                      if(filterBy==='active'){
                        if(!item.completed){
                          temp.push(item)
                        }
                      }
                    }
                }
                category.push({category:items.category,todoList: temp});

            }
          }else{
            category= state.tempList;
          }

          return { category }



      }

           

    })
  }

 
   showNewInput = async status => {
    await this.setState(addNewList => {
      addNewList = status
      return { addNewList}
    })

  }


  createNewList = async text => {
    await this.setState(state => {
      let category=[];
      if(state.category){
          category=state.category;
          category.push({category: text,categoryid:category.length+1 ,todoList:[]});

      }else{
          category.push({category: "",categoryid:1,todoList:state.list});
          category.push({category: text,categoryid:2 ,todoList:[]});
      }
      const tempList = category;
  
      return { category, tempList }
    })
  
    this.syncStorage()
  }


}




export default TodosContainer
