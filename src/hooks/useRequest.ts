import { useCallback } from 'react';
import { ResponseData } from '@/types';

const useRequest = () => {
  const get = useCallback(function <T>(url: string) {
    return fetch(url).then(
      (response) => response.json() as Promise<ResponseData<T>>,
    );
  }, []);
  return {
    get,
  };
};

export default useRequest;
