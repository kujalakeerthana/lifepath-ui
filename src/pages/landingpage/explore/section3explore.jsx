import React from 'react'
import { GraduationCap, Briefcase, BookOpen, HeartPulse, Store, ArrowUpRight } from 'lucide-react'

const opportunities = [
  {
    icon: GraduationCap,
    category: 'Scholarship',
    name: 'National Scholarship Portal (NSP)',
    description: 'One portal for central government scholarships from school to PhD level.',
    eligibility: 'Depends on the scheme: course level, category and family income.',
    deadline: '-------',
  },
  {
    icon: Briefcase,
    category: 'Internship',
    name: 'PM Internship Scheme',
    description: 'Paid internships with partner companies, with a monthly stipend.',
    eligibility: 'Youth aged 18 to 25. Final-year UG and PG students can now apply.',
    deadline: '---------',
    
  },
  {
    icon: BookOpen,
    category: 'Free Course',
    name: 'SWAYAM Online Courses',
    description: 'Free government courses from school level to postgraduate, plus skill-based courses.',
    eligibility: 'Open to everyone. A certificate needs a paid proctored exam.',
    deadline: '----------',
  },
  {
    icon: HeartPulse,
    category: 'Welfare Scheme',
    name: 'Ayushman Bharat (PM-JAY)',
    description: 'Free hospital treatment up to Rs 5 lakh per family per year.',
    eligibility: 'Eligible families as per scheme criteria. Everyone aged 70+ is covered, whatever their income.',
    deadline: '----------',
  },
  {
    icon: Store,
    category: 'Business Support',
    name: 'PMEGP Loan and Subsidy',
    description: 'A subsidy of 15% to 35% on the project cost when you start a new small business.',
    eligibility: 'Anyone above 18. No income limit. One person per family.',
    deadline: '---------',
  },
]

const Opportunities = () => {
  return (
    <section className="bg-white px-6 py-24">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-4xl md:text-5xl font-bold font-serif text-blue-600 text-center">
          Opportunities Worth Exploring
        </h2>
        <p className="mt-4 text-lg text-gray-600 text-center">
          Real government programs, with details from official sources.
        </p>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opportunities.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.name}
                className="flex flex-col p-6 bg-blue-50 rounded-2xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <Icon size={28} strokeWidth={1.5} className="text-blue-600" />
                  <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                    {item.category}
                  </span>
                </div>

                <h3 className="mt-4 text-xl font-bold text-blue-950">{item.name}</h3>
                <p className="mt-2 text-gray-600">{item.description}</p>

                <p className="mt-4 text-sm text-gray-700">
                  <span className="font-semibold text-blue-950">Eligibility: </span>
                  {item.eligibility}
                </p>
                <p className="mt-2 text-sm text-gray-700">
                  <span className="font-semibold text-blue-950">Deadline: </span>
                  {item.deadline}
                </p>

                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto pt-6"
                >
                  <span className="inline-flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 font-serif py-2 px-4 rounded-xl transition-colors">
                    View Details <ArrowUpRight size={18} />
                  </span>
                </a>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default Opportunities 