import { useState } from 'react'

// ─── Data ────────────────────────────────────────────────────────────────────

type Room = {
  id: number
  name: string
  type: string
  price: number
  capacity: number
  size: number
  floor: number
  amenities: string[]
  image: string
  available: boolean
  rating: number
  reviews: number
  description: string
}

type Booking = {
  id: string
  guestName: string
  guestEmail: string
  roomId: number
  roomName: string
  checkIn: string
  checkOut: string
  guests: number
  total: number
  status: 'confirmed' | 'pending' | 'cancelled' | 'checked-in'
  createdAt: string
}

const ROOMS: Room[] = [
  {
    id: 1,
    name: 'Grand Deluxe Suite',
    type: 'Suite',
    price: 480,
    capacity: 2,
    size: 68,
    floor: 14,
    amenities: ['King Bed', 'City View', 'Jacuzzi', 'Mini Bar', 'Butler Service', 'Nespresso'],
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop&auto=format',
    available: true,
    rating: 4.9,
    reviews: 142,
    description: 'Sweeping city panoramas from the 14th floor. Hand-stitched headboard, Italian marble bath with soaking tub, and dedicated butler service around the clock.',
  },
  {
    id: 2,
    name: 'Ocean Premiere Room',
    type: 'Premiere',
    price: 320,
    capacity: 2,
    size: 48,
    floor: 9,
    amenities: ['Queen Bed', 'Ocean View', 'Rain Shower', 'Mini Bar', 'Nespresso'],
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop&auto=format',
    available: true,
    rating: 4.8,
    reviews: 98,
    description: 'Wake to unobstructed ocean horizons. Travertine bath with rain shower, curated minibar, and handwoven linen bedding for the deepest sleep.',
  },
  {
    id: 3,
    name: 'Penthouse Collection',
    type: 'Penthouse',
    price: 1200,
    capacity: 4,
    size: 140,
    floor: 20,
    amenities: ['2 King Beds', 'Panoramic View', 'Private Pool', 'Kitchen', 'Butler Service', 'Gym Access'],
    image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&h=600&fit=crop&auto=format',
    available: true,
    rating: 5.0,
    reviews: 47,
    description: 'The pinnacle of the property. Private plunge pool, wraparound terrace, full kitchen, and a personal butler — the entire 20th floor is yours.',
  },
  {
    id: 4,
    name: 'Garden Courtyard Room',
    type: 'Classic',
    price: 195,
    capacity: 2,
    size: 32,
    floor: 2,
    amenities: ['Queen Bed', 'Garden View', 'Walk-in Shower', 'Nespresso'],
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&h=600&fit=crop&auto=format',
    available: true,
    rating: 4.6,
    reviews: 201,
    description: 'A serene retreat overlooking the manicured courtyard garden. White oak floors, bespoke joinery, and an understated palette designed for calm.',
  },
  {
    id: 5,
    name: 'Junior Suite Terrace',
    type: 'Suite',
    price: 380,
    capacity: 2,
    size: 55,
    floor: 7,
    amenities: ['King Bed', 'Private Terrace', 'Soaking Tub', 'Sitting Area', 'Nespresso'],
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop&auto=format',
    available: false,
    rating: 4.7,
    reviews: 83,
    description: 'An expansive private terrace with al fresco dining furniture and sunloungers. The soaking tub faces floor-to-ceiling glass — pure theatre.',
  },
  {
    id: 6,
    name: 'Heritage Classic Room',
    type: 'Classic',
    price: 175,
    capacity: 1,
    size: 28,
    floor: 3,
    amenities: ['Double Bed', 'City View', 'Walk-in Shower', 'Desk'],
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop&auto=format',
    available: true,
    rating: 4.5,
    reviews: 314,
    description: 'The original bones of the 1927 building — pressed ceilings, dark timber, and brass fittings — paired with entirely modern comfort.',
  },
]

const BOOKINGS: Booking[] = [
  { id: 'BK-0041', guestName: 'Elena Marchetti', guestEmail: 'elena.m@outlook.com', roomId: 3, roomName: 'Penthouse Collection', checkIn: '2026-09-22', checkOut: '2026-09-26', guests: 2, total: 4800, status: 'confirmed', createdAt: '2026-09-10' },
  { id: 'BK-0040', guestName: 'James Okafor', guestEmail: 'j.okafor@gmail.com', roomId: 1, roomName: 'Grand Deluxe Suite', checkIn: '2026-09-18', checkOut: '2026-09-21', guests: 2, total: 1440, status: 'checked-in', createdAt: '2026-09-08' },
  { id: 'BK-0039', guestName: 'Sofía Herrera', guestEmail: 'sofia.h@proton.me', roomId: 2, roomName: 'Ocean Premiere Room', checkIn: '2026-09-20', checkOut: '2026-09-23', guests: 2, total: 960, status: 'confirmed', createdAt: '2026-09-07' },
  { id: 'BK-0038', guestName: 'Luca Ferreira', guestEmail: 'luca.f@icloud.com', roomId: 4, roomName: 'Garden Courtyard Room', checkIn: '2026-09-17', checkOut: '2026-09-19', guests: 1, total: 390, status: 'checked-in', createdAt: '2026-09-05' },
  { id: 'BK-0037', guestName: 'Priya Nair', guestEmail: 'priya.nair@yahoo.com', roomId: 6, roomName: 'Heritage Classic Room', checkIn: '2026-09-15', checkOut: '2026-09-17', guests: 1, total: 350, status: 'confirmed', createdAt: '2026-09-03' },
  { id: 'BK-0036', guestName: 'Tom Lindqvist', guestEmail: 't.lindqvist@gmail.com', roomId: 5, roomName: 'Junior Suite Terrace', checkIn: '2026-09-25', checkOut: '2026-09-28', guests: 2, total: 1140, status: 'pending', createdAt: '2026-09-01' },
  { id: 'BK-0035', guestName: 'Amara Diallo', guestEmail: 'amara.d@outlook.com', roomId: 1, roomName: 'Grand Deluxe Suite', checkIn: '2026-10-01', checkOut: '2026-10-05', guests: 2, total: 1920, status: 'confirmed', createdAt: '2026-08-28' },
  { id: 'BK-0034', guestName: 'Wei Chen', guestEmail: 'wei.chen@gmail.com', roomId: 4, roomName: 'Garden Courtyard Room', checkIn: '2026-09-12', checkOut: '2026-09-14', guests: 2, total: 390, status: 'cancelled', createdAt: '2026-08-25' },
]

// ─── Types ───────────────────────────────────────────────────────────────────

type View = 'home' | 'rooms' | 'room-detail' | 'booking' | 'confirmation' | 'admin-dashboard' | 'admin-bookings' | 'admin-rooms'

// ─── Utility ─────────────────────────────────────────────────────────────────

function nights(checkIn: string, checkOut: string) {
  return Math.max(0, Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000))
}

function fmt(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

function StatusBadge({ status }: { status: Booking['status'] }) {
  const map: Record<Booking['status'], [string, string]> = {
    confirmed: ['bg-emerald-900/60 text-emerald-300 border border-emerald-700/50', 'Confirmed'],
    pending: ['bg-amber-900/60 text-amber-300 border border-amber-700/50', 'Pending'],
    cancelled: ['bg-red-900/60 text-red-300 border border-red-700/50', 'Cancelled'],
    'checked-in': ['bg-blue-900/60 text-blue-300 border border-blue-700/50', 'Checked In'],
  }
  const [cls, label] = map[status]
  return (
    <span className={`font-mono text-xs px-2 py-0.5 rounded-full ${cls}`}>{label}</span>
  )
}

// ─── Stars ───────────────────────────────────────────────────────────────────

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} className={`w-3.5 h-3.5 ${i <= Math.round(rating) ? 'text-[#d4a840]' : 'text-[#1e3a6e]'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  )
}

// ─── User: Navbar ─────────────────────────────────────────────────────────────

function UserNav({ view, setView }: { view: View; setView: (v: View) => void }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4" style={{ background: 'linear-gradient(180deg, rgba(5,12,26,0.98) 0%, rgba(5,12,26,0.0) 100%)' }}>
      <button onClick={() => setView('home')} className="font-display text-xl font-semibold tracking-wide text-[#f5ede0] hover:text-[#d4a840] transition-colors">
        Aurelion
      </button>
      <div className="hidden md:flex items-center gap-8 text-sm text-[#b8a89a] font-medium">
        <button onClick={() => setView('rooms')} className={`hover:text-[#d4a840] transition-colors ${view === 'rooms' ? 'text-[#d4a840]' : ''}`}>Rooms</button>
        <button className="hover:text-[#d4a840] transition-colors">Dining</button>
        <button className="hover:text-[#d4a840] transition-colors">Spa</button>
        <button className="hover:text-[#d4a840] transition-colors">Events</button>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={() => setView('admin-dashboard')} className="text-xs font-mono text-[#6b7f96] hover:text-[#d4a840] transition-colors border border-[#1e3a6e] hover:border-[#d4a840]/50 px-3 py-1.5 rounded">
          Admin
        </button>
        <button className="bg-[#d4a840] hover:bg-[#f0c96a] text-[#050c1a] text-sm font-semibold px-4 py-2 rounded transition-colors">
          Sign in
        </button>
      </div>
    </nav>
  )
}

// ─── User: Home ───────────────────────────────────────────────────────────────

function HomePage({ setView, setSelectedRoom }: { setView: (v: View) => void; setSelectedRoom: (r: Room) => void }) {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState('2')

  function handleSearch() {
    setView('rooms')
  }

  return (
    <div className="bg-[#050c1a] min-h-screen">
      {/* Hero */}
      <section className="relative h-screen flex flex-col justify-end pb-20 px-8 md:px-16 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&h=1000&fit=crop&auto=format"
          alt="Aurelion Hotel exterior at dusk"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(5,12,26,0.3) 0%, rgba(5,12,26,0.6) 50%, rgba(5,12,26,0.92) 100%)' }} />

        <div className="relative z-10 max-w-3xl">
          <p className="font-mono text-[#d4a840] text-xs tracking-[0.2em] uppercase mb-4">Est. 1927 · Coastal Grande</p>
          <h1 className="font-display text-6xl md:text-8xl font-semibold text-[#f5ede0] leading-tight mb-6">
            Where time<br /><em>slows down.</em>
          </h1>
          <p className="text-[#b8a89a] text-lg max-w-lg leading-relaxed">
            Sixty-four rooms and suites above the sea. Award-winning cuisine, a subterranean spa, and two decades of understated hospitality.
          </p>
        </div>

        {/* Search bar */}
        <div className="relative z-10 mt-12 bg-[#0a1628]/80 backdrop-blur border border-[#1e3a6e] rounded-xl p-1 flex flex-col md:flex-row gap-0 max-w-3xl">
          <div className="flex-1 flex flex-col px-5 py-3 border-b md:border-b-0 md:border-r border-[#1e3a6e]">
            <label className="font-mono text-[10px] text-[#6b7f96] uppercase tracking-widest mb-1">Check-in</label>
            <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} className="bg-transparent text-[#f5ede0] text-sm outline-none" />
          </div>
          <div className="flex-1 flex flex-col px-5 py-3 border-b md:border-b-0 md:border-r border-[#1e3a6e]">
            <label className="font-mono text-[10px] text-[#6b7f96] uppercase tracking-widest mb-1">Check-out</label>
            <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} className="bg-transparent text-[#f5ede0] text-sm outline-none" />
          </div>
          <div className="flex-1 flex flex-col px-5 py-3 border-b md:border-b-0 md:border-r border-[#1e3a6e]">
            <label className="font-mono text-[10px] text-[#6b7f96] uppercase tracking-widest mb-1">Guests</label>
            <select value={guests} onChange={e => setGuests(e.target.value)} className="bg-transparent text-[#f5ede0] text-sm outline-none">
              {[1, 2, 3, 4].map(n => <option key={n} value={n} className="bg-[#0a1628]">{n} guest{n > 1 ? 's' : ''}</option>)}
            </select>
          </div>
          <button onClick={handleSearch} className="m-1 bg-[#d4a840] hover:bg-[#f0c96a] text-[#050c1a] font-semibold text-sm px-8 py-3 rounded-lg transition-colors whitespace-nowrap">
            Search rooms
          </button>
        </div>
      </section>

      {/* Featured rooms */}
      <section className="px-8 md:px-16 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="font-mono text-[#d4a840] text-xs tracking-[0.2em] uppercase mb-3">Accommodation</p>
            <h2 className="font-display text-4xl md:text-5xl text-[#f5ede0]">Featured rooms</h2>
          </div>
          <button onClick={() => setView('rooms')} className="hidden md:flex items-center gap-2 text-[#d4a840] text-sm font-medium hover:gap-3 transition-all">
            View all <span>→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ROOMS.slice(0, 3).map(room => (
            <RoomCard key={room.id} room={room} setView={setView} setSelectedRoom={setSelectedRoom} />
          ))}
        </div>
      </section>

      {/* Amenities strip */}
      <section className="border-t border-b border-[#1e3a6e] py-16 px-8 md:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {[
            { icon: '◈', title: 'Subterranean Spa', desc: 'Six treatment rooms, hammam, and an indoor lagoon pool' },
            { icon: '◎', title: 'Fine Dining', desc: 'Michelin-starred kitchen led by Chef Isabelle Laurent' },
            { icon: '◇', title: 'Private Beach', desc: '200m of reserved shoreline with dedicated attendants' },
            { icon: '◉', title: 'Concierge 24h', desc: 'Every request handled before you think to ask' },
          ].map(a => (
            <div key={a.title}>
              <span className="font-mono text-[#d4a840] text-2xl block mb-4">{a.icon}</span>
              <h3 className="font-display text-lg text-[#f5ede0] mb-2">{a.title}</h3>
              <p className="text-[#6b7f96] text-sm leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="px-8 md:px-16 py-24 max-w-4xl">
        <p className="font-mono text-[#d4a840] text-xs tracking-[0.2em] uppercase mb-8">Guest Reviews</p>
        <blockquote className="font-display text-3xl md:text-4xl text-[#f5ede0] italic leading-snug mb-8">
          "There are hotels, and then there is Aurelion. We have returned every anniversary for eleven years."
        </blockquote>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#162b56] flex items-center justify-center text-[#d4a840] font-display font-semibold">M</div>
          <div>
            <p className="text-[#f5ede0] text-sm font-medium">Margaret & Daniel Sousa</p>
            <div className="flex items-center gap-2 mt-0.5">
              <Stars rating={5} />
              <span className="font-mono text-[10px] text-[#6b7f96]">Penthouse Collection</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1e3a6e] px-8 md:px-16 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <p className="font-display text-lg text-[#f5ede0]">Aurelion</p>
        <p className="text-[#6b7f96] text-xs font-mono">© 2026 Aurelion Hotel. All rights reserved.</p>
      </footer>
    </div>
  )
}

// ─── Room Card ────────────────────────────────────────────────────────────────

function RoomCard({ room, setView, setSelectedRoom }: { room: Room; setView: (v: View) => void; setSelectedRoom: (r: Room) => void }) {
  return (
    <article
      className="group relative overflow-hidden rounded-xl border border-[#1e3a6e] hover:border-[#d4a840]/40 transition-all duration-300 cursor-pointer bg-[#0a1628]"
      onClick={() => { setSelectedRoom(room); setView('room-detail') }}
    >
      <div className="relative h-56 overflow-hidden bg-[#162b56]">
        <img src={room.image} alt={room.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        {!room.available && (
          <div className="absolute inset-0 bg-[#050c1a]/60 flex items-center justify-center">
            <span className="font-mono text-xs text-[#f0c96a] border border-[#d4a840]/50 px-3 py-1 rounded-full">Sold Out</span>
          </div>
        )}
        <span className="absolute top-3 left-3 font-mono text-[10px] text-[#d4a840] bg-[#050c1a]/80 px-2 py-1 rounded uppercase tracking-widest">{room.type}</span>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-display text-lg text-[#f5ede0] leading-snug">{room.name}</h3>
          <div className="text-right shrink-0 ml-3">
            <span className="font-display text-xl text-[#d4a840]">{fmt(room.price)}</span>
            <span className="font-mono text-[10px] text-[#6b7f96] block">/night</span>
          </div>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <Stars rating={room.rating} />
          <span className="font-mono text-[10px] text-[#6b7f96]">{room.rating} ({room.reviews})</span>
        </div>
        <div className="flex gap-3 font-mono text-[10px] text-[#6b7f96]">
          <span>{room.size} m²</span>
          <span>·</span>
          <span>Floor {room.floor}</span>
          <span>·</span>
          <span>{room.capacity} guests</span>
        </div>
      </div>
    </article>
  )
}

// ─── User: Rooms ──────────────────────────────────────────────────────────────

function RoomsPage({ setView, setSelectedRoom }: { setView: (v: View) => void; setSelectedRoom: (r: Room) => void }) {
  const [filter, setFilter] = useState<'All' | 'Classic' | 'Premiere' | 'Suite' | 'Penthouse'>('All')
  const types = ['All', 'Classic', 'Premiere', 'Suite', 'Penthouse'] as const
  const filtered = filter === 'All' ? ROOMS : ROOMS.filter(r => r.type === filter)

  return (
    <div className="bg-[#050c1a] min-h-screen pt-24">
      <div className="px-8 md:px-16 py-12">
        <p className="font-mono text-[#d4a840] text-xs tracking-[0.2em] uppercase mb-3">64 Rooms & Suites</p>
        <h1 className="font-display text-5xl text-[#f5ede0] mb-10">Our accommodation</h1>

        {/* Filter */}
        <div className="flex gap-2 flex-wrap mb-10">
          {types.map(t => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`font-mono text-xs px-4 py-2 rounded-full border transition-all ${filter === t ? 'bg-[#d4a840] text-[#050c1a] border-[#d4a840]' : 'text-[#b8a89a] border-[#1e3a6e] hover:border-[#d4a840]/40 hover:text-[#d4a840]'}`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(room => (
            <RoomCard key={room.id} room={room} setView={setView} setSelectedRoom={setSelectedRoom} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── User: Room Detail ────────────────────────────────────────────────────────

function RoomDetailPage({ room, setView, setBookingData }: {
  room: Room
  setView: (v: View) => void
  setBookingData: (b: { room: Room; checkIn: string; checkOut: string; guests: number }) => void
}) {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(1)

  const n = nights(checkIn, checkOut)
  const total = n * room.price

  function handleBook() {
    if (!checkIn || !checkOut || n <= 0) return
    setBookingData({ room, checkIn, checkOut, guests })
    setView('booking')
  }

  return (
    <div className="bg-[#050c1a] min-h-screen pt-20">
      {/* Hero image */}
      <div className="relative h-[55vh] overflow-hidden bg-[#0a1628]">
        <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(5,12,26,1) 100%)' }} />
        <button
          onClick={() => setView('rooms')}
          className="absolute top-6 left-8 flex items-center gap-2 text-[#f5ede0] text-sm font-medium bg-[#0a1628]/60 backdrop-blur px-4 py-2 rounded-lg hover:bg-[#0a1628]/80 transition-colors"
        >
          ← Back
        </button>
      </div>

      <div className="px-8 md:px-16 py-10 grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
        {/* Left: Info */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-[10px] text-[#d4a840] border border-[#d4a840]/50 px-2 py-0.5 rounded uppercase tracking-widest">{room.type}</span>
            <span className="font-mono text-[10px] text-[#6b7f96]">Floor {room.floor} · {room.size} m²</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-[#f5ede0] mb-4">{room.name}</h1>
          <div className="flex items-center gap-3 mb-8">
            <Stars rating={room.rating} />
            <span className="font-mono text-xs text-[#6b7f96]">{room.rating} from {room.reviews} reviews</span>
          </div>
          <p className="text-[#b8a89a] text-base leading-relaxed mb-10 max-w-lg">{room.description}</p>

          <h2 className="font-display text-xl text-[#f5ede0] mb-5">Room amenities</h2>
          <div className="grid grid-cols-2 gap-3">
            {room.amenities.map(a => (
              <div key={a} className="flex items-center gap-3 text-sm text-[#b8a89a]">
                <span className="text-[#d4a840] text-xs">◆</span> {a}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Booking panel */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-[#0a1628] border border-[#1e3a6e] rounded-xl p-6">
            <div className="mb-6">
              <span className="font-display text-3xl text-[#d4a840]">{fmt(room.price)}</span>
              <span className="font-mono text-xs text-[#6b7f96] ml-1">/ night</span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="rounded-lg border border-[#1e3a6e] overflow-hidden">
                <div className="grid grid-cols-2">
                  <div className="px-4 py-3 border-r border-[#1e3a6e]">
                    <label className="font-mono text-[10px] text-[#6b7f96] uppercase tracking-widest block mb-1">Check-in</label>
                    <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} className="bg-transparent text-[#f5ede0] text-sm outline-none w-full" />
                  </div>
                  <div className="px-4 py-3">
                    <label className="font-mono text-[10px] text-[#6b7f96] uppercase tracking-widest block mb-1">Check-out</label>
                    <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} className="bg-transparent text-[#f5ede0] text-sm outline-none w-full" />
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-[#1e3a6e] px-4 py-3">
                <label className="font-mono text-[10px] text-[#6b7f96] uppercase tracking-widest block mb-1">Guests</label>
                <select value={guests} onChange={e => setGuests(Number(e.target.value))} className="bg-transparent text-[#f5ede0] text-sm outline-none w-full">
                  {Array.from({ length: room.capacity }, (_, i) => i + 1).map(n => (
                    <option key={n} value={n} className="bg-[#0a1628]">{n} guest{n > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
            </div>

            {n > 0 && (
              <div className="border-t border-[#1e3a6e] pt-4 mb-4 space-y-2">
                <div className="flex justify-between text-sm text-[#6b7f96]">
                  <span>{fmt(room.price)} × {n} night{n > 1 ? 's' : ''}</span>
                  <span>{fmt(total)}</span>
                </div>
                <div className="flex justify-between text-sm text-[#6b7f96]">
                  <span>Taxes & fees</span>
                  <span>{fmt(total * 0.12)}</span>
                </div>
                <div className="flex justify-between font-semibold text-[#f5ede0] pt-2 border-t border-[#1e3a6e]">
                  <span>Total</span>
                  <span className="text-[#d4a840]">{fmt(total * 1.12)}</span>
                </div>
              </div>
            )}

            <button
              onClick={handleBook}
              disabled={!room.available || !checkIn || !checkOut || n <= 0}
              className="w-full bg-[#d4a840] hover:bg-[#f0c96a] disabled:opacity-40 disabled:cursor-not-allowed text-[#050c1a] font-semibold py-3 rounded-lg transition-colors"
            >
              {room.available ? 'Reserve now' : 'Sold out'}
            </button>
            <p className="text-center font-mono text-[10px] text-[#6b7f96] mt-3">No charge until check-in</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── User: Booking Form ───────────────────────────────────────────────────────

function BookingPage({ bookingData, setView, setConfirmation }: {
  bookingData: { room: Room; checkIn: string; checkOut: string; guests: number }
  setView: (v: View) => void
  setConfirmation: (id: string) => void
}) {
  const { room, checkIn, checkOut, guests } = bookingData
  const n = nights(checkIn, checkOut)
  const subtotal = n * room.price
  const taxes = subtotal * 0.12
  const total = subtotal + taxes

  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', requests: '' })
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '', name: '' })

  function update(f: Partial<typeof form>) { setForm(p => ({ ...p, ...f })) }
  function updateCard(f: Partial<typeof card>) { setCard(p => ({ ...p, ...f })) }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const id = 'BK-' + String(Math.floor(Math.random() * 9000) + 1000)
    setConfirmation(id)
    setView('confirmation')
  }

  return (
    <div className="bg-[#050c1a] min-h-screen pt-24 px-8 md:px-16 pb-20">
      <button onClick={() => setView('room-detail')} className="flex items-center gap-2 text-[#6b7f96] text-sm mb-8 hover:text-[#d4a840] transition-colors">
        ← Back to room
      </button>
      <h1 className="font-display text-4xl text-[#f5ede0] mb-2">Complete your reservation</h1>
      <p className="text-[#6b7f96] text-sm mb-10">{room.name} · {n} night{n > 1 ? 's' : ''} · {checkIn} → {checkOut}</p>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          {/* Guest details */}
          <div className="bg-[#0a1628] border border-[#1e3a6e] rounded-xl p-6">
            <h2 className="font-display text-xl text-[#f5ede0] mb-6">Guest details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'First name', key: 'firstName', type: 'text', placeholder: 'Elena' },
                { label: 'Last name', key: 'lastName', type: 'text', placeholder: 'Marchetti' },
                { label: 'Email address', key: 'email', type: 'email', placeholder: 'elena@example.com' },
                { label: 'Phone number', key: 'phone', type: 'tel', placeholder: '+1 555 000 0000' },
              ].map(f => (
                <div key={f.key}>
                  <label className="font-mono text-[10px] text-[#6b7f96] uppercase tracking-widest block mb-1.5">{f.label}</label>
                  <input
                    required
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.key as keyof typeof form]}
                    onChange={e => update({ [f.key]: e.target.value })}
                    className="w-full bg-[#0f2040] border border-[#1e3a6e] focus:border-[#d4a840] rounded-lg px-4 py-2.5 text-[#f5ede0] text-sm outline-none transition-colors placeholder:text-[#2a4f94]"
                  />
                </div>
              ))}
              <div className="sm:col-span-2">
                <label className="font-mono text-[10px] text-[#6b7f96] uppercase tracking-widest block mb-1.5">Special requests</label>
                <textarea
                  placeholder="Late check-in, dietary requirements, room preferences…"
                  value={form.requests}
                  onChange={e => update({ requests: e.target.value })}
                  rows={3}
                  className="w-full bg-[#0f2040] border border-[#1e3a6e] focus:border-[#d4a840] rounded-lg px-4 py-2.5 text-[#f5ede0] text-sm outline-none transition-colors resize-none placeholder:text-[#2a4f94]"
                />
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-[#0a1628] border border-[#1e3a6e] rounded-xl p-6">
            <h2 className="font-display text-xl text-[#f5ede0] mb-6">Payment</h2>
            <div className="space-y-4">
              <div>
                <label className="font-mono text-[10px] text-[#6b7f96] uppercase tracking-widest block mb-1.5">Card number</label>
                <input
                  required
                  type="text"
                  placeholder="4242 4242 4242 4242"
                  value={card.number}
                  onChange={e => updateCard({ number: e.target.value })}
                  className="w-full bg-[#0f2040] border border-[#1e3a6e] focus:border-[#d4a840] rounded-lg px-4 py-2.5 text-[#f5ede0] text-sm outline-none transition-colors placeholder:text-[#2a4f94]"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Expiry', key: 'expiry', placeholder: 'MM / YY' },
                  { label: 'CVV', key: 'cvv', placeholder: '···' },
                  { label: 'Name on card', key: 'name', placeholder: 'E. Marchetti' },
                ].map(f => (
                  <div key={f.key} className={f.key === 'name' ? 'col-span-1' : ''}>
                    <label className="font-mono text-[10px] text-[#6b7f96] uppercase tracking-widest block mb-1.5">{f.label}</label>
                    <input
                      required
                      type="text"
                      placeholder={f.placeholder}
                      value={card[f.key as keyof typeof card]}
                      onChange={e => updateCard({ [f.key]: e.target.value })}
                      className="w-full bg-[#0f2040] border border-[#1e3a6e] focus:border-[#d4a840] rounded-lg px-4 py-2.5 text-[#f5ede0] text-sm outline-none transition-colors placeholder:text-[#2a4f94]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div>
          <div className="sticky top-24 bg-[#0a1628] border border-[#1e3a6e] rounded-xl p-6 space-y-4">
            <img src={room.image} alt={room.name} className="w-full h-40 object-cover rounded-lg" />
            <div>
              <span className="font-mono text-[10px] text-[#d4a840] uppercase tracking-widest">{room.type}</span>
              <h3 className="font-display text-xl text-[#f5ede0]">{room.name}</h3>
            </div>
            <div className="border-t border-[#1e3a6e] pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-[#6b7f96]">
                <span>Check-in</span><span>{checkIn}</span>
              </div>
              <div className="flex justify-between text-[#6b7f96]">
                <span>Check-out</span><span>{checkOut}</span>
              </div>
              <div className="flex justify-between text-[#6b7f96]">
                <span>Guests</span><span>{guests}</span>
              </div>
              <div className="flex justify-between text-[#6b7f96] border-t border-[#1e3a6e] pt-2">
                <span>{fmt(room.price)} × {n} nights</span><span>{fmt(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#6b7f96]">
                <span>Taxes & fees (12%)</span><span>{fmt(taxes)}</span>
              </div>
              <div className="flex justify-between font-semibold text-[#f5ede0] border-t border-[#1e3a6e] pt-2">
                <span>Total</span><span className="text-[#d4a840] font-display text-xl">{fmt(total)}</span>
              </div>
            </div>
            <button type="submit" className="w-full bg-[#d4a840] hover:bg-[#f0c96a] text-[#050c1a] font-semibold py-3 rounded-lg transition-colors">
              Confirm & pay
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

// ─── User: Confirmation ───────────────────────────────────────────────────────

function ConfirmationPage({ confirmationId, setView }: { confirmationId: string; setView: (v: View) => void }) {
  return (
    <div className="bg-[#050c1a] min-h-screen flex items-center justify-center px-8">
      <div className="text-center max-w-lg">
        <div className="w-16 h-16 rounded-full border border-[#d4a840] flex items-center justify-center mx-auto mb-8 text-[#d4a840] text-2xl">✓</div>
        <p className="font-mono text-[#d4a840] text-xs tracking-[0.2em] uppercase mb-4">Booking confirmed</p>
        <h1 className="font-display text-5xl text-[#f5ede0] mb-4">See you soon.</h1>
        <p className="text-[#6b7f96] leading-relaxed mb-6">
          Your reservation is confirmed. A confirmation email and all details have been sent to your inbox.
        </p>
        <div className="bg-[#0a1628] border border-[#1e3a6e] rounded-xl p-5 mb-10 inline-block">
          <p className="font-mono text-xs text-[#6b7f96] uppercase tracking-widest mb-1">Booking reference</p>
          <p className="font-mono text-2xl text-[#d4a840]">{confirmationId}</p>
        </div>
        <div className="flex gap-4 justify-center">
          <button onClick={() => setView('home')} className="border border-[#1e3a6e] hover:border-[#d4a840]/50 text-[#f5ede0] text-sm font-medium px-6 py-2.5 rounded-lg transition-colors">
            Back to home
          </button>
          <button onClick={() => setView('rooms')} className="bg-[#d4a840] hover:bg-[#f0c96a] text-[#050c1a] text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors">
            Browse more rooms
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Admin: Sidebar ───────────────────────────────────────────────────────────

function AdminSidebar({ view, setView }: { view: View; setView: (v: View) => void }) {
  const links: { v: View; label: string; icon: string }[] = [
    { v: 'admin-dashboard', label: 'Dashboard', icon: '▦' },
    { v: 'admin-bookings', label: 'Bookings', icon: '≡' },
    { v: 'admin-rooms', label: 'Rooms', icon: '◻' },
  ]

  return (
    <aside className="w-56 shrink-0 bg-[#0a1628] border-r border-[#1e3a6e] flex flex-col">
      <div className="px-6 py-5 border-b border-[#1e3a6e]">
        <p className="font-display text-lg text-[#f5ede0]">Aurelion</p>
        <p className="font-mono text-[10px] text-[#6b7f96] mt-0.5">Admin portal</p>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {links.map(l => (
          <button
            key={l.v}
            onClick={() => setView(l.v)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left transition-all ${view === l.v ? 'bg-[#d4a840]/10 text-[#d4a840] border border-[#d4a840]/20' : 'text-[#6b7f96] hover:text-[#f5ede0] hover:bg-[#0f2040]'}`}
          >
            <span className="text-xs">{l.icon}</span> {l.label}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-[#1e3a6e]">
        <button onClick={() => setView('home')} className="w-full text-xs font-mono text-[#6b7f96] hover:text-[#d4a840] transition-colors text-left">
          ← Guest site
        </button>
      </div>
    </aside>
  )
}

// ─── Admin: Dashboard ─────────────────────────────────────────────────────────

function AdminDashboard({ setView }: { setView: (v: View) => void }) {
  const confirmed = BOOKINGS.filter(b => b.status === 'confirmed').length
  const checkedIn = BOOKINGS.filter(b => b.status === 'checked-in').length
  const revenue = BOOKINGS.filter(b => b.status !== 'cancelled').reduce((s, b) => s + b.total, 0)
  const occupancy = Math.round(((confirmed + checkedIn) / ROOMS.length) * 100)

  const stats = [
    { label: 'Revenue (Sept)', value: fmt(revenue), sub: '+18% vs last month', positive: true },
    { label: 'Active bookings', value: String(confirmed + checkedIn), sub: `${confirmed} confirmed, ${checkedIn} checked in`, positive: true },
    { label: 'Occupancy', value: `${occupancy}%`, sub: '12 of 64 rooms', positive: true },
    { label: 'Avg. stay value', value: fmt(revenue / BOOKINGS.filter(b => b.status !== 'cancelled').length), sub: 'Per booking', positive: false },
  ]

  return (
    <div className="flex-1 overflow-auto p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl text-[#f5ede0]">Dashboard</h1>
        <p className="font-mono text-xs text-[#6b7f96] mt-1">September 17, 2026</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map(s => (
          <div key={s.label} className="bg-[#0f2040] border border-[#1e3a6e] rounded-xl p-5">
            <p className="font-mono text-[10px] text-[#6b7f96] uppercase tracking-widest mb-2">{s.label}</p>
            <p className="font-display text-2xl text-[#f5ede0] mb-1">{s.value}</p>
            <p className={`font-mono text-[10px] ${s.positive ? 'text-emerald-400' : 'text-[#6b7f96]'}`}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Recent bookings */}
      <div className="bg-[#0a1628] border border-[#1e3a6e] rounded-xl overflow-hidden mb-8">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e3a6e]">
          <h2 className="font-display text-lg text-[#f5ede0]">Recent bookings</h2>
          <button onClick={() => setView('admin-bookings')} className="font-mono text-xs text-[#d4a840] hover:underline">View all</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1e3a6e]">
                {['Booking ID', 'Guest', 'Room', 'Check-in', 'Total', 'Status'].map(h => (
                  <th key={h} className="text-left font-mono text-[10px] text-[#6b7f96] uppercase tracking-widest px-6 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {BOOKINGS.slice(0, 5).map(b => (
                <tr key={b.id} className="border-b border-[#1e3a6e]/50 hover:bg-[#0f2040]/50 transition-colors">
                  <td className="px-6 py-3 font-mono text-xs text-[#d4a840]">{b.id}</td>
                  <td className="px-6 py-3 text-sm text-[#f5ede0]">{b.guestName}</td>
                  <td className="px-6 py-3 text-sm text-[#b8a89a]">{b.roomName}</td>
                  <td className="px-6 py-3 font-mono text-xs text-[#6b7f96]">{b.checkIn}</td>
                  <td className="px-6 py-3 text-sm text-[#f5ede0]">{fmt(b.total)}</td>
                  <td className="px-6 py-3"><StatusBadge status={b.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Room occupancy */}
      <div className="bg-[#0a1628] border border-[#1e3a6e] rounded-xl p-6">
        <h2 className="font-display text-lg text-[#f5ede0] mb-6">Room type breakdown</h2>
        <div className="space-y-4">
          {[
            { type: 'Penthouse', rooms: 2, booked: 2, color: '#d4a840' },
            { type: 'Suite', rooms: 12, booked: 8, color: '#6b7f96' },
            { type: 'Premiere', rooms: 20, booked: 14, color: '#2a4f94' },
            { type: 'Classic', rooms: 30, booked: 18, color: '#162b56' },
          ].map(r => (
            <div key={r.type} className="flex items-center gap-4">
              <span className="font-mono text-xs text-[#6b7f96] w-20 shrink-0">{r.type}</span>
              <div className="flex-1 h-2 bg-[#0f2040] rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${(r.booked / r.rooms) * 100}%`, background: r.color }} />
              </div>
              <span className="font-mono text-xs text-[#f5ede0] w-16 text-right">{r.booked}/{r.rooms}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Admin: Bookings ──────────────────────────────────────────────────────────

function AdminBookings() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | Booking['status']>('all')
  const [bookings, setBookings] = useState<Booking[]>(BOOKINGS)

  const filtered = bookings.filter(b => {
    const matchSearch = b.guestName.toLowerCase().includes(search.toLowerCase()) || b.id.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || b.status === statusFilter
    return matchSearch && matchStatus
  })

  function updateStatus(id: string, status: Booking['status']) {
    setBookings(bs => bs.map(b => b.id === id ? { ...b, status } : b))
  }

  return (
    <div className="flex-1 overflow-auto p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl text-[#f5ede0]">Bookings</h1>
        <p className="font-mono text-xs text-[#6b7f96] mt-1">{filtered.length} reservations</p>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap mb-6">
        <input
          type="text"
          placeholder="Search guest or booking ID…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="bg-[#0a1628] border border-[#1e3a6e] focus:border-[#d4a840] text-[#f5ede0] text-sm px-4 py-2 rounded-lg outline-none placeholder:text-[#2a4f94] transition-colors w-64"
        />
        <div className="flex gap-2">
          {(['all', 'confirmed', 'pending', 'checked-in', 'cancelled'] as const).map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`font-mono text-xs px-3 py-2 rounded-lg border transition-all capitalize ${statusFilter === s ? 'bg-[#d4a840] text-[#050c1a] border-[#d4a840]' : 'text-[#6b7f96] border-[#1e3a6e] hover:border-[#d4a840]/40'}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#0a1628] border border-[#1e3a6e] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1e3a6e]">
                {['ID', 'Guest', 'Room', 'Check-in', 'Check-out', 'Guests', 'Total', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left font-mono text-[10px] text-[#6b7f96] uppercase tracking-widest px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(b => (
                <tr key={b.id} className="border-b border-[#1e3a6e]/50 hover:bg-[#0f2040]/50 transition-colors">
                  <td className="px-5 py-3 font-mono text-xs text-[#d4a840]">{b.id}</td>
                  <td className="px-5 py-3">
                    <p className="text-sm text-[#f5ede0]">{b.guestName}</p>
                    <p className="font-mono text-[10px] text-[#6b7f96]">{b.guestEmail}</p>
                  </td>
                  <td className="px-5 py-3 text-sm text-[#b8a89a] max-w-[120px] truncate">{b.roomName}</td>
                  <td className="px-5 py-3 font-mono text-xs text-[#6b7f96]">{b.checkIn}</td>
                  <td className="px-5 py-3 font-mono text-xs text-[#6b7f96]">{b.checkOut}</td>
                  <td className="px-5 py-3 text-sm text-[#6b7f96] text-center">{b.guests}</td>
                  <td className="px-5 py-3 text-sm text-[#f5ede0]">{fmt(b.total)}</td>
                  <td className="px-5 py-3"><StatusBadge status={b.status} /></td>
                  <td className="px-5 py-3">
                    <select
                      value={b.status}
                      onChange={e => updateStatus(b.id, e.target.value as Booking['status'])}
                      className="bg-[#0f2040] border border-[#1e3a6e] text-[#6b7f96] text-xs rounded px-2 py-1 outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirm</option>
                      <option value="checked-in">Check in</option>
                      <option value="cancelled">Cancel</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ─── Admin: Rooms ─────────────────────────────────────────────────────────────

function AdminRooms() {
  const [rooms, setRooms] = useState<Room[]>(ROOMS)

  function toggleAvailable(id: number) {
    setRooms(rs => rs.map(r => r.id === id ? { ...r, available: !r.available } : r))
  }

  return (
    <div className="flex-1 overflow-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-[#f5ede0]">Rooms</h1>
          <p className="font-mono text-xs text-[#6b7f96] mt-1">{rooms.length} total rooms</p>
        </div>
        <button className="bg-[#d4a840] hover:bg-[#f0c96a] text-[#050c1a] text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
          + Add room
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {rooms.map(room => (
          <div key={room.id} className="bg-[#0a1628] border border-[#1e3a6e] rounded-xl overflow-hidden">
            <div className="relative h-40 bg-[#162b56]">
              <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] to-transparent" />
              <div className="absolute bottom-3 left-4">
                <span className="font-mono text-[10px] text-[#d4a840] bg-[#050c1a]/80 px-2 py-0.5 rounded uppercase tracking-widest">{room.type}</span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-display text-base text-[#f5ede0]">{room.name}</h3>
                  <p className="font-mono text-[10px] text-[#6b7f96] mt-0.5">Floor {room.floor} · {room.size} m² · {room.capacity} guests</p>
                </div>
                <span className="font-display text-lg text-[#d4a840]">{fmt(room.price)}<span className="font-mono text-[10px] text-[#6b7f96]">/n</span></span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Stars rating={room.rating} />
                  <span className="font-mono text-[10px] text-[#6b7f96]">{room.rating}</span>
                </div>
                <button
                  onClick={() => toggleAvailable(room.id)}
                  className={`font-mono text-[10px] px-3 py-1.5 rounded-full border transition-all ${room.available ? 'bg-emerald-900/40 text-emerald-300 border-emerald-700/50 hover:bg-emerald-900/60' : 'bg-red-900/40 text-red-300 border-red-700/50 hover:bg-red-900/60'}`}
                >
                  {room.available ? '● Available' : '○ Unavailable'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [view, setView] = useState<View>('home')
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [bookingData, setBookingData] = useState<{ room: Room; checkIn: string; checkOut: string; guests: number } | null>(null)
  const [confirmationId, setConfirmationId] = useState('')

  const isAdmin = view.startsWith('admin')

  if (isAdmin) {
    return (
      <div className="flex h-screen bg-[#050c1a] overflow-hidden">
        <AdminSidebar view={view} setView={setView} />
        {view === 'admin-dashboard' && <AdminDashboard setView={setView} />}
        {view === 'admin-bookings' && <AdminBookings />}
        {view === 'admin-rooms' && <AdminRooms />}
      </div>
    )
  }

  return (
    <div>
      <UserNav view={view} setView={setView} />
      {view === 'home' && <HomePage setView={setView} setSelectedRoom={setSelectedRoom} />}
      {view === 'rooms' && <RoomsPage setView={setView} setSelectedRoom={setSelectedRoom} />}
      {view === 'room-detail' && selectedRoom && (
        <RoomDetailPage room={selectedRoom} setView={setView} setBookingData={setBookingData} />
      )}
      {view === 'booking' && bookingData && (
        <BookingPage bookingData={bookingData} setView={setView} setConfirmation={setConfirmationId} />
      )}
      {view === 'confirmation' && <ConfirmationPage confirmationId={confirmationId} setView={setView} />}
    </div>
  )
}
