import { useMemo } from 'react';
import { CalendarDays, CheckCircle2, Clock3 } from 'lucide-react';
import { useTasks } from '../../hooks/useTasks';

function Calendar() {
  const { tasks } = useTasks();

  const groupedTasks = useMemo(() => {
    const groups = tasks
      .filter((task) => task.dueDate)
      .reduce((result, task) => {
        if (!result[task.dueDate]) {
          result[task.dueDate] = [];
        }

        result[task.dueDate].push(task);
        return result;
      }, {});

    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [tasks]);

  const formatDate = (date) =>
    new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

  return (
    <section className="calendar-page">
      <div className="calendar-intro">
        <div>
          <h2>Upcoming deadlines</h2>
          <p>Keep track of your tasks and important dates.</p>
        </div>

        <div className="calendar-total">
          <CalendarDays size={18} />
          {tasks.filter((task) => task.dueDate).length} scheduled tasks
        </div>
      </div>

      {groupedTasks.length > 0 ? (
        <div className="calendar-timeline">
          {groupedTasks.map(([date, dateTasks]) => (
            <div className="calendar-day" key={date}>
              <div className="calendar-day-heading">
                <div className="calendar-date-icon">
                  <CalendarDays size={19} />
                </div>
                <div>
                  <h3>{formatDate(date)}</h3>
                  <p>{dateTasks.length} task(s)</p>
                </div>
              </div>

              <div className="calendar-day-tasks">
                {dateTasks.map((task) => (
                  <article className="calendar-task" key={task.id}>
                    <div className="calendar-task-info">
                      <h4 className={task.status === 'completed' ? 'task-done' : ''}>
                        {task.title}
                      </h4>
                      <p>{task.description || 'No description provided'}</p>
                    </div>

                    <span className={`priority-badge ${task.priority.toLowerCase()}`}>
                      {task.priority}
                    </span>

                    <span className={`calendar-status ${task.status}`}>
                      {task.status === 'completed' ? (
                        <CheckCircle2 size={14} />
                      ) : (
                        <Clock3 size={14} />
                      )}
                      {task.status === 'in-progress'
                        ? 'In progress'
                        : task.status === 'completed'
                          ? 'Completed'
                          : 'To do'}
                    </span>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="calendar-empty">
          <CalendarDays size={36} />
          <h3>No scheduled tasks yet</h3>
          <p>Add a due date when creating a task to see it here.</p>
        </div>
      )}

      {tasks.some((task) => !task.dueDate) && (
        <p className="calendar-undated">
          {tasks.filter((task) => !task.dueDate).length} task(s) have no due date
          and are not shown on the calendar.
        </p>
      )}
    </section>
  );
}

export default Calendar;
