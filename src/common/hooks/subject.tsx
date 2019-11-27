import { useState, useEffect } from 'react';
import { BehaviorSubject } from 'rxjs';

type ChangeValueCallback<T> = (v: T) => void;

export const useSubject = <T extends unknown>(
  initialValue: T,
  onChange?: ChangeValueCallback<T>
): [T, BehaviorSubject<T>, ChangeValueCallback<T>] => {
  const [value, changeValue] = useState(initialValue);
  const [subject] = useState(new BehaviorSubject<T>(initialValue));

  const nextValue = (v: T) => subject.next(v);

  useEffect(() => {
    const subscription = subject.subscribe(v => {
      changeValue(v);

      if (onChange) {
        onChange(v);
      }
    });

    return () => subscription.unsubscribe();
  }, [subject, onChange]);

  return [value, subject, nextValue];
};
