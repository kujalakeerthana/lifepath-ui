import { Link } from 'react-router-dom'
import { MoveRight } from 'lucide-react'
const section5how = () => {
  return (
    <div>
        <section className="bg-blue-400 px-6 py-24 text-center">
        <h2 className="text-4xl md:text-6xl font-black font-serif text-white">
          Ready to Take Your First Step?
        </h2>
        <p className="mt-4 text-lg md:text-xl text-blue-100">
          It takes a few minutes to find what fits you.
        </p>
        <Link to="/explore" className="inline-block mt-10">
          <span className="inline-flex items-center gap-2 text-base font-serif text-blue-600 bg-white hover:bg-blue-50 py-3 px-6 rounded-xl transition-colors">
            Get Started <MoveRight size={18} />
          </span>
        </Link>
      </section>
    </div>
  )
}

export default section5how