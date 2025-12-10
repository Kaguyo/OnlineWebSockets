import userData from "../../user.json";  // ajuste o caminho conforme sua estrutura

export class SendPublicInfo {
  id: string;
  nickname: string;
  level: number;
  status: string;

  constructor() {
    this.id = String(userData.id);
    this.nickname = String(userData.nickname);
    this.level = Number(userData.level);
    this.status = String(userData.status);
  }
}
