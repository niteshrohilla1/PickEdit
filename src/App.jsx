// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import ImageSearch from './components/ImageSearch';
import Canvas from './components/Canvas';
import './styles.css'; 

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleDownload = () => {
    const canvas = document.getElementById('imageCanvas');
    if (!canvas) return;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'edited-image.png';
    link.click();
  };

  return (
    <div className="app-container">
      <h1>Picture Editor</h1>
      <div className="search-container">
        <ImageSearch onImageSelect={setSelectedImage} />
      </div>
      {selectedImage && (
        <div className="canvas-container">
          <Canvas
            imageUrl={selectedImage}
            onDownload={handleDownload}
          />
        </div>
      )}
    </div>
  );
};

export default App;
