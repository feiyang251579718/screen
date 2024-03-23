import { ws_prefix } from '@/utils/';

let conn: WebSocket | undefined = undefined;

const init = (token: string, exerciseId: string) => {
  const socket = new WebSocket(
    `${ws_prefix}/targetRangeExercise/${token}/${exerciseId}`,
  );

  // Connection opened
  socket.addEventListener('open', function (event) {
    socket.send('Hello Server!');
  });

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
