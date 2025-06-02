import React, { useState } from 'react';
import './ToDo.css';

/**
 * ToDoList Component
 * This component allows users to manage a list of tasks.
 * Users can add, remove, and reorder tasks.
 */

export default function ToDoList(){

    const [tasks, setTasks] = useState([]);
    const [task, setNewTask] = useState('');

    function handleInputChange(event){
        setNewTask(event.target.value);
    }

    function addTask(){
        if(task.trim() !== ''){
            setTasks([...tasks, task]);
            setNewTask('');
        } else {
            alert('Please enter a valid task!');
        }
    }

    function removeTask(index){
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
        alert('Task removed successfully!');

    }

    function moveTaskUp(index){
        if(index > 0){
            const updatedTasks = [...tasks];
            const temp = updatedTasks[index - 1];
            updatedTasks[index - 1] = updatedTasks[index];
            updatedTasks[index] = temp;
            setTasks(updatedTasks);
        } else {
            alert('This task is already at the top!');
        }

    }

    function moveTaskDown(index){
        if(index < tasks.length - 1){
            const updatedTasks = [...tasks];
            const temp = updatedTasks[index + 1];
            updatedTasks[index + 1] = updatedTasks[index];
            updatedTasks[index] = temp;
            setTasks(updatedTasks);
        } else {
            alert('This task is already at the bottom!');
        }

    }

    return(<div className= "todo-list"> 

        <h1 className='to-do-header'>To-Do List</h1>

        <div>
            <input 
                type="text" 
                placeholder='Enter your task!!'
                value={task}
                onChange={handleInputChange}/>
            <button 
                className='add-task'
                onClick={addTask}>
                Add
            </button>
        </div>

        <ol>
            {tasks.map((task, index) => (
                <li key={index}>
                    <span className='text'> {task} </span>
                    <button
                        className='delete-task'
                        onClick={() => removeTask(index)}>
                        Delete
                    </button>
                    <button
                        className='move-up-task'
                        onClick={() => moveTaskUp(index)}>
                        MoveUp
                    </button>
                    <button
                        className='move-down-task'
                        onClick={() => moveTaskDown(index)}>
                        MoveDown
                    </button>
                </li>
            ))}
        </ol>
    </div>)
}