import React, { useState } from 'react'
import { Briefcase, GraduationCap, Wallet, Landmark, FileText, MoveRight } from 'lucide-react'
import Opportunities from './section3explore'
import LifeStages from './section4explore'
import Personalized from './section5explore'
const options = [
  { id: 'job', label: 'I want to find a job', icon: Briefcase },
  { id: 'studies', label: 'I want to know about higher studies', icon: GraduationCap },
  { id: 'finance', label: 'I need financial assistance', icon: Wallet },
  { id: 'schemes', label: 'I want to apply for government schemes', icon: Landmark },
  { id: 'documents', label: 'I need help with documents', icon: FileText },
]
const explore = () => {
  const [selected, setSelected] = useState(null)

  return (
    <>
    {/* section1 */}
    <div className=' ml-18 mt-7 min-h-screen'>
        <div className='flex flex-col-1'>
        <div className='w-1/2 min-h-screen'> 
            <h1 className=' pt-50 pl-5 text-6xl text-blue-600 font-serif'>Discover Opportunities <br /> That Move You Forward.</h1>
            <p className='font-serif text-xl pt-4 pl-5 text-gray-600'>Explore opportunities, government services, educational resources and financial guidance designed around your needs. Whatever your background or stage of life, find the right direction with LifePath.</p>
            <button className="mt-5 ml-5 flex gap-2 text-base font-serif text-white bg-blue-600 hover:bg-blue-50 hover:text-black py-2 px-5 rounded-xl transition-colors">
            Get Started <MoveRight size={18} />
            </button> 
        </div>
        <div className='w-1/2 mt-7 mr-10 h-auto'>
        <img className='pt-5' src="./explore1.png" alt="img" /></div> 
        </div>
    </div>

    {/*section2 */}
    <div className='min-h-screen px-6 py-24 flex flex-col items-center'>
      <h1 className="text-4xl md:text-6xl font-bold font-serif text-blue-600 text-center">
        What Are You Looking For?
      </h1>
      <p className="mt-4 text-lg md:text-xl text-gray-600 text-center">
        Pick one and we will guide you to the right next step.
      </p>

      <div className="mt-12 w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-5">
        {options.map((item) => {
          const Icon = item.icon
          const isSelected = selected === item.id

          return (
            <button
              key={item.id}
              onClick={() => setSelected(item.id)}
              className={`flex items-center gap-4 p-6 rounded-2xl text-left shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
                ${isSelected ? 'bg-blue-600 text-white' : 'bg-white text-blue-950'}`}
            >
              <Icon size={32} strokeWidth={1.5} className={isSelected ? 'text-white' : 'text-blue-600'} />
              <span className="text-lg font-semibold">{item.label}</span>
            </button>
          )
        })}
      </div>
        <button className="mt-10 flex items-center gap-2 text-base font-serif text-white bg-blue-600 hover:bg-blue-700 py-2 px-5 rounded-xl">
          Continue <MoveRight size={18} />
        </button>
      </div>
    <div className='min-h-screen'>
        <Opportunities/>
    </div>
    <div className='min-h-screen'>
        <LifeStages/>
    </div>
    <div className='min-h-screen'>
        <Personalized/>
    </div>
    </>
  )
}

export default explore