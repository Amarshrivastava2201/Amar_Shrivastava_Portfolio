import { useState, useEffect, useContext } from 'react'
import { fetchProjects, deleteProject, createProject } from '../services/projectService'
import { AuthContext } from '../context/AuthContext'
import Modal from '../components/Modal'
import {  fetchCertifications, createCertification, deleteCertification} from '../services/certificationService'
import toast from 'react-hot-toast'
import { fetchContacts, deleteContact, markContactAsRead } from '../services/contactService'
import { useSearchParams } from 'react-router-dom'


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

  const [searchParams, setSearchParams] = useSearchParams()
  const currentTab = searchParams.get('tab') || 'projects'
  const changeTab = (tab) => {
    setSearchParams({ tab })
  }
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

const [certifications, setCertifications] = useState([])
const [certLoading, setCertLoading] = useState(false)
const [showCertModal, setShowCertModal] = useState(false)

const [certForm, setCertForm] = useState({
  title: '',
  issuingOrganization: '',
  issueDate: '',
  image: '' ,
  credentialId: '',
  credentialUrl: ''
})

const [contacts, setContacts] = useState([])
const [contactLoading, setContactLoading] = useState(false)

const [deleteTarget, setDeleteTarget] = useState(null)
const [deleteType, setDeleteType] = useState(null) 


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
        toast.success('Project deleted successfully')
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
      toast.success('Project created successfully 🚀')

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

const confirmDelete = async () => {
  try {
    if (deleteType === 'project') {
      await deleteProject(deleteTarget)
      setProjects(projects.filter(p => p._id !== deleteTarget))
      toast.success('Project deleted')
    }

    if (deleteType === 'certification') {
      await deleteCertification(deleteTarget)
      setCertifications(certifications.filter(c => c._id !== deleteTarget))
      toast.success('Certification deleted')
    }

    if (deleteType === 'contact') {
      await deleteContact(deleteTarget)
      setContacts(contacts.filter(c => c._id !== deleteTarget))
      toast.success('Message deleted')
    }
  } catch (error) {
    toast.error('Delete failed')
  } finally {
    setDeleteTarget(null)
    setDeleteType(null)
  }
}

useEffect(() => {
  if (currentTab  === 'certifications') {
    loadCertifications()
  }
}, [currentTab])

const loadCertifications = async () => {
  try {
    setCertLoading(true)
    const data = await fetchCertifications()
    setCertifications(data)
  } catch (error) {
    toast.error('Failed to load certifications')
  } finally {
    setCertLoading(false)
  }
}

const handleCertChange = (e) => {
  const { name, value } = e.target
  setCertForm({
    ...certForm,
    [name]: value
  })
}

const handleCreateCert = async (e) => {
  e.preventDefault()

  try {
    const newCert = await createCertification(certForm)

    setCertifications([newCert, ...certifications])

    toast.success('Certification added 🎓')

    setCertForm({
      title: '',
      issuingOrganization: '',
      issueDate: '',
      credentialId: '',
      credentialUrl: ''
    })

    setShowCertModal(false)
  } catch (error) {
    toast.error('Failed to create certification')
  }
}

const handleDeleteCert = async (id) => {
  try {
    await deleteCertification(id)
    setCertifications(certifications.filter(c => c._id !== id))
    toast.success('Certification deleted')
  } catch (error) {
    toast.error('Delete failed')
  }
}

useEffect(() => {
  if (currentTab  === 'messages') {
    loadContacts()
  }
}, [currentTab ])

const loadContacts = async () => {
  try {
    setContactLoading(true)
    const data = await fetchContacts()
    setContacts(data)
  } catch (error) {
    toast.error('Failed to load messages')
  } finally {
    setContactLoading(false)
  }
}

const handleDeleteContact = async (id) => {
  try {
    await deleteContact(id)
    setContacts(contacts.filter(c => c._id !== id))
    toast.success('Message deleted')
  } catch (error) {
    toast.error('Delete failed')
  }
}

const handleMarkAsRead = async (id) => {
  try {
    const updated = await markContactAsRead(id)

    setContacts(
      contacts.map((c) =>
        c._id === id ? updated : c
      )
    )

    toast.success('Marked as read')
  } catch (error) {
    toast.error('Failed to mark as read')
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
     onClick={() => changeTab('projects')}
      className={`flex items-center gap-3 w-full px-3 py-2 rounded ${
        currentTab  === 'projects'
          ? 'bg-primary text-white'
          : 'hover:bg-gray-200 dark:hover:bg-gray-700'
      }`}
    >
      <ProjectsIcon />
      {!collapsed && <span>Projects</span>}
    </button>

    {/* Certifications */}
    <button
      onClick={() => changeTab('certifications')}
      className={`flex items-center gap-3 w-full px-3 py-2 rounded ${
        currentTab  === 'certifications'
          ? 'bg-primary text-white'
          : 'hover:bg-gray-200 dark:hover:bg-gray-700'
      }`}
    >
      <CertificateIcon />
      {!collapsed && <span>Certifications</span>}
    </button>

    {/* Messages */}
    <button
      onClick={() => changeTab('messages')}
      className={`flex items-center gap-3 w-full px-3 py-2 rounded ${
        currentTab  === 'messages'
          ? 'bg-primary text-white'
          : 'hover:bg-gray-200 dark:hover:bg-gray-700'
      }`}
    >
      <div className="relative flex items-center gap-3">
  <MessageIcon />

  {!collapsed && <span>Messages</span>}

  {contacts.filter(c => !c.isRead).length > 0 && (
    <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
      {contacts.filter(c => !c.isRead).length}
    </span>
  )}
</div>
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
        {currentTab  === 'projects' && (
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

<Modal
  isOpen={!!deleteTarget}
  onClose={() => {
    setDeleteTarget(null)
    setDeleteType(null)
  }}
>
  <h2 className="text-xl font-bold mb-4">
    Confirm Delete
  </h2>

  <p className="mb-6 text-gray-600 dark:text-gray-300">
    Are you sure you want to delete this item? This action cannot be undone.
  </p>

  <div className="flex justify-end gap-4">
    <button
      onClick={() => {
        setDeleteTarget(null)
        setDeleteType(null)
      }}
      className="px-4 py-2 border rounded"
    >
      Cancel
    </button>

    <button
      onClick={confirmDelete}
      className="px-4 py-2 bg-red-500 text-white rounded"
    >
      Delete
    </button>
  </div>
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
                      onClick={() => {
  setDeleteTarget(project._id)
  setDeleteType('project')
}}
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

       {currentTab  === 'certifications' && (
  <>
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Certifications</h1>

      <button
        onClick={() => setShowCertModal(true)}
        className="px-4 py-2 bg-primary text-white rounded"
      >
        Add Certification
      </button>
    </div>

    {certLoading ? (
      <p>Loading...</p>
    ) : (
      <div className="space-y-4">
        {certifications.map((cert) => (
          <div
            key={cert._id}
            className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow border dark:border-gray-700 flex justify-between"
          >
            <div>
              <h3 className="font-semibold text-lg">
                {cert.title}
              </h3>
              <p className="text-sm text-gray-500">
                {cert.issuingOrganization}
              </p>
              <p className="text-sm text-gray-400">
                {new Date(cert.issueDate).toLocaleDateString()}
              </p>
            </div>

            <button
              onClick={() => {
  setDeleteTarget(cert._id)
  setDeleteType('certification')
}}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    )}

    <Modal isOpen={showCertModal} onClose={() => setShowCertModal(false)}>
      <h2 className="text-2xl font-bold mb-6">Add Certification</h2>

      <form onSubmit={handleCreateCert} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={certForm.title}
          onChange={handleCertChange}
          className="w-full p-3 rounded border dark:bg-gray-900"
          required
        />

        <input
          type="text"
          name="issuingOrganization"
          placeholder="Issuing Organization"
          value={certForm.issuingOrganization}
          onChange={handleCertChange}
          className="w-full p-3 rounded border dark:bg-gray-900"
          required
        />

        <input
          type="date"
          name="issueDate"
          value={certForm.issueDate}
          onChange={handleCertChange}
          className="w-full p-3 rounded border dark:bg-gray-900"
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL (optional)"
          value={certForm.image}
          onChange={handleCertChange}
          className="w-full p-3 rounded border dark:bg-gray-900"
        />

        <input
          type="text"
          name="credentialId"
          placeholder="Credential ID"
          value={certForm.credentialId}
          onChange={handleCertChange}
          className="w-full p-3 rounded border dark:bg-gray-900"
        />

        <input
          type="text"
          name="credentialUrl"
          placeholder="Credential URL"
          value={certForm.credentialUrl}
          onChange={handleCertChange}
          className="w-full p-3 rounded border dark:bg-gray-900"
        />

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => setShowCertModal(false)}
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
    <Modal
  isOpen={!!deleteTarget}
  onClose={() => {
    setDeleteTarget(null)
    setDeleteType(null)
  }}
>
  <h2 className="text-xl font-bold mb-4">
    Confirm Delete
  </h2>

  <p className="mb-6 text-gray-600 dark:text-gray-300">
    Are you sure you want to delete this item? This action cannot be undone.
  </p>

  <div className="flex justify-end gap-4">
    <button
      onClick={() => {
        setDeleteTarget(null)
        setDeleteType(null)
      }}
      className="px-4 py-2 border rounded"
    >
      Cancel
    </button>

    <button
      onClick={confirmDelete}
      className="px-4 py-2 bg-red-500 text-white rounded"
    >
      Delete
    </button>
  </div>
</Modal>
  </>
)}

        {currentTab  === 'messages' && (
  <>
    <h1 className="text-3xl font-bold mb-6">Messages</h1>

    {contactLoading ? (
      <p>Loading...</p>
    ) : (
      <div className="space-y-6">
        {contacts.map((contact) => (
          <div
            key={contact._id}
            className={`p-6 rounded-xl shadow border dark:border-gray-700 ${
  !contact.isRead
    ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-400'
    : 'bg-white dark:bg-gray-800'
}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">
                  {contact.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {contact.email}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  {new Date(contact.createdAt).toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => {
                setDeleteTarget(contact._id)
                 setDeleteType('contact')
                  }}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>

              {!contact.isRead && (
                 <button
                 onClick={() => handleMarkAsRead(contact._id)}
                 className="ml-2 px-3 py-1 bg-primary text-white rounded"
               >
               Mark as Read
               </button>
              )}

              <Modal
  isOpen={!!deleteTarget}
  onClose={() => {
    setDeleteTarget(null)
    setDeleteType(null)
  }}
>
  <h2 className="text-xl font-bold mb-4">
    Confirm Delete
  </h2>

  <p className="mb-6 text-gray-600 dark:text-gray-300">
    Are you sure you want to delete this item? This action cannot be undone.
  </p>

  <div className="flex justify-end gap-4">
    <button
      onClick={() => {
        setDeleteTarget(null)
        setDeleteType(null)
      }}
      className="px-4 py-2 border rounded"
    >
      Cancel
    </button>

    <button
      onClick={confirmDelete}
      className="px-4 py-2 bg-red-500 text-white rounded"
    >
      Delete
    </button>
  </div>
</Modal>
            </div>

            <p className="mt-4 text-gray-700 dark:text-gray-300">
              {contact.message}
            </p>
          </div>
        ))}
      </div>
    )}
  </>
)}
      </div>
    </div>
  )
}

export default AdminDashboard