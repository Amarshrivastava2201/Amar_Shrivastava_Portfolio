const services = [
  {
    title: "Frontend Development",
    description: "Responsive, accessible, high-performance interfaces using modern frameworks."
  },
  {
    title: "Backend Development",
    description: "Robust APIs and scalable server architectures built for reliability."
  },
  {
    title: "Full Stack Applications",
    description: "End-to-end solutions integrating frontend, backend, and database systems."
  },
  {
    title: "API Integration",
    description: "Secure third-party integrations with optimized data flow."
  },
  {
    title: "Performance Optimization",
    description: "Improving load times, rendering efficiency, and scalability."
  },
  {
    title: "DevOps Deployment",
    description: "CI/CD pipelines, cloud deployment, and production-ready systems."
  }
]

const ServicesAbout = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="grid md:grid-cols-2 gap-16">

          {/* LEFT — Services */}
          <div>
            <h2 className="text-3xl font-bold mb-10 text-gray-900 dark:text-white">
              Services I Provide
            </h2>

            <div className="space-y-8">
              {services.map((service, index) => (
                <div key={index} className="group">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2 group-hover:text-indigo-600 transition">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — About */}
          <div>
            <h2 className="text-3xl font-bold mb-10 text-gray-900 dark:text-white">
              About Me
            </h2>

            <div className="space-y-6 text-gray-600 dark:text-gray-400 leading-relaxed">
              <p>
                My journey into engineering began with curiosity and evolved into building scalable systems that solve real-world problems.
              </p>

              <p>
                I focus on writing clean, maintainable architecture that balances performance with usability. Every solution I design is built with long-term scalability, clarity, and user impact in mind.
              </p>

              <p>
                Whether developing frontend interfaces, backend systems, or full-stack applications, I approach every challenge with structured thinking and engineering discipline.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default ServicesAbout