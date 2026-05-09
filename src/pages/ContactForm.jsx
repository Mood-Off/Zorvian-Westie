import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, User, Building, Mail, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const GOOGLE_SHEET_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || ''

// Max lengths to prevent buffer overflow / abuse
const MAX_LENGTHS = {
  name: 100,
  company: 100,
  email: 254,
  area: 50
}

const areas = [
  'Web Development',
  'UI/UX Design',
  'E-Commerce',
  'Mobile App',
  'Digital Marketing',
  'Other'
]

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    area: '',
    website: ''  // honeypot field
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // Honeypot check - if filled, it's a bot
    if (formData.website) {
      setIsLoading(false)
      setIsSubmitted(true)  // fake success to fool bots
      return
    }

    // Validate field lengths
    if (formData.name.length > MAX_LENGTHS.name ||
        formData.company.length > MAX_LENGTHS.company ||
        formData.email.length > MAX_LENGTHS.email ||
        formData.area.length > MAX_LENGTHS.area) {
      setIsLoading(false)
      setError('Invalid input. Please check your entries.')
      return
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setIsLoading(false)
      setError('Please enter a valid email address.')
      return
    }

    try {
      const response = await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.slice(0, MAX_LENGTHS.name),
          company: formData.company.slice(0, MAX_LENGTHS.company),
          email: formData.email.slice(0, MAX_LENGTHS.email),
          area: formData.area.slice(0, MAX_LENGTHS.area),
          timestamp: new Date().toISOString()
        })
      })

      setIsLoading(false)
      setIsSubmitted(true)
    } catch (err) {
      setIsLoading(false)
      setError('Something went wrong. Please try again.')
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-violet-500/20" />
            <div className="absolute inset-0 bg-[#0a0a0f]/90" />

            <div className="relative z-10 p-12 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center"
              >
                <CheckCircle2 className="w-10 h-10 text-white" />
              </motion.div>

              <h2 className="font-display text-3xl font-bold text-white mb-4">
                Thank You!
              </h2>
              <p className="text-slate-400 mb-8">
                We've received your information. Our team will contact you within 24 hours.
              </p>

              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-6">
      {/* Background Effects */}
      <div className="fixed inset-0 grid-pattern opacity-30" />
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-lg"
      >
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Form Card */}
        <div className="relative rounded-3xl overflow-hidden">
          {/* Card Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800" />
          <div className="absolute inset-0 border border-white/10" />

          <div className="relative z-10 p-8 md:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
                Let's Start a <span className="gradient-text">Conversation</span>
              </h1>
              <p className="text-slate-400">
                Tell us about your project and we'll get back to you.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="text"
                    name="name"
                    required
                    maxLength={MAX_LENGTHS.name}
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                  />
                </div>
              </div>

              {/* Company Field */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Company Name
                </label>
                <div className="relative">
                  <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="text"
                    name="company"
                    maxLength={MAX_LENGTHS.company}
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Acme Inc."
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="email"
                    name="email"
                    required
                    maxLength={MAX_LENGTHS.email}
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                  />
                </div>
              </div>

              {/* Area Dropdown */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Area of Interest *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 z-10" />
                  <select
                    name="area"
                    required
                    value={formData.area}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white appearance-none cursor-pointer focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                  >
                    <option value="" className="bg-slate-900">Select an area</option>
                    {areas.map((area) => (
                      <option key={area} value={area} className="bg-slate-900">
                        {area}
                      </option>
                    ))}
                  </select>
                  <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
                </div>
              </div>

              {/* Honeypot field - hidden from users, catches bots */}
              <div className="hidden" aria-hidden="true">
                <label className="hidden">Leave this empty</label>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  tabIndex="-1"
                  autoComplete="off"
                  className="hidden"
                  style={{ display: 'none' }}
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 font-semibold text-white flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-cyan-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Submit Request
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Footer Note */}
            <p className="text-center text-sm text-slate-500 mt-6">
              We typically respond within 24 hours
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}