const Intro = () => {
  return (
    <section
      id="intro"
      className="h-screen snap-start px-6 md:px-10"
    >
      <div className="flex h-full flex-col">
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

        <div className="h-1/2" />

      </div>
    </section>
  )
}

export default Intro
