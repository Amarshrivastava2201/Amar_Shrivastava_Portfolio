import { useState, useEffect } from "react"
import { createPortal } from "react-dom"

const ProjectCard = ({ project }) => {
  const [open, setOpen] = useState(false)

  // ESC closes modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setOpen(false)
    }

    if (open) {
      window.addEventListener("keydown", handleEsc)
      document.body.style.overflow = "hidden"
    }

    return () => {
      window.removeEventListener("keydown", handleEsc)
      document.body.style.overflow = "auto"
    }
  }, [open])

  return (
    <>
      {/* PROJECT CARD */}
      <div className="group rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-lg transition overflow-hidden">

        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-48 object-cover"
          />
        )}

        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            {project.title}
          </h3>

          {/* Short description */}
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
            {project.description}
          </p>

          <button
            onClick={() => setOpen(true)}
            className="text-primary text-sm mt-2 hover:underline"
          >
            See more
          </button>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mt-4">
            {project.techStack?.map((tech, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 rounded bg-primary/10 text-primary"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL */}
      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] bg-black/60 overflow-y-auto flex justify-center p-6"
            onClick={() => setOpen(false)}
          >
            <div
              className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-xl shadow-xl mt-20"
              onClick={(e) => e.stopPropagation()}
            >

              {/* HEADER */}
              <div className="flex justify-between items-center border-b px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {project.title}
                </h2>

                <button
                  onClick={() => setOpen(false)}
                  className="text-xl hover:opacity-70"
                >
                  ✕
                </button>
              </div>

              {/* CONTENT */}
              <div className="p-6 space-y-6">

                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-56 object-cover rounded-lg"
                  />
                )}

                {/* Full description */}
                <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap leading-relaxed">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
                  {project.techStack?.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded bg-primary/10 text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 pt-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      className="px-4 py-2 bg-primary text-white rounded"
                    >
                      Live Demo
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      className="px-4 py-2 border rounded"
                    >
                      GitHub
                    </a>
                  )}
                </div>

              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}

export default ProjectCard