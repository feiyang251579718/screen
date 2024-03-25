import dayjs from 'dayjs';
import sha256 from 'crypto-js/sha256';
import { omit } from 'lodash';

export * from './const';
export * from './bus';
export * from './websocket';

export const parseTime = (time: string | number, format?: string) => {
  return dayjs(time).format(format || 'YYYY-MM-DD HH:mm:ss');
};

function encode(message: string) {
  const msgUint8 = sha256(message); // 编码为UTF-8
  return msgUint8.toString(); // 返回哈希
}

const generateSixDigitRandomNumberWithLeadingZeros = () => {
  let randomNumber = Math.floor(Math.random() * 1000000);
  return ('000000' + randomNumber).slice(-6); // 在前面补足零然后截取最后六位
};

const buildStr = (obj: { [key: string]: any }) => {
  const resultStr = Object.keys(obj)
    .sort()
    .reduce((str, key) => {
      str += `${key}${obj[key]}`;
      return str;
    }, '');
  return resultStr;
};

export const genHeaders = (config: { [key: string]: any }) => {
  const headers = {
    ...omit(config, 'exerciseId'),
    timestamp: `${Date.now()}`,
    nonce: generateSixDigitRandomNumberWithLeadingZeros(),
  };
  const bundleStr = buildStr({
    ...headers,
    ...config,
  });
  const signature = encode(bundleStr);
  return { signature, headers };
};
