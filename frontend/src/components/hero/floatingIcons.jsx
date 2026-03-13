import { useEffect, useRef } from "react"

import { FaReact, FaNodeJs, FaDocker } from "react-icons/fa"
import { SiMongodb, SiJavascript, SiTailwindcss } from "react-icons/si"

const FloatingIcons = () => {

  const containerRef = useRef(null)

  useEffect(() => {

    const handleMouseMove = (e) => {

      const icons = containerRef.current.querySelectorAll(".floating-icon")

      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight

      icons.forEach((icon, index) => {

        const speed = (index + 1) * 10

        const moveX = (x - 0.5) * speed
        const moveY = (y - 0.5) * speed

        icon.style.transform = `translate(${moveX}px, ${moveY}px)`
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => window.removeEventListener("mousemove", handleMouseMove)

  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >

      <FaReact className="floating-icon absolute text-sky-400 text-5xl top-20 left-16 opacity-30 animate-drift1 transition-transform duration-300" />

      <FaNodeJs className="floating-icon absolute text-green-500 text-5xl bottom-24 left-20 opacity-30 animate-drift2 transition-transform duration-300" />

      <SiMongodb className="floating-icon absolute text-green-400 text-5xl top-28 right-20 opacity-30 animate-drift3 transition-transform duration-300" />

      <SiJavascript className="floating-icon absolute text-yellow-400 text-5xl bottom-16 right-16 opacity-30 animate-drift4 transition-transform duration-300" />

      <SiTailwindcss className="floating-icon absolute text-cyan-400 text-5xl top-1/2 left-1/3 opacity-30 animate-drift2 transition-transform duration-300" />

      <FaDocker className="floating-icon absolute text-blue-400 text-5xl top-1/3 right-1/4 opacity-30 animate-drift3 transition-transform duration-300" />

    </div>
  )
}

export default FloatingIcons