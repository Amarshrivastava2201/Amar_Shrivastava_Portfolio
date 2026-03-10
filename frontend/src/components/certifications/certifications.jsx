import { useEffect, useState } from "react"
import { fetchCertifications } from "../../services/certificationService"

const Certifications = () => {

  const [certifications, setCertifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCertifications = async () => {
      try {
        const data = await fetchCertifications()
        setCertifications(data)
      } catch (error) {
        console.error("Failed to load certifications")
      } finally {
        setLoading(false)
      }
    }

    loadCertifications()
  }, [])

  return (
    <section className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-6">

        {/* Title */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Certifications
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mt-3 max-w-xl">
            Certifications that validate my expertise across modern technologies and industry best practices.
          </p>
        </div>

        {loading && (
          <p className="text-gray-500">Loading certifications...</p>
        )}

        {/* Certification Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {certifications.map((cert) => (

            <div
              key={cert._id}
              className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-slate-950 shadow-sm hover:shadow-md transition"
            >

              {/* Certificate Title */}
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {cert.title}
              </h3>

              {/* Issuer */}
              <p className="text-sm text-indigo-600 mb-2">
                {cert.issuingOrganization}
              </p>

              {/* Date */}
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Issued {new Date(cert.issueDate).toLocaleDateString()}
              </p>

              {/* Button */}
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-indigo-600 hover:underline"
                >
                  View Credential
                </a>
              )}

            </div>

          ))}

        </div>

      </div>
    </section>
  )
}

export default Certifications