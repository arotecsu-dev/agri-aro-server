//import { verifyDevice } from "./firebase";
import type { Express } from "express";
import { jwtService } from "../auth/jwt";
import type { Server as HttpServer } from "node:http";
import { Server, Socket } from "socket.io";
import { Device } from "../database/models/device";

export class SocketService {
  sockets: Record<string, Socket[]> = {};

  constructor(server: HttpServer, corsConfig: any) {
    const io = new Server(server, {
      cors: corsConfig,
    });

    io.on("connection", async (socket) => {
      const { token, deviceId } = socket.handshake.query;

      socket.emit;
      if (!token) {
        socket.disconnect();
        return;
      }

      const data = jwtService.verifyToken(token);

      if (data == null) {
        socket.disconnect();
        return;
      }

      const device = await Device.findById(deviceId);

      if (device == null) {
        socket.disconnect();
        return;
      }

      socket.on("disconnect", function () {
        for (var _dev in this.sockets) {
          if (deviceId == _dev) {
            this.sockets[_dev] = this.sockets[_dev].filter((_socket) => {
              if (_socket.id == socket.id) {
                return false;
              }
              return true;
            });
          }
        }
      });
      //adicionar os emits

      if (deviceId in this.sockets) {
        this.sockets[deviceId].push({
          socket: socket,
          id: socket.id,
        });
      } else {
        this.sockets[deviceId] = [
          {
            socket: socket,
            id: socket.id,
          },
        ];
      }
    });
  }
}
