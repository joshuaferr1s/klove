const getCurrentPlaying = async () => {
  const res = await fetch('https://c.kloveair1.com/Services/Broadcast.asmx/GetRecentSongsLimit?siteId=1&limit=6&RemoveTags=true&format=json');
  const text = await res.text();
  return JSON.parse(text.slice(1, -2)).d[0];
};

const extractUsefulAttributes = (obj) => {
  const { Title: title, Artist: artist, AlbumImage: albumImage } = obj;
  return {
    title, artist, image: albumImage ? `https://c.kloveair1.com/Common/Thumbnail.aspx?f=/art/albumart/${albumImage}&s=320` : '',
  };
};

export const getPlaying = async () => {
  const data = await getCurrentPlaying();
  return extractUsefulAttributes(data);
};

export const AUDIO_STREAM_URL = 'https://emf.streamguys1.com/sk018_mp3_high_web?tsid=1582481920788';
