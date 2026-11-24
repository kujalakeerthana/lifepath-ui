import React from 'react'
import Section2how from './section2how'
import Section3how from './section3how'
import Section4how from './section4how'
import Section5how from './section5how'
const Howitwork = () => {
  return (
    <>
    <div>
    <section className=" px-6 py-24 min-h-[80vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold font-serif text-blue-600">
          Your Journey, Made Simple.
        </h1>
        <p className="mt-6 max-w-3xl text-lg md:text-xl text-gray-600 leading-relaxed">
          Getting the right guidance shouldn't be complicated. LifePath makes it easier to discover relevant opportunities, access essential services and plan your next steps with personalized AI-powered assistance.
        </p>
      </section>
    </div>
    <div><Section2how /></div>
    <div><Section3how /></div>
    <div><Section4how /></div>
    <div><Section5how /></div>

    </>
  )
}

export default Howitwork