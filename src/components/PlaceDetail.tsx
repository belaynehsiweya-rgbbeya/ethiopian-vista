import React from 'react';
import { Place } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Star, Clock, Calendar, Heart, Share2 } from 'lucide-react';
import { toast } from 'sonner';

interface PlaceDetailProps {
  place: Place | null;
  onClose: () => void;
}

export const PlaceDetail: React.FC<PlaceDetailProps> = ({ place, onClose }) => {
  if (!place) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-0 z-50 bg-white overflow-y-auto"
      >
        <div className="relative h-[45vh]">
          <img
            src={place.image}
            alt={place.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20" />
          
          <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white"
            >
              <X size={20} />
            </button>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                <Heart size={20} />
              </button>
              <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="relative -mt-10 bg-white rounded-t-[40px] px-6 pt-10 pb-32">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center gap-1 text-emerald-600 mb-1">
                <MapPin size={14} />
                <span className="text-xs font-bold tracking-wider uppercase">
                  {place.location}
                </span>
              </div>
              <h1 className="text-3xl font-extrabold text-slate-900 leading-tight">
                {place.title}
              </h1>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
                <Star size={14} className="fill-yellow-500 text-yellow-500 mr-1" />
                <span className="text-yellow-700 font-bold text-sm">{place.rating}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mb-8">
            <div className="flex-1 bg-slate-50 p-4 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-medium uppercase">Duration</p>
                <p className="text-sm font-bold text-slate-800">{place.duration}</p>
              </div>
            </div>
            <div className="flex-1 bg-slate-50 p-4 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-medium uppercase">Best Visit</p>
                <p className="text-sm font-bold text-slate-800">Oct - Mar</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-slate-900 mb-3">About the place</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              {place.longDescription}
            </p>
          </div>

          <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent pt-10">
            <button 
              onClick={() => toast.success(`Booking request sent for ${place.title}!`)}
              className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-colors"
            >
              Book Your Visit
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};