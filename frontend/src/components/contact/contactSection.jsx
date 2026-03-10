import { useState } from "react"
import { sendMessage } from "../../services/contactService"

const ContactSection = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    setError("")
    setSuccess(false)

    try {

      await sendMessage(formData)

      setSuccess(true)

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      })

    } catch (err) {
      setError("Failed to send message. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-24 bg-gray-50 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-6">

        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Contact Me
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mt-3">
            Have a project, collaboration idea, or opportunity? I'd love to hear from you.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-10">

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Name */}
            <div>
              <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-slate-950 dark:border-gray-700"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-slate-950 dark:border-gray-700"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                Subject
              </label>

              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-slate-950 dark:border-gray-700"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                Message
              </label>

              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-slate-950 dark:border-gray-700"
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            {/* Success */}
            {success && (
              <p className="text-green-600 text-sm">
                Message sent successfully!
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

          </form>

        </div>

      </div>
    </section>
  )
}

export default ContactSection