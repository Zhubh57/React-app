import { useState, useCallback } from 'react'
import Header from './components/header'
import Todoinput from './components/to-do-inputs'
import TodoList from './components/to-do-items'
import './index.css'
import './App.css'

const FILTERS = ['all', 'active', 'completed']

function App() {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('all')
  const [theme, setTheme] = useState('monotone')

  // Handlers
  const addTodo = useCallback((text) => {
    setTodos(prev => [
      ...prev,
      { id: Date.now(), text, done: false }
    ])
  }, [])

  const toggleTodo = useCallback((index) => {
    setTodos(prev => prev.map((t, i) =>
      i === index ? { ...t, done: !t.done } : t
    ))
  }, [])

  const deleteTodo = useCallback((index) => {
    setTodos(prev => prev.filter((_, i) => i !== index))
  }, [])

  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(t => !t.done))
  }, [])

  // Derived
  const total = todos.length
  const completed = todos.filter(t => t.done).length
  const active = total - completed

  const handleThemeChange = (t) => {
    setTheme(t)
    document.documentElement.setAttribute('data-theme', t)
  }

  return (
    <div className="app-shell" data-theme={theme}>
      {/* Subtle background orbs */}
      <div className="ag-gradient-orb ag-gradient-orb--tl" aria-hidden="true" />
      <div className="ag-gradient-orb ag-gradient-orb--br" aria-hidden="true" />

      {/* Floating navbar */}
      <Header
        total={total}
        completed={completed}
        onThemeChange={handleThemeChange}
        currentTheme={theme}
      />

      {/* Main content */}
      <main className="app-content" id="main-content">
        {/* Hero header */}
        <header className="todo-header">
          <div className="todo-header__eyebrow">
            <span className="todo-header__eyebrow-dot" aria-hidden="true" />
            Antigravity Tasks
          </div>
          <h1 className="todo-header__title">
            {active === 0 && total > 0
              ? 'All done ✦'
              : active > 0
                ? `${active} task${active > 1 ? 's' : ''} remaining`
                : 'Start your day'}
          </h1>
          <p className="todo-header__subtitle">
            Light, floating, frictionless — your task manager.
          </p>
        </header>

        {/* Stats */}
        {total > 0 && (
          <div className="todo-stats" role="group" aria-label="Task statistics">
            <div className="todo-stat">
              <div className="todo-stat__value">{total}</div>
              <div className="todo-stat__label">Total</div>
            </div>
            <div className="todo-stat">
              <div className="todo-stat__value">{active}</div>
              <div className="todo-stat__label">Active</div>
            </div>
            <div className="todo-stat">
              <div className="todo-stat__value">{completed}</div>
              <div className="todo-stat__label">Done</div>
            </div>
          </div>
        )}

        {/* Input */}
        <Todoinput addTodo={addTodo} />

        {/* Filter tabs */}
        {total > 0 && (
          <div className="todo-filters" role="group" aria-label="Filter tasks">
            {FILTERS.map(f => (
              <button
                key={f}
                className={`todo-filter-btn${filter === f ? ' is-active' : ''}`}
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                id={`filter-${f}`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
                {f === 'active' && active > 0 && (
                  <span style={{
                    marginLeft: '4px',
                    opacity: 0.6,
                    fontSize: '10px'
                  }}>
                    {active}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* List */}
        <TodoList
          todos={todos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          filter={filter}
        />

        {/* Footer */}
        {total > 0 && completed > 0 && (
          <div className="todo-footer">
            <span className="todo-footer__text">
              {completed} completed task{completed > 1 ? 's' : ''}
            </span>
            <button
              className="btn btn--ghost btn--sm"
              onClick={clearCompleted}
              id="clear-completed-btn"
              aria-label={`Clear ${completed} completed task${completed > 1 ? 's' : ''}`}
            >
              Clear done
            </button>
          </div>
        )}
      </main>
    </div>
  )
}

export default App