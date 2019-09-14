import React, { useCallback } from 'react';
import { IonSpinner } from '@ionic/react';

type Props = {
  load: () => void;
};

export const LazyLoader = ({ load }: Props) => {
  const measuredRef = useCallback(
    node => {
      if (node !== null) {
        const observer = new IntersectionObserver(
          (entries: IntersectionObserverEntry[]) => {
            if (entries.some(e => e.isIntersecting)) {
              load();
            }
          },
          {
            root: document.querySelector('.ion-page'),
            rootMargin: '100%',
            threshold: 0.2,
          },
        );
        observer.observe(node);
      }
    },
    [load],
  );

  return <IonSpinner ref={measuredRef} style={{ width: '100%' }} />;
};
