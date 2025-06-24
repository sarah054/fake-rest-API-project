import React, { useState, useEffect } from "react";
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import SearchTodo from './SearchTodo';
import apiRequest from "../ApiRequest"

function TodoList() {

    const API_URL = "http://localhost:3000/todos";
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const [todos, setTodos] = useState([]);
    const [filteredTodos, setFilteredTodos] = useState(todos);
    const [fetchError, setFetchError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortParam, setSortParam] = useState("default");
    const [newTodo, setNewTodo] = useState('');

    //טעינה כל המשימות עבור המשתמש הנוכחי
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(`${API_URL}?userId=${currentUser.id}`);
                if (!response.ok) throw Error(response.status);
                const listTodo = await response.json();
                setTodos(listTodo);
            } catch (err) {
                setFetchError(err);
            }
        };
        fetchItems();
    }, []);


    //טעינת משימות לפי חיפוש ומיון
    useEffect(() => {
        const filtered = todos.filter((todo) =>
            todo.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const sortedFilteredTodos = filtered.sort((a, b) => {
            switch (sortParam) {
                case "default":
                    return 0;
                case "alphabetical":
                    return a.title.localeCompare(b.title);
                case "completed":
                    if (a.completed === b.completed) {
                        return 0;
                    }
                    return a.completed ? 1 : -1;
                case "id":
                    return a.id - b.id;
                default:
                    return 0;
            }
        });
        setFilteredTodos(sortedFilteredTodos);

    }, [searchTerm, sortParam, todos]);

    //הוספת משימה
    const addTodo = async () => {
        const userId = currentUser.id;
        const Newtodo = {
            userId: userId,
            completed: false,
            title: newTodo
        };
        const listTodos = [...todos, Newtodo];
        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Newtodo)
        }
        const result = await apiRequest(API_URL, postOptions);
        if (result) {
            setFetchError(result);
        }else {
            setTodos(listTodos);
        }
    }

    //מחיקת משימה
    const handleDelete = async (id) => {
        const listTodos = todos.filter((item) => item.id !== id);
        const deleteOptions = { method: 'DELETE' };
        const reqUrl = `${API_URL}/${id}`;
        const result = await apiRequest(reqUrl, deleteOptions);
        if (result) {
            setFetchError(result);
        }else {
            setTodos(listTodos);
        }
    }

    //עדכון משימה שהושלמה
    const handleCheck = async (id) => {
        const listTodos = todos.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
        const Todo = listTodos.find((todo) => todo.id === id);
        const updateOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Todo), // שליחה של כל האובייקט
        };
        const reqUrl = `${API_URL}/${id}`;
        const result = await apiRequest(reqUrl, updateOptions);
        if (result) {
            setFetchError(result);
        }else {
          
            setTodos(listTodos);
        } 
    }

    //עדכון משימה
    const updateTodo = async (updatedTodo) => {
        const updateOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTodo),
        };
        const reqUrl = `${API_URL}/${updatedTodo.id}`;
        const result = await apiRequest(reqUrl, updateOptions);
        if (result) {
            setFetchError(result);
        } else {
            setTodos((prevTodos) =>
                prevTodos.map((todo) =>
                    todo.id === updatedTodo.id ? updatedTodo : todo
                )
            );
        }

    };

    return (
        <>
           {fetchError && <p>שגיאה: {fetchError}</p>}
            <AddTodo newTodo={newTodo} setNewTodo={setNewTodo} handleSubmit={addTodo}></AddTodo>
            <SearchTodo searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                setSortParam={setSortParam}></SearchTodo>
            <ul>
                {filteredTodos.map(todo => (
                    <TodoItem key={todo.id} todo={todo} handleDelete={handleDelete}
                        handleCheck={handleCheck} updateTodo={updateTodo} />

                ))}

            </ul>
        </>
    );

};




export default TodoList;
