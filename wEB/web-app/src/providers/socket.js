import { io } from "socket.io-client";

export default class {
  socket = null;
  constructor(url) {
    if (!this.socket) {
      this.socket = io(url);
    }
  }
}
