import { Navbar } from './components/layout/Navbar'
import { HeroSection } from './components/sections/HeroSection'
import { ProblemSection } from './components/sections/ProblemSection'
import { SolutionSection } from './components/sections/SolutionSection'

function App() {
  return (
    <div className="site-shell min-h-screen bg-background text-text-primary">
      <a className="skip-link" href="#main-content">Ir al contenido</a>
      <Navbar />
      <main id="main-content" tabIndex="-1">
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
      </main>
    </div>
  )
}

export default App
