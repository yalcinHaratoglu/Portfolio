"use client"

import type React from "react"
import { useRef } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Phone,
  Code2,
  Activity,
  ShieldCheck,
  Cpu,
  MapPin,
} from "lucide-react"
import { CvDownloadButton } from "@/components/cv-download-button"
import Image from "next/image"
import { PortfolioShell } from "@/components/portfolio-shell"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { AboutWorkspace } from "@/components/about-workspace"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProjectShowcaseItem } from "@/components/project-showcase-item"
import { useHireMe } from "@/components/hire-me-provider"
import { siteData } from "@/lib/site-data"
import { getProjectCards } from "@/lib/get-project-cards"
import type { ProjectSlug } from "@/lib/projects"

type NavKey = "about" | "skills" | "projects" | "contact"

type SkillKey = "frontend" | "realtime" | "quality" | "domain"

interface SkillCardData {
  icon: typeof Code2
  title: string
  skills: string[]
  color: string
}

export default function Portfolio() {
  const heroRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const skillsRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  const sectionRefs = {
    about: aboutRef,
    skills: skillsRef,
    projects: projectsRef,
    contact: contactRef,
  }

  return (
    <PortfolioShell showLoading>
      <SiteHeader variant="home" sectionRefs={sectionRefs} />

      <HeroSection heroRef={heroRef} projectsRef={projectsRef} />
      <AboutSection aboutRef={aboutRef} />
      <SkillsSection skillsRef={skillsRef} />
      <ProjectsSection projectsRef={projectsRef} />
      <ContactSection contactRef={contactRef} />
      <SiteFooter />
    </PortfolioShell>
  )
}

function HeroSection({
  heroRef,
  projectsRef,
}: {
  heroRef: React.RefObject<HTMLElement | null>
  projectsRef: React.RefObject<HTMLElement | null>
}) {
  const { t } = useTranslation()
  const values = t("hero.stats.values", { returnObjects: true }) as {
    projects: string
    years: string
    third: string
  }

  const stats = [
    { number: values.projects, label: t("hero.stats.projects") },
    { number: values.years, label: t("hero.stats.years") },
    { number: values.third, label: t("hero.stats.third") },
  ]

  return (
    <section id="hero" ref={heroRef} className="min-h-screen flex items-center justify-center relative z-10">
      <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1">
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-px bg-black dark:bg-white animate-fade-in" style={{ animationDelay: "0.2s" }} />
              <span
                className="text-sm tracking-widest text-gray-600 dark:text-gray-400 animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                {t("hero.role")}
              </span>
            </div>

            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in-up"
              style={{ animationDelay: "0.6s" }}
            >
              {t("hero.greeting")}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-400">
                {t("hero.name")}
              </span>
            </h1>

            <p
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed mb-8 animate-fade-in-up"
              style={{ animationDelay: "0.8s" }}
            >
              {t("hero.description")}
            </p>

            <div
              className="relative z-20 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 overflow-visible animate-fade-in-up"
              style={{ animationDelay: "1s" }}
            >
              <Button
                onClick={() => projectsRef.current?.scrollIntoView({ behavior: "smooth" })}
                className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 px-8 py-4 text-lg font-medium group"
              >
                <span className="flex items-center">
                  {t("hero.viewWork")}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </Button>

              <CvDownloadButton />
            </div>

            <div className="grid grid-cols-3 gap-8 mt-12 animate-fade-in-up" style={{ animationDelay: "1.2s" }}>
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <div className="relative overflow-visible pb-14">
            <div className="relative z-10 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <div className="w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl">
                <Image
                  src="/profile.png"
                  alt={t("hero.name")}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <div className="absolute bottom-8 right-8 bg-white dark:bg-gray-900 rounded-full p-4 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-black dark:text-white">{t("hero.available")}</span>
                </div>
              </div>
            </div>

            <div
              className="absolute left-1/2 -translate-x-1/2 -bottom-2 z-30 flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-3 shadow-xl dark:border-gray-600 dark:bg-gray-900 animate-fade-in-up"
              style={{ animationDelay: "1s" }}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                <MapPin className="h-4 w-4 text-black dark:text-white" />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-black dark:text-white">{t("hero.basedIn")}</div>
                <div className="text-xs font-medium text-gray-600 dark:text-gray-300">{t("hero.location")}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center space-y-2 animate-bounce">
          <span className="text-xs tracking-widest text-gray-400">{t("hero.scroll")}</span>
          <div className="w-px h-12 bg-gradient-to-b from-black dark:from-white to-transparent" />
        </div>
      </div>
    </section>
  )
}

function AboutSection({ aboutRef }: { aboutRef: React.RefObject<HTMLElement | null> }) {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation()
  const experience = t("about.experience", { returnObjects: true }) as string[]

  return (
    <section
      id="about"
      ref={aboutRef}
      className="py-32 relative z-10 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-8">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <div className="mb-16 lg:mb-20">
            <span className="text-sm tracking-widest text-gray-500 dark:text-gray-400 mb-4 block">{t("about.label")}</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              {t("about.title")}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-400">
                {t("about.titleHighlight")}
              </span>
            </h2>

            <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
              <p>{t("about.p3")}</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <ul className="space-y-3">
                {experience.map((item, i) => (
                  <li key={i} className="flex gap-2 text-gray-700 dark:text-gray-300 text-base">
                    <span className="text-black dark:text-white mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">{t("about.priorRoles")}</p>

              <div className="mt-12 flex flex-wrap gap-4">
                <Button
                  asChild
                  variant="outline"
                  className="border-black dark:border-white text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black bg-transparent"
                >
                  <a href={siteData.github} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    {t("about.github")}
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-black dark:border-white text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black bg-transparent"
                >
                  <a href={siteData.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-4 w-4" />
                    {t("about.linkedin")}
                  </a>
                </Button>
              </div>
            </div>

            <div className="relative">
              <AboutWorkspace />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SkillsSection({ skillsRef }: { skillsRef: React.RefObject<HTMLElement | null> }) {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation()

  const skillKeys: SkillKey[] = ["frontend", "realtime", "quality", "domain"]
  const skillMeta: Record<SkillKey, { icon: typeof Code2; color: string }> = {
    frontend: { icon: Code2, color: "from-blue-500 to-purple-600" },
    realtime: { icon: Activity, color: "from-cyan-500 to-blue-600" },
    quality: { icon: ShieldCheck, color: "from-emerald-500 to-teal-600" },
    domain: { icon: Cpu, color: "from-amber-500 to-orange-600" },
  }

  const skills: SkillCardData[] = skillKeys.map((key) => ({
    icon: skillMeta[key].icon,
    title: t(`skills.cards.${key}.title`),
    skills: t(`skills.cards.${key}.skills`, { returnObjects: true }) as string[],
    color: skillMeta[key].color,
  }))

  return (
    <section id="skills" ref={skillsRef} className="py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-8">
        <div
          ref={ref}
          className={`text-center mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <span className="text-sm tracking-widest text-gray-500 dark:text-gray-400 mb-4 block">{t("skills.label")}</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            {t("skills.title")}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-400">
              {t("skills.titleHighlight")}
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">{t("skills.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <SkillCard key={index} skill={skill} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SkillCard({
  skill,
  index,
  isVisible,
}: {
  skill: SkillCardData
  index: number
  isVisible: boolean
}) {
  const Icon = skill.icon

  return (
    <Card
      className={`h-full bg-white dark:bg-gray-900/50 border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-700 group backdrop-blur-sm shadow-lg hover:shadow-xl relative overflow-hidden ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 transition-opacity duration-500 group-hover:opacity-20`}
        aria-hidden
      />
      <CardContent className="relative z-10 flex h-full flex-col p-8 text-center">
        <div className="relative">
          <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${skill.color} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
            <Icon className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-bold mb-4 text-black dark:text-white">{skill.title}</h3>
          <ul className="space-y-2">
            {skill.skills.map((item, i) => (
              <li key={i} className="text-gray-600 dark:text-gray-400 text-sm">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

function ProjectsSection({ projectsRef }: { projectsRef: React.RefObject<HTMLElement | null> }) {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation()
  const projects = getProjectCards(t)

  return (
    <section
      id="projects"
      ref={projectsRef}
      className="py-32 relative z-10 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-8">
        <div
          ref={ref}
          className={`text-center mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <span className="text-sm tracking-widest text-gray-500 dark:text-gray-400 mb-4 block">{t("projects.label")}</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            {t("projects.title")}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-400">
              {t("projects.titleHighlight")}
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">{t("projects.subtitle")}</p>
        </div>

        <div className="space-y-24 md:space-y-32">
          {projects.map((project, index) => (
            <ProjectShowcaseItem
              key={project.slug}
              slug={project.slug as ProjectSlug}
              title={project.title}
              subtitle={project.subtitle}
              description={project.description}
              tech={project.tech}
              image={project.image}
              year={project.year}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactSection({ contactRef }: { contactRef: React.RefObject<HTMLElement | null> }) {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation()
  const { openHireMe } = useHireMe()

  const contacts = [
    {
      icon: Mail,
      titleKey: "email" as const,
      value: siteData.email,
      href: `mailto:${siteData.email}`,
    },
    {
      icon: Phone,
      titleKey: "phone" as const,
      value: siteData.phone,
      href: siteData.phoneHref,
    },
    {
      icon: Github,
      titleKey: "github" as const,
      value: "@yalcinHaratoglu",
      href: siteData.github,
    },
    {
      icon: Linkedin,
      titleKey: "linkedin" as const,
      value: "Yalçın Haratoğlu",
      href: siteData.linkedin,
    },
  ]

  return (
    <section id="contact" ref={contactRef} className="py-32 relative z-10">
      <div className="max-w-5xl mx-auto px-8 text-center">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="text-sm tracking-widest text-gray-500 dark:text-gray-400 mb-4 block">{t("contact.label")}</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            {t("contact.title")}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-400">
              {t("contact.titleHighlight")}
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-16 max-w-2xl mx-auto">{t("contact.subtitle")}</p>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {contacts.map((contact, index) => (
              <a
                key={index}
                href={contact.href}
                target={contact.href.startsWith("http") ? "_blank" : undefined}
                rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group"
              >
                <div className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300 shadow-lg hover:shadow-xl h-full">
                  <contact.icon className="h-8 w-8 mx-auto mb-4 text-black dark:text-white group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold mb-2 text-black dark:text-white text-sm">
                    {t(`contact.${contact.titleKey}`)}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-xs break-all">{contact.value}</p>
                </div>
              </a>
            ))}
          </div>

          <Button
            type="button"
            onClick={openHireMe}
            className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 px-12 py-4 text-lg font-medium group"
          >
            <span className="flex items-center">
              {t("contact.startProject")}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
            </span>
          </Button>
        </div>
      </div>
    </section>
  )
}
