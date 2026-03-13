import Hero from "../components/hero/hero"
import ServicesAbout from "../components/services/ServicesAbout"
import Skills from "../components/skills/skills"
import Experience from "../components/experience/experience"
import Projects from "../components/projects/projects"
import Certifications from "../components/certifications/certifications"
import ContactSection from "../components/contact/contactSection"
import Footer from "../components/footer/footer"

const Home = () => {
  return (
    <>
      <Hero />
      <ServicesAbout /> 
      <Projects />
      <Experience />
      <Skills />  
      <Certifications />
      <ContactSection />
      <Footer />
    </>
  ) 
}

export default Home