import { useState, useEffect, useContext } from 'react'
import { fetchProjects, deleteProject, createProject } from '../services/projectService'
import { AuthContext } from '../context/AuthContext'
import Modal from '../components/Modal'
import toast from 'react-hot-toast'

const ProjectsIcon = () => (
  <svg fill="#000000" width="20px" height="20px" viewBox="0 -64 640 640" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M384 320H256c-17.67 0-32 14.33-32 32v128c0 17.67 14.33 32 32 32h128c17.67 0 32-14.33 32-32V352c0-17.67-14.33-32-32-32zM192 32c0-17.67-14.33-32-32-32H32C14.33 0 0 14.33 0 32v128c0 17.67 14.33 32 32 32h95.72l73.16 128.04C211.98 300.98 232.4 288 256 288h.28L192 175.51V128h224V64H192V32zM608 0H480c-17.67 0-32 14.33-32 32v128c0 17.67 14.33 32 32 32h128c17.67 0 32-14.33 32-32V32c0-17.67-14.33-32-32-32z"></path></g></svg>
)

const CertificateIcon = () => (
    <svg width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M23 1v18h-3v-1h2V2H2v16h8v1H1V1zm-7 2H8v1h8zm-2 3V5h-4v1zm-7 5H3v1h4zm0 2H3v1h4zm-4 3h2v-1H3zm14-3a2 2 0 1 1-2-2 2.002 2.002 0 0 1 2 2zm-1 0a1 1 0 1 0-1 1 1.001 1.001 0 0 0 1-1zm.002-4.293a.965.965 0 0 0 1.32.55 1.08 1.08 0 0 1 1.213.207 1.066 1.066 0 0 1 .21 1.21.966.966 0 0 0 .548 1.324 1.064 1.064 0 0 1 0 2.004.965.965 0 0 0-.549 1.323A1.05 1.05 0 0 1 18 16.816v7.046l-3-2.538-3 2.538v-7.046a1.05 1.05 0 0 1-.744-1.49.965.965 0 0 0-.549-1.324 1.064 1.064 0 0 1 0-2.004.966.966 0 0 0 .549-1.324 1.066 1.066 0 0 1 .209-1.21 1.08 1.08 0 0 1 1.212-.206.965.965 0 0 0 1.32-.551 1.064 1.064 0 0 1 2.005 0zm.998 13v-5.04a.93.93 0 0 0-.998.625 1.064 1.064 0 0 1-2.004 0 .93.93 0 0 0-.998-.625v5.039l2-1.692zm-1.94-4.749a1.967 1.967 0 0 1 1.853-1.308 2.12 2.12 0 0 1 .87.197l.058-.091a1.964 1.964 0 0 1 1.116-2.695v-.122a1.966 1.966 0 0 1-1.116-2.695l-.087-.084a1.965 1.965 0 0 1-2.694-1.117h-.12a1.965 1.965 0 0 1-2.694 1.117l-.087.084a1.966 1.966 0 0 1-1.116 2.695v.122a1.964 1.964 0 0 1 1.116 2.695l.058.09a2.12 2.12 0 0 1 .87-.196 1.967 1.967 0 0 1 1.853 1.308L15 17z"></path><path fill="none" d="M0 0h24v24H0z"></path></g></svg>    
)

const MessageIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M2 3h20v14H6l-4 4V3z" />
  </svg>
)

const LogoutIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M16 17l5-5-5-5v3H9v4h7v3zM4 4h8v4H4v8h8v4H4z" />
  </svg>
)

const AdminDashboard = () => {
  const { logout } = useContext(AuthContext)

  const [activeTab, setActiveTab] = useState('projects')
  const [collapsed, setCollapsed] = useState(false)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

const [formData, setFormData] = useState({
  title: '',
  description: '',
  techStack: '',
  liveUrl: '',
  githubUrl: '',
  featured: false
})


  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      const data = await fetchProjects()
      setProjects(data)
    } catch (error) {
      console.error('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteProject(id)
      setProjects(projects.filter((p) => p._id !== id))
    } catch (error) {
       toast.error('Delete failed')
    }
  }
  const handleChange = (e) => {
  const { name, value, type, checked } = e.target

  setFormData({
    ...formData,
    [name]: type === 'checkbox' ? checked : value
  })
}

const handleCreate = async (e) => {
  e.preventDefault()

  try {
    const projectData = {
      ...formData,
      techStack: formData.techStack
        .split(',')
        .map((tech) => tech.trim())
    }

    const newProject = await createProject(projectData)

    setProjects([newProject, ...projects])

    setFormData({
      title: '',
      description: '',
      techStack: '',
      liveUrl: '',
      githubUrl: '',
      featured: false
    })

    setShowForm(false)
  } catch (error) {
    toast.error('Failed to create project')
  }
}

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      
      {/* Sidebar */}
<div
  className={`${
    collapsed ? 'w-20' : 'w-64'
  } transition-all duration-300 bg-white dark:bg-gray-800 border-r dark:border-gray-700 p-4`}
>
  <div className="flex justify-between items-center mb-8">
    {!collapsed && (
      <h2 className="text-xl font-bold text-primary">
        Admin
      </h2>
    )}

    <button
      onClick={() => setCollapsed(!collapsed)}
      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
    >
      ☰
    </button>
  </div>

  <div className="space-y-4">

    {/* Projects */}
    <button
      onClick={() => setActiveTab('projects')}
      className={`flex items-center gap-3 w-full px-3 py-2 rounded ${
        activeTab === 'projects'
          ? 'bg-primary text-white'
          : 'hover:bg-gray-200 dark:hover:bg-gray-700'
      }`}
    >
      <ProjectsIcon />
      {!collapsed && <span>Projects</span>}
    </button>

    {/* Certifications */}
    <button
      onClick={() => setActiveTab('certifications')}
      className={`flex items-center gap-3 w-full px-3 py-2 rounded ${
        activeTab === 'certifications'
          ? 'bg-primary text-white'
          : 'hover:bg-gray-200 dark:hover:bg-gray-700'
      }`}
    >
      <CertificateIcon />
      {!collapsed && <span>Certifications</span>}
    </button>

    {/* Messages */}
    <button
      onClick={() => setActiveTab('messages')}
      className={`flex items-center gap-3 w-full px-3 py-2 rounded ${
        activeTab === 'messages'
          ? 'bg-primary text-white'
          : 'hover:bg-gray-200 dark:hover:bg-gray-700'
      }`}
    >
      <MessageIcon />
      {!collapsed && <span>Messages</span>}
    </button>

    {/* Logout */}
    <button
      onClick={logout}
      className="flex items-center gap-3 w-full px-3 py-2 rounded text-red-500 hover:bg-red-100 dark:hover:bg-red-900 mt-6"
    >
      <LogoutIcon />
      {!collapsed && <span>Logout</span>}
    </button>
  </div>
</div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        {activeTab === 'projects' && (
          <>
            <h1 className="text-3xl font-bold mb-6">Projects</h1>
            <div className="mb-6">
  <button
    onClick={() => setShowForm(true)}
    className="px-4 py-2 bg-primary text-white rounded hover:opacity-90"
  >
    {showForm ? 'Cancel' : 'Add Project'}
  </button>
  <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
  <h2 className="text-2xl font-bold mb-6">Add Project</h2>

  <form
    onSubmit={handleCreate}
    className="space-y-4"
  >
    <input
      type="text"
      name="title"
      placeholder="Title"
      value={formData.title}
      onChange={handleChange}
      className="w-full p-3 rounded border dark:bg-gray-900"
      required
    />

    <textarea
      name="description"
      placeholder="Description"
      value={formData.description}
      onChange={handleChange}
      className="w-full p-3 rounded border dark:bg-gray-900"
      required
    />

    <input
      type="text"
      name="techStack"
      placeholder="Tech Stack (comma separated)"
      value={formData.techStack}
      onChange={handleChange}
      className="w-full p-3 rounded border dark:bg-gray-900"
      required
    />

    <input
      type="text"
      name="liveUrl"
      placeholder="Live URL"
      value={formData.liveUrl}
      onChange={handleChange}
      className="w-full p-3 rounded border dark:bg-gray-900"
    />

    <input
      type="text"
      name="githubUrl"
      placeholder="GitHub URL"
      value={formData.githubUrl}
      onChange={handleChange}
      className="w-full p-3 rounded border dark:bg-gray-900"
    />

    <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        name="featured"
        checked={formData.featured}
        onChange={handleChange}
      />
      <span>Featured Project</span>
    </label>

    <div className="flex justify-end gap-4 pt-4">
      <button
        type="button"
        onClick={() => setShowForm(false)}
        className="px-4 py-2 border rounded"
      >
        Cancel
      </button>

      <button
        type="submit"
        className="px-6 py-2 bg-primary text-white rounded"
      >
        Create
      </button>
    </div>
  </form>
</Modal>
  
</div>


            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="space-y-4">
                {projects.map((project) => (
                  <div
                    key={project._id}
                    className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow border dark:border-gray-700 flex justify-between"
                  >
                    <div>
                      <h3 className="font-semibold text-lg">
                        {project.title}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {project.description}
                      </p>
                    </div>

                    <button
                      onClick={() => handleDelete(project._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'certifications' && (
          <>
            <h1 className="text-3xl font-bold mb-6">
              Certifications
            </h1>
            <p>Certification management coming next...</p>
          </>
        )}

        {activeTab === 'messages' && (
          <>
            <h1 className="text-3xl font-bold mb-6">
              Messages
            </h1>
            <p>Messages viewer coming next...</p>
          </>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard