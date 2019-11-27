import { useEffect, RefObject } from 'react';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import {
  DEFAULT_SCROLL_DEBOUNCE_TIME,
  DEFAULT_SCROLL_MARGIN
} from 'common/hooks/scroll-list/constants';
import { IScrollListOptions } from 'common/hooks/scroll-list/types';

export const useScrollList = (
  ref: RefObject<HTMLElement>,
  onScrollToEnd: Function,
  options: IScrollListOptions = {}
) => {
  const {
    margin = DEFAULT_SCROLL_MARGIN,
    debounceTimeValue = DEFAULT_SCROLL_DEBOUNCE_TIME
  } = options;

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const onScroll = (e: Event) => {
      if (!e.target) {
        return;
      }

      const curr = e.target as HTMLElement;

      if (curr.scrollHeight <= curr.clientHeight) {
        return;
      }

      if (curr.scrollTop + margin >= curr.clientHeight) {
        onScrollToEnd();
      }
    };

    const subscription = fromEvent(ref.current, 'scroll')
      .pipe(debounceTime(debounceTimeValue))
      .subscribe(onScroll);

    return () => {
      subscription.unsubscribe();
    };
  }, [ref, onScrollToEnd]);
};
