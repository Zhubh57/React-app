import TodoItem from "./TodoItem"

function TodoList({ todos, toggleTodo, deleteTodo, filter }) {
  const filtered = todos.filter(todo => {
    if (filter === 'active')    return !todo.done
    if (filter === 'completed') return  todo.done
    return true
  })

  if (filtered.length === 0) {
    return (
      <div className="ag-empty" role="status" aria-live="polite">
        <span className="ag-empty__icon" aria-hidden="true">
          {filter === 'completed' ? '✓' : filter === 'active' ? '◎' : '○'}
        </span>
        <p className="ag-empty__title">
          {filter === 'completed'
            ? 'Nothing completed yet'
            : filter === 'active'
              ? 'No active tasks'
              : 'Your list is clear'}
        </p>
        <p className="ag-empty__desc">
          {filter === 'all'
            ? 'Add something to get started — every great day starts with a plan.'
            : 'Switch filters to see other tasks.'}
        </p>
      </div>
    )
  }

  return (
    <div className="todo-list" role="list" aria-label="Todo items">
      {filtered.map((todo, i) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          index={todos.indexOf(todo)}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  )
}

export default TodoList