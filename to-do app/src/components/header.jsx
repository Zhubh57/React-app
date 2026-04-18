function Header({ total, completed, onThemeChange, currentTheme }) {
  const themes = [
    { id: 'monotone', label: '◐ Mono' },
    { id: 'dark',     label: '● Dark' },
    { id: 'accent',   label: '◈ Accent' },
  ]

  return (
    <nav className="ag-navbar" role="navigation" aria-label="Main navigation">
      {/* Brand */}
      <a href="#" className="ag-navbar__brand" aria-label="My Todo App">
        <span className="ag-navbar__brand-dot" aria-hidden="true"></span>
        Tasks
      </a>

      {/* Nav links (decorative for the todo app) */}
      <nav className="ag-navbar__nav" aria-label="Filters">
        <span className="ag-navbar__link is-active">All</span>
        <span className="ag-navbar__link">{completed}/{total} done</span>
      </nav>

      {/* Theme switcher */}
      <div className="ag-navbar__actions" role="group" aria-label="Theme selector">
        {themes.map(t => (
          <button
            key={t.id}
            className={`ag-theme-toggle${currentTheme === t.id ? ' is-active' : ''}`}
            onClick={() => onThemeChange(t.id)}
            title={`Switch to ${t.label} theme`}
            aria-pressed={currentTheme === t.id}
            style={currentTheme === t.id ? {
              background: 'var(--accent-primary)',
              color: 'var(--text-inverse)',
              borderColor: 'var(--accent-primary)'
            } : {}}
          >
            <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '-0.02em' }}>
              {t.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  )
}

export default Header