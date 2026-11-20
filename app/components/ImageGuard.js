'use client';
import { useEffect } from 'react';

export default function ImageGuard() {
  useEffect(() => {
    const blockRightClick = (e) => {
      if (e.target.tagName === 'IMG') {
        e.preventDefault();
      }
    };

    const blockDrag = (e) => {
      if (e.target.tagName === 'IMG') {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', blockRightClick);
    document.addEventListener('dragstart', blockDrag);

    return () => {
      document.removeEventListener('contextmenu', blockRightClick);
      document.removeEventListener('dragstart', blockDrag);
    };
  }, []);

  return null;
}