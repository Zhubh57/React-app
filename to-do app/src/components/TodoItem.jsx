function TodoItem({ todo, index, toggleTodo, deleteTodo }) {
  return (
    <div
      className={`todo-item${todo.done ? ' is-done' : ''}`}
      role="listitem"
      aria-label={`Task: ${todo.text}${todo.done ? ' — completed' : ''}`}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      {/* Checkbox */}
      <input
        type="checkbox"
        className="ag-checkbox"
        id={`todo-${index}`}
        checked={todo.done}
        onChange={() => toggleTodo(index)}
        aria-label={`Mark "${todo.text}" as ${todo.done ? 'incomplete' : 'complete'}`}
      />

      {/* Task text */}
      <label
        htmlFor={`todo-${index}`}
        className="todo-item__text"
        style={{ cursor: 'pointer' }}
      >
        {todo.text}
      </label>

      {/* Actions */}
      <div className="todo-item__actions">
        <button
          className="todo-delete-btn"
          onClick={() => deleteTodo(index)}
          aria-label={`Delete task "${todo.text}"`}
          title="Delete"
        >
          ×
        </button>
      </div>
    </div>
  )
}

export default TodoItem
