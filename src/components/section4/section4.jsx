import { MoveRight } from 'lucide-react'
import React from 'react'
const section4 = () => {
  return (
    <div className="h-[75vh] bg-blue-400">
      <h1 className="text-white text-5xl font-bold font-serif text-center pt-40">Ready to Discover What's Next?</h1>
      <p className=" text-white text-xl text-center pt-10">Every stage of life brings new opportunities and challenges. Let LifePath help you <br/>find the right resources, support, and guidance for your next step.</p>
      <button className="mt-10 mx-auto flex items-center gap-2 text-base font-serif text-blue-600 bg-white hover:bg-blue-50 py-2 px-5 rounded-xl transition-colors">
            Get Started <MoveRight size={18} />
          </button>
    </div>
  )
}

export default section4