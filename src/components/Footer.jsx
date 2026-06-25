import { Link } from 'react-router-dom'
import { MapPin, Clock, Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-maroon-950 rounded-full flex items-center justify-center text-saffron-300 text-xl font-bold">
                ॐ
              </div>
              <div>
                <div className="text-white font-bold text-lg" style={{ fontFamily: 'var(--font-serif)' }}>
                  Devabhumi
                </div>
                <div className="text-stone-500 text-xs">Temple Heritage Portal</div>
              </div>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed mt-4">
              A centralized digital portal for authentic temple heritage information across India.
              Supporting pilgrims, tourists, and researchers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/temples', label: 'All Temples' },
                { to: '/temples?state=Uttar Pradesh', label: 'Temples in UP' },
                { to: '/temples?state=Tamil Nadu', label: 'Temples in Tamil Nadu' },
                { to: '/about', label: 'About Us' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-stone-400 hover:text-saffron-400 text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* States */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">By State</h3>
            <ul className="space-y-3">
              {[
                'Gujarat', 'Punjab', 'Andhra Pradesh', 'Odisha', 'Uttarakhand', 'Delhi',
              ].map((state) => (
                <li key={state}>
                  <Link to={`/temples?state=${state}`} className="text-stone-400 hover:text-saffron-400 text-sm transition-colors">
                    {state}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Information</h3>
            <ul className="space-y-3 text-sm text-stone-400">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-saffron-500 mt-0.5 shrink-0" />
                Temple information sourced from verified and authentic sources
              </li>
              <li className="flex items-start gap-2">
                <Clock size={14} className="text-saffron-500 mt-0.5 shrink-0" />
                Darshan timings may vary during festivals and special occasions
              </li>
              <li className="flex items-start gap-2">
                <Mail size={14} className="text-saffron-500 mt-0.5 shrink-0" />
                info@devabhumi.in
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-stone-500 text-sm">
            &copy; 2026 Devabhumi — India Temple Heritage & Pilgrimage Portal
          </p>
          <p className="text-stone-600 text-xs">
            Serving pilgrims, tourists & researchers across India
          </p>
        </div>
      </div>
    </footer>
  )
}
