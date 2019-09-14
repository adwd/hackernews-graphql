import React, { useCallback } from 'react';
import { IonSpinner } from '@ionic/react';

type Props = {
  load: () => void;
};

export const LazyLoader = ({ load }: Props) => {
  const ref = useCallback(
    node => {
      if (node !== null) {
        const observer = new IntersectionObserver(
          (entries: IntersectionObserverEntry[]) => {
            if (entries.some(e => e.isIntersecting)) {
              load();
            }
          },
          {
            rootMargin: '480px 480px',
            threshold: 0.1,
          },
        );
        observer.observe(node);
      }
    },
    [load],
  );

  return (
    <div style={{ padding: '24px' }}>
      <IonSpinner ref={ref} style={{ width: '100%' }} />
    </div>
  );
};
