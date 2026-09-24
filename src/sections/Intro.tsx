import { introSkills } from '../content/introSkills'
import { motion, useReducedMotion } from 'framer-motion'
import PhysicsSkillBox from '../components/PhysicsSkillBox'

const Intro = () => {
  const reduceMotion = useReducedMotion()

  const colors = [
    '#f43f5e', // pink-red
    '#fb923c', // orange
    '#facc15', // yellow
    '#4ade80', // green
    '#22d3ee', // cyan
    '#818cf8', // indigo
    '#e879f9', // purple-pink
  ]

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
              Hi, I’m{' '}
              <span className="inline-block whitespace-nowrap">
                <span className="sr-only">Georgia</span>
                <span aria-hidden="true">
                  {'Georgia'.split('').map((letter, index) => (
                    <motion.span
                      key={index}
                      animate={{ y: reduceMotion ? 0 : [0, -12, 0] }}
                      transition={{
                        duration: 1,
                        repeat: reduceMotion ? 0 : Infinity,
                        repeatDelay: 0.3,
                        delay: index * 0.15,
                        ease: 'easeInOut',
                      }}
                      style={{
                        color: colors[index],
                        textShadow: `0 4px 12px ${colors[index]}55`,
                        display: 'inline-block',
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>
              </span>
              !
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
        <div className="grid h-1/2 gap-8 pb-6 md:grid-cols-3 md:pb-10">
          {introSkills.map((category) => (
            <PhysicsSkillBox
              key={category.title}
              title={category.title}
              skills={category.skills}
            />
          ))}           
        </div>
      </div>
    </section>
  )
}

export default Intro
