import { useEffect, useCallback } from 'react';
import {TContext} from 'types/types.d'

export default function useDebounce(effect:() => void, dependencies:[TContext | null, string], delay:number) {
  const callback = useCallback(effect, dependencies);

  useEffect(() => {
    const timeout = setTimeout(callback, delay);
    return () => clearTimeout(timeout);
  }, [callback, delay]);
}