import { Eye, MoveRight, Sparkles } from 'lucide-react'

const offers = [
  {
    title: "Government Documents",
    text: "Find out which documents and registrations you need at your stage of life.",
    pos: "md:top-[15%] md:left-[20%] md:translate-x-[30vw] md:translate-y-[25vh]",
  },
  {
    title: "Schemes and Benefits",
    text: "Discover government schemes you are eligible for, so you never miss out.",
    pos: "md:top-[15%] md:right-[20%] md:-translate-x-[30vw] md:translate-y-[25vh]",
  },
  {
    title: "Career Opportunities",
    text: "Get job suggestions that match the skills you already have.",
    pos: "md:bottom-[15%] md:left-[20%] md:translate-x-[30vw] md:-translate-y-[25vh]",
  },
  {
    title: "Financial Guidance",
    text: "Get simple tips on saving, loans, and planning your money.",
    pos: "md:bottom-[15%] md:right-[20%] md:-translate-x-[30vw] md:-translate-y-[25vh]",
  },
]

const About = () => {
  return (
    <div className="min-h-screen">

      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold text-blue-600 font-serif">
          Whatever Stage You're In,<br />You're Covered.
        </h1>

        <h3 className="mt-4 max-w-2xl text-lg md:text-2xl text-blue-600">
          At LifePath, we skip the confusion and give you clear, personal help for studies, work, money, and more.
        </h3>

        <button className="mt-8 flex items-center gap-2 text-base font-serif text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-xl">
          Let's Connect <MoveRight size={18} />
        </button>
      </section>

      <section className="bg-white px-6 py-24">
        <div className="max-w-6xl mx-auto flex flex-col gap-24">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="md:order-2 flex items-center justify-center gap-4">
              <div className="flex flex-col items-start">
                <h2 className="text-6xl md:text-8xl font-extrabold text-blue-600 leading-none">
                  WHO
                </h2>
                <h3 className="text-4xl md:text-5xl font-bold text-blue-950 leading-none mt-1 ml-2">
                  we are
                </h3>
              </div>
              <span
                className="text-[8rem] md:text-[11rem] font-extrabold leading-none text-transparent"
                style={{ WebkitTextStroke: '4px #2563eb' }}
              >
                ?
              </span>
            </div>

            <p className="border-l-4 border-transparent hover:border-blue-600 transition-colors duration-500 pl-6 text-lg md:text-xl text-gray-600 leading-relaxed text-left">
              LifePath is an AI-powered guide for every stage of life. Tell us where you are, and we recommend the documents, schemes, careers, and financial support that fit you best.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex items-center justify-center gap-4">
              <div className="flex flex-col items-center">
                <h2 className="text-6xl md:text-8xl font-extrabold text-blue-600 leading-none">
                  Our
                </h2>
                <h3 className="text-4xl md:text-5xl font-bold text-blue-950 leading-none mt-1">
                  Mission
                </h3>
              </div>
              <Sparkles size={80} className="text-blue-600" strokeWidth={1.5} />
            </div>

            <p className="border-l-4 border-transparent hover:border-blue-600 transition-colors duration-500 pl-6 text-lg md:text-xl text-gray-600 leading-relaxed text-left">
              To make life's big decisions simpler. LifePath uses AI to connect people to the right documents, opportunities, and support at the right time, so no one misses out because they did not know where to look.
            </p>
          </div>

        </div>
      </section>

      <section className="group relative min-h-screen flex flex-col md:flex-row items-center justify-center gap-5 px-5 py-16 md:p-0 overflow-hidden">

        <h2 className="text-4xl md:text-7xl font-black font-serif text-blue-600 text-center transition-transform duration-700 md:group-hover:scale-[0.9]">
          What We Offer
        </h2>

        {offers.map((item) => (
          <div
            key={item.title}
            
            className={`w-full md:w-72 p-6 bg-white rounded-2xl shadow-lg
              md:absolute md:opacity-0 md:scale-[0.3]
              transition-all duration-300 ease-out
              md:group-hover:opacity-100
              md:group-hover:translate-x-0
              md:group-hover:translate-y-0
              md:group-hover:scale-100
              ${item.pos}`}

          >
            <h3 className="text-xl font-bold text-blue-600">{item.title}</h3>
            <p className="mt-2 text-gray-600">{item.text}</p>
          </div>
        ))}
      </section>

      <section className="bg-blue-400 px-6 py-24 text-center">
        <div className="max-w-3xl mx-auto">
          <Eye size={56} className="mx-auto text-blue-200" strokeWidth={1.5} />

          <h2 className="mt-6 text-5xl md:text-7xl font-black font-serif text-white">
            Our Vision
          </h2>

          <p className="mt-6 text-lg md:text-2xl text-blue-100 leading-relaxed">
            A future where everyone, at every stage of life, knows their next step and has the right support to take it.
          </p>

          <button className="mt-10 mx-auto flex items-center gap-2 text-base font-serif text-blue-600 bg-white hover:bg-blue-50 py-2 px-5 rounded-xl transition-colors">
            Get Started <MoveRight size={18} />
          </button>
        </div>
      </section>

    </div>
  )
}

export default About