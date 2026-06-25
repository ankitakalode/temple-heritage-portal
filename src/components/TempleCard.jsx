import { Link } from 'react-router-dom'
import { MapPin, Clock, Star } from 'lucide-react'

export default function TempleCard({ temple }) {
  return (
    <Link to={`/temples/${temple.slug}`} className="temple-card group block">
      <div className="relative h-52 overflow-hidden">
        <img
          src={temple.image_url}
          alt={temple.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src = 'https://images.pexels.com/photos/2387795/pexels-photo-2387795.jpeg'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {temple.is_featured && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-gold-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
            <Star size={10} fill="white" />
            Featured
          </div>
        )}
        <div className="absolute bottom-3 left-3">
          <span className="badge-saffron text-xs">{temple.religion || 'Hindu'}</span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-stone-900 text-lg leading-tight mb-1 group-hover:text-maroon-950 transition-colors" style={{ fontFamily: 'var(--font-serif)' }}>
          {temple.name}
        </h3>
        <p className="text-maroon-700 text-sm font-medium mb-3">{temple.deity_name}</p>

        <div className="flex flex-col gap-1.5 text-sm text-stone-500">
          <div className="flex items-center gap-2">
            <MapPin size={13} className="text-saffron-500 shrink-0" />
            <span>{temple.city}, {temple.state}</span>
          </div>
          {temple.darshan_open_time && (
            <div className="flex items-center gap-2">
              <Clock size={13} className="text-saffron-500 shrink-0" />
              <span>{temple.darshan_open_time} – {temple.darshan_close_time}</span>
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between">
          <span className="text-xs text-stone-400">{temple.architecture_style}</span>
          <span className="text-maroon-950 text-sm font-semibold group-hover:translate-x-1 transition-transform inline-block">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  )
}
