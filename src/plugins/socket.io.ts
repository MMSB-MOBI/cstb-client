import io from 'socket.io-client' // Socket.io-client v2 is package scoped

export default {
  install: (app: any, { connection, options }: any) => {
    console.log("=>", connection, options);
    const socket = io(connection, options);
    socket.on("connect_error", (error:any) => {
      console.log("Connection error", error);
    });
    // socket.on("connect", () => {
    //   console.log("Connection successfull");
    // });
    app.config.globalProperties.$socket = socket
    app.provide('socket', socket)
  }
}