
import { useEffect, useState } from 'react'
import { fetchProjects } from '../services/projectService'
import ProjectCard from '../components/projects/ProjectCard.jsx'

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects()
        setProjects(data)
      } catch (error) {
        console.error('Failed to fetch projects')
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  if (loading) {
    return (
      <div className="text-center py-20">
        <p className="text-lg">Loading projects...</p>
      </div>
    )
  }

  return (
    <div className="py-16">
      <h2 className="text-3xl font-bold mb-8 text-primary">Projects</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project) => (
  <ProjectCard key={project._id} project={project} />
))}
         
      </div>
    </div>
  )
}

export default Projects