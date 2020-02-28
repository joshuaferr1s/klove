import React from 'react';
import './MusicContainer.css';
import { AUDIO_STREAM_URL, getPlaying } from '../API';

const MusicContainer = () => {
  const [currentPlaying, setCurrentPlaying] = React.useState({
    title: '',
    artist: '',
    image: '',
  });
  const [playing, setPlaying] = React.useState(false);
  const audioRef = React.useRef(null);

  const controlPlayPause = () => {
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.load();
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  const updateNowPlaying = async () => {
    try {
      const data = await getPlaying();
      setCurrentPlaying(data);
      document.title = data.title;
    } catch (error) {}
  };

  React.useEffect(() => {
    updateNowPlaying();
    const interval = setInterval(() => {
      updateNowPlaying();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`music-container ${playing ? 'play' : ''}`}>
      <audio src={AUDIO_STREAM_URL} ref={audioRef}></audio>
      <div className="img-container">
        <img src={currentPlaying.image} alt="music-cover"/>
      </div>
      <div className="controls-container">
        <button className="action-btn" onClick={controlPlayPause}>
          <i className={`fas ${playing ? 'fa-pause' : 'fa-play'}`}></i>
        </button>
      </div>
      <div className="info-container">
        <h3 className="info-title">{currentPlaying.title}</h3>
        <h4 className="info-artist">{currentPlaying.artist}</h4>
      </div>
    </div>
  );
};

export default MusicContainer;
