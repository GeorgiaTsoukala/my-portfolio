import { introSkills } from '../content/introSkills'
import PhysicsSkillBox from '../components/PhysicsSkillBox'

const Intro = () => {

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
