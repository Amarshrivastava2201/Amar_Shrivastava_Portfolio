import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa"

const Footer = () => {

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="mt-10">

      <div className="max-w-full mx-auto  p-10 bg-white dark:bg-slate-900">


        {/* Main Grid */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">

          {/* LEFT */}
            <div className="md:w-36 flex flex-col items-start md:items-end h-full">
            <div className="flex gap-6 text-gray-600 dark:text-gray-400 align-middle max-h-full">

                <a
                      href="https://github.com/Amarshrivastava2201"
                  target="_blank"
                  rel="noopener noreferrer"
                 className="hover:text-indigo-600 transition"
                 >
                 <FaGithub size={20} />
                </a>

                 <a
                    href="https://www.linkedin.com/in/amar-shrivastava-22011999/"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="hover:text-indigo-600 transition"
                 >
                  <FaLinkedin size={20} />
                </a>

                 <a
                  href="https://twitter.com/"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="hover:text-indigo-600 transition"
                 >
                 <FaTwitter size={20} />
                </a>

                <a
                  href="https://instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-600 transition"
                >
                  <FaInstagram size={20} />
                </a>

            </div>
            </div>
      

          {/* MIDDLE */}
            <div className="flex-1 items-center border-x border-blue-500 px-10 h-full ">
            <h1 className=" text-4xl font-semibold text-blue-600 mb-4">
              Amar Shrivastava
            </h1>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              From idea to production — building fast, scalable, and reliable digital products.
            </p>
          </div>

          {/* RIGHT */}
          <div className="md:w-36 flex flex-col items-start md:items-start justify-center">

            <div className="text-4xl font-semibold text-blue-600 leading-tight">
              Code.<br/>
              Create.<br/>
              Scale.
            </div>

            

          </div>

        </div>

        {/* Bottom */}
        <div className="mt-12 text-center text-blue-600 text-sm">

          <p>
            © {new Date().getFullYear()} Built with ❤️ and developed by Amar Shrivastava
          </p>

          <p className="text-xs mt-2 text-gray-500">
            all rights reserved
          </p>

        </div>

      </div>

    </footer>
  )
}

export default Footer