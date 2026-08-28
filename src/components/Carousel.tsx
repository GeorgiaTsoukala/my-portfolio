import { useState } from 'react'
import { projectsDetails } from '../content/projectsDetails'

// Layout values for the three visible carousel positions: left and right background cards, centered active card
const cardLayouts = [
  {
    x: '-65%',
    scale: 0.85,
    rotate: -6,
    zIndex: 0,
    backgroundColor: '#111111',
  },
  {
    x: '0%',
    scale: 1,
    rotate: 0,
    zIndex: 10,
    backgroundColor: '#4F46E5',
  },
  {
    x: '65%',
    scale: 0.85,
    rotate: 6,
    zIndex: 0,
    backgroundColor: '#111111',
  },
]

const Carousel = () => {
  const [orderedProjects, setOrderedProjects] = useState(projectsDetails)

  const showPreviousProject = () => {
    setOrderedProjects((currentProjects) => {
      const lastProject = currentProjects[currentProjects.length - 1]
      const remainingProjects = currentProjects.slice(0, -1)

      return [lastProject, ...remainingProjects]
    })
  }

  const showNextProject = () => {
    setOrderedProjects((currentProjects) => {
      const firstProject = currentProjects[0]
      const remainingProjects = currentProjects.slice(1)

      return [...remainingProjects, firstProject]
    })
  }

  return (
  <div className="flex h-full w-full flex-col pb-6 md:pb-10">

    {/* Top part of the screen for the carousel cards*/}
    <div className="flex h-[85%] items-center justify-center">
      <div className="relative h-full w-full max-w-5xl">
        {orderedProjects.slice(0, 3).map((project, index) => {
          const layout = cardLayouts[index]

          return (
            <article
              key={project.id}
              className="absolute left-1/2 top-1/2 flex h-80 w-96 flex-col justify-between border-2 border-white p-8 text-white"
              style={{
                transform: `translate(-50%, -50%) translateX(${layout.x}) scale(${layout.scale}) rotate(${layout.rotate}deg)`,
                zIndex: layout.zIndex,
                backgroundColor: layout.backgroundColor,
              }}
            >
              <h2>{project.title}</h2>
              <p>{project.description}</p>
            </article>
          )
        })}
      </div>
    </div>

    {/* Bottom part of the screen for the carousel controls area*/}
    <div className="flex h-[15%] items-end justify-center gap-8 pb-3">
      <button
        type="button"
        style={{ cursor: 'pointer' }}
        className="rounded-full border-2 px-4 py-2 text-sm md:text-base lg:text-lg"
        onClick={showPreviousProject}
      >
        ←
      </button>

      <button
        type="button"
        style={{ cursor: 'pointer' }}
        className="rounded-full border-2 px-4 py-2 text-sm md:text-base lg:text-lg"
        onClick={showNextProject}
      >
        →
      </button>
    </div>

  </div>
)
}

export default Carousel