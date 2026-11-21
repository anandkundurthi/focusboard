import { Trash2, X } from 'lucide-react';

function DeleteTaskModal({ task, onCancel, onConfirm }) {
  if (!task) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onCancel}
    >
      <div
        className="delete-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="delete-modal-close"
          type="button"
          onClick={onCancel}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        <div className="delete-modal-icon">
          <Trash2 size={25} />
        </div>

        <h2 id="delete-modal-title">Delete this task?</h2>

        <p>
          Are you sure you want to delete
          {' '}
          <strong>"{task.title}"</strong>?
          This action cannot be undone.
        </p>

        <div className="delete-modal-actions">
          <button
            className="delete-cancel-button"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="delete-confirm-button"
            type="button"
            onClick={onConfirm}
          >
            <Trash2 size={16} />
            Delete task
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteTaskModal;
