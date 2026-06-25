import { Link } from 'react-router-dom'
import { Target, Eye, Users, BookOpen, Heart, Globe } from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero */}
      <div className="bg-maroon-950 pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center text-white">
          <div className="text-saffron-400 text-5xl mb-6">ॐ</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
            About Devabhumi
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
            India Temple Heritage & Pilgrimage Information Portal — a centralized digital platform
            for authentic, reliable, and well-organized temple information across India.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

        {/* Context */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold text-stone-900 mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              Our Mission
            </h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              Devabhumi is a centralized digital portal that provides comprehensive information about
              temples across India, including historical significance, rituals, festivals, pilgrimage
              routes, darshan timings, and visitor guidelines.
            </p>
            <p className="text-stone-600 leading-relaxed">
              The platform aims to support pilgrims, tourists, and researchers by offering reliable,
              well-organized, and location-based temple information — bridging the gap between India's
              rich spiritual heritage and modern digital access.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 border border-stone-100 shadow-sm">
            <div className="text-center text-saffron-500 text-6xl mb-6">🛕</div>
            <div className="space-y-4">
              {[
                { label: 'Temples Listed', value: '12+' },
                { label: 'States Covered', value: '10+' },
                { label: 'Festivals Documented', value: '25+' },
                { label: 'Rituals Catalogued', value: '15+' },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between py-2 border-b border-stone-100 last:border-0">
                  <span className="text-stone-500 text-sm">{label}</span>
                  <span className="font-bold text-maroon-950 text-lg">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Problem Statement */}
        <section className="bg-white rounded-2xl p-8 md:p-12 border border-stone-100 shadow-sm">
          <h2 className="text-3xl font-bold text-stone-900 mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
            The Problem We Solve
          </h2>
          <p className="text-stone-600 mb-6">Pilgrims and visitors often face challenges such as:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: '🔍', issue: 'Difficulty finding authentic and complete temple information' },
              { icon: '⏰', issue: 'Lack of clarity on darshan timings, rituals, and festivals' },
              { icon: '🗺️', issue: 'Poor visibility of pilgrimage routes and nearby facilities' },
              { icon: '📋', issue: 'Absence of a centralized, trusted information source' },
            ].map(({ icon, issue }) => (
              <div key={issue} className="flex items-start gap-4 p-4 bg-stone-50 rounded-xl">
                <span className="text-2xl">{icon}</span>
                <p className="text-stone-600 text-sm leading-relaxed">{issue}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Objectives */}
        <section>
          <h2 className="text-3xl font-bold text-stone-900 mb-8 text-center" style={{ fontFamily: 'var(--font-serif)' }}>
            Our Objectives
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: BookOpen,
                title: 'Centralized Repository',
                desc: 'Create a comprehensive repository of temple heritage information from across India.',
                color: 'text-maroon-700 bg-maroon-50',
              },
              {
                icon: Target,
                title: 'Accurate Information',
                desc: 'Provide accurate pilgrimage and visitor-related details sourced from verified references.',
                color: 'text-saffron-700 bg-saffron-50',
              },
              {
                icon: Globe,
                title: 'Location-Based Discovery',
                desc: 'Enable location-based discovery of temples — search by state, city, or region.',
                color: 'text-gold-700 bg-gold-50',
              },
              {
                icon: Heart,
                title: 'Cultural Awareness',
                desc: 'Promote cultural and historical awareness of India\'s sacred heritage sites.',
                color: 'text-rose-600 bg-rose-50',
              },
              {
                icon: Users,
                title: 'Pilgrimage Planning',
                desc: 'Improve pilgrimage planning and experience for pilgrims of all ages.',
                color: 'text-blue-700 bg-blue-50',
              },
              {
                icon: Eye,
                title: 'Heritage Preservation',
                desc: 'Support tourism and heritage preservation efforts through digital archiving.',
                color: 'text-green-700 bg-green-50',
              },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="bg-white rounded-xl p-6 border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color} mb-4`}>
                  <Icon size={18} />
                </div>
                <h3 className="font-bold text-stone-900 mb-2" style={{ fontFamily: 'var(--font-serif)' }}>{title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What We Offer */}
        <section className="bg-stone-900 rounded-2xl p-8 md:p-12 text-white">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ fontFamily: 'var(--font-serif)' }}>
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Temple Information Management', items: ['Temple name, location & history', 'Deity details and significance', 'Rituals and daily pooja schedules'] },
              { title: 'Pilgrimage & Visitor Information', items: ['Darshan timings', 'Festival calendars', 'Dress code and temple rules', 'Nearby accommodation & transport'] },
              { title: 'Search & Discovery', items: ['Search by state, city, or name', 'Filter by religion or features', 'Browse featured temples'] },
              { title: 'Cultural Heritage', items: ['Historical background articles', 'Architectural significance', 'Regional temple traditions'] },
            ].map(({ title, items }) => (
              <div key={title} className="bg-white/5 rounded-xl p-6">
                <h3 className="font-semibold text-saffron-300 mb-4">{title}</h3>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-white/70 text-sm">
                      <span className="text-saffron-500 mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-stone-900 mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
            Begin Your Journey
          </h2>
          <p className="text-stone-500 mb-8 max-w-xl mx-auto">
            Explore temples across India with complete visitor information, darshan timings,
            and cultural guides.
          </p>
          <Link to="/temples" className="btn-primary text-base px-8 py-4">
            Explore All Temples
          </Link>
        </section>
      </div>
    </div>
  )
}
