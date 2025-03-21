"use client"

import { useEffect, useRef, useState } from "react"
import { MoveRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useInView } from "react-intersection-observer"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { ProjectCard } from "@/components/project-card"
import { ContactForm } from "@/components/contact-form"
import { cn } from "@/lib/utils"

// Sample project data
const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A modern e-commerce platform built with Next.js and Stripe integration.",
    tags: ["Next.js", "Stripe", "Tailwind CSS"],
    image: "/placeholder.svg?height=600&width=800",
    link: "https://github.com/yourusername/ecommerce-platform",
  },
  {
    id: 2,
    title: "Portfolio Website",
    description: "A minimalist portfolio website for a photographer showcasing their work.",
    tags: ["React", "Framer Motion", "CSS Grid"],
    image: "/placeholder.svg?height=600&width=800",
    link: "https://github.com/yourusername/portfolio-website",
  },
  {
    id: 3,
    title: "Dashboard UI",
    description: "An admin dashboard with dark mode, charts, and responsive design.",
    tags: ["TypeScript", "React", "Recharts"],
    image: "/placeholder.svg?height=600&width=800",
    link: "https://github.com/yourusername/dashboard-ui",
  },
]

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme } = useTheme()

  // Refs for each section
  const heroRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  // Intersection observers for animations
  const { ref: heroInViewRef, inView: heroInView } = useInView({ threshold: 0.3, triggerOnce: true })
  const { ref: aboutInViewRef, inView: aboutInView } = useInView({ threshold: 0.3, triggerOnce: true })
  const { ref: projectsInViewRef, inView: projectsInView } = useInView({ threshold: 0.3, triggerOnce: true })
  const { ref: contactInViewRef, inView: contactInView } = useInView({ threshold: 0.3, triggerOnce: true })

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false)

    const sectionMap = {
      hero: heroRef,
      about: aboutRef,
      projects: projectsRef,
      contact: contactRef,
    }

    const section = sectionMap[sectionId as keyof typeof sectionMap]

    if (section && section.current) {
      section.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      const sections = [
        { id: "hero", ref: heroRef },
        { id: "about", ref: aboutRef },
        { id: "projects", ref: projectsRef },
        { id: "contact", ref: contactRef },
      ]

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section.ref.current && section.ref.current.offsetTop <= scrollPosition) {
          setActiveSection(section.id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">Portfolio</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <button
              onClick={() => scrollToSection("hero")}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                activeSection === "hero" && "text-primary font-semibold",
              )}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                activeSection === "about" && "text-primary font-semibold",
              )}
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                activeSection === "projects" && "text-primary font-semibold",
              )}
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                activeSection === "contact" && "text-primary font-semibold",
              )}
            >
              Contact
            </button>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button onClick={() => scrollToSection("contact")} className="hidden md:flex">
              Let's Talk
              <MoveRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                {mobileMenuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 12h16M4 6h16M4 18h16" />}
              </svg>
            </Button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t">
            <div className="container py-4 flex flex-col gap-4">
              <button
                onClick={() => scrollToSection("hero")}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary py-2",
                  activeSection === "hero" && "text-primary font-semibold",
                )}
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary py-2",
                  activeSection === "about" && "text-primary font-semibold",
                )}
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary py-2",
                  activeSection === "projects" && "text-primary font-semibold",
                )}
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary py-2",
                  activeSection === "contact" && "text-primary font-semibold",
                )}
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="container py-10">
        {/* Hero Section */}
        <section
          ref={(el) => {
            heroRef.current = el as HTMLDivElement
            heroInViewRef(el)
          }}
          className="py-20 md:py-28"
        >
          <div
            className={cn(
              "grid gap-8 md:grid-cols-2 md:gap-12 items-center opacity-0 translate-y-4",
              heroInView && "animate-fade-in",
            )}
          >
            <div className="space-y-6">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Full Stack Developer</div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Hi, I'm <span className="text-primary">Jason</span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                I build exceptional digital experiences that are fast, accessible, and visually appealing.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={() => scrollToSection("projects")} size="lg" className="group">
                  View My Work
                  <MoveRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="outline" size="lg" onClick={() => scrollToSection("contact")}>
                  Contact Me
                </Button>
              </div>
            </div>
            <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden">
              <Image
                src="/placeholder.svg?height=800&width=800"
                alt="Portrait"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          ref={(el) => {
            aboutRef.current = el as HTMLDivElement
            aboutInViewRef(el)
          }}
          className="py-16 scroll-mt-16"
        >
          <div className={cn("space-y-6 opacity-0 translate-y-4", aboutInView && "animate-fade-in")}>
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">About Me</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">My Background</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  I'm a frontend developer with a passion for creating beautiful, functional, and accessible websites.
                  With over 5 years of experience in the industry, I've worked on a variety of projects from small
                  business websites to large-scale web applications.
                </p>
                <p className="text-muted-foreground">
                  My approach combines clean code, thoughtful design, and attention to detail to create exceptional user
                  experiences that help businesses achieve their goals.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold">My Skills</h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "React",
                    "Next.js",
                    "TypeScript",
                    "Tailwind CSS",
                    "UI/UX Design",
                    "Responsive Design",
                    "Accessibility",
                    "Performance",
                  ].map((skill, index) => (
                    <Card
                      key={skill}
                      className={cn(
                        "border border-primary/20 transition-all duration-300 hover:border-primary/50 hover:shadow-md",
                        "opacity-0",
                        aboutInView && `animate-fade-in [animation-delay:${index * 100}ms]`,
                      )}
                    >
                      <CardContent className="p-4">
                        <p className="font-medium">{skill}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          ref={(el) => {
            projectsRef.current = el as HTMLDivElement
            projectsInViewRef(el)
          }}
          className="py-16 scroll-mt-16"
        >
          <div className={cn("space-y-8 opacity-0 translate-y-4", projectsInView && "animate-fade-in")}>
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">My Work</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Featured Projects</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className={cn("opacity-0", projectsInView && `animate-fade-in [animation-delay:${index * 200}ms]`)}
                >
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    tags={project.tags}
                    image={project.image}
                    link={project.link}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          ref={(el) => {
            contactRef.current = el as HTMLDivElement
            contactInViewRef(el)
          }}
          className="py-16 scroll-mt-16"
        >
          <div className={cn("space-y-8 opacity-0 translate-y-4", contactInView && "animate-fade-in")}>
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Get in Touch</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Let's Work Together</h2>
              <p className="max-w-[600px] text-muted-foreground">
                Have a project in mind? I'd love to hear about it. Send me a message and let's create something amazing.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <ContactForm />
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">Email</h3>
                  <p className="text-muted-foreground">hello@example.com</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Location</h3>
                  <p className="text-muted-foreground">Philadelphia, PA</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Social</h3>
                  <div className="flex gap-4">
                    <Button variant="outline" size="icon" asChild className="transition-transform hover:scale-110">
                      <Link href="https://github.com" target="_blank" aria-label="GitHub">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                          <path d="M9 18c-4.51 2-5-2-7-2"></path>
                        </svg>
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon" asChild className="transition-transform hover:scale-110">
                      <Link href="https://twitter.com" target="_blank" aria-label="Twitter">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                        </svg>
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon" asChild className="transition-transform hover:scale-110">
                      <Link href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect width="4" height="12" x="2" y="9"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container flex flex-col gap-2 py-10 md:flex-row md:items-center md:justify-between">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 Dotsoft. All rights reserved.
          </p>
          <div className="flex items-center justify-center gap-4 md:justify-end">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

