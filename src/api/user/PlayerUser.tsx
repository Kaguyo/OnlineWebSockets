import userconfig from "../../user.json"

export default class PlayerUser {
    id: string;
    nickname: string;
    level: number;
    status: string;
    socketId: string;

    constructor(socketId: string){
        this.id = userconfig.id;
        this.nickname = userconfig.nickname;
        this.level = userconfig.level;
        this.status = userconfig.status;
        this.socketId = socketId;
    }

    SendPublicInfo(){
        const publicInfo = {
            id: this.id,
            nickname: this.nickname,
            level: this.level,
            status: this.status
        }

        return publicInfo;
    }
}