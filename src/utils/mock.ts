import { bus } from './bus';

const queryWarn = () => {
  return fetch('/api/alarmList').then((response) => {
    const data = response.json();
    return data;
  });
};

export const start = () => {
  setInterval(() => {
    queryWarn().then((data: any) => {
      bus.emit('ws:refresh:warn', data.data);
    });
  }, 3000);
};
