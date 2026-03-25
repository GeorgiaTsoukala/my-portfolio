import Intro from './sections/Intro'
import Projects from './sections/Projects'
import About from './sections/About'

function App() {
  return (
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory">
      <Intro />
      <Projects />
      <About />
    </main>
  )
}

export default App
