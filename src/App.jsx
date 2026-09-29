function App() {
  return (
    <div className="site-shell min-h-screen bg-background text-text-primary">
      <a className="skip-link" href="#main-content">Ir al contenido</a>
      {/* Sections are composed explicitly in their approved production blocks. */}
      <main id="main-content" tabIndex="-1" />
    </div>
  )
}

export default App
