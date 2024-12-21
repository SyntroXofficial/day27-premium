import React from 'react';
import { useSearchParams } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';

const Watch = () => {
  const [searchParams] = useSearchParams();
  const tmdbId = searchParams.get('id');
  const season = searchParams.get('season');
  const episode = searchParams.get('episode');

  if (!tmdbId) {
    return <div className="text-center p-4">No video ID provided</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <VideoPlayer 
            tmdbId={tmdbId}
            season={season ? parseInt(season) : undefined}
            episode={episode ? parseInt(episode) : undefined}
          />
        </div>
      </div>
    </div>
  );
};

export default Watch;
