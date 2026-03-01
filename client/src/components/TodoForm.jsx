import { useState } from 'react';

function TodoForm({ onSubmit, onClose, initialData }) {
    const [title, setTitle] = useState(initialData?.title || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [priority, setPriority] = useState(initialData?.priority || 'medium');
    const [dueDate, setDueDate] = useState(
        initialData?.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : ''
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        onSubmit({
            title: title.trim(),
            description: description.trim(),
            priority,
            dueDate: dueDate || null,
        });
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <div className="form-header">
                <h2>{initialData ? 'Edit Task' : 'New Task'}</h2>
                <button type="button" className="close-btn" onClick={onClose}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            </div>

            <div className="form-group">
                <label htmlFor="title">Task Title</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="What needs to be done?"
                    autoFocus
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add some details..."
                    rows="3"
                />
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Priority</label>
                    <div className="priority-select">
                        {['low', 'medium', 'high'].map((p) => (
                            <button
                                key={p}
                                type="button"
                                className={`priority-option priority-${p} ${priority === p ? 'selected' : ''}`}
                                onClick={() => setPriority(p)}
                            >
                                {p.charAt(0).toUpperCase() + p.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="dueDate">Due Date</label>
                    <input
                        id="dueDate"
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </div>
            </div>

            <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={onClose}>
                    Cancel
                </button>
                <button type="submit" className="btn-submit">
                    {initialData ? 'Update Task' : 'Create Task'}
                </button>
            </div>
        </form>
    );
}

export default TodoForm;
