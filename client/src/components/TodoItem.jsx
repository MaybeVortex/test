import { useState } from 'react';

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = () => {
        setIsDeleting(true);
        setTimeout(() => onDelete(todo._id), 300);
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return null;
        const date = new Date(dateStr);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (date.toDateString() === today.toDateString()) return 'Today';
        if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';

        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;
    const formattedDate = formatDate(todo.dueDate);

    return (
        <div className={`todo-item ${todo.completed ? 'completed' : ''} ${isDeleting ? 'deleting' : ''} priority-border-${todo.priority}`}>
            <button
                className={`checkbox ${todo.completed ? 'checked' : ''}`}
                onClick={() => onToggle(todo._id, todo.completed)}
                aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
            >
                {todo.completed && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                )}
            </button>

            <div className="todo-content">
                <h3 className="todo-title">{todo.title}</h3>
                {todo.description && <p className="todo-description">{todo.description}</p>}
                <div className="todo-meta">
                    <span className={`priority-badge priority-${todo.priority}`}>
                        {todo.priority}
                    </span>
                    {formattedDate && (
                        <span className={`due-date ${isOverdue ? 'overdue' : ''}`}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                            {formattedDate}
                        </span>
                    )}
                </div>
            </div>

            <div className="todo-actions">
                <button className="action-btn edit-btn" onClick={() => onEdit(todo)} aria-label="Edit">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                </button>
                <button className="action-btn delete-btn" onClick={handleDelete} aria-label="Delete">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default TodoItem;
