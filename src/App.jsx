import { useEffect, useState, useRef } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import {
  ArrowRight,
  Code2,
  Palette,
  Rocket,
  Zap,
  Shield,
  Globe,
  Smartphone,
  Star,
  Menu,
  X,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Users,
  Clock
} from 'lucide-react'
import ContactForm from './pages/ContactForm'
import './index.css'

// Navigation Component
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#work' },
    { name: 'Process', href: '#process' },
    { name: 'About', href: '#about' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'glass py-4' : 'py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight">
            Zorvian<span className="gradient-text">Digital</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-violet-500 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/contact" className="btn-glow px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-all">
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass mt-4 mx-6 rounded-2xl p-6"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block py-3 text-slate-300 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <Link
            to="/contact"
            className="block mt-4 text-center py-3 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Get Started
          </Link>
        </motion.div>
      )}
    </nav>
  )
}

// Hero Section
function HeroSection() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 150])
  const y2 = useTransform(scrollY, [0, 500], [0, -100])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-slate-300">Transforming Digital Presence</span>
            </motion.div>

            <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
              We Build
              <br />
              <span className="gradient-text">Digital Futures</span>
            </h1>

            <p className="text-lg text-slate-400 mb-8 max-w-lg leading-relaxed">
              Zorvian Digital crafts premium websites that elevate brands and drive results.
              From startups to enterprises, we turn your vision into digital reality.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="group px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600 font-semibold text-white flex items-center gap-2 hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
              >
                Start Your Project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#work"
                className="px-8 py-4 rounded-full border border-white/20 font-semibold text-white hover:bg-white/5 transition-all"
              >
                View Our Work
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
              {[
                { value: '150+', label: 'Projects Delivered' },
                { value: '98%', label: 'Client Satisfaction' },
                { value: '5+', label: 'Years Experience' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            className="relative hidden lg:block"
            style={{ y: y1 }}
          >
            <motion.div
              className="relative z-10"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Browser Mockup */}
              <div className="rounded-2xl overflow-hidden bg-slate-900 border border-white/10 shadow-2xl shadow-cyan-500/10">
                <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/50 border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex-1 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-700/50 text-xs text-slate-400">
                      <Globe className="w-3 h-3" />
                      zorvian-client.com
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-800">
                  <div className="space-y-4">
                    <div className="h-32 rounded-xl bg-gradient-to-r from-cyan-500/20 to-violet-500/20 animate-pulse" />
                    <div className="grid grid-cols-3 gap-3">
                      <div className="h-20 rounded-lg bg-white/5" />
                      <div className="h-20 rounded-lg bg-white/5" />
                      <div className="h-20 rounded-lg bg-white/5" />
                    </div>
                    <div className="h-4 rounded bg-white/5 w-3/4" />
                    <div className="h-4 rounded bg-white/5 w-1/2" />
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -right-8 top-1/4 p-4 rounded-2xl glass glow-cyan"
                style={{ y: y2 }}
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Code2 className="w-8 h-8 text-cyan-400" />
              </motion.div>

              <motion.div
                className="absolute -left-6 bottom-1/4 p-4 rounded-2xl glass glow-violet"
                animate={{ x: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Palette className="w-8 h-8 text-violet-400" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Services Section
function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const services = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Custom Web Development',
      description: 'Bespoke websites built with cutting-edge technologies tailored to your unique business needs.',
      features: ['React & Next.js', 'Custom CMS', 'API Integration', 'Performance Optimization'],
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: 'UI/UX Design',
      description: 'Stunning interfaces that captivate users and create memorable brand experiences.',
      features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
      gradient: 'from-violet-500 to-purple-500',
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: 'E-Commerce Solutions',
      description: 'Powerful online stores that convert visitors into customers and drive revenue growth.',
      features: ['Shopify & WooCommerce', 'Payment Integration', 'Inventory Management', 'Analytics'],
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: 'Mobile-First Design',
      description: 'Responsive websites that deliver exceptional experiences across all devices.',
      features: ['Progressive Web Apps', 'Touch Optimization', 'Cross-Platform', 'App-like Experience'],
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Web Security & Maintenance',
      description: 'Keep your digital assets secure and running smoothly with our comprehensive care packages.',
      features: ['SSL & Security Audits', 'Regular Updates', 'Backup Solutions', '24/7 Monitoring'],
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Digital Strategy',
      description: 'Data-driven strategies that align your digital presence with business objectives.',
      features: ['SEO Optimization', 'Content Strategy', 'Conversion Rate', 'Analytics Setup'],
      gradient: 'from-indigo-500 to-blue-500',
    },
  ]

  return (
    <section id="services" className="py-24 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to{' '}
            <span className="gradient-text">Succeed Online</span>
          </h2>
          <p className="text-slate-400">
            From concept to launch and beyond, we provide end-to-end digital solutions
            that help your business thrive in the digital landscape.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="h-full p-6 rounded-2xl bg-slate-900/50 border border-white/5 card-hover group">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  {service.icon}
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Work/Portfolio Section
function WorkSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const projects = [
    {
      title: 'Nexus Finance',
      category: 'Fintech Platform',
      image: 'bg-gradient-to-br from-blue-600 to-cyan-500',
      stats: { users: '50K+', growth: '+340%', conversion: '12.5%' },
      description: 'A comprehensive fintech platform enabling seamless digital banking experiences with advanced security and real-time analytics.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
      year: '2024',
      client: 'Nexus Financial Corp',
      features: ['Real-time transactions', 'Fraud detection', 'Multi-currency support', 'Mobile banking'],
    },
    {
      title: 'Aura Wellness',
      category: 'Health & Wellness',
      image: 'bg-gradient-to-br from-violet-600 to-pink-500',
      stats: { users: '25K+', growth: '+280%', conversion: '18.2%' },
      description: 'An all-in-one wellness app combining meditation, fitness tracking, and nutrition planning with AI-powered personalization.',
      technologies: ['Next.js', 'Python', 'TensorFlow', 'MongoDB'],
      year: '2024',
      client: 'Aura Health Inc',
      features: ['AI recommendations', 'Wearable integration', 'Community challenges', 'Progress analytics'],
    },
    {
      title: 'Vertex Commerce',
      category: 'E-Commerce',
      image: 'bg-gradient-to-br from-amber-500 to-orange-600',
      stats: { users: '100K+', growth: '+420%', conversion: '8.7%' },
      description: 'A high-performance e-commerce platform handling 1M+ SKUs with lightning-fast search and personalized shopping experiences.',
      technologies: ['React', 'GraphQL', 'Shopify', 'Redis'],
      year: '2023',
      client: 'Vertex Retail Group',
      features: ['AI product recommendations', 'Inventory sync', 'Multi-channel sales', 'Advanced analytics'],
    },
    {
      title: 'Pulse Agency',
      category: 'Creative Studio',
      image: 'bg-gradient-to-br from-emerald-500 to-teal-600',
      stats: { users: '15K+', growth: '+195%', conversion: '22.4%' },
      description: 'A creative portfolio platform showcasing visual content with interactive galleries and client collaboration tools.',
      technologies: ['Vue.js', 'WebGL', 'Firebase', 'Cloudinary'],
      year: '2023',
      client: 'Pulse Creative Agency',
      features: ['Interactive portfolios', 'Client approval workflows', 'Real-time edits', 'Brand customization'],
    },
  ]

  return (
    <section id="work" className="py-24 relative" ref={ref}>
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-xl">
            <span className="inline-block px-4 py-2 rounded-full bg-violet-500/10 text-violet-400 text-sm font-medium mb-4">
              Featured Work
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Projects That{' '}
              <span className="gradient-text">Speak Results</span>
            </h2>
            <p className="text-slate-400">
              Explore our portfolio of successful projects that have helped businesses
              achieve their digital goals and exceed expectations.
            </p>
          </div>
          <a href="#" className="mt-6 md:mt-0 inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors group">
            View All Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group cursor-pointer"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10]">
                {/* Project Image */}
                <div className={`absolute inset-0 ${project.image} opacity-80 group-hover:scale-105 transition-transform duration-700`} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/80">{project.year}</span>
                    <span className="text-sm text-white/70">{project.category}</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-sm text-white/60 mb-4 line-clamp-2">{project.description}</p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="text-xs px-2 py-0.5 rounded bg-white/5 text-white/70">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <div>
                      <div className="text-xl font-bold text-white">{project.stats.users}</div>
                      <div className="text-xs text-white/60">Active Users</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-cyan-400">{project.stats.growth}</div>
                      <div className="text-xs text-white/60">Revenue Growth</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-emerald-400">{project.stats.conversion}</div>
                      <div className="text-xs text-white/60">Conversion</div>
                    </div>
                  </div>
                </div>

                {/* Hover Icon */}
                <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-5 h-5 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Process Section
function ProcessSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const steps = [
    {
      number: '01',
      title: 'Discovery',
      description: 'We dive deep into understanding your business, goals, target audience, and competitive landscape.',
      icon: <Users className="w-5 h-5" />,
    },
    {
      number: '02',
      title: 'Strategy',
      description: 'Based on insights, we craft a comprehensive digital strategy aligned with your business objectives.',
      icon: <Sparkles className="w-5 h-5" />,
    },
    {
      number: '03',
      title: 'Design',
      description: 'Our designers create stunning visuals and intuitive user experiences that bring your brand to life.',
      icon: <Palette className="w-5 h-5" />,
    },
    {
      number: '04',
      title: 'Development',
      description: 'We build robust, scalable solutions using modern technologies and best practices.',
      icon: <Code2 className="w-5 h-5" />,
    },
    {
      number: '05',
      title: 'Launch',
      description: 'After rigorous testing, we launch your project with a seamless deployment process.',
      icon: <Rocket className="w-5 h-5" />,
    },
    {
      number: '06',
      title: 'Support',
      description: 'We provide ongoing maintenance and support to ensure your digital presence thrives.',
      icon: <Clock className="w-5 h-5" />,
    },
  ]

  return (
    <section id="process" className="py-24 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-4">
            Our Process
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            How We Bring Your{' '}
            <span className="gradient-text">Vision to Life</span>
          </h2>
          <p className="text-slate-400">
            Our proven 6-step process ensures every project is delivered on time,
            on budget, and exceeds expectations.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="h-full p-6 rounded-2xl bg-slate-900/30 border border-white/5 hover:border-cyan-500/30 transition-colors group">
                {/* Step Number */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display text-4xl font-bold text-white/10 group-hover:text-cyan-500/20 transition-colors">
                    {step.number}
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-cyan-400">
                    {step.icon}
                  </div>
                </div>

                <h3 className="font-display text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
              </div>

              {/* Connection Line */}
              {index < steps.length - 1 && index % 3 !== 2 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-white/10 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Testimonials Section
function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const testimonials = [
    {
      quote: "Zorvian Digital transformed our online presence completely. Our new website increased leads by 300% in just 3 months.",
      author: 'Sarah Chen',
      role: 'CEO, TechVentures',
      rating: 5,
    },
    {
      quote: "The team understood our vision perfectly and delivered a stunning platform that our users love. Highly recommended!",
      author: 'Marcus Johnson',
      role: 'Founder, Nexus Finance',
      rating: 5,
    },
    {
      quote: "Professional, creative, and incredibly responsive. They made the entire process seamless from start to finish.",
      author: 'Emily Rodriguez',
      role: 'Marketing Director, Aura Wellness',
      rating: 5,
    },
  ]

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      {/* Background Glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px] -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-amber-500/10 text-amber-400 text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Loved by{' '}
            <span className="gradient-text">Industry Leaders</span>
          </h2>
          <p className="text-slate-400">
            Don't just take our word for it. Here's what our clients have to say about
            working with Zorvian Digital.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className="h-full p-6 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-800/50 border border-white/5 card-hover">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-slate-300 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center font-semibold text-white">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-medium text-white">{testimonial.author}</div>
                    <div className="text-sm text-slate-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Logos */}
        <motion.div
          className="mt-16 pt-16 border-t border-white/5"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-center text-sm text-slate-500 mb-8">Trusted by innovative companies worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50">
            {['TechVentures', 'Nexus Finance', 'Aura Wellness', 'Vertex Labs', 'Pulse Agency'].map((company) => (
              <span key={company} className="font-display font-bold text-xl text-slate-400">
                {company}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// CTA Section
function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="contact" className="py-24 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="relative rounded-3xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-violet-600" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

          {/* Content */}
          <div className="relative z-10 px-8 py-16 md:px-16 md:py-24 text-center">
            <motion.h2
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Ready to Build Your
              <br />
              Digital Future?
            </motion.h2>
            <motion.p
              className="text-lg text-white/80 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Let's discuss your project and discover how Zorvian Digital can help
              you achieve your digital goals. Start with a free consultation.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                to="/contact"
                className="group px-8 py-4 rounded-full bg-white text-slate-900 font-semibold flex items-center gap-2 hover:shadow-xl transition-all"
              >
                Schedule a Call
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#work"
                className="px-8 py-4 rounded-full border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-all"
              >
                View Portfolio
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    services: [
      { name: 'Web Development', href: '#services' },
      { name: 'UI/UX Design', href: '#services' },
      { name: 'E-Commerce', href: '#services' },
      { name: 'Mobile Apps', href: '#services' },
    ],
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Our Work', href: '#work' },
      { name: 'Process', href: '#process' },
      { name: 'Careers', href: '#' },
    ],
    resources: [
      { name: 'Blog', href: '#' },
      { name: 'Case Studies', href: '#work' },
      { name: 'FAQ', href: '#' },
      { name: 'Support', href: '#' },
    ],
  }

  return (
    <footer className="py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-xl">
                Zorvian<span className="gradient-text">Digital</span>
              </span>
            </a>
            <p className="text-slate-400 text-sm mb-6 max-w-xs">
              Crafting premium digital experiences that drive results and elevate brands
              in the modern digital landscape.
            </p>
            <div className="flex gap-3">
              {['Twitter', 'LinkedIn', 'Instagram', 'Dribbble'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  <span className="text-xs font-medium">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {currentYear} Zorvian Digital. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-slate-500 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-slate-500 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Main App Component
function App() {
  return (
    <Routes>
      <Route path="/contact" element={<ContactForm />} />
      <Route path="/" element={
        <div className="min-h-screen bg-[#0a0a0f] text-white noise">
          <Navigation />
          <HeroSection />
          <ServicesSection />
          <WorkSection />
          <ProcessSection />
          <TestimonialsSection />
          <CTASection />
          <Footer />
        </div>
      } />
    </Routes>
  )
}

export default App