import { useEffect, useState } from 'react'
import { fetchCertifications } from '../services/certificationService'

const Certifications = () => {
  const [certifications, setCertifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCertifications = async () => {
      try {
        const data = await fetchCertifications()
        setCertifications(data)
      } catch (error) {
        console.error('Failed to fetch certifications')
      } finally {
        setLoading(false)
      }
    }

    loadCertifications()
  }, [])

  if (loading) {
    return (
      <div className="text-center py-20">
        <p className="text-lg">Loading certifications...</p>
      </div>
    )
  }

  return (
  <div className="py-16">
    <h2 className="text-3xl font-bold mb-10 text-primary text-center">
      Certifications
    </h2>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {certifications.map((cert) => (
        <div
  key={cert._id}
  className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-900"
>

  {/* Image */}
  {cert.image && (
    <img
      src={cert.image}
      alt={cert.title}
      className="w-full h-40 object-cover rounded-xl mb-4"
    />
  )}

  <h3 className="text-xl font-semibold mb-3">
    {cert.title}
  </h3>

  <span className="inline-block px-3 py-1 text-sm rounded-full bg-primary/10 text-primary mb-4">
    {cert.issuingOrganization}
  </span>

  <div className="mb-4">
    <span className="inline-block px-3 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
      Issued {new Date(cert.issueDate).toLocaleDateString()}
    </span>
  </div>

  {cert.credentialUrl && (
    <a
      href={cert.credentialUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block mt-2 text-sm text-primary hover:underline"
    >
      View Credential →
    </a>
  )}
</div>
      ))}
    </div>
  </div>
)
}

export default Certifications