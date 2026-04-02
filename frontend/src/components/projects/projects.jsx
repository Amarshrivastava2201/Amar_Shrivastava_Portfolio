import { useEffect, useState } from "react"
import { fetchProjects } from "../../services/projectService"
import ProjectCard from "./ProjectCard"

const Projects = () => {

  const [selectedProject, setSelectedProject] = useState(null)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects()
        setProjects(data)
      } catch (error) {
        console.error("Failed to load projects")
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  const openProject = (project) => {
  setSelectedProject(project)
}

const closeProject = () => {
  setSelectedProject(null)
}

  return (
    <section className="py-24 bg-gray-50 dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-6">

        {/* Title */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Featured Projects
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mt-3 max-w-xl">
            A collection of projects demonstrating scalable architecture, performance optimization, and modern full-stack development practices.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-gray-500">Loading projects...</p>
        )}

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {projects.map((project) => (
             <ProjectCard key={project._id} project={project} />
            ))}
</div>

        {selectedProject && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center overflow-y-auto z-50 px-4">
    
    <div className="bg-white dark:bg-slate-900 rounded-xl max-w-2xl w-full p-8 relative">

      {/* Close Button */}
      <button
        onClick={closeProject}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>

      {/* Image */}
      {selectedProject.image && (
        <img
          src={selectedProject.image}
          alt={selectedProject.title}
          className="w-full h-56 object-cover rounded-lg mb-6"
        />
      )}

      {/* Title */}
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        {selectedProject.title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
        {selectedProject.description}
      </p>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mb-6">
        {selectedProject.techStack?.map((tech, index) => (
          <span
            key={index}
            className="text-xs px-2 py-1 bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300 rounded"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-4">

        {selectedProject.liveUrl && (
          <a
            href={selectedProject.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Live Demo
          </a>
        )}

        {selectedProject.githubUrl && (
          <a
            href={selectedProject.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border rounded"
          >
            GitHub
          </a>
        )}

      </div>

    </div>

  </div>
)}

      </div>
    </section>
  )
}

export default Projects