import React, { useState, useEffect } from 'react';
import { Plus, Trash2, CheckCircle, Moon, Sun } from 'lucide-react';

const TodoApp = () => {
  interface Todo {
    id: number;
    text: string;
    completed: boolean;
  }
  
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Dynamic Background */}
      <div className={`absolute inset-0 transition-colors duration-500 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        {darkMode ? (
          // Smoother starry night effect for dark mode
          [...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 1 + 1}px`,
                height: `${Math.random() * 1 + 1}px`,
                opacity: Math.random() * 0.5 + 0.01,
                animation: `twinkle ${Math.random() * 40 + 4}s ease-in-out infinite alternate, float ${Math.random() * 100 + 150}s linear infinite`,
                animationDelay: `${-Math.random() * 80}s`,
              }}
            />
          ))
        ) : (
          // Gradient that follows the mouse for light mode
          <div
            className="absolute inset-0 bg-gradient-to-br from-green-400 to-cyan-500 opacity-50 transition-all duration-300"
            style={{
              backgroundPosition: `${mousePosition.x / 5}px ${mousePosition.y / 5}px`,
            }}
          />
        )}
      </div>

      {/* Todo App Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className={`max-w-md w-full p-6 rounded-lg shadow-lg transition-colors duration-500 ${darkMode ? 'bg-gray-800 bg-opacity-80' : 'bg-white bg-opacity-80'} backdrop-blur-md`}>
          <div className="flex justify-between items-center mb-6">
            <h1 className={`text-3xl font-mono font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>To-Do App</h1>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-yellow-400'}`}
            >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>
          <div className="flex mb-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className={`flex-grow p-2 font-sans rounded-l-md focus:outline-none ${darkMode ? 'bg-gray-700 text-white border border-gray-100' : 'bg-gray-100 text-gray-800 border border-gray-300'}`}
              placeholder="Add a new task..."
            />
            <button
              onClick={addTodo}
              className="bg-green-500 text-white p-2 rounded-r-md hover:bg-green-600 transition duration-300"
            >
              <Plus size={24} />
            </button>
          </div>
          <ul className="space-y-2">
            {todos.map(todo => (
              <li
                key={todo.id}
                className={`flex items-center justify-between p-3 rounded-md transition-colors duration-300 ${
                  todo.completed
                    ? darkMode ? 'bg-gray-700 bg-opacity-50 text-gray-400' : 'bg-gray-200 bg-opacity-50 text-gray-500'
                    : darkMode ? 'bg-gray-600 bg-opacity-50 text-white' : 'bg-white bg-opacity-50 text-gray-800'
                }`}
              >
                <span
                  className={`flex-grow ${todo.completed ? 'line-through' : ''}`}
                  onClick={() => toggleTodo(todo.id)}
                >
                  {todo.text}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`${
                      todo.completed ? 'text-green-500' : 'text-gray-400'
                    } hover:text-green-600 transition duration-300`}
                  >
                    <CheckCircle size={20} />
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-red-500 hover:text-red-600 transition duration-300"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* CSS for animations */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        @keyframes float {
          from { transform: translateY(0px); }
          to { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default TodoApp;