import { io } from 'socket.io-client'

export default {
  install: (app: any, { connection, options }: any) => {
    // const socket = io(connection, options)
    const socket = io('http://localhost:4000')
    console.log("toto", socket);
    console.log(options);

    socket.on('connect', function () {
      console.log('Connected');
    })

    setTimeout(() => {
      console.log("blabla");
      console.dir(socket);

      socket.emit('identity', 200)
    }, 2000)

    socket.on("connect_error", () => {
      console.log("connect error");
      socket.connect();
    });

    app.config.globalProperties.$socket = socket
    app.provide('socket', socket)
  }
}