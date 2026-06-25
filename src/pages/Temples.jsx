import { useState, useEffect, useCallback } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Search, MapPin, Filter, X, SlidersHorizontal } from 'lucide-react'
import { supabase } from '../lib/supabase'
import TempleCard from '../components/TempleCard'

const STATES = [
  'Andhra Pradesh', 'Delhi', 'Gujarat', 'Jammu & Kashmir', 'Karnataka',
  'Kerala', 'Maharashtra', 'Odisha', 'Punjab', 'Rajasthan',
  'Tamil Nadu', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
]

const RELIGIONS = ['Hindu', 'Sikh', 'Buddhist', 'Jain']

export default function Temples() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [temples, setTemples] = useState([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const query = searchParams.get('q') || ''
  const state = searchParams.get('state') || ''
  const religion = searchParams.get('religion') || ''
  const featured = searchParams.get('featured') || ''

  const [localQuery, setLocalQuery] = useState(query)

  const fetchTemples = useCallback(async () => {
    setLoading(true)
    let req = supabase.from('temples').select('*', { count: 'exact' })

    if (query) {
      req = req.or(
        `name.ilike.%${query}%,city.ilike.%${query}%,deity_name.ilike.%${query}%,state.ilike.%${query}%`
      )
    }
    if (state) req = req.eq('state', state)
    if (religion) req = req.eq('religion', religion)
    if (featured === 'true') req = req.eq('is_featured', true)

    const { data, count } = await req.order('is_featured', { ascending: false }).order('name')
    setTemples(data || [])
    setTotal(count || 0)
    setLoading(false)
  }, [query, state, religion, featured])

  useEffect(() => {
    fetchTemples()
  }, [fetchTemples])

  useEffect(() => {
    setLocalQuery(query)
  }, [query])

  function applySearch(e) {
    e.preventDefault()
    const p = new URLSearchParams(searchParams)
    if (localQuery) p.set('q', localQuery)
    else p.delete('q')
    setSearchParams(p)
  }

  function setFilter(key, value) {
    const p = new URLSearchParams(searchParams)
    if (value) p.set(key, value)
    else p.delete(key)
    setSearchParams(p)
  }

  function clearAll() {
    setSearchParams({})
    setLocalQuery('')
  }

  const hasFilters = query || state || religion || featured

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-maroon-950 pt-28 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white mb-8">
            <h1 className="text-3xl md:text-5xl font-bold mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
              Explore Temples
            </h1>
            <p className="text-white/70 text-lg">
              Discover sacred temples across India — search by name, city, or state
            </p>
          </div>

          {/* Search bar */}
          <form onSubmit={applySearch} className="max-w-2xl mx-auto">
            <div className="flex gap-3 bg-white/10 backdrop-blur border border-white/20 rounded-xl p-2">
              <div className="flex-1 flex items-center gap-3 bg-white rounded-lg px-4 py-2.5">
                <Search size={16} className="text-stone-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Temple name, city, deity..."
                  value={localQuery}
                  onChange={(e) => setLocalQuery(e.target.value)}
                  className="flex-1 text-stone-800 placeholder-stone-400 text-sm outline-none"
                />
                {localQuery && (
                  <button type="button" onClick={() => { setLocalQuery(''); setFilter('q', '') }}>
                    <X size={14} className="text-stone-400 hover:text-stone-600" />
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="bg-saffron-500 hover:bg-saffron-400 text-white font-semibold px-6 rounded-lg text-sm transition-colors"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <div className="bg-white rounded-xl border border-stone-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
                <div className="flex items-center gap-2 font-semibold text-stone-800">
                  <SlidersHorizontal size={16} />
                  Filters
                </div>
                {hasFilters && (
                  <button onClick={clearAll} className="text-xs text-maroon-700 hover:text-maroon-950 font-medium">
                    Clear all
                  </button>
                )}
              </div>

              {/* State filter */}
              <div className="px-5 py-4 border-b border-stone-50">
                <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">State</div>
                <div className="space-y-1 max-h-60 overflow-y-auto pr-1">
                  <button
                    onClick={() => setFilter('state', '')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${!state ? 'bg-maroon-50 text-maroon-950 font-semibold' : 'text-stone-600 hover:bg-stone-50'}`}
                  >
                    All States
                  </button>
                  {STATES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setFilter('state', s)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${state === s ? 'bg-maroon-50 text-maroon-950 font-semibold' : 'text-stone-600 hover:bg-stone-50'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Religion filter */}
              <div className="px-5 py-4 border-b border-stone-50">
                <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">Religion</div>
                <div className="space-y-1">
                  <button
                    onClick={() => setFilter('religion', '')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${!religion ? 'bg-maroon-50 text-maroon-950 font-semibold' : 'text-stone-600 hover:bg-stone-50'}`}
                  >
                    All Religions
                  </button>
                  {RELIGIONS.map((r) => (
                    <button
                      key={r}
                      onClick={() => setFilter('religion', r)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${religion === r ? 'bg-maroon-50 text-maroon-950 font-semibold' : 'text-stone-600 hover:bg-stone-50'}`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Featured filter */}
              <div className="px-5 py-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={featured === 'true'}
                    onChange={(e) => setFilter('featured', e.target.checked ? 'true' : '')}
                    className="w-4 h-4 rounded accent-maroon-950"
                  />
                  <span className="text-sm text-stone-700 font-medium">Featured temples only</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1">
            {/* Results header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-stone-800 font-semibold">
                  {loading ? 'Loading...' : `${total} temple${total !== 1 ? 's' : ''} found`}
                </div>
                {hasFilters && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {query && (
                      <span className="badge-saffron flex items-center gap-1">
                        "{query}"
                        <button onClick={() => { setLocalQuery(''); setFilter('q', '') }}>
                          <X size={10} />
                        </button>
                      </span>
                    )}
                    {state && (
                      <span className="badge-maroon flex items-center gap-1">
                        {state}
                        <button onClick={() => setFilter('state', '')}>
                          <X size={10} />
                        </button>
                      </span>
                    )}
                    {religion && (
                      <span className="badge-gold flex items-center gap-1">
                        {religion}
                        <button onClick={() => setFilter('religion', '')}>
                          <X size={10} />
                        </button>
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl overflow-hidden animate-pulse">
                    <div className="h-52 bg-stone-200" />
                    <div className="p-5 space-y-3">
                      <div className="h-5 bg-stone-200 rounded w-3/4" />
                      <div className="h-4 bg-stone-100 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : temples.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl border border-stone-100">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-stone-700 mb-2">No temples found</h3>
                <p className="text-stone-400 mb-6">Try adjusting your search or filters</p>
                <button onClick={clearAll} className="btn-outline text-sm px-5 py-2.5">
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {temples.map((temple) => (
                  <TempleCard key={temple.id} temple={temple} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
