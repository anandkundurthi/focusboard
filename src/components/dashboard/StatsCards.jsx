import { ListTodo, Clock3, Check } from 'lucide-react';
import { useTasks } from '../../hooks/useTasks';

function StatsCards() {
  const {
    totalTasks,
    inProgressTasks,
    completedTasks,
  } = useTasks();

  const stats = [
    {
      id: 1,
      title: 'Total tasks',
      value: totalTasks,
      subtitle: 'Across all projects',
      icon: ListTodo,
      color: 'purple',
    },
    {
      id: 2,
      title: 'In progress',
      value: inProgressTasks,
      subtitle: 'Keep the momentum',
      icon: Clock3,
      color: 'blue',
    },
    {
      id: 3,
      title: 'Completed',
      value: completedTasks,
      subtitle: 'Great work this week',
      icon: Check,
      color: 'green',
    },
  ];

  return (
    <section className="stats-grid" aria-label="Task statistics">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <article className="stat-card" key={stat.id}>
            <div className={`stat-icon ${stat.color}`}>
              <Icon size={18} strokeWidth={2} />
            </div>

            <div className="stat-details">
              <span className="stat-title">{stat.title}</span>

              <strong className="stat-value">
                {stat.value}
              </strong>

              <span className="stat-subtitle">
                {stat.subtitle}
              </span>
            </div>
          </article>
        );
      })}
    </section>
  );
}

export default StatsCards;
