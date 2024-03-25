import { useCallback, useMemo } from 'react';
import sha256 from 'crypto-js/sha256';
import { ResponseData } from '@/types';
import { prefix, genHeaders } from '@/utils';
import useConnectConfig from './useConnectConfig';
import qs from 'qs';
import { omit } from 'lodash';

function encode(message: string) {
  const msgUint8 = sha256(message); // 编码为UTF-8
  return msgUint8.toString(); // 返回哈希
}

const buildStr = (obj: { [key: string]: any }) => {
  const resultStr = Object.keys(obj)
    .sort()
    .reduce((str, key) => {
      str += `${key}${obj[key]}`;
      return str;
    }, '');
  return resultStr;
};

const useRequest = () => {
  const config = useConnectConfig();
  const get = useCallback(function <T>(
    url: string,
    params?: { [key: string]: string },
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
