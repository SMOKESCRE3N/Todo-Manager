 import React, { useState,useEffect } from 'react'
 import {TodoProvider} from "./context"
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
 
 function App() {

    const [todos,setTodos]=useState([]);

    const addTodo=(todo)=>{setTodos((prev)=>[ {id:Date.now(),...todo}, ...prev ])};

    const deleteTodo=(id)=>{setTodos((prev)=>prev.filter((prevtodoX) => prevtodoX.id !== id ))};

    const updateTodo=(id,todo)=>{setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo) ))};

    const toggleComplete=(id)=>{setTodos((prev)=> prev.map((prevTodo) => (prevTodo.id === id ? {...prevTodo,completed: !prevTodo.completed } : prevTodo )))};

    //local storage begins

    useEffect(() =>{
        const todosKD=JSON.parse(localStorage.getItem("todosKey"))
        if(todosKD && todosKD.length>0)
        {
            setTodos(todosKD);
        }
    },[]);

    useEffect(() =>{
        localStorage.setItem("todosKey",JSON.stringify(todos))
    },[todos]);

    //local storage ends
    

   return (
    <TodoProvider value={{todos,addTodo,deleteTodo,updateTodo,toggleComplete}}>
    <div className="bg-[#172842] min-h-screen bg-no-repeat bg-[url('/todobgn2.png')]  bg-fixed  bg-cover
 py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-9xl transition-all duration-200 font-semibold text-center mb-4 mt-4 text-pink-100  hover:drop-shadow-[0_0_10px_rgb(0,0,0)] "
                        style={{textShadow: '0 0 20px #0000FF'}}
                    >To Do</h1>
                    <div className="mb-4 mt-16">
                        {/* Todo form goes here */} 
                        <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo) => (
                            <div key={todo.id}
                            className='w-full'>
                                <TodoItem todo={todo}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
   )
 }
 
 export default App
 