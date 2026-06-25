import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, MapPin, Clock, Star, ArrowRight, BookOpen, Compass, Calendar, Users } from 'lucide-react'
import { supabase } from '../lib/supabase'
import TempleCard from '../components/TempleCard'

const STATES = [
  'Andhra Pradesh', 'Delhi', 'Gujarat', 'Jammu & Kashmir', 'Karnataka',
  'Kerala', 'Maharashtra', 'Odisha', 'Punjab', 'Rajasthan',
  'Tamil Nadu', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
]

const HERO_IMAGE = 'https://images.pexels.com/photos/2387795/pexels-photo-2387795.jpeg'

export default function Home() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [selectedState, setSelectedState] = useState('')
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFeatured() {
      const { data } = await supabase
        .from('temples')
        .select('*')
        .eq('is_featured', true)
        .limit(6)
      setFeatured(data || [])
      setLoading(false)
    }
    fetchFeatured()
  }, [])

  function handleSearch(e) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (selectedState) params.set('state', selectedState)
    navigate(`/temples?${params.toString()}`)
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="Indian Temple"
            className="w-full h-full object-cover"
          />
          <div className="hero-overlay absolute inset-0" />
        </div>

        <div className="relative z-10 text-center text-white px-4 sm:px-6 max-w-5xl mx-auto pt-20">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-saffron-200 text-sm font-medium px-4 py-2 rounded-full mb-6 backdrop-blur-sm animate-fade-in-up">
            <Star size={14} fill="currentColor" />
            India's Temple Heritage & Pilgrimage Portal
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6 animate-fade-in-up animate-delay-100">
            Discover the Sacred
            <span className="block text-saffron-300">Temples of India</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up animate-delay-200">
            Comprehensive information on temple history, rituals, darshan timings, festivals,
            and pilgrimage guidance for over 12 sacred sites across India.
          </p>

          {/* Search Form */}
          <div className="animate-fade-in-up animate-delay-300">
            <form onSubmit={handleSearch} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 max-w-3xl mx-auto shadow-2xl">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 flex items-center gap-3 bg-white rounded-xl px-4 py-3">
                  <Search size={18} className="text-stone-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search temples, deities, cities..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 text-stone-800 placeholder-stone-400 text-sm outline-none bg-transparent"
                  />
                </div>
                <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 sm:w-52">
                  <MapPin size={18} className="text-stone-400 shrink-0" />
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="flex-1 text-stone-700 text-sm outline-none bg-transparent"
                  >
                    <option value="">All States</option>
                    {STATES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="bg-maroon-950 hover:bg-maroon-800 text-white font-semibold px-8 py-3 rounded-xl transition-colors whitespace-nowrap"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              {['Varanasi', 'Tirupati', 'Amritsar', 'Madurai', 'Puri'].map((city) => (
                <button
                  key={city}
                  onClick={() => navigate(`/temples?q=${city}`)}
                  className="text-white/70 hover:text-white text-sm bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-full transition-colors border border-white/20"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 text-xs">
          <div className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-white/50 rounded-full animate-bounce" />
          </div>
          Scroll to explore
        </div>
      </section>

      {/* Stats */}
      <section className="bg-maroon-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: BookOpen, label: 'Temples Listed', value: '12+' },
              { icon: MapPin, label: 'States Covered', value: '10+' },
              { icon: Calendar, label: 'Festivals Documented', value: '25+' },
              { icon: Users, label: 'Pilgrims Served Daily', value: '1M+' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="text-center">
                <div className="flex justify-center mb-2">
                  <Icon size={22} className="text-saffron-400" />
                </div>
                <div className="text-3xl font-bold text-saffron-300 mb-1">{value}</div>
                <div className="text-white/60 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Temples */}
      <section className="py-20 pattern-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-saffron-600 font-medium text-sm mb-3">
              <Star size={14} fill="currentColor" />
              Featured Sacred Sites
            </div>
            <h2 className="section-title">Revered Temples of India</h2>
            <p className="section-subtitle">
              Explore some of India's most iconic pilgrimage destinations
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden animate-pulse">
                  <div className="h-52 bg-stone-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-stone-200 rounded w-3/4" />
                    <div className="h-4 bg-stone-100 rounded w-1/2" />
                    <div className="h-4 bg-stone-100 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((temple) => (
                <TempleCard key={temple.id} temple={temple} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/temples" className="btn-primary">
              View All Temples
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features / Why Use */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-title">Everything a Pilgrim Needs</h2>
            <p className="section-subtitle">Reliable, well-organized temple information at your fingertips</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🕌',
                title: 'Temple History & Heritage',
                desc: 'Detailed historical background, architectural significance, and cultural importance of each temple.',
              },
              {
                icon: '🙏',
                title: 'Deity & Ritual Information',
                desc: 'Complete deity details, significance, and daily pooja/aarti schedules with exact timings.',
              },
              {
                icon: '⏰',
                title: 'Darshan Timings',
                desc: 'Accurate darshan opening and closing times, including special timings during festivals.',
              },
              {
                icon: '🎉',
                title: 'Festival Calendars',
                desc: 'Comprehensive festival guides with dates, rituals, and what to expect during each celebration.',
              },
              {
                icon: '👔',
                title: 'Visitor Guidelines',
                desc: 'Dress code, entry rules, what to carry, photography policies, and cultural etiquette.',
              },
              {
                icon: '🗺️',
                title: 'Travel & Facilities',
                desc: 'Nearest railway stations, airports, accommodation options, and transportation guidance.',
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="group p-6 rounded-xl border border-stone-100 hover:border-saffron-200 hover:shadow-md transition-all duration-200 bg-stone-50 hover:bg-white">
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="font-bold text-stone-900 text-lg mb-2" style={{ fontFamily: 'var(--font-serif)' }}>{title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by State */}
      <section className="py-20 bg-stone-50 pattern-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Browse by State</h2>
            <p className="section-subtitle">Discover temples in every corner of India</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {[
              { state: 'Uttar Pradesh', count: 1 },
              { state: 'Tamil Nadu', count: 3 },
              { state: 'Gujarat', count: 2 },
              { state: 'Andhra Pradesh', count: 1 },
              { state: 'Punjab', count: 1 },
              { state: 'Odisha', count: 1 },
              { state: 'Uttarakhand', count: 1 },
              { state: 'Jammu & Kashmir', count: 1 },
              { state: 'Delhi', count: 1 },
            ].map(({ state, count }) => (
              <Link
                key={state}
                to={`/temples?state=${encodeURIComponent(state)}`}
                className="flex items-center gap-2 px-5 py-3 bg-white border border-stone-200 rounded-full text-stone-700 hover:border-maroon-950 hover:text-maroon-950 hover:bg-maroon-50 transition-all duration-200 font-medium text-sm shadow-sm hover:shadow"
              >
                <MapPin size={14} className="text-saffron-500" />
                {state}
                <span className="bg-stone-100 text-stone-500 text-xs px-1.5 py-0.5 rounded-full">{count}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-maroon-950 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-saffron-400 text-5xl mb-6">ॐ</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
            Plan Your Pilgrimage Today
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Explore temples across India with complete visitor information, darshan timings,
            and cultural guides to make your pilgrimage meaningful.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/temples" className="bg-saffron-500 hover:bg-saffron-400 text-white font-bold px-8 py-4 rounded-xl transition-colors shadow-lg">
              Explore All Temples
            </Link>
            <Link to="/about" className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl transition-colors">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
