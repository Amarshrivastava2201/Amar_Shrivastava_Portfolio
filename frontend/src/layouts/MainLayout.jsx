import Navbar from '../components/Navbar'

const MainLayout = ({ children }) => {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      <Navbar />
      <main className="pt-20 px-6 max-w-6xl mx-auto">
        {children}
      </main>
    </div>
  )
}

export default MainLayout