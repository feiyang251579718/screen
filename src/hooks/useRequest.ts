import { useCallback } from 'react';
import { ResponseData } from '@/types';

const prefix = 'https://uat-university-api.sangfor.com/college/competition';
const useRequest = () => {
  const get = useCallback(function <T>(url: string) {
    return fetch(`${prefix}${url}`, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization:
          'Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImQxYmE2MWI1LWMzNWUtNDc0Zi1iZTE4LTljOTFhYmFiN2NkOCJ9.2SN4qm3k0MvuABVHPbp76ow8eWPZTU_mW8xTKOdayXrmYiZVJnGA1ue-hCrLLGRARo9lYfHhl2T0qCoQIBehYg',
      },
    }).then((response) => response.json() as Promise<ResponseData<T>>);
  }, []);
  return {
    get,
  };
};

export default useRequest;
