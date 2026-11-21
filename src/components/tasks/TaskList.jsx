
import { useMemo, useState } from 'react';
import {
  Search,
  CalendarDays,
  MoreHorizontal,
  Check,
  Pencil,
  Trash2,
} from 'lucide-react';

import { useTasks } from '../../hooks/useTasks';
import EditTaskModal from './EditTaskModal';
import DeleteTaskModal from './DeleteTaskModal';

function TaskList() {
  const { tasks, toggleTask, deleteTask } = useTasks();

  const [deletingTask, setDeletingTask] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [priority, setPriority] = useState('all');
  const [openMenuId, setOpenMenuId] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesFilter =
        activeFilter === 'all' ||
        (activeFilter === 'completed' &&
          task.status === 'completed') ||
        (activeFilter === 'progress' &&
          task.status === 'in-progress');

      const matchesSearch = [
        task.title,
        task.description,
        task.category,
      ]
        .join(' ')
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesPriority =
        priority === 'all' ||
        task.priority.toLowerCase() === priority;

      return matchesFilter && matchesSearch && matchesPriority;
    });
  }, [tasks, activeFilter, search, priority]);

  const handleDelete = () => {
    if (!deletingTask) return;

    deleteTask(deletingTask.id);
    setDeletingTask(null);
  };

  const filters = [
    { label: 'All tasks', value: 'all' },
    { label: 'In progress', value: 'progress' },
    { label: 'Completed', value: 'completed' },
  ];

  return (
    <>
      <section className="tasks-section">
        <div className="tasks-heading">
          <div>
            <h2>My tasks</h2>
            <p>Manage and track everything in one place.</p>
          </div>

          <button className="view-all-button" type="button">
            View all tasks
          </button>
        </div>

        <div className="task-toolbar">
          <div className="task-tabs">
            {filters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                className={
                  activeFilter === filter.value ? 'selected' : ''
                }
                onClick={() => setActiveFilter(filter.value)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <label className="task-search">
            <Search size={15} />
            <input
              type="search"
              placeholder="Find a task..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>

          <select
            className="priority-filter"
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
            aria-label="Filter by priority"
          >
            <option value="all">Priority: All</option>
            <option value="high">Priority: High</option>
            <option value="medium">Priority: Medium</option>
            <option value="low">Priority: Low</option>
          </select>
        </div>

        <div className="task-list">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <article className="task-card" key={task.id}>
                <button
                  className={`task-checkbox ${
                    task.status === 'completed' ? 'checked' : ''
                  }`}
                  onClick={() => toggleTask(task.id)}
                  type="button"
                  aria-label={`Mark ${task.title} ${
                    task.status === 'completed'
                      ? 'incomplete'
                      : 'complete'
                  }`}
                >
                  {task.status === 'completed' && <Check size={15} />}
                </button>

                <div className="task-info">
                  <h3
                    className={
                      task.status === 'completed' ? 'task-done' : ''
                    }
                  >
                    {task.title}
                  </h3>
                  <p>{task.description}</p>
                </div>

                <span className="task-category">
                  {task.category}
                </span>

                <span
                  className={`priority-badge ${task.priority.toLowerCase()}`}
                >
                  {task.priority}
                </span>

                <span className="task-date">
                  <CalendarDays size={13} />
                  {task.dueDate
                    ? new Date(`${task.dueDate}T00:00:00`).toLocaleDateString(
                        'en-US',
                        { month: 'short', day: 'numeric' }
                      )
                    : 'No date'}
                </span>

                <div className="task-actions">
                  <button
                    className="task-menu"
                    type="button"
                    aria-label={`Actions for ${task.title}`}
                    aria-expanded={openMenuId === task.id}
                    onClick={() =>
                      setOpenMenuId(
                        openMenuId === task.id ? null : task.id
                      )
                    }
                  >
                    <MoreHorizontal size={17} />
                  </button>

                  {openMenuId === task.id && (
                    <div className="task-action-menu">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingTask(task);
                          setOpenMenuId(null);
                        }}
                      >
                        <Pencil size={14} />
                        Edit task
                      </button>

                      <button
                        type="button"
                        className="delete-action"
                        onClick={() => {
                          setDeletingTask(task);
                          setOpenMenuId(null);
                        }}
                      >
                        <Trash2 size={14} />
                        Delete task
                      </button>
                    </div>
                  )}
                </div>
              </article>
            ))
          ) : (
            <div className="empty-tasks">
              No tasks found. Try changing your filters.
            </div>
          )}
        </div>
      </section>

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
        />
      )}

      {deletingTask && (
        <DeleteTaskModal
          task={deletingTask}
          onCancel={() => setDeletingTask(null)}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
}

export default TaskList;
