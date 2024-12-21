import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon, CalendarIcon, ClockIcon, StarIcon, FilmIcon, GlobeAltIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { fetchMovieDetails, fetchTVDetails, imageUrl } from '../../services/movieService';
import { constructVideoUrl } from '../../services/videoService';

export default function MediaModal({ media, onClose }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const watchUrl = constructVideoUrl(media.id);

  const toggleFullscreen = (element) => {
    if (!document.fullscreenElement) {
      element.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  if (!media) return null;

  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/95" aria-hidden="true" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-4xl w-full rounded-xl bg-black text-left align-middle shadow-xl">
            <div className="relative h-[400px]" id="video-container">
              <iframe
                src={watchUrl}
                className="w-full h-full rounded-t-xl"
                allowFullScreen
                allow="fullscreen"
                sandbox="allow-forms allow-scripts allow-same-origin allow-presentation allow-fullscreen"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              >
                <XMarkIcon className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={() => toggleFullscreen(document.querySelector('#video-container'))}
                className="absolute bottom-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              >
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isFullscreen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20H5a2 2 0 01-2-2v-4m14 6h4a2 2 0 002-2v-4M5 4h4M4 5v4m15-5h-4m5 1V5" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                  )}
                </svg>
              </button>
            </div>

            {/* Movie Info */}
            <div className="p-6 bg-black">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Poster */}
                <div className="w-full md:w-1/4">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
                    alt={media.title || media.name}
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    {media.title || media.name}
                  </h2>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <span className="text-red-500">★</span>
                      <span className="text-white font-medium">
                        {media.vote_average ? `${(media.vote_average).toFixed(1)}` : 'N/A'}
                      </span>
                    </div>
                    <span className="text-gray-400">|</span>
                    <span className="text-gray-300">
                      {media.release_date?.split('-')[0] || media.first_air_date?.split('-')[0] || 'N/A'}
                    </span>
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {media.overview}
                  </p>

                  <div className="space-y-4">
                    {media.production_companies?.length > 0 && (
                      <div>
                        <h3 className="text-white font-semibold mb-2">Production</h3>
                        <div className="text-gray-300">
                          {media.production_companies.map(company => company.name).join(', ')}
                        </div>
                      </div>
                    )}

                    {media.spoken_languages?.length > 0 && (
                      <div>
                        <h3 className="text-white font-semibold mb-2">Languages</h3>
                        <div className="text-gray-300">
                          {media.spoken_languages.map(lang => lang.english_name).join(', ')}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}
