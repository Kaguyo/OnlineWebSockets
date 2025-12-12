import { Characters } from "./characters.js"
export class Room {
  static rooms = [];
  static idCounter = 0;

  id = 0;
  title = "Standard Room";
  playerList = [];
  roomSettings = {
    gameMode: "",
    password: "",
    individualCharactersMode: true,
    sharedCharactersMode: true,
    public: true,
    host: null,
    limit: 3,
  };
  resolver = {
    cleanUpTeam: () => {
      this.resolver.combatHandler.team = [];
    },
    cpuInitializer: (characterList) => {
      characterList.forEach((character, index) => {
        const c = new Characters(
          character.atk, character.maxAtk, character.def, character.maxDef,
          character.spd, character.maxHealth, character.health, character.energy,
          character.maxEnergy, character.name, character.authorPlayerId
        );
        c.id = index + 1;
        this.resolver.combatHandler.enemyTeam.push(c);
      });
    },
    teamInitializer: (characterList) => {
      characterList.forEach((character, index) => {
        const c = new Characters(
          character.atk, character.maxAtk, character.def, character.maxDef,
          character.spd, character.maxHealth, character.health, character.energy,
          character.maxEnergy, character.name, character.authorPlayerId
        );
        c.id = index + 1;
        this.resolver.combatHandler.team.push(c);
      });
    },
    combatHandler: {
      recentCharacterId: 0,
      characterToTakeActionId: 0,
      team: [],
      enemyTeam: [],
      calculatePlayerTurn: () => {
        let highestAction = 0;
        this.resolver.combatHandler.team.forEach((character) => {
          if (character.id != this.resolver.combatHandler.recentCharacterId)
            character.actionWeight += character.spd;
        
            if (highestAction <= character.actionWeight){
              highestAction = character.actionWeight;
              this.resolver.combatHandler.characterToTakeActionId = character.id;
            }
        });
      },
      moveWithChosenTarget: (move) => {
        if (move.name == "skip"){ // nao vou implementar agora
        }
        if (move.atk > 0){
          let dmg = Math.max(0, Math.round((move.atk - move.target.def)));
          this.resolver.combatHandler.enemyTeam[move.target.id].health -= dmg;
        }
      }
    },

    chat:{
      messages: []
    },
    busy: false,
    status: ""
  };

  constructor(accountId){
    Room.idCounter++;
    this.roomSettings.host = accountId;
    Room.rooms.push(this);
  }
}