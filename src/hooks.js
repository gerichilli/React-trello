import { useEffect, useCallback } from 'react';

export function useClickOutsideEffect(node, onClickOutside) {
  const handleClick = useCallback((e) => {
    if (!node?.current?.contains(e.target) && typeof(onClickOutside) === "function") {
      onClickOutside();
    }
  }, [node, onClickOutside]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [handleClick]);
};
