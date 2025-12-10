export default class Players {
    id: string;
    socketId: string;
    nickname: string;
    level: number;
    status: string;

    constructor(id: string, socketId: string, nickname: string, level: number){
        this.id = id;
        this.socketId = socketId;
        this.nickname = nickname;
        this.level = level;
        this.status = status;
    }

    static connectedPlayers: Players[];
}