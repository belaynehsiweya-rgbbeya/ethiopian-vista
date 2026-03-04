import React, { useState, useMemo } from 'react';
import { PLACES } from './data/places';
import { Place, Category } from './types';
import { PlaceCard } from './components/PlaceCard';
import { CategoryFilter } from './components/CategoryFilter';
import { PlaceDetail } from './components/PlaceDetail';
import { BottomNav } from './components/BottomNav';
import { Search, Bell, Map, MapPin, Star } from 'lucide-react';
import { Toaster } from 'sonner';
import { motion } from 'framer-motion';

const CATEGORIES: Category[] = ['All', 'History', 'Nature', 'Culture', 'Ancient'];

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPlaces = useMemo(() => {
    return PLACES.filter((place) => {
      const matchesCategory = activeCategory === 'All' || place.category === activeCategory;
      const matchesSearch = place.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           place.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-24 max-w-md mx-auto shadow-2xl relative overflow-x-hidden">
      <Toaster position="top-center" />
      
      {/* Header */}
      <header className="px-6 pt-12 pb-6 bg-white/80 backdrop-blur-lg sticky top-0 z-30 border-b border-slate-100">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-emerald-200">
              E
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">Explore</p>
              <h1 className="text-lg font-black text-slate-900 leading-none">Ethiopia</h1>
            </div>
          </div>
          <button className="relative w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 border border-slate-100">
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
            <Search size={16} />
          </div>
          <input
            type="text"
            placeholder="Search historical sites..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100 border-none rounded-2xl py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-6">
        <div className="px-6 mb-6">
          <h2 className="text-2xl font-extrabold mb-4">Discover Places</h2>
          <CategoryFilter
            categories={CATEGORIES}
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />
        </div>

        <div className="mb-8">
          <div className="px-6 flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">Recommended</h3>
            <button className="text-xs font-bold text-emerald-600 uppercase tracking-wider">See all</button>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-6">
            {filteredPlaces.length > 0 ? (
              filteredPlaces.map((place) => (
                <PlaceCard
                  key={place.id}
                  place={place}
                  onClick={setSelectedPlace}
                />
              ))
            ) : (
              <div className="w-full py-10 text-center text-slate-400 italic text-sm">
                No places found in this category.
              </div>
            )}
          </div>
        </div>

        {/* Around You */}
        <div className="px-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">Top Rated</h3>
            <button className="flex items-center gap-1 text-xs font-bold text-emerald-600 uppercase tracking-wider">
              <Map size={12} /> View Map
            </button>
          </div>
          
          <div className="space-y-4">
            {PLACES.sort((a, b) => b.rating - a.rating).slice(0, 4).map((place) => (
              <motion.div
                key={`top-${place.id}`}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedPlace(place)}
                className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex gap-4 cursor-pointer"
              >
                <img
                  src={place.image}
                  alt={place.title}
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div className="flex-1 flex flex-col justify-center">
                  <h4 className="font-bold text-slate-900">{place.title}</h4>
                  <div className="flex items-center gap-1 text-slate-400 text-[10px] mb-1">
                    <MapPin size={10} />
                    <span>{place.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center bg-yellow-50 px-1.5 py-0.5 rounded">
                      <Star size={10} className="fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-[10px] font-bold text-yellow-700">{place.rating}</span>
                    </div>
                    <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wide">{place.category}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <BottomNav />
      <PlaceDetail place={selectedPlace} onClose={() => setSelectedPlace(null)} />
    </div>
  );
};

export default App;