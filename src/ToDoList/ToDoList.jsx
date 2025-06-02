import React, { useState, useEffect  } from 'react';
import { supabase } from '../supabaseClient';
import './ToDo.css';

/**
 * ToDoList Component
 * This component allows users to manage a list of tasks.
 * Users can add, remove, and reorder tasks.
 */

export default function ToDoList(){

    const [tasks, setTasks] = useState([]);
    const [task, setNewTask] = useState('');

    useEffect(() => {
    fetchTasks();
    }, []);

    async function fetchTasks() {
        const { data, error } = await supabase
            .from('tasks')
            .select('*')
            .order('position', { ascending: true });

        if (error) console.error('Error fetching tasks:', error);
        else setTasks(data);
    }


    async function addTask() {
        if (task.trim() !== '') {
            const position = tasks.length;
            const { data, error } = await supabase
            .from('tasks')
            .insert([{ description: task, position }])
            .select();

            if (error) alert('Error adding task');
            else {
            setTasks([...tasks, ...data]);
            setNewTask('');
            }
        } else {
            alert('Please enter a valid task!');
        }
    }


    async function removeTask(id) {
        const { error } = await supabase.from('tasks').delete().eq('id', id);
        if (error) alert('Error deleting task');
        else setTasks(tasks.filter((t) => t.id !== id));
    }

    async function moveTaskUp(index) {
        if (index > 0) {
            const current = tasks[index];
            const previous = tasks[index - 1];

            // Intercambia posiciones
            await supabase.from('tasks')
            .update({ position: previous.position })
            .eq('id', current.id);
            
            await supabase.from('tasks')
            .update({ position: current.position })
            .eq('id', previous.id);

            fetchTasks(); 
        } else {
            alert('This task is already at the top!');
        }
    }

    async function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const current = tasks[index];
            const next = tasks[index + 1];

            await supabase.from('tasks')
            .update({ position: next.position })
            .eq('id', current.id);
            
            await supabase.from('tasks')
            .update({ position: current.position })
            .eq('id', next.id);

            fetchTasks();
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
                onChange={(e) => setNewTask(e.target.value)}/>
            <button 
                className='add-task'
                onClick={addTask}>
                Add
            </button>
        </div>

        <ol>
            {tasks.map((task, index) => (
                <li key={task.id}>
                    <span className='text'> {task.description} </span>
                    <button
                        className='delete-task'
                        onClick={() => removeTask(task.id)}>
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