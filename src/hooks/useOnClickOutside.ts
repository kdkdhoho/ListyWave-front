import { useEffect, useRef } from 'react';

/**
 * ref 타겟 외부 클릭 시 핸들러를 실행시키는 커스텀 훅입니다.
 * @param {function} handler 바깥 클릭 시 실행시킬 콜백함수
 * @returns target 요소에 전달할 ref 값
 */

const useOnClickOutside = (handler: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      if (ref.current !== null && !ref.current.contains(e.target as Node)) {
        handler();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [ref, handler]);

  return { ref };
};

export default useOnClickOutside;
