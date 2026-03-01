import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Header from './components/Header';
import StatsBar from './components/StatsBar';
import './App.css';

const API_URL = 'http://localhost:5000/api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [editingTodo, setEditingTodo] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.error('Failed to fetch todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (todoData) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todoData),
      });
      const newTodo = await res.json();
      setTodos((prev) => [newTodo, ...prev]);
      setShowForm(false);
    } catch (err) {
      console.error('Failed to add todo:', err);
    }
  };

  const updateTodo = async (id, updates) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      const updated = await res.json();
      setTodos((prev) => prev.map((t) => (t._id === id ? updated : t)));
      setEditingTodo(null);
      setShowForm(false);
    } catch (err) {
      console.error('Failed to update todo:', err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error('Failed to delete todo:', err);
    }
  };

  const toggleComplete = async (id, completed) => {
    await updateTodo(id, { completed: !completed });
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const stats = {
    total: todos.length,
    completed: todos.filter((t) => t.completed).length,
    active: todos.filter((t) => !t.completed).length,
    highPriority: todos.filter((t) => t.priority === 'high' && !t.completed).length,
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingTodo(null);
  };

  return (
    <div className="app">
      <div className="app-bg">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>
      <div className="app-container">
        <Header />
        <StatsBar stats={stats} />

        <div className="controls-bar">
          <div className="filter-group">
            {['all', 'active', 'completed'].map((f) => (
              <button
                key={f}
                className={`filter-btn ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
                <span className="filter-count">
                  {f === 'all' ? stats.total : f === 'active' ? stats.active : stats.completed}
                </span>
              </button>
            ))}
          </div>
          <button className="add-btn" onClick={() => { setEditingTodo(null); setShowForm(true); }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Task
          </button>
        </div>

        {showForm && (
          <div className="modal-overlay" onClick={handleFormClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <TodoForm
                onSubmit={editingTodo ? (data) => updateTodo(editingTodo._id, data) : addTodo}
                onClose={handleFormClose}
                initialData={editingTodo}
              />
            </div>
          </div>
        )}

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading your tasks...</p>
          </div>
        ) : (
          <TodoList
            todos={filteredTodos}
            onToggle={toggleComplete}
            onDelete={deleteTodo}
            onEdit={handleEdit}
          />
        )}
      </div>
    </div>
  );
}

export default App;
