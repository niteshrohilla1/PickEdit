// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

const ImageResult = ({ image, onClick }) => (
  <div className="result-item">
    <img src={image.urls.small} alt={image.alt_description} onClick={onClick} />
    <button onClick={onClick}>Add Caption</button>
  </div>
);

ImageResult.propTypes = {
  image: PropTypes.shape({
    urls: PropTypes.shape({
      small: PropTypes.string.isRequired,
    }).isRequired,
    alt_description: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageResult;
