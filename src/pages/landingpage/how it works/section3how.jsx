import React from 'react'
import { Cake, GraduationCap, Briefcase, MapPin, Heart, Target } from 'lucide-react'

const signals = [
  { icon: Cake, label: 'Age', text: 'Shows options that suit your stage of life.' },
  { icon: GraduationCap, label: 'Education', text: 'Matches studies, scholarships and jobs to what you have completed.' },
  { icon: Briefcase, label: 'Occupation', text: 'Finds support for your work, skills and income.' },
  { icon: MapPin, label: 'Location', text: 'Brings up schemes and opportunities available near you.' },
  { icon: Heart, label: 'Interests', text: 'Keeps suggestions close to what you enjoy.' },
  { icon: Target, label: 'Goals', text: 'Points you toward the next step you actually want.' },
]
const section3how = () => {
  return (
    <div>
         <section className=" px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-blue-600 text-center">
            How LifePath Understands You
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 text-center">
            We use only the details you share to match you with the right opportunities.
          </p>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {signals.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="p-6 bg-white rounded-2xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <Icon size={36} strokeWidth={1.5} className="text-blue-600" />
                  <h3 className="mt-4 text-xl font-bold text-blue-950">{item.label}</h3>
                  <p className="mt-2 text-gray-600">{item.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default section3how