export default function TaskFilters({ filter, setFilter, topLevelTodos, onClearCompleted, isAdmin }) {
<<<<<<< HEAD
  return (
    <div className="flex gap-2 mb-4 flex-wrap">
      <button
        onClick={() => setFilter('all')}
        className={`px-4 py-2 rounded-md transition-colors ${filter === 'all' ? 'bg-sky-600 text-white' : 'bg-white hover:bg-gray-100'
          }`}
      >
        All ({topLevelTodos.length})
      </button>
      <button
        onClick={() => setFilter('active')}
        className={`px-4 py-2 rounded-md transition-colors ${filter === 'active' ? 'bg-sky-600 text-white' : 'bg-white hover:bg-gray-100'
          }`}
      >
        Active ({topLevelTodos.filter(t => !t.completed).length})
      </button>
      <button
        onClick={() => setFilter('completed')}
        className={`px-4 py-2 rounded-md transition-colors ${filter === 'completed' ? 'bg-sky-600 text-white' : 'bg-white hover:bg-gray-100'
          }`}
      >
        Completed ({topLevelTodos.filter(t => t.completed).length})
      </button>
      {isAdmin && (
        <button
          onClick={onClearCompleted}
          className="ml-auto px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition-colors"
        >
=======
  const filters = [
    { id: 'all', label: 'All', count: topLevelTodos.length, icon: '📋' },
    { id: 'active', label: 'Active', count: topLevelTodos.filter(t => !t.completed).length, icon: '⚡' },
    { id: 'completed', label: 'Completed', count: topLevelTodos.filter(t => t.completed).length, icon: '✅' }
  ];

  return (
    <div className="flex gap-3 mb-6 flex-wrap items-center">
      {filters.map(({ id, label, count, icon }) => (
        <button
          key={id}
          onClick={() => setFilter(id)}
          className={`group px-5 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${filter === id
            ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg shadow-teal-500/50 scale-105'
            : 'glass-dark text-gray-300 hover:glass-strong hover:scale-105 hover-glow'
            }`}
        >
          <span className="text-lg">{icon}</span>
          <span>{label}</span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${filter === id
            ? 'bg-white/20'
            : 'bg-gray-700/50'
            }`}>
            {count}
          </span>
        </button>
      ))}

      {isAdmin && (
        <button
          onClick={onClearCompleted}
          className="ml-auto group px-5 py-3 glass-dark border border-orange-400/30 text-orange-400 rounded-xl hover:bg-orange-500/10 hover:border-orange-400/50 font-semibold transition-all duration-300 flex items-center gap-2 hover-glow"
        >
          <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
>>>>>>> 828ddaa (Added Login page)
          Clear Completed
        </button>
      )}
    </div>
<<<<<<< HEAD
  )
}

=======
  );
}
>>>>>>> 828ddaa (Added Login page)
