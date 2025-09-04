import React, { useState, useEffect } from 'react';
import {
  AsciiCard,
  AsciiButton,
  AsciiProgressBar,
  AsciiBadge,
  AsciiInput,
  AsciiAlert
} from 'react-ascii-ui';

export default function MusicPlayerDemo() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(75);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const playlist = [
    {
      id: 1,
      title: "Synthwave Nights",
      artist: "Neon Dreams",
      album: "Retro Future",
      duration: 245,
      genre: "Synthwave"
    },
    {
      id: 2,
      title: "Digital Rain",
      artist: "Cyber Pulse",
      album: "Matrix",
      duration: 198,
      genre: "Electronic"
    },
    {
      id: 3,
      title: "Terminal Love",
      artist: "Code Romance",
      album: "Binary Hearts",
      duration: 267,
      genre: "Chiptune"
    },
    {
      id: 4,
      title: "Assembly Line",
      artist: "Machine Logic",
      album: "Low Level",
      duration: 312,
      genre: "Industrial"
    },
    {
      id: 5,
      title: "404 Not Found",
      artist: "Error State",
      album: "System Failure",
      duration: 189,
      genre: "Glitch"
    },
    {
      id: 6,
      title: "Recursive Dreams",
      artist: "Infinite Loop",
      album: "Stack Overflow",
      duration: 234,
      genre: "Ambient"
    }
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentSong = playlist[currentTrack];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= currentSong.duration) {
            if (repeat) {
              return 0;
            } else if (currentTrack < playlist.length - 1) {
              setCurrentTrack(currentTrack + 1);
              return 0;
            } else {
              setIsPlaying(false);
              return 0;
            }
          }
          return prev + 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isPlaying, currentTime, currentSong.duration, repeat, currentTrack, playlist.length]);

  const playNext = () => {
    if (shuffle) {
      setCurrentTrack(Math.floor(Math.random() * playlist.length));
    } else if (currentTrack < playlist.length - 1) {
      setCurrentTrack(currentTrack + 1);
    } else {
      setCurrentTrack(0);
    }
    setCurrentTime(0);
  };

  const playPrevious = () => {
    if (currentTrack > 0) {
      setCurrentTrack(currentTrack - 1);
    } else {
      setCurrentTrack(playlist.length - 1);
    }
    setCurrentTime(0);
  };

  const filteredPlaylist = playlist.filter(song =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.album.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ fontFamily: 'monospace', backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '20px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#00ff00', fontSize: '2.5em', marginBottom: '10px' }}>
          ♪ ♫ ASCII MUSIC PLAYER ♫ ♪
        </h1>
        <p style={{ color: '#ccc', fontSize: '1.1em' }}>
          Retro-style music interface built with React ASCII UI
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '30px' }}>
        {/* Main Player */}
        <div>
          {/* Now Playing */}
          <AsciiCard title="♪ Now Playing" style={{ marginBottom: '20px' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ 
                backgroundColor: '#111',
                border: '2px solid #00ff00',
                padding: '20px',
                marginBottom: '20px',
                position: 'relative'
              }}>
                <div style={{ fontSize: '1.8em', color: '#00ff00', marginBottom: '10px' }}>
                  {currentSong.title}
                </div>
                <div style={{ fontSize: '1.2em', color: '#ccc', marginBottom: '10px' }}>
                  by {currentSong.artist}
                </div>
                <div style={{ fontSize: '1em', color: '#666' }}>
                  {currentSong.album}
                </div>
                <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                  <AsciiBadge color="info">{currentSong.genre}</AsciiBadge>
                </div>
                {isPlaying && (
                  <div style={{ 
                    position: 'absolute', 
                    top: '50%', 
                    left: '20px', 
                    fontSize: '2em',
                    animation: 'pulse 1s infinite'
                  }}>
                    ♪
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              <div style={{ marginBottom: '15px' }}>
                <AsciiProgressBar 
                  value={currentTime} 
                  max={currentSong.duration}
                  color="success"
                  showPercentage={false}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px', fontSize: '12px', color: '#ccc' }}>
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(currentSong.duration)}</span>
                </div>
              </div>

              {/* Controls */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '20px' }}>
                <AsciiButton onClick={() => setShuffle(!shuffle)} style={{ backgroundColor: shuffle ? '#006600' : undefined }}>
                  {shuffle ? '🔀' : '🔀'} Shuffle
                </AsciiButton>
                <AsciiButton onClick={playPrevious}>⏮️ Prev</AsciiButton>
                <AsciiButton onClick={() => setIsPlaying(!isPlaying)} style={{ fontSize: '1.2em' }}>
                  {isPlaying ? '⏸️ Pause' : '▶️ Play'}
                </AsciiButton>
                <AsciiButton onClick={playNext}>⏭️ Next</AsciiButton>
                <AsciiButton onClick={() => setRepeat(!repeat)} style={{ backgroundColor: repeat ? '#006600' : undefined }}>
                  {repeat ? '🔂' : '🔁'} Repeat
                </AsciiButton>
              </div>

              {/* Volume Control */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
                <span>🔊</span>
                <div style={{ width: '200px' }}>
                  <AsciiProgressBar 
                    value={volume} 
                    max={100}
                    color="warning"
                    showPercentage={false}
                  />
                </div>
                <span style={{ color: '#ccc', minWidth: '35px' }}>{volume}%</span>
                <AsciiButton onClick={() => setVolume(Math.max(0, volume - 10))}>-</AsciiButton>
                <AsciiButton onClick={() => setVolume(Math.min(100, volume + 10))}>+</AsciiButton>
              </div>
            </div>
          </AsciiCard>

          {/* Equalizer Visualization */}
          <AsciiCard title="🎛️ Equalizer">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'end', gap: '8px', height: '100px', padding: '20px' }}>
              {[...Array(10)].map((_, i) => {
                const height = Math.floor(Math.random() * 80) + 20;
                return (
                  <div
                    key={i}
                    style={{
                      width: '20px',
                      height: `${isPlaying ? height : 20}px`,
                      backgroundColor: '#00ff00',
                      transition: 'height 0.3s ease'
                    }}
                  />
                );
              })}
            </div>
          </AsciiCard>
        </div>

        {/* Playlist */}
        <div>
          <AsciiCard title="📂 Playlist" style={{ marginBottom: '20px' }}>
            <div style={{ marginBottom: '15px' }}>
              <AsciiInput
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tracks..."
                style={{ width: '100%' }}
              />
            </div>
            
            <div style={{ maxHeight: '400px', overflow: 'auto' }}>
              {filteredPlaylist.map((song, index) => {
                const actualIndex = playlist.findIndex(p => p.id === song.id);
                const isCurrentTrack = actualIndex === currentTrack;
                
                return (
                  <div
                    key={song.id}
                    onClick={() => {
                      setCurrentTrack(actualIndex);
                      setCurrentTime(0);
                    }}
                    style={{
                      padding: '10px',
                      marginBottom: '8px',
                      backgroundColor: isCurrentTrack ? '#006600' : '#111',
                      border: `1px solid ${isCurrentTrack ? '#00ff00' : '#333'}`,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!isCurrentTrack) {
                        e.currentTarget.style.backgroundColor = '#222';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isCurrentTrack) {
                        e.currentTarget.style.backgroundColor = '#111';
                      }
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ minWidth: '20px', color: '#00ff00' }}>
                        {isCurrentTrack && isPlaying ? '♪' : (actualIndex + 1).toString().padStart(2, '0')}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ color: isCurrentTrack ? '#00ff00' : '#fff', fontWeight: 'bold' }}>
                          {song.title}
                        </div>
                        <div style={{ color: '#ccc', fontSize: '12px' }}>
                          {song.artist} • {song.album}
                        </div>
                      </div>
                      <div style={{ color: '#666', fontSize: '12px' }}>
                        {formatTime(song.duration)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </AsciiCard>

          {/* Stats */}
          <AsciiCard title="📊 Stats">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#ccc' }}>Total Tracks:</span>
                <AsciiBadge color="info">{playlist.length}</AsciiBadge>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#ccc' }}>Total Duration:</span>
                <AsciiBadge color="success">
                  {formatTime(playlist.reduce((acc, song) => acc + song.duration, 0))}
                </AsciiBadge>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#ccc' }}>Current Track:</span>
                <AsciiBadge color="warning">{currentTrack + 1} / {playlist.length}</AsciiBadge>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#ccc' }}>Status:</span>
                <AsciiBadge color={isPlaying ? 'success' : 'default'}>
                  {isPlaying ? 'Playing' : 'Paused'}
                </AsciiBadge>
              </div>
            </div>
          </AsciiCard>
        </div>
      </div>

      {volume === 0 && (
        <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000 }}>
          <AsciiAlert variant="warning">
            🔇 Volume is muted
          </AsciiAlert>
        </div>
      )}

      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}