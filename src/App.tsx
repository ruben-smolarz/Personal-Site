import { useEffect, useState, FormEvent } from "react";
import { Github, Linkedin, Menu, X } from "lucide-react";
import Terminal from "./components/Terminal";
import ProjectCard from "./components/ProjectCard";
import ContactLink from "./components/ContactLink";
import SkillCard from "./components/SkillCard";
import ProfileImage from "./components/ProfileImage";
import ImageModal from "./components/ImageModal";
import CookieConsent from "./components/CookieConsent";
import { Helmet } from "react-helmet-async";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cookieConsentAccepted, setCookieConsentAccepted] = useState(false);

  // Estado del formulario de contacto
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setIsLoaded(true);
    // Comprobar si ya se ha dado el consentimiento para las cookies
    const consent = localStorage.getItem("cookieConsent");
    if (consent === "accepted") {
      setCookieConsentAccepted(true);
    }
  }, []);

  // Función para gestionar la aceptación de cookies
  const handleCookieConsent = () => {
    setCookieConsentAccepted(true);
  };

  // Funzione per aprire e chiudere il menu mobile
  const toggleMobileMenu = (e: React.MouseEvent) => {
    e.stopPropagation(); // Previene la propagación de eventos
    setMobileMenuOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);

      // Cerrar el menú móvil cuando el usuario comienza a desplazarse
      if (mobileMenuOpen && window.scrollY > 10) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

  // Cerrar el menú móvil al hacer clic fuera
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!mobileMenuOpen) return;

      const target = event.target as HTMLElement;
      const isMenuButton =
        target.closest("button") &&
        target.closest("button")?.getAttribute("aria-label")?.includes("menu");
      const isInsideMenu = target.closest(".mobile-menu-container");

      if (!isMenuButton && !isInsideMenu) {
        setMobileMenuOpen(false);
      }
    };

    // Pequeño retraso para evitar conflictos con el evento de clic que abre el menú
    setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 10);

    return () => document.removeEventListener("click", handleClickOutside);
  }, [mobileMenuOpen]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Función de desplazamiento suave con desplazamiento del encabezado
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Para las secciones de pantalla completa, nos desplazamos directamente a la posición del elemento
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });

      // Cerrar el menú móvil después de hacer clic en un enlace
      setMobileMenuOpen(false);
    }
  };

  const featuredProjects = [
    {
      title: "CoffeShop",
      description: "File Browser multilingua per la gestione dei file da web",
      tech: ["Html", "CSS", "Javascript"],
      github: "beatifulcoffe.netlify.app/",
      image: "images/projects/CoffeShop.png",
    },
    {
      title: "CashTrakr",
      description:
        "BudgetMaster: Full-stack expense manager using Next.js, Express, PostgreSQL, and Tailwind with custom auth, token validation, and budget tracking via secure dashboards.",
      tech: [
        "Node.js",
        "React",
        "TypeScript",
        "Next.js",
        "API",
        "PostgreSQL",
        "Tailwind CSS",
      ],
      github: "https://github.com/ruben-smolarz/cashtrakr_deploy_next_Nicolas",
      image: "images/projects/CashTrackr.png",
    },
    {
      title: "DevTree",
      description:
        "DevTree: Node.js/React SaaS for customizable profiles with drag-and-drop network management.",
      tech: ["Node.js", "React", "TypeScript", "Docker"],
      github: "https://github.com/ruben-smolarz/DevTree_Frontend",
      image: "images/projects/DevTree.png",
    },
  ];

  const additionalProjects = [
    {
      title: "CV-Smolarz",
      description:
        "Minimalist mobile portfolio with HTML/CSS/JS, responsive design and smooth animations",
      tech: ["Html", "CSS", "Javascript"],
      github: "https://github.com/ruben-smolarz/myCardVisual.github.io",
      image: "images/projects/CV-Smolarz.png",
    },
    {
      title: "Shufersal-Store",
      description:
        "HTML/CSS/JS store with cart, authentication, and responsive design.",
      tech: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/ruben-smolarz/Shufersal-Store-SHOPCART",
      image: "images/projects/Shufersal-Store.png",
    },
    {
      title: "Login System",
      description:
        "A sleek weather web application with a glassmorphism and dark theme design, built using React, TypeScript, Tailwind CSS, and Vite.",
      tech: ["Node.js", "TypeScript", "React", "Tailwind CSS", "Vite"],
      github: "https://github.com/alexis-82/login-system",
      image: "images/projects/agro-clima.png",
    },
  ];

  const allProjects = [...featuredProjects, ...additionalProjects];

  // const displayedProjects = showAllProjects ? allProjects : featuredProjects;

  const contacts = [
    {
      Icon: Github,
      href: "https://github.com/ruben-smolarz",
      label: "GitHub Profile",
    },
    {
      Icon: Linkedin,
      href: "https://www.linkedin.com/in/nicolas-ruben-garbarsky-smolarz-145612263/",
      label: "LinkedIn Profile",
    },
  ];

  const skills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "Database",
    "Docker",
    "Java",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Controlador para enviar el formulario
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");

    try {
      // Usamos la ruta relativa porque hemos configurado el proxy en Vite
      const response = await fetch("https://www.alexis82.it/api/contact/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Si la respuesta no es 2xx, lanzamos un error
      if (!response.ok) {
        let errorMsg = "An error occurred during l'sending the message";

        try {
          const errorData = await response.json();
          errorMsg = errorData.message || errorMsg;
        } catch {
          // Si no podemos analizar el JSON, usamos el texto de estado
          errorMsg = `Error ${response.status}: ${response.statusText}`;
        }

        setFormStatus("error");
        setErrorMessage(errorMsg);
        return;
      }

      // If we get here, the answer is OK
      await response.json(); // We read the response body but don't use it
      setFormStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Errore durante l'invio del form:", error);
      setFormStatus("error");
      setErrorMessage("Impossibile contattare il server. Riprova più tardi.");
    }

    // Reset state after 5 seconds
    setTimeout(() => {
      setFormStatus("idle");
      setErrorMessage("");
    }, 5000);
  };

  return (
    <div
      className={`min-h-screen bg-gray-950 text-white ${
        isLoaded ? "opacity-100" : "opacity-0"
      } transition-opacity duration-500`}
    >
      <Helmet>
        <title>Nicolas Smolarz - Full Stack Developer</title>
        <meta name="description" content="Nicolas's Portfolio" />
      </Helmet>
      <header className="fixed top-0 left-0 right-0 z-50 border-b bg-gray-950/20 backdrop-blur-sm border-gray-800/50">
        <div className="container px-4 py-4 mx-auto">
          <nav className="flex items-center justify-between">
            <div className="flex items-center lg:w-1/4">
              {/* If you want to add a logo, you can do it here */}
            </div>

            <div className="justify-center hidden gap-6 lg:flex">
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("home");
                }}
                className={`text-white hover:text-purple-400 font-medium transform transition-all duration-500 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: "50ms" }}
              >
                Home
              </a>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("about");
                }}
                className={`text-white hover:text-purple-400 font-medium transform transition-all duration-500 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: "100ms" }}
              >
                About Me
              </a>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("projects");
                }}
                className={`text-white hover:text-purple-400 font-medium transform transition-all duration-500 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: "150ms" }}
              >
                My Projects
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("contact");
                }}
                className={`text-white hover:text-purple-400 font-medium transform transition-all duration-500 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                Contact Me
              </a>
            </div>

            <div className="justify-end hidden gap-6 lg:flex lg:w-1/4">
              {contacts.map((contact, index) => (
                <div
                  key={index}
                  className={`transform transition-all duration-500 ${
                    isLoaded
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <ContactLink {...contact} />
                </div>
              ))}
            </div>

            <div className="flex justify-end lg:hidden">
              <button
                onClick={toggleMobileMenu}
                aria-label={mobileMenuOpen ? "Chiudi menu" : "Apri menu"}
                className="relative z-50 p-2 text-white transition-colors hover:text-purple-400 focus:outline-none"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </nav>

          {/* Mobile Menu - opens when mobileMenuOpen is true */}
          <div
            className={`lg:hidden ${
              mobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden transition-all duration-500 ease-in-out relative z-40`}
          >
            <div
              className={`mobile-menu-container py-4 flex flex-col gap-4 border-t border-gray-800/50 mt-2 transform transition-all duration-500 ${
                mobileMenuOpen ? "translate-y-0" : "-translate-y-4"
              }`}
            >
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("home");
                  setMobileMenuOpen(false);
                }}
                className="px-2 py-2 font-medium text-white transition-colors rounded-lg hover:text-purple-400 hover:bg-gray-800/20"
              >
                Home
              </a>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("about");
                  setMobileMenuOpen(false);
                }}
                className="px-2 py-2 font-medium text-white transition-colors rounded-lg hover:text-purple-400 hover:bg-gray-800/20"
              >
                About Me
              </a>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("projects");
                  setMobileMenuOpen(false);
                }}
                className="px-2 py-2 font-medium text-white transition-colors rounded-lg hover:text-purple-400 hover:bg-gray-800/20"
              >
                My Projects
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("contact");
                  setMobileMenuOpen(false);
                }}
                className="px-2 py-2 font-medium text-white transition-colors rounded-lg hover:text-purple-400 hover:bg-gray-800/20"
              >
                Contact Me
              </a>

              {/* Social links nel menu mobile */}
              <div className="flex justify-center gap-5 px-2 pt-3 mt-1 border-t border-gray-800/50">
                {contacts.map((contact, index) => (
                  <ContactLink key={index} {...contact} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div
        id="home"
        className="relative flex items-center justify-center min-h-screen pt-16 pb-8 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800/30 to-blue-800/30" />
        <div className="absolute inset-0">
          <div className="h-full w-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/30 via-transparent to-transparent" />
        </div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="h-full w-full bg-gradient-to-b from-transparent via-transparent to-[#030611]/95" />
        </div>

        <div className="container px-4 py-10 mx-auto">
          <div
            className={`transform transition-all duration-1000 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h1 className="mb-6 text-5xl font-bold text-center text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text md:text-left">
              Full Stack Developer
            </h1>
            <p className="max-w-2xl mb-8 text-xl text-center text-gray-400 md:text-left">
              Creating digital experiences with clean code and innovative
              solutions. Specialized in React, Node.js and cloud architecture.
            </p>
            <div className="flex flex-col items-center gap-6 px-0 mx-auto md:flex-row md:gap-12 lg:gap-24 xl:gap-96 md:mx-0">
              <Terminal />
              <div className="md:mr-4 lg:mr-8 xl:mr-0">
                <ProfileImage />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Me Section */}
      <div
        id="about"
        className="flex items-center justify-center min-h-screen py-16"
      >
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="mb-8 text-3xl font-bold text-center text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
              About Me
            </h2>
            <div className="p-6 space-y-4 rounded-lg bg-gray-900/50 backdrop-blur-sm">
              <p className="text-lg leading-relaxed text-justify text-gray-300">
                👋 Hi, I'm Nicolas Smolarz, a Full Stack Developer passionate
                about technology and innovation. My experience ranges from web
                development to Linux system management, with a particular focus
                on creating efficient and scalable solutions.
              </p>
              <p className="text-lg leading-relaxed text-justify text-gray-300">
                I have a strong passion for open source and believe in the power
                of sharing knowledge. When I'm not coding, I enjoy exploring new
                technologies and contributing to the developer community.
              </p>
              <p className="text-lg leading-relaxed text-justify text-gray-300">
                🧑‍💻 My main skills include:
              </p>
              <ul className="ml-4 space-y-2 text-lg text-gray-300 list-disc list-inside">
                <li>
                  Full Stack Web Development with React, Angular, Next.js,
                  Bootstrap and Tailwind CSS
                </li>
                <li>
                  Backend Programming with Node.js, Express, ASP.NET, Spring
                  Boot 3
                </li>
                <li>RESTfull API Development and Service Integration</li>
                <li>
                  Database Management and Optimization with PostgreSQL, SQL
                  Server, MySQL
                </li>
                <li>Linux System Administration and Advanced Scripting</li>
                <li>Containerization and Orchestration with Docker</li>
                <li>
                  Experience with TypeScript, Java, Python and other modern
                  languages
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <section
        id="projects"
        className="flex flex-col min-h-screen py-16 mb-5 md:mb-0"
      >
        <div className="container flex-1 px-4 mx-auto">
          <div className="flex flex-col items-center mb-8">
            <h2 className="mb-4 text-3xl font-bold text-center text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
              My Projects
            </h2>
            {additionalProjects.length > 0 && (
              <button
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="px-6 py-2 text-white transition-all duration-500 transform bg-purple-600 rounded-lg hover:bg-purple-700 hover:scale-110 active:scale-95"
              >
                {showAllProjects ? "Show Less" : "View All Projects"}
              </button>
            )}
          </div>
          <div>
            <div className="grid grid-cols-1 gap-6 pb-8 md:grid-cols-2 lg:grid-cols-3">
              {allProjects.map((project, index) => (
                <div
                  key={project.title}
                  className={`transition-all duration-1000 ease-in-out transform origin-top ${
                    showAllProjects || index < 3
                      ? "opacity-100 translate-y-0 scale-100 max-h-[1000px] mb-6"
                      : "opacity-0 -translate-y-16 scale-95 max-h-0 mb-0"
                  }`}
                >
                  <div
                    className={`h-full transition-all duration-1000 ease-in-out ${
                      showAllProjects || index < 3
                        ? "opacity-100 transform translate-y-0"
                        : "opacity-0 transform translate-y-8"
                    }`}
                  >
                    <ProjectCard
                      {...project}
                      onImageClick={(image) => setSelectedImage(image)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <div className="flex items-center justify-center min-h-screen py-16">
        <div className="container px-4 mx-auto">
          <h2 className="mb-8 text-3xl font-bold text-center text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
            Tech Stack
          </h2>
          <div className="grid grid-cols-2 gap-8 overflow-y-auto md:grid-cols-4">
            {skills.map((skill, index) => (
              <SkillCard
                key={skill}
                skill={skill}
                index={index}
                isLoaded={isLoaded}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div
        id="contact"
        className="min-h-[75vh] flex items-center justify-center pt-6 pb-20"
      >
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className="mb-5 text-3xl font-bold text-center text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
              Contact Me
            </h2>
            <div className="p-6 rounded-lg shadow-lg bg-gray-900/50 backdrop-blur-sm">
              {formStatus === "success" ? (
                <div className="p-4 text-center border border-green-500 rounded-lg bg-green-500/20">
                  <p className="font-medium text-white">
                    Message sent successfully! I will reply as soon as possible.
                  </p>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-1 text-sm font-medium text-gray-300"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 text-white bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-1 text-sm font-medium text-gray-300"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 text-white bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Your email"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block mb-1 text-sm font-medium text-gray-300"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 text-white bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Message subject"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block mb-1 text-sm font-medium text-gray-300"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 text-white bg-gray-800 border border-gray-700 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Your message..."
                      required
                    ></textarea>
                  </div>

                  {formStatus === "error" && (
                    <div className="p-2 mb-2 border border-red-500 rounded-lg bg-red-500/20">
                      <p className="text-sm text-red-200">
                        {errorMessage ||
                          "An error occurred. Please try again later."}
                      </p>
                    </div>
                  )}

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      disabled={formStatus === "sending"}
                      className={`px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                        formStatus === "sending"
                          ? "opacity-70 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      {formStatus === "sending" ? "Sending..." : "Send Message"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="container px-4 py-3 mx-auto mb-5 text-sm text-center text-gray-400">
        &copy; {new Date().getFullYear()} Nicolas Smolarz | Powered by
        ☕Caffeine and 👨🏻‍💻Code
      </div>

      <button
        className={`back-to-top ${showBackToTop ? "visible" : ""}`}
        onClick={scrollToTop}
        aria-label="Turns his"
      >
        &uarr; Turns his
      </button>

      {/* Modal para ver imágenes */}
      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          imageUrl={selectedImage || ""}
          alt="Project preview"
        />
      )}

      {/* Popup consenso cookie */}
      {!cookieConsentAccepted && (
        <CookieConsent onAccept={handleCookieConsent} />
      )}
    </div>
  );
}

export default App;
