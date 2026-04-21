import { useState } from 'react'
import { introSkills } from '../content/introSkills'

const Intro = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  return (
    <section
      id="intro"
      className="h-screen snap-start px-6 md:px-10"
    >
      <div className="flex h-full flex-col">

        {/* Intro text on top half of the screen */}
        <div className="flex h-1/2 items-center justify-center">
          <div className="max-w-6xl text-center">
            <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">
              Hi, I’m Georgia!
            </h1>

            <p className="mt-5 text-base leading-relaxed md:text-lg lg:text-2xl">
              I’m a software developer who loves the entire journey of bringing
              ideas to life, 
              <br />
              from the first design wireframe to the final line
              of code. 
              <br />
              Whether I'm working on web or mobile apps, I enjoy being
              a part of the whole process, 
              <br />
              testing with users, refining designs
              and building products that people enjoy using.
            </p>
          </div>
        </div>

        {/* 3-box grid for skill categories on bottom half of the screen */}
        <div className="grid h-1/2 gap-4 pb-6 md:grid-cols-3 md:pb-10">
          {introSkills.map((category) => (
            <div
              key={category.title}
              className="relative overflow-hidden border"
            >
              {/* Category Button */}
              <button
                type="button"
                style={{ cursor: 'pointer' }}
                className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full border-2 px-4 py-2 text-sm md:text-base"
                onClick={() => setActiveCategory(category.title)}
              >
                {category.title}
              </button>

              {/* Skills that drop in each category */}
              {activeCategory === category.title && (
                <div className="absolute inset-0">
                  {category.skills.map((skill, index) => (
                    <span
                      key={skill}
                      className="absolute rounded-full border-2 px-4 py-2 text-base"
                      style={{
                        left: `${20 + index * 18}px`,
                        top: `${20 + index * 42}px`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}

            </div>
          ))}          
        </div>
      </div>
    </section>
  )
}

export default Intro
