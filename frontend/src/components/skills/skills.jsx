const skillCategories = [
  {
    category: "Frontend",
    skills: ["React", "JavaScript", "HTML", "CSS", "Tailwind", "Vite"]
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express", "Java", "REST APIs"]
  },
  {
    category: "DevOps",
    skills: ["Docker", "AWS", "CI/CD"]
  },
  {
    category: "Database",
    skills: ["MongoDB", "MySQL"]
  },
  {
    category: "Tools",
    skills: ["Git", "Postman", "VS Code"]
  }
]

const Skills = () => {
  return (
    <section className="py-24 bg-gray-50 dark:bg-slate-950">
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
              className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md hover:scale-[1.02] transition"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                {category.category}
              </h3>

              <div className="flex flex-wrap gap-3">

                {category.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-sm rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300"
                  >
                    {skill}
                  </span>
                ))}

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  )
}

export default Skills