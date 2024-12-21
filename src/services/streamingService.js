const STREAMING_BASE_URL = 'https://multiembed.mov';

const getStreamingUrl = (mediaType, tmdbId, server = 'vidplay') => {
  const type = mediaType === 'tv' ? 'tv' : 'movie';
  return `${STREAMING_BASE_URL}/${type}?tmdb=${tmdbId}&server=${server}`;
};

export const streamingServers = [
  { id: 'vidplay', name: 'VidPlay', icon: '🎬' },
  { id: 'upcloud', name: 'UpCloud', icon: '☁️' },
  { id: 'superembed', name: 'SuperEmbed', icon: '⚡' },
  { id: 'filemoon', name: 'FileMoon', icon: '🌙' },
  { id: 'streamwish', name: 'StreamWish', icon: '✨' }
];

export const getStreamUrl = (mediaType, tmdbId, server) => {
  return getStreamingUrl(mediaType, tmdbId, server);
};
