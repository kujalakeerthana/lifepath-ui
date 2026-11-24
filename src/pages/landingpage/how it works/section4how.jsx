import React from 'react'
import {Search, ListChecks, Link2, Rocket, } from 'lucide-react'
const after = [
  { icon: Search, title: 'Explore Your List', text: 'See a short list of opportunities picked for you.' },
  { icon: ListChecks, title: 'Check Eligibility', text: 'Read who can apply and what is needed before you start.' },
  { icon: Link2, title: 'Find Application Links', text: 'Go straight to the official website for each opportunity.' },
  { icon: Rocket, title: 'Apply with Confidence', text: 'Know your documents and deadlines, then take the step.' },
]
const section4how = () => {
  return (
    <div>
        <section className="bg-white px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-blue-600 text-center">
            What Happens After Recommendations?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 text-center">
            Your list is only the beginning. Here is how you move from ideas to action.
          </p>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
            {after.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="flex items-start gap-4 p-6 bg-blue-50 rounded-2xl shadow-md">
                  <Icon size={32} strokeWidth={1.5} className="shrink-0 text-blue-600" />
                  <div>
                    <h3 className="text-xl font-bold text-blue-950">{item.title}</h3>
                    <p className="mt-1 text-gray-600">{item.text}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default section4how