import React, { useState,useEffect} from "react"; //to use sate in a function component
//import { useState } from "react/cjs/react.production.min";
import './App.css';
//Importing components
import Form from "./component/Form";
import TodoList from "./component/TodoList";
// import Todolist from "./component/TodoList";


function App() {

 

  //States
  const [inputText, setInputText]=   useState("");  
  //inputText is the actual value & setinputText is a function that allows to change the value.
  
  const [todos, setTodos]=useState([]);
  //to store ALL the Todos as an array of objects.
  
  const[status,setStatus]=useState("all");
  //for filter options state updation

  const[filteredTodos,setFilteredTodos] = useState([]);
  //to add filter state

  //run once when the app starts
  useEffect (() => {
    getLocalTodos();
  }, []);

   //use effect
   useEffect(() =>{
    filterHandler();
    saveLocalTodos();
   }, [todos,status]); //everytime we add a new todo, this should run

  //Functions
  const filterHandler = () => {
    switch (status){
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed == true ));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed == false ));
        //filters out the todos and if completed =false, then mark them as uncompleted.
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  //Save to local
  const saveLocalTodos = () => {
   
      localStorage.setItem('todos',JSON.stringify(todos));
      //save and push what we have in our state
    
  };

  //if refresh
  const getLocalTodos = () => {
    if(localStorage.getItem('todos') === null ){
      localStorage.setItem('todos',JSON.stringify([]));
      //get and check, if we don't have something then set an empty array
    }else{
      let todoLocal=JSON.parse(localStorage.getItem("todos"))
      // if it has something then we need to get that information and push it upto the state
      setTodos(todoLocal);
    }

  }

  return (
    <div className="App">
      <header>
      <h1>My Todo List</h1>
      
      </header>
      
     <Form
      inputText={inputText} 
      todos={todos} 
      setTodos={setTodos} 
      setInputText= {setInputText} 
      setStatus={setStatus}
       />
       
     <TodoList 
     setTodos={setTodos}
      todos={todos} 
      filteredTodos={filteredTodos}
      />

    </div>
  );
}

export default App;
