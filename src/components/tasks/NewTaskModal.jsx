import { useState } from 'react';
import { X } from 'lucide-react';
import { useTasks } from '../../hooks/useTasks';

function NewTaskModal({ onClose }) {
  const { addTask } = useTasks();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Work',
    priority: 'Medium',
    dueDate: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.title.trim()) return;

    addTask({
      ...formData,
      title: formData.title.trim(),
      status: 'todo',
    });

    onClose();
  };

  return (
    <div
      className="modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="task-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-modal-title"
      >
        <div className="modal-header">
          <div>
            <h2 id="task-modal-title">Create new task</h2>
            <p>Add a task and keep your day organized.</p>
          </div>

          <button
            className="modal-close"
            type="button"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="task-title">Task title *</label>
            <input
              id="task-title"
              name="title"
              type="text"
              placeholder="What needs to be done?"
              value={formData.title}
              onChange={handleChange}
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="task-description">
              Description
            </label>
            <textarea
              id="task-description"
              name="description"
              placeholder="Add some details about this task..."
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="task-category">Category</label>
              <select
                id="task-category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Work">Work</option>
                <option value="Design">Design</option>
                <option value="Development">Development</option>
                <option value="Content">Content</option>
                <option value="Personal">Personal</option>
                <option value="Study">Study</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="task-priority">Priority</label>
              <select
                id="task-priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="task-due-date">Due date</label>
            <input
              id="task-due-date"
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-button"
              disabled={!formData.title.trim()}
            >
              Create task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewTaskModal;
