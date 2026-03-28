const About = () => {
  return (
    <section 
      id="about"
      className="h-screen snap-start p-6 md:p-10"
    >
      <div className="relative h-full w-full bg-green-500/10">
        <button
          style={{ cursor: 'pointer' }}
          className="absolute top-10 left-10 rounded-xl bg-pink-300 px-4 py-2 text-sm font-semibold text-black shadow-md"
        >
          Music
        </button>

        <div className="flex h-full items-center justify-center">
          <div className="bg-blue-500/20 text-center">
            <h2 className="text-3xl font-bold leading-tight md:text-5xl">
              The more you click around,
              <br />
              the more you find out!
            </h2>
          </div>
        </div>

      </div>
    </section>
  )
}

export default About