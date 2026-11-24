import { useState } from 'react'
import { GraduationCap, Search, Briefcase, Store, Users, HeartHandshake, Wrench } from 'lucide-react'

const stages = [
  {
    id: 'students',
    icon: GraduationCap,
    title: 'Students',
    text: 'Scholarships, higher studies and your first steps toward a career.',
    tags: ['Scholarships', 'Education loans', 'Internships'],
  },
  {
    id: 'jobseekers',
    icon: Search,
    title: 'Job Seekers',
    text: 'Find work that matches the skills you already have.',
    tags: ['Job openings', 'Resume help', 'Skill programs'],
  },
  {
    id: 'professionals',
    icon: Briefcase,
    title: 'Working Professionals',
    text: 'Grow your career and manage your money with confidence.',
    tags: ['Career growth', 'Tax and savings', 'Insurance'],
  },
  {
    id: 'entrepreneurs',
    icon: Store,
    title: 'Entrepreneurs',
    text: 'Start or grow a small business with the right support.',
    tags: ['Business loans', 'Subsidies', 'Registrations'],
  },
  {
    id: 'families',
    icon: Users,
    title: 'Families and Individuals',
    text: 'Documents, welfare schemes and benefits for your household.',
    tags: ['Welfare schemes', 'Health cover', 'Documents'],
  },
{
    id: 'skilled',
    icon: Wrench,
    title: 'Skilled Without a Degree',
    text: 'Find work based on what you can do, not on your certificates.',
    tags: ['Skill-based jobs', 'Work near you', 'Job schemes'],
},
  {
    id: 'seniors',
    icon: HeartHandshake,
    title: 'Senior Citizens',
    text: 'Health cover, pensions and support for a secure life.',
    tags: ['Health cover', 'Pensions', 'Senior benefits'],
  },
]

const LifeStages = () => {
  const [selected, setSelected] = useState(null)

  return (
    <section className="px-6 py-24">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-4xl md:text-5xl font-bold font-serif text-blue-600 text-center">
          Explore by Life Stage
        </h2>
        <p className="mt-4 text-lg text-gray-600 text-center">
          Choose where you are in life and see what fits you.
        </p>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stages.map((item) => {
            const Icon = item.icon
            const isSelected = selected === item.id

            return (
              <button
                key={item.id}
                onClick={() => setSelected(item.id)}
                className={`flex flex-col items-start text-left p-6 rounded-2xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
                  ${isSelected ? 'bg-blue-600 text-white' : 'bg-white text-blue-950'}`}
              >
                <Icon size={36} strokeWidth={1.5} className={isSelected ? 'text-white' : 'text-blue-600'} />

                <h3 className="mt-4 text-xl font-bold">{item.title}</h3>
                <p className={`mt-2 ${isSelected ? 'text-blue-100' : 'text-gray-600'}`}>{item.text}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs font-semibold px-3 py-1 rounded-full
                        ${isSelected ? 'bg-white text-blue-600' : 'bg-blue-50 text-blue-600'}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </button>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default LifeStages