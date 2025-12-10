import userconfig from "../../user.json"

export default class UserData {
    id: string;
    nickname: string;
    level: number;
    status: string;

    constructor(){
        this.id = userconfig.id;
        this.nickname = userconfig.nickname;
        this.level = userconfig.level;
        this.status = userconfig.status;
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