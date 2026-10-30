import { useEffect } from 'react';

export default function useDocumentTitle(title) {
  useEffect(() => {
    const baseTitle = 'Govind Web Solutions | Web Development & Digital Agency';
    if (title) {
      document.title = `${title} | Govind Web Solutions`;
    } else {
      document.title = baseTitle;
    }
  }, [title]);
}
