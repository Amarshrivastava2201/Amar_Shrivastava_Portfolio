import { useEffect, useState } from "react"

const ScrollTop = () => {

  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const toggleVisible = () => {

      if (window.scrollY > 600) {
        setVisible(true)
      } else {
        setVisible(false)
      }

    }

    window.addEventListener("scroll", toggleVisible)

    return () => window.removeEventListener("scroll", toggleVisible)
  }, [])

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  if (!visible) return null

  return (
    <button
      onClick={scrollTop}
      className="fixed bottom-8 right-8 w-12 h-12 border-2 border-blue-500 rounded-xl text-blue-500 hover:bg-blue-500 hover:text-white transition flex items-center justify-center shadow-lg z-50"
    >
      ↑
    </button>
  )
}

export default ScrollTop