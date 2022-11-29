import React from 'react';
import '../App.css';

function GiphCard({ giph }) {
  return (
    <>
      <a className='giph-card' href={giph.url}>
        <img
          className='giph-card-image'
          src={giph.images.original.url}
          alt=''
        />
      </a>
    </>
  );
}

export default GiphCard;
