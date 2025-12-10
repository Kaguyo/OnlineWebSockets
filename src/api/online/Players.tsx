export default class Players {
    id: string;
    socketId: string;
    nickname: string;
    level: number;

    constructor(id: string, socketId: string, nickname: string, level: number){
        this.id = id;
        this.socketId = socketId;
        this.nickname = nickname;
        this.level = level;
    }

    static connectedPlayers: Players[];
}