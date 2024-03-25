import { ws_prefix } from '@/utils';
import { bus } from './bus';

let conn: WebSocket | undefined = undefined;

const init = (token: string, exerciseId: string) => {
  const socket = new WebSocket(
    // `wss://uat-university-api.sangfor.com/college/socket/targetRangeExercise/eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6Ijg0MjE0Mjk2LTUwMzgtNDNkOC1hNWY1LTQ2MzVkZjM0YWUzMCJ9.RPa8rqEpULBqSEi_MURegS7FOVVVjpFQaWjAcmVv3IGOv5wV4s0-HvMRWv__R4Bcd5QNI8Jvq-Ln9YSyUBn1sw/10000153`,
    `${ws_prefix}/targetRangeExercise/${token.split(/\s/)?.[1]}/${exerciseId}`,
  );

  // Connection opened
  socket.addEventListener('open', function (event) {
    // socket.send('Hello Server!');
    console.log('connect');
  });

  setInterval(() => {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send('keep');
    }
  }, 30000);

  // Listen for messages
  socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
  });
  conn = socket;
};

const connect = (token: string, exerciseId: string) => {
  init(token, exerciseId);
};

const disconnect = () => {
  conn?.close();
};

export const connectWS = connect;
export const disconnectWS = disconnect;
