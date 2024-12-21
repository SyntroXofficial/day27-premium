import React from 'react';

export default function MediaCard({ media, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer relative overflow-hidden rounded-xl transition-all duration-300 transform hover:scale-105 hover:z-10 hover:ring-2 hover:ring-red-500"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
      
      <img
        src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
        alt={media.title || media.name}
        className="w-full h-full object-cover aspect-[2/3] rounded-xl"
        loading="lazy"
      />
      
      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform z-20 bg-gradient-to-t from-black to-transparent pb-6">
        <h3 className="text-white font-bold text-lg truncate mb-2">
          {media.title || media.name}
        </h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="text-red-500">★</span>
            <span className="text-white font-medium">
              {media.vote_average ? `${(media.vote_average).toFixed(1)}` : 'N/A'}
            </span>
          </div>
          <span className="text-gray-300 text-sm">
            {media.release_date?.split('-')[0] || media.first_air_date?.split('-')[0] || 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
};
