import React, { useState, useEffect, useRef } from "react";
import { Github, Linkedin, ExternalLink, Mail, Moon, Sun } from "lucide-react";

import skillsData from "./scripts/skills";
import projectsData from "./scripts/projects";
import educationData from "./scripts/education";
import certificatesData from "./scripts/certificates";

export default function App() {
  const [visibleSkills, setVisibleSkills] = useState([]);
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [visibleEducation, setVisibleEducation] = useState([]);
  const [visibleCertificates, setVisibleCertificates] = useState([]);
  const [hoveredCertificate, setHoveredCertificate] = useState(null);
  const [activeSection, setActiveSection] = useState('home');
  const [isAnimating, setIsAnimating] = useState(false);
  const [typedText, setTypedText] = useState("");
  const typewriterText = "Data scientist/Analyst & AI enthusiast"; // Updated text
  const typeIndex = useRef(0);
  const [navPop, setNavPop] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Initial page load animations
    skillsData.forEach((_, index) => {
      setTimeout(() => {
        setVisibleSkills(prev => [...prev, index]);
      }, index * 200);
    });

    projectsData.forEach((_, index) => {
      setTimeout(() => {
        setVisibleProjects(prev => [...prev, index]);
      }, index * 250 + 1500);
    });

    educationData.forEach((_, index) => {
      setTimeout(() => {
        setVisibleEducation(prev => [...prev, index]);
      }, index * 300 + 3000);
    });

    certificatesData.forEach((_, index) => {
      setTimeout(() => {
        setVisibleCertificates(prev => [...prev, index]);
      }, index * 250 + 4000);
    });

    // Scroll listener for active section
    const handleScroll = () => {
      const sections = ['home', 'skills', 'projects', 'education', 'certificates'];
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Reset and start typewriter effect when home section is active
    if (activeSection === 'home') {
      setTypedText("");
      typeIndex.current = 0;
      const interval = setInterval(() => {
        setTypedText(prev => {
          if (prev.length === typewriterText.length) {
            clearInterval(interval);
            return prev;
          }
          return typewriterText.slice(0, prev.length + 1);
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [activeSection]);

  useEffect(() => {
    // Animate navbar content pop on section scroll
    setNavPop(true);
    const timer = setTimeout(() => setNavPop(false), 1000);
    return () => clearTimeout(timer);
  }, [activeSection]);
  
  // Load dark mode preference from localStorage on initial load
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);
  
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleNavClick = (sectionId) => {
    setIsAnimating(true);
    setActiveSection(sectionId);
    
    // Smooth scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }

    // Reset animation state
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  const handleCertificateClick = (pdfPath) => {
    // When deployed, access files from root level
    window.open(pdfPath, '_blank');
  };

  const getSectionTitle = (section) => {
    const titles = {
      home: "",
      skills: "Skills & Technologies",
      projects: "Featured Projects",
      education: "Education Journey",
      certificates: "Certificates & Achievements"
    };
    return titles[section];
  };
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      {/* Fixed Top Navigation */}
      <nav className={`fixed top-0 left-0 right-0 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} shadow-lg z-50 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className={`flex items-center justify-between transition-all duration-1000 ${navPop ? 'scale-105 opacity-100' : 'scale-100 opacity-100'}`}> 
            <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Youness El Meki
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {['home', 'skills', 'projects', 'education', 'certificates'].map((section) => (
                <button
                  key={section}
                  onClick={() => handleNavClick(section)}
                  className={`text-sm font-medium transition-all duration-300 relative group ${
                    activeSection === section 
                      ? 'text-blue-600' 
                      : darkMode ? 'text-gray-200 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                  
                  {/* Active indicator */}
                  {activeSection === section && (
                    <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-blue-600"></span>
                  )}
                  
                  {/* Hover indicator */}
                  <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className={`${darkMode ? 'text-gray-200 hover:text-yellow-300 hover:bg-gray-700' : 'text-gray-700 hover:text-purple-600 hover:bg-gray-100'} transition-colors duration-200 p-1 rounded-full`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <a
                href="https://github.com/Youness331"
                target="_blank"
                rel="noopener noreferrer"
                className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'} transition-colors duration-200`}
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/youness-el-meki-60316a200/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content with top padding */}
      <main className="pt-20 px-6 max-w-7xl mx-auto">
        {/* Section Title - Static */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold">
            {getSectionTitle(activeSection)}
          </h1>
        </div>
        {/* Home Section */}
        <section id="home" className="min-h-[calc(100vh-80px)] flex items-center mb-16">
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-10">
            <img
              src="./mypic.jpg"
              alt="Profile"
              className="w-64 h-64 rounded-full object-cover shadow-lg border-4 border-blue-200 mb-6 md:mb-0"
              style={{ minWidth: 256, minHeight: 256 }}
            />
            <div className="flex-1">
              <h1 className={`text-5xl font-bold mb-4 transition-all duration-1000 ${
                activeSection === 'home' && !isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>Hello, I'm Youness </h1>
              <div className="h-10 mb-4">
                <span className="text-xl text-blue-600 font-mono whitespace-pre">{typedText}<span className="animate-pulse">|</span></span>
              </div>
              <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-8 transition-all duration-1000 delay-300 ${
                activeSection === 'home' && !isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
 passionate about uncovering insights from data and building AI-powered solutions. Skilled in data wrangling, statistical analysis, machine learning, and visualization. I thrive on solving complex problems, optimizing business decisions, and exploring the latest in AI to drive innovation and real-world impact.              </p>
              <div className={`flex gap-4 transition-all duration-1000 delay-500 ${
                activeSection === 'home' && !isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
                <a
                                    href="./el meki youness_cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Download Resume
                </a>
                <a
                  href="#footer"
                  className={`flex items-center gap-2 px-6 py-3 ${darkMode ? 'bg-gray-700 text-white border-gray-600 hover:bg-gray-600' : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'} border rounded-lg shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  Contact Me
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="min-h-[calc(100vh-80px)] py-16 mb-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Skills & Technologies
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {skillsData.map((skill, index) => (
                <div
                  key={index}
                  className={`${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white'} p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 ${
                    (visibleSkills.includes(index) || activeSection === 'skills') && !isAnimating
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{ 
                    borderLeft: `4px solid ${skill.color}`,
                    transition: 'all 0.6s ease-out',
                    transitionDelay: activeSection === 'skills' ? `${index * 0.1 + 0.3}s` : `${index * 0.1}s`
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl transform transition-transform duration-300 hover:scale-125 hover:rotate-12">
                      {skill.icon}
                    </span>
                    <h3 className="text-xl font-semibold">{skill.title}</h3>
                  </div>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>{skill.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {skill.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 text-sm rounded-full font-medium transition-all duration-200 hover:scale-110 hover:shadow-md cursor-pointer"
                        style={{
                          backgroundColor: `${skill.color}20`,
                          color: skill.color,
                          transitionDelay: `${techIndex * 0.05}s`
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-[calc(100vh-80px)] py-16 mb-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Featured Projects
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectsData.map((project, index) => (
                <div
                  key={project.id}
                  className={`${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white'} p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-3 ${
                    (visibleProjects.includes(index) || activeSection === 'projects') && !isAnimating
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-12'
                  }`}
                  style={{ 
                    borderTop: `4px solid ${project.color}`,
                    transition: 'all 0.8s ease-out',
                    transitionDelay: activeSection === 'projects' ? `${index * 0.15 + 0.3}s` : `${index * 0.15}s`
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl transform transition-transform duration-300 hover:scale-125 hover:rotate-12">
                      {project.icon}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold">{project.title}</h3>
                      <span 
                        className="text-xs px-2 py-1 rounded-full font-medium"
                        style={{
                          backgroundColor: `${project.color}20`,
                          color: project.color,
                        }}
                      >
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4 text-sm leading-relaxed`}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 text-xs rounded-full font-medium transition-all duration-200 hover:scale-110 hover:shadow-md cursor-pointer"
                        style={{
                          backgroundColor: `${project.color}15`,
                          color: project.color,
                          transitionDelay: `${techIndex * 0.03}s`
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="min-h-[calc(100vh-80px)] py-16 mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Education Journey
            </h2>
            
            <div className="relative">
              {/* Vertical Timeline Line */}
              <div className={`absolute left-8 top-0 bottom-0 w-0.5 transition-all duration-1500 ${
                activeSection === 'education' && !isAnimating ? 'bg-gradient-to-b from-blue-500 via-purple-500 to-red-500 scale-y-100' : 'bg-gray-200 scale-y-0'
              }`} style={{ transformOrigin: 'top' }}></div>
              
              {educationData.map((education, index) => (
                <div
                  key={education.id}
                  className={`relative flex items-start mb-12 transition-all duration-1000 transform ${
                    (visibleEducation.includes(index) || activeSection === 'education') && !isAnimating
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 translate-x-10'
                  }`}
                  style={{ 
                    transitionDelay: activeSection === 'education' ? `${index * 0.3 + 0.5}s` : `${index * 0.3}s`
                  }}
                >
                  {/* Timeline Dot */}
                  <div 
                    className="absolute left-6 w-4 h-4 rounded-full border-4 border-white shadow-lg transform transition-all duration-300 hover:scale-125"
                    style={{ backgroundColor: education.color }}
                  ></div>
                  
                  {/* Education Content */}
                  <div className={`ml-20 ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white'} p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 w-full`}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl transform transition-transform duration-300 hover:scale-125 hover:rotate-12">
                        {education.icon}
                      </span>
                      <div className="flex items-center gap-3">
                        <span 
                          className="text-xs px-3 py-1 rounded-full font-medium"
                          style={{
                            backgroundColor: `${education.color}20`,
                            color: education.color,
                          }}
                        >
                          {education.status}
                        </span>
                        <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">
                          📅 {education.period}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2" style={{ color: education.color }}>
                      {education.degree}
                    </h3>
                    
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm leading-relaxed`}>
                      {education.institution}
                    </p>
                    
                    {/* Decorative Line */}
                    <div 
                      className="mt-4 h-1 rounded-full w-16 transition-all duration-300 hover:w-24"
                      style={{ backgroundColor: education.color }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certificates Section */}
        <section id="certificates" className="min-h-[calc(100vh-80px)] py-16 mb-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Certificates & Achievements
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certificatesData.map((certificate, index) => (
                <div
                  key={certificate.id}
                  className={`relative ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white'} p-6 rounded-lg shadow-md hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-3 cursor-pointer overflow-hidden ${
                    (visibleCertificates.includes(index) || activeSection === 'certificates') && !isAnimating
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-12'
                  }`}
                  style={{ 
                    borderTop: `4px solid ${certificate.color}`,
                    transition: 'all 0.8s ease-out',
                    transitionDelay: activeSection === 'certificates' ? `${index * 0.2 + 0.3}s` : `${index * 0.2}s`
                  }}
                  onMouseEnter={() => setHoveredCertificate(certificate.id)}
                  onMouseLeave={() => setHoveredCertificate(null)}
onClick={() => handleCertificateClick(certificate.pdfPath)}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl transform transition-transform duration-300 hover:scale-125 hover:rotate-12">
                      {certificate.icon}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold" style={{ color: certificate.color }}>
                        {certificate.title}
                      </h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} font-medium`}>{certificate.issuer}</p>
                    </div>
                    <ExternalLink 
                      size={18} 
                      className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                    />
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {certificate.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {certificate.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 text-xs rounded-full font-medium transition-all duration-200 hover:scale-110"
                        style={{
                          backgroundColor: `${certificate.color}15`,
                          color: certificate.color,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* PDF Preview on Hover */}
                  {hoveredCertificate === certificate.id && (
                    <div className="absolute inset-0 bg-black bg-opacity-90 rounded-lg flex items-center justify-center transition-all duration-300 z-10">
                      <div className="relative w-full h-full p-4">
                        <img 
                          src={certificate.previewImage}
                          alt={`${certificate.title} preview`}
                          className="w-full h-full object-contain rounded-lg shadow-2xl transform transition-transform duration-300 hover:scale-105"
                          style={{ maxHeight: '90%' }}
                        />
                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-lg">
                          <div className="flex items-center gap-2 text-blue-600">
                            <ExternalLink size={16} />
                            <span className="text-sm font-medium">Click to open PDF</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Decorative Line */}
                  <div 
                    className="absolute bottom-0 left-0 h-1 rounded-b-lg transition-all duration-300"
                    style={{ 
                      backgroundColor: certificate.color,
                      width: hoveredCertificate === certificate.id ? '100%' : '0%'
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer id="footer" className={`py-10 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} mt-20`}>
          <div className="max-w-6xl mx-auto px-6 text-center">
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>© {new Date().getFullYear()} Youness El Meki. All rights reserved.</p>
            <div className="flex justify-center gap-6 mt-4">
              <a
                href="https://github.com/Youness331"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition-colors duration-200"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/youness-el-meki-60316a200/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                <Linkedin size={20} />
              </a>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail size={20} />
                <span>elmekiyouness@gmail.com</span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
