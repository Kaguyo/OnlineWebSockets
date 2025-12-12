export class Player {
  id;
  socketId;
  nickname;
  level;
  status;
  constructor(id, socketId, nickname, level, status){
    this.id = id;
    this.socketId = socketId;
    this.nickname = nickname;
    this.level = level;
    this.status = status;
  }
}
