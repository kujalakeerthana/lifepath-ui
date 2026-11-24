 import React from 'react'
 
 const Section2how = () => {
 const steps = [
  {
    no: '01',
    title: 'Create Your Profile',
    text: 'Enter basic information such as your age, education, occupation, location and interests.',
  },
  {
    no: '02',
    title: 'Tell Us Your Goals',
    text: 'Choose what you need help with, whether it is finding a job, learning new skills, financial assistance or government services.',
  },
  {
    no: '03',
    title: 'Get Personalized Recommendations',
    text: 'Our AI analyzes your profile and goals to suggest relevant opportunities, schemes, documents and resources.',
  },
  {
    no: '04',
    title: 'Take Your Next Step',
    text: 'Explore the recommendations, understand eligibility requirements, find application links and move forward with confidence.',
  },
]
return (
     <div>
 <section className=" px-6 py-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-blue-600 text-center">
            Four Simple Steps
          </h2>

          <ol className="mt-16 ml-6 border-l-2 border-dashed border-blue-300 space-y-12">
            {steps.map((step) => (
              <li key={step.no} className="relative ml-10">
                <span className="absolute -left-16 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
                  {step.no}
                </span>
                <div className="p-6 bg-blue-50 rounded-2xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <h3 className="text-xl font-bold text-blue-950">{step.title}</h3>
                  <p className="mt-2 text-gray-600">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      </div>
        )
 }
 

 export default Section2how