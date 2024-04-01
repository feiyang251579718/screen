import { useCallback, useMemo } from 'react';
import { ResponseData } from '@/types';
import { prefix, genHeaders } from '@/utils';
import useConnectConfig from './useConnectConfig';
import qs from 'qs';

const useRequest = () => {
  const config = useConnectConfig();
  const get = useCallback(function <T>(
    url: string,
    params?: { [key: string]: string | number },
  ) {
    const { signature, headers } = genHeaders({
      ...config,
      ...params,
      exerciseId: config.exerciseId,
      uri: `/college/competition${url}`,
    });
    return fetch(
      `${prefix}${url}?${qs.stringify({
        ...params,
        exerciseId: config.exerciseId,
      })}`,
      {
        headers: {
          ...headers,
          signature,
        },
      },
    ).then((response) => {
      const data = response.json() as Promise<ResponseData<T>>;
      return data;
    });
  },
  []);
  return {
    get,
  };
};

export default useRequest;
