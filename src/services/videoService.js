// Video service for handling video URLs
const constructVideoUrl = (tmdbId, season, episode) => {
  const baseUrl = 'https://multiembed.mov/directstream.php';
  let url = `${baseUrl}?video_id=${tmdbId}&tmdb=1`;
  
  if (season && episode) {
    url += `&s=${season}&e=${episode}`;
  }
  
  return url;
};

export { constructVideoUrl };
