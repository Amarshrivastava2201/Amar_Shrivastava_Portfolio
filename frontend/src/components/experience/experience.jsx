import useReveal from "../../hooks/useReveal"



const experiences = [
  {
    date: "Feb 2022 – Present",
    title: "Freelance Developer",
    points: [
      "Building scalable web applications",
      "Designing clean frontend architectures",
      "Integrating APIs and backend services",
      "Optimizing performance and user experience"
    ]
  },
  {
    date: "June 2022 – June 2023",
    title: "Tech Mahindra",
    points: [
      "Worked on enterprise application development",
      "Integrated backend services and APIs",
      "Improved application performance",
      "Collaborated with cross-functional teams"
    ]
  }
]

const Experience = () => {
    const { ref, isVisible } = useReveal()
  return (
   <section ref={ref} className={`py-24 bg-white dark:bg-slate-900 transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
>
      <div className="max-w-6xl mx-auto px-6">

        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-20 text-center">
          Experience! Says it all!!
        </h2>

        <div className="relative">

          {/* Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gray-200 dark:bg-gray-700 transform -translate-x-1/2" />

          <div className="space-y-20">

            {experiences.map((exp, index) => {

              const isLeft = index % 2 === 0

              return (
                <div key={index} className={`grid md:grid-cols-2 gap-8 items-center transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                style={{ transitionDelay: `${index * 200}ms` }}
                >

                  {/* LEFT SIDE */}
                  <div className={`${isLeft ? "md:text-right md:pr-10" : "md:order-2 md:pl-10"}`}>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      {exp.date}
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      {exp.title}
                    </h3>

                    <ul className={`space-y-2 text-gray-600 dark:text-gray-400 ${isLeft ? "list-none" : "list-disc list-inside"}`}>
                      {exp.points.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>

                  {/* RIGHT SIDE EMPTY OR CONTENT */}
                  <div className={`${isLeft ? "md:order-2" : ""}`} />

                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2">
                    <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center shadow">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>

                </div>
              )
            })}

          </div>

        </div>
      </div>
    </section>
  )
}

export default Experience