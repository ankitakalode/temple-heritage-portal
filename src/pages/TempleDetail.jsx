import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  MapPin, Clock, Calendar, User, ArrowLeft, Building2,
  Info, ShoppingBag, Train, Plane, Hotel, ChevronDown, ChevronUp
} from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function TempleDetail() {
  const { slug } = useParams()
  const [temple, setTemple] = useState(null)
  const [festivals, setFestivals] = useState([])
  const [rituals, setRituals] = useState([])
  const [visitorInfo, setVisitorInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    async function fetchAll() {
      setLoading(true)
      const { data: templeData } = await supabase
        .from('temples')
        .select('*')
        .eq('slug', slug)
        .maybeSingle()

      if (!templeData) {
        setLoading(false)
        return
      }

      setTemple(templeData)

      const [{ data: festData }, { data: ritualData }, { data: visData }] = await Promise.all([
        supabase.from('festivals').select('*').eq('temple_id', templeData.id).order('name'),
        supabase.from('rituals').select('*').eq('temple_id', templeData.id).order('time'),
        supabase.from('visitor_info').select('*').eq('temple_id', templeData.id).maybeSingle(),
      ])

      setFestivals(festData || [])
      setRituals(ritualData || [])
      setVisitorInfo(visData)
      setLoading(false)
    }

    fetchAll()
    window.scrollTo(0, 0)
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 pt-20">
        <div className="max-w-5xl mx-auto px-4 py-12 space-y-6 animate-pulse">
          <div className="h-80 bg-stone-200 rounded-2xl" />
          <div className="h-8 bg-stone-200 rounded w-1/2" />
          <div className="h-4 bg-stone-100 rounded w-3/4" />
          <div className="h-4 bg-stone-100 rounded w-2/3" />
        </div>
      </div>
    )
  }

  if (!temple) {
    return (
      <div className="min-h-screen bg-stone-50 pt-32 flex flex-col items-center justify-center">
        <div className="text-5xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold text-stone-700 mb-2">Temple not found</h2>
        <p className="text-stone-400 mb-6">The temple you are looking for does not exist.</p>
        <Link to="/temples" className="btn-primary">Back to Temples</Link>
      </div>
    )
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'rituals', label: 'Rituals & Timings' },
    { id: 'festivals', label: 'Festivals' },
    { id: 'visitor', label: 'Visitor Info' },
  ]

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Image */}
      <div className="relative h-[55vh] min-h-[380px] overflow-hidden">
        <img
          src={temple.image_url}
          alt={temple.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://images.pexels.com/photos/2387795/pexels-photo-2387795.jpeg'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        {/* Back button */}
        <div className="absolute top-20 left-4 sm:left-8">
          <Link
            to="/temples"
            className="flex items-center gap-2 text-white/80 hover:text-white text-sm bg-black/30 hover:bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full transition-colors"
          >
            <ArrowLeft size={14} />
            All Temples
          </Link>
        </div>

        {/* Temple name overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="badge-saffron">{temple.religion || 'Hindu'}</span>
              {temple.is_featured && (
                <span className="badge bg-gold-500 text-white">Featured</span>
              )}
              {temple.built_year && (
                <span className="badge bg-white/20 text-white backdrop-blur-sm">{temple.built_year}</span>
              )}
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
              {temple.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
              <span className="flex items-center gap-1.5">
                <User size={14} className="text-saffron-400" />
                {temple.deity_name}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-saffron-400" />
                {temple.city}, {temple.state}
              </span>
              {temple.darshan_open_time && (
                <span className="flex items-center gap-1.5">
                  <Clock size={14} className="text-saffron-400" />
                  {temple.darshan_open_time} – {temple.darshan_close_time}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick info bar */}
      <div className="bg-maroon-950 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { icon: Clock, label: 'Darshan Hours', value: temple.darshan_open_time ? `${temple.darshan_open_time} – ${temple.darshan_close_time}` : 'See details' },
              { icon: ShoppingBag, label: 'Entry Fee', value: temple.entry_fee || 'Free' },
              { icon: Building2, label: 'Architecture', value: temple.architecture_style || 'Traditional' },
              { icon: MapPin, label: 'Location', value: `${temple.city}, ${temple.state}` },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="px-4 py-4 text-center">
                <div className="flex justify-center mb-1">
                  <Icon size={14} className="text-saffron-400" />
                </div>
                <div className="text-xs text-white/50 mb-0.5">{label}</div>
                <div className="text-sm font-medium text-saffron-200 leading-tight">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-stone-200 sticky top-[64px] md:top-[80px] z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <div className="flex overflow-x-auto gap-0 -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 px-5 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-maroon-950 text-maroon-950'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* History */}
            {temple.history && (
              <div className="info-card">
                <h2 className="text-2xl font-bold text-stone-900 mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
                  History & Significance
                </h2>
                <p className="text-stone-600 leading-relaxed text-[15px]">{temple.history}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Deity */}
              {temple.deity_significance && (
                <div className="info-card">
                  <h3 className="text-lg font-bold text-stone-900 mb-3 flex items-center gap-2" style={{ fontFamily: 'var(--font-serif)' }}>
                    <span className="text-2xl">🙏</span>
                    {temple.deity_name}
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed">{temple.deity_significance}</p>
                </div>
              )}

              {/* Quick facts */}
              <div className="info-card">
                <h3 className="text-lg font-bold text-stone-900 mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
                  Quick Facts
                </h3>
                <ul className="space-y-3">
                  {[
                    { label: 'Dedicated To', value: temple.deity_name },
                    { label: 'Location', value: `${temple.city}, ${temple.state}` },
                    { label: 'Architecture', value: temple.architecture_style },
                    { label: 'Built', value: temple.built_year },
                    { label: 'Religion', value: temple.religion || 'Hindu' },
                    { label: 'Entry Fee', value: temple.entry_fee || 'Free' },
                  ].filter(({ value }) => value).map(({ label, value }) => (
                    <li key={label} className="flex items-start justify-between gap-4 text-sm">
                      <span className="text-stone-400 shrink-0">{label}</span>
                      <span className="text-stone-800 font-medium text-right">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Dress Code */}
            {temple.dress_code && (
              <div className="info-card border-l-4 border-l-saffron-400">
                <h3 className="text-lg font-bold text-stone-900 mb-2 flex items-center gap-2" style={{ fontFamily: 'var(--font-serif)' }}>
                  <span>👔</span> Dress Code
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">{temple.dress_code}</p>
              </div>
            )}

            {/* Address */}
            {temple.address && (
              <div className="info-card flex items-start gap-4">
                <div className="w-10 h-10 bg-saffron-50 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-saffron-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-800 mb-1">Address</h3>
                  <p className="text-stone-500 text-sm">{temple.address}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Rituals Tab */}
        {activeTab === 'rituals' && (
          <div className="space-y-6">
            <div className="info-card">
              <h2 className="text-2xl font-bold text-stone-900 mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
                Daily Rituals & Pooja Schedule
              </h2>
              <p className="text-stone-500 text-sm mb-6">
                Darshan: <span className="font-semibold text-stone-700">{temple.darshan_open_time || 'See below'}</span>
                {temple.darshan_close_time && <> – <span className="font-semibold text-stone-700">{temple.darshan_close_time}</span></>}
              </p>

              {rituals.length > 0 ? (
                <div className="space-y-4">
                  {rituals.map((ritual) => (
                    <div key={ritual.id} className="flex gap-5 py-4 border-b border-stone-100 last:border-0">
                      <div className="w-32 shrink-0">
                        <div className="flex items-center gap-1.5 text-maroon-700 bg-maroon-50 px-3 py-1.5 rounded-lg text-xs font-semibold text-center">
                          <Clock size={11} />
                          {ritual.time}
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-stone-800 mb-1">{ritual.name}</div>
                        {ritual.description && (
                          <p className="text-stone-500 text-sm leading-relaxed">{ritual.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-stone-400">
                  <Clock size={40} className="mx-auto mb-3 opacity-30" />
                  <p>Detailed ritual timings not yet available for this temple.</p>
                  <p className="text-sm mt-1">Please contact the temple administration for the latest schedule.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Festivals Tab */}
        {activeTab === 'festivals' && (
          <div className="space-y-6">
            <div className="info-card">
              <h2 className="text-2xl font-bold text-stone-900 mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
                Festivals & Celebrations
              </h2>

              {festivals.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {festivals.map((festival) => (
                    <div key={festival.id} className="bg-stone-50 hover:bg-saffron-50 border border-stone-100 hover:border-saffron-200 rounded-xl p-5 transition-colors">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h3 className="font-bold text-stone-900" style={{ fontFamily: 'var(--font-serif)' }}>
                          {festival.name}
                        </h3>
                        {festival.month && (
                          <span className="badge-gold shrink-0">
                            {festival.month}
                          </span>
                        )}
                      </div>
                      {festival.date_range && (
                        <div className="flex items-center gap-1.5 text-saffron-600 text-xs font-medium mb-2">
                          <Calendar size={12} />
                          {festival.date_range}
                        </div>
                      )}
                      {festival.description && (
                        <p className="text-stone-600 text-sm leading-relaxed">{festival.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-stone-400">
                  <Calendar size={40} className="mx-auto mb-3 opacity-30" />
                  <p>Festival information for this temple is being compiled.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Visitor Info Tab */}
        {activeTab === 'visitor' && (
          <div className="space-y-6">
            {visitorInfo ? (
              <>
                {visitorInfo.best_time_to_visit && (
                  <div className="info-card border-l-4 border-l-gold-500">
                    <h3 className="font-bold text-stone-900 mb-2 flex items-center gap-2" style={{ fontFamily: 'var(--font-serif)' }}>
                      <Calendar size={16} className="text-gold-600" />
                      Best Time to Visit
                    </h3>
                    <p className="text-stone-600 text-sm">{visitorInfo.best_time_to_visit}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {visitorInfo.nearest_railway && (
                    <div className="info-card">
                      <h3 className="font-bold text-stone-900 mb-3 flex items-center gap-2" style={{ fontFamily: 'var(--font-serif)' }}>
                        <Train size={16} className="text-maroon-700" />
                        Nearest Railway Station
                      </h3>
                      <p className="text-stone-600 text-sm">{visitorInfo.nearest_railway}</p>
                    </div>
                  )}

                  {visitorInfo.nearest_airport && (
                    <div className="info-card">
                      <h3 className="font-bold text-stone-900 mb-3 flex items-center gap-2" style={{ fontFamily: 'var(--font-serif)' }}>
                        <Plane size={16} className="text-maroon-700" />
                        Nearest Airport
                      </h3>
                      <p className="text-stone-600 text-sm">{visitorInfo.nearest_airport}</p>
                    </div>
                  )}
                </div>

                {visitorInfo.accommodation && (
                  <div className="info-card">
                    <h3 className="font-bold text-stone-900 mb-3 flex items-center gap-2" style={{ fontFamily: 'var(--font-serif)' }}>
                      <Hotel size={16} className="text-maroon-700" />
                      Accommodation
                    </h3>
                    <p className="text-stone-600 text-sm leading-relaxed">{visitorInfo.accommodation}</p>
                  </div>
                )}

                {visitorInfo.special_guidelines && (
                  <div className="info-card border-l-4 border-l-maroon-700">
                    <h3 className="font-bold text-stone-900 mb-3 flex items-center gap-2" style={{ fontFamily: 'var(--font-serif)' }}>
                      <Info size={16} className="text-maroon-700" />
                      Important Guidelines
                    </h3>
                    <p className="text-stone-600 text-sm leading-relaxed">{visitorInfo.special_guidelines}</p>
                  </div>
                )}
              </>
            ) : (
              <div className="info-card">
                <div className="text-center py-12 text-stone-400">
                  <Info size={40} className="mx-auto mb-3 opacity-30" />
                  <p>Detailed visitor information for this temple is being compiled.</p>
                </div>

                {/* Still show dress code and darshan info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                  {temple.darshan_open_time && (
                    <div className="bg-stone-50 rounded-xl p-5">
                      <h3 className="font-semibold text-stone-800 mb-2 flex items-center gap-2">
                        <Clock size={15} className="text-saffron-600" />
                        Darshan Timings
                      </h3>
                      <p className="text-stone-600 text-sm">{temple.darshan_open_time} – {temple.darshan_close_time}</p>
                    </div>
                  )}
                  {temple.dress_code && (
                    <div className="bg-stone-50 rounded-xl p-5">
                      <h3 className="font-semibold text-stone-800 mb-2">Dress Code</h3>
                      <p className="text-stone-600 text-sm">{temple.dress_code}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Back link */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 pb-12">
        <Link to="/temples" className="inline-flex items-center gap-2 text-maroon-700 hover:text-maroon-950 text-sm font-medium">
          <ArrowLeft size={14} />
          Back to All Temples
        </Link>
      </div>
    </div>
  )
}
