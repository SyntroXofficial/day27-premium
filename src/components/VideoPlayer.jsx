import React from 'react';
import PropTypes from 'prop-types';
import { constructVideoUrl } from '../services/videoService';

const VideoPlayer = ({ tmdbId, season, episode }) => {
  return (
    <div className="aspect-video w-full relative bg-black rounded-lg overflow-hidden">
      <iframe
        src={constructVideoUrl(tmdbId, season, episode)}
        className="w-full h-full"
        frameBorder="0"
        allowFullScreen
        sandbox="allow-forms allow-scripts allow-same-origin allow-presentation"
        loading="lazy"
        referrerPolicy="no-referrer"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  );
};

VideoPlayer.propTypes = {
  tmdbId: PropTypes.string.isRequired,
  season: PropTypes.number,
  episode: PropTypes.number,
};

export default VideoPlayer;
