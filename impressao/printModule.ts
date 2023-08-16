import net from 'net';

export const printZpl = async (zpl: string | Uint8Array) => {
  const IP = '192.168.0.209';
  const PORT = 9100;

  const socket = new net.Socket();

  return new Promise<void>((resolve, reject) => {
    socket.connect(PORT, IP, () => {
      socket.write(zpl);
      socket.end();
      resolve();
    });

    socket.on('error', (error) => {
      reject(error);
    });
  });
};
