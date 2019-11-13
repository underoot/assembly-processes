import React, { useEffect, useRef } from 'react';

export const useIntersection = (cb: () => void) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const current = ref.current;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.intersectionRatio === 1) {
        cb();
      }
    });

    if (!current) {
      return;
    }

    observer.observe(current as Element);

    return () => {
      if (!current) {
        return;
      }

      observer.unobserve(current as Element);
    };
  }, [ref, cb]);

  return <span ref={ref} />;
};
