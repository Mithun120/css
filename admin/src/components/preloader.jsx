import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

function Preloader() {
  useEffect(() => {
    const preloader = document.querySelector('#preloader');
    if (preloader) {
      window.addEventListener('load', () => {
        preloader.remove();
      });
    }
  }, []);

  return null;
}

export default Preloader;