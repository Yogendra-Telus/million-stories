import { useEffect } from 'react';

const callbackKeyDown = e => {
  e.stopImmediatePropagation();
  e.cancelBubble = true;
};

const useStopPropagation = active => {
  useEffect(() => {
    active && document.addEventListener('keydown', callbackKeyDown, true);
    return () => {
      document.removeEventListener('keydown', callbackKeyDown, true);
    };
  }, [active]);
};

export default useStopPropagation;
