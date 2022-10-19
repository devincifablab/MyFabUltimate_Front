import { Component } from "react";
import { io } from "socket.io-client";

class WebSocket extends Component {
  socket = null;

  componentDidMount() {
    this.socket = io(process.env.API, { transports: ["websocket", "polling"], autoConnect: false, multiplex: false });
    this.socket.connect();

    for (const event of this.props.event) {
      this.socket.on(event.name, () => {
        event.action();
      });
    }
  }

  componentWillUnmount() {
    console.log("disconnected");
    if (this.socket) this.socket.disconnect();
  }

  render() {
    return <div></div>;
  }
}

export default WebSocket;
