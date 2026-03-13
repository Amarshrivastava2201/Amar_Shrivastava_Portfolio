import { useEffect, useRef, useState } from "react"

import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaDocker,
  FaAws,
  FaCodeBranch
} from "react-icons/fa"

import {
  SiJavascript,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiVite,
  SiMongodb,
  SiMysql,
  SiExpress,
  SiPostman
} from "react-icons/si"

const skillCategories = [
  {
    category: "Frontend",
    skills: [
      { name: "React", icon: FaReact, color: "text-sky-400" },
      { name: "JavaScript", icon: SiJavascript, color: "text-yellow-400" },
      { name: "HTML", icon: SiHtml5, color: "text-orange-500" },
      { name: "CSS", icon: SiCss, color: "text-blue-500" },
      { name: "Tailwind", icon: SiTailwindcss, color: "text-cyan-400" },
      { name: "Vite", icon: SiVite, color: "text-purple-400" }
    ]
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", icon: FaNodeJs, color: "text-green-500" },
      { name: "Express", icon: SiExpress, color: "text-gray-400" },
      { name: "REST APIs", icon: FaCodeBranch, color: "text-indigo-400" }
    ]
  },
  {
    category: "DevOps",
    skills: [
      { name: "Docker", icon: FaDocker, color: "text-blue-400" },
      { name: "AWS", icon: FaAws, color: "text-orange-400" },
      { name: "CI/CD", icon: FaCodeBranch, color: "text-indigo-400" }
    ]
  },
  {
    category: "Database",
    skills: [
      { name: "MongoDB", icon: SiMongodb, color: "text-green-500" },
      { name: "MySQL", icon: SiMysql, color: "text-blue-500" }
    ]
  },
  {
    category: "Tools",
    skills: [
      { name: "Git", icon: FaGitAlt, color: "text-orange-500" },
      { name: "Postman", icon: SiPostman, color: "text-orange-400" },
      { name: "VS Code", icon: SiHtml5, color: "text-blue-400" }
    ]
  }
]

const Skills = () => {

  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()

  }, [])

  return (
    <section
      ref={sectionRef}
      className={`py-24 bg-gray-50 dark:bg-slate-950 transition-all duration-700
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* Section Title */}
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-16">
          Technical Skills
        </h2>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

          {skillCategories.map((category, index) => (

            <div
              key={index}
              className="p-8 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-lg transition"
            >

              {/* Category Title */}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                {category.category}
              </h3>

              {/* Skills Grid */}
              <div className="grid grid-cols-3 gap-6">

                {category.skills.map((skill, i) => {

                  const Icon = skill.icon

                  return (
                    <div
                      key={i}
                      className="group flex flex-col items-center justify-center gap-2 p-4 rounded-lg
                      bg-gray-100 dark:bg-slate-800
                      hover:-translate-y-2 hover:shadow-lg
                      transition-all duration-300"
                    >

                      <Icon
                        className={`text-4xl ${skill.color}
                        transition-all duration-300
                        group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]`}
                      />

                      <span className="text-sm text-gray-700 dark:text-gray-300 text-center">
                        {skill.name}
                      </span>

                    </div>
                  )

                })}

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  )
}

export default Skills