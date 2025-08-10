import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeTodo, toggleTodo } from "../Redux/Slice";

const Todo = () => {
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    if (savedTodos.length < 0) {
      savedTodos.forEach((todo) => {
        dispatch({
          type: "todos/loadFromStorage",
          payload: todo,
        });
      });
    }
  }, [dispatch]);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  const addHandleTodo = () => {
    if (text.trim()) {
      if (editId) {
        dispatch(removeTodo(editId));
        dispatch(addTodo(text));
        setEditId(null);
      } else {
        dispatch(addTodo(text));
      }
      setText("");
    }
  };
  const editHandleTodo = () => {
    setText(todos.text);
    setEditId(todos.id);
  };
  return (
    <>
      <div className="main--h-screen flex flex-col bg-gray-50 items-center py-10">
        <h1 className="text-black text-4xl font-bold mb-5">
          React Redux ToDo App
        </h1>
        <div className="w-11/12">
          <div className="flex items-center space-x-5">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter Your Todo"
              className="flex-grow px-4 py-2 border rounded-md focus:outline-none"
            />
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-950"
              onClick={addHandleTodo}
            >
              {editId ? "Edit" : "Add"}
            </button>
          </div>
          <ul className="w-11/12 rounded-lg shadow p-5 space-y-5">
            {todos.map((data, index) => (
              <li
                key={index}
                className={`flex justify-between items-center p-3 rounded-lg shadow-md ${
                  data.completed ? "bg-gray-600" : "bg-amber-300"
                }`}
              >
                <div
                  className={`flex flex-col cursor-pinter ${
                    data.completed
                      ? "line-through text-gray-500"
                      : "text-gray-900"
                  }`}
                  onClick={() => dispatch(toggleTodo(data.id))}
                >
                  <span>{data.text}</span>
                  <span>{new Date(data.id).toLocaleString()}</span>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => editHandleTodo(data)}
                    className="px-3 py-1 bg-yellow-300 text-white rounded-lg hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => dispatch(removeTodo(data.id))}
                    className="px-3 py-1 bg-red-600 rounded-lg hover:bg-red-800"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Todo;
