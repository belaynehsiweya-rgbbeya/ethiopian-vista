import React from 'react';
import { Place } from '../types';
import { Star, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface PlaceCardProps {
  place: Place;
  onClick: (place: Place) => void;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({ place, onClick }) => {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(place)}
      className="relative flex-shrink-0 w-64 h-80 rounded-3xl overflow-hidden shadow-xl cursor-pointer group"
    >
      <img
        src={place.image}
        alt={place.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      
      <div className="absolute bottom-0 left-0 p-5 w-full">
        <div className="flex items-center gap-1 mb-1">
          <MapPin size={12} className="text-yellow-400" />
          <span className="text-[10px] text-gray-300 font-medium uppercase tracking-wider">
            {place.location}
          </span>
        </div>
        <h3 className="text-white text-xl font-bold mb-1 leading-tight">
          {place.title}
        </h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full">
            <Star size={10} className="fill-yellow-400 text-yellow-400 mr-1" />
            <span className="text-white text-[10px] font-bold">{place.rating}</span>
          </div>
          <span className="text-gray-300 text-[10px]">{place.category}</span>
        </div>
      </div>
    </motion.div>
  );
};