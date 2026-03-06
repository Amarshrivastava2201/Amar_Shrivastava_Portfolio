import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const roles = [
  "Frontend Engineer",
  "Backend Engineer",
  "Full Stack Engineer"
]

const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)

      setTimeout(() => {
        setCurrentRole((prev) => (prev + 1) % roles.length)
        setFade(true)
      }, 300)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="min-h-screen flex items-center bg-gray-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="max-w-2xl">

          {/* Name */}
          <p className="text-lg tracking-wide text-gray-500 dark:text-gray-400 mb-4 italic">
            Hey there!! It's Amar Shrivastava
          </p>

          {/* Animated Role */}
          <h1 className="text-6xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
            I am{" "}
            <span
              className={`text-indigo-600 dark:text-indigo-400 transition-all duration-300 ${
                fade ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
              } inline-block`}
            >
              {roles[currentRole]}
            </span>
          </h1>

          {/* Intro */}
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed italic">
             Turning ideas into scalable digital products using clean designs, high-performance APIs, immersive frontends, and production-ready full-stack engineering.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-4">
            <Link
              to="/projects"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-sm hover:shadow-md hover:bg-indigo-700 transition"
            >
              View Projects
            </Link>

            <Link
              to="/contact"
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              Contact Me
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Hero