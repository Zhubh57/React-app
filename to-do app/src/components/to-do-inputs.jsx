import { useState } from "react"

function Todoinput({ addTodo }) {
  const [todo, setTodo] = useState("")

  const handleAdd = () => {
    if (todo.trim() !== "") {
      addTodo(todo.trim())
      setTodo("")
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAdd()
  }

  return (
    <div className="todo-input-card">
      <div className="form-inline">
        <input
          id="todo-input"
          className="form-input"
          type="text"
          placeholder="What needs to be done?"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          aria-label="New task input"
        />
        <button
          className="btn btn--primary"
          onClick={handleAdd}
          disabled={!todo.trim()}
          aria-label="Add task"
          id="add-todo-btn"
        >
          <span aria-hidden="true" style={{ fontSize: '18px', lineHeight: 1 }}>+</span>
          Add
        </button>
      </div>
    </div>
  )
}

export default Todoinput
