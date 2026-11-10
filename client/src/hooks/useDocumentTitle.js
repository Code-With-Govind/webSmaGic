import { useEffect } from 'react';

export default function useDocumentTitle(title) {
  useEffect(() => {
    const baseTitle = 'WebsMagic | Web Development & Digital Agency';
    if (title) {
      document.title = `${title} | WebsMagic`;
    } else {
      document.title = baseTitle;
    }
  }, [title]);
}

