import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-blue-700 text-blue-100 px-6 pt-16 pb-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h3 className="text-2xl font-bold font-serif text-white">LifePath</h3>
          <p className="mt-3 text-blue-200 leading-relaxed">
            AI-powered guidance for every stage of life.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-bold text-white">Quick Links</h4>
          <ul className="mt-3 flex flex-col gap-2">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
            <li><Link to="/explore" className="hover:text-white transition-colors">Explore</Link></li>
            <li><Link to="/how-it-works" className="hover:text-white transition-colors">How it works</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold text-white">Contact</h4>
          <a
            href="mailto:hello@lifepath.com"
            className="mt-3 flex items-center gap-2 hover:text-white transition-colors"
          >
            <Mail size={18} /> hello@lifepath.com
          </a>
        </div>

      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-blue-800 text-center text-sm text-blue-300">
        © {new Date().getFullYear()} LifePath. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer