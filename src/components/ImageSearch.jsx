// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import ImageResult from './ImageResult';
import './ImageSearch.css'; 

const ImageSearch = ({ onImageSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [images, setImages] = useState([]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      alert('Please enter a valid search term.');
      return;
    }
    const apiKey = 'VMi8A1SpbvUmbtGqm5_84Di8KsznGsq9G1J5dOLV6U0'; // Make sure to replace this with your actual Unsplash API key
    try {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: { query: searchTerm, client_id: apiKey },
      });
      setImages(response.data.results.slice(0, 4)); // Show only 4 images
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search images..."
      />
      <button onClick={handleSearch}>Search</button>
      <div className="results">
        {images.map((image) => (
          <ImageResult
            key={image.id}
            image={image}
            onClick={() => onImageSelect(image.urls.full)}
          />
        ))}
      </div>
    </div>
  );
};

ImageSearch.propTypes = {
  onImageSelect: PropTypes.func.isRequired,
};

export default ImageSearch;
