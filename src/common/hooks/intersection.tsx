import { useEffect, useState, useRef, RefObject } from 'react';

export const useIntersection = <T extends HTMLElement>(
  cb: () => void
): RefObject<T> => {
  const [prevRatio, changeRatio] = useState(0);
  const [ref] = useState(useRef<T>(null));
  const [initialRender, changeInitialRender] = useState(false);

  useEffect(() => {
    const current = ref.current;

    if (!ref.current || !initialRender) {
      return;
    }

    const observer = new IntersectionObserver(
      ([{ intersectionRatio }]) => {
        if (intersectionRatio === 1 && intersectionRatio !== prevRatio) {
          cb();
        }

        changeRatio(intersectionRatio);
      },
      { root: window.document.body }
    );

    if (!current) {
      return;
    }

    observer.observe(current);

    return () => {
      if (!current) {
        return;
      }

      observer.unobserve(current);
    };
  }, [ref, prevRatio, cb, initialRender]);

  useEffect(() => {
    changeInitialRender(true);
  }, []);

  return ref;
};
