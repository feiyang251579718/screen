import dayjs from 'dayjs';

export * from './const';

export const parseTime = (time: string | number, format?: string) => {
  return dayjs(time).format(format || 'YYYY-MM-DD HH:mm:ss');
};