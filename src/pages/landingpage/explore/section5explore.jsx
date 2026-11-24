import React from 'react'
import { Link } from 'react-router-dom'
import { Cake, GraduationCap, Briefcase, Target, Sparkles, MoveRight } from 'lucide-react'

const inputs = [
  { icon: Cake, label: 'Age', text: 'Shows schemes and options for your stage of life.' },
  { icon: GraduationCap, label: 'Education', text: 'Matches studies, scholarships and jobs to what you have completed.' },
  { icon: Briefcase, label: 'Occupation', text: 'Finds support for your work, your skills and your income.' },
  { icon: Target, label: 'Goals', text: 'Points you toward the next step you actually want.' },
]

const Personalized = () => {
  return (
    <section>

      {/* Part 1: Personalized Recommendations */}
      <div className="px-6 py-24">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-4xl md:text-5xl font-bold font-serif text-blue-600 text-center">
            The Right Opportunities, Just for You.
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 text-center leading-relaxed">
            Tell us a few simple things about yourself. Our AI reads your answers and picks the schemes, jobs and support that fit you, so you do not have to search through everything.
          </p>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {inputs.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="p-6 bg-blue-50 rounded-2xl shadow-md text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <Icon size={36} strokeWidth={1.5} className="mx-auto text-blue-600" />
                  <h3 className="mt-4 text-xl font-bold text-blue-950">{item.label}</h3>
                  <p className="mt-2 text-gray-600">{item.text}</p>
                </div>
              )
            })}
          </div>

          <div className="mt-10 flex flex-col items-center gap-3">
            <Sparkles size={40} strokeWidth={1.5} className="text-blue-600" />
            <p className="max-w-xl text-center text-lg text-blue-950 font-semibold">
              Your answers go in. A short list of opportunities made for you comes out.
            </p>
          </div>

        </div>
      </div>

      {/* Part 2: Call to Action */}
      <div className="bg-blue-400 px-6 py-24 text-center">
        <h2 className="text-4xl md:text-6xl font-black font-serif text-white">
          Your Next Chapter Starts Here.
        </h2>

        <Link to="/explore" className="inline-block mt-10">
          <span className="inline-flex items-center gap-2 text-base font-serif text-blue-600 bg-white hover:bg-blue-50 py-3 px-6 rounded-xl transition-colors">
            Get Started <MoveRight size={18} />
          </span>
        </Link>
      </div>

    </section>
  )
}

export default Personalized