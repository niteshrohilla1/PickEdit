import  { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Styles.css';

// eslint-disable-next-line no-unused-vars
const Canvas = ({ imageUrl, onDownload }) => {
  const canvasRef = useRef(null);
  const [text, setText] = useState('');

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageUrl;

    img.onload = () => {
      const maxWidth = 800;
      const maxHeight = 600;
      const aspectRatio = img.width / img.height;

      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        width = maxWidth;
        height = width / aspectRatio;
      }

      if (height > maxHeight) {
        height = maxHeight;
        width = height * aspectRatio;
      }

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);
    };

    return () => {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [imageUrl]);

  const addText = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.font = '30px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(text, 50, 50); // Use the text from input
  };

  const addShape = (type) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'transparent';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;

    switch (type) {
      case 'circle': {
        ctx.beginPath();
        ctx.arc(150, 150, 50, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.stroke();
        break;
      }
      case 'rectangle': {
        ctx.fillStyle = 'blue';
        ctx.fillRect(100, 100, 150, 100);
        ctx.strokeRect(100, 100, 150, 100);
        break;
      }
      case 'triangle': {
        ctx.beginPath();
        ctx.moveTo(200, 50);
        ctx.lineTo(150, 150);
        ctx.lineTo(250, 150);
        ctx.closePath();
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.stroke();
        break;
      }
      case 'polygon': {
        ctx.beginPath();
        const sides = 6;
        const radius = 50;
        const centerX = 200;
        const centerY = 200;
        for (let i = 0; i < sides; i++) {
          const angle = (i * 2 * Math.PI) / sides;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fillStyle = 'yellow';
        ctx.fill();
        ctx.stroke();
        break;
      }
      default:
        break;
    }
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'edited-image.png';
    link.click();
  };

  return (
    <div className="canvas-container">
      <canvas ref={canvasRef} id="imageCanvas" width={800} height={600}></canvas>
      <div className="button-group">
        <input 
          type="text" 
          placeholder="Enter text here" 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
        />
        <button onClick={addText}>Add Text</button>
        <button onClick={() => addShape('circle')}>Add Circle</button>
        <button onClick={() => addShape('rectangle')}>Add Rectangle</button>
        <button onClick={() => addShape('triangle')}>Add Triangle</button>
        <button onClick={() => addShape('polygon')}>Add Polygon</button>
        <button onClick={handleDownload}>Download</button>
      </div>
    </div>
  );
};

Canvas.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onDownload: PropTypes.func.isRequired,
};

export default Canvas;
