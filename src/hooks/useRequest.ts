import { useCallback, useMemo } from 'react';
import sha256 from 'crypto-js/sha256';
import { ResponseData } from '@/types';
import qs from 'qs';

const prefix = 'https://uat-university-api.sangfor.com/college/competition';

function encode(message: string) {
  const msgUint8 = sha256(message); // 编码为UTF-8
  return msgUint8.toString(); // 返回哈希
}

const buildStr = (obj: { [key: string]: string }) => {
  const resultStr = Object.keys(obj)
    .sort()
    .reduce((str, key) => {
      str += `${key}${obj[key]}`;
      return str;
    }, '');
  return resultStr;
};

const generateSixDigitRandomNumberWithLeadingZeros = () => {
  let randomNumber = Math.floor(Math.random() * 1000000);
  return ('000000' + randomNumber).slice(-6); // 在前面补足零然后截取最后六位
};

const useRequest = () => {
  const Authorization = useMemo(() => {
    return 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImQxYmE2MWI1LWMzNWUtNDc0Zi1iZTE4LTljOTFhYmFiN2NkOCJ9.2SN4qm3k0MvuABVHPbp76ow8eWPZTU_mW8xTKOdayXrmYiZVJnGA1ue-hCrLLGRARo9lYfHhl2T0qCoQIBehYg';
  }, []);
  const get = useCallback(function <T>(
    url: string,
    params?: { [key: string]: string },
  ) {
    const exerciseId = '10000153';
    const headers = {
      appId: '10001',
      deviceType: 'PC',
      deviceId: 'bigscreen',
      appkey: '111fbbbac2cd416dba1c11396e6eccd5=',
      timestamp: `${Date.now()}`,
      version: '1.0.0',
      nonce: generateSixDigitRandomNumberWithLeadingZeros(),
      Authorization: Authorization,
    };
    const bundleStr = buildStr({ ...headers, ...params, exerciseId, uri: url });
    console.log('object :>> ', headers);
    console.log('buildStr :>> ', bundleStr);
    const signature = encode(bundleStr);
    return fetch(`${prefix}${url}?${qs.stringify(params)}`, {
      headers: {
        ...headers,
        signature,
      },
    }).then((response) => response.json() as Promise<ResponseData<T>>);
  },
  []);
  return {
    get,
  };
};

export default useRequest;
