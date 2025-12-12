export class Characters {
  atk;
  maxAtk;
  def;
  maxDef;
  spd;
  maxHealth;
  health;
  actionWeight;
  energy;
  maxEnergy;
  name;
  authorPlayerId;
  id = 0;
  actionWeight = 0;
  constructor(atk, maxAtk, def, maxDef, spd, maxHealth, health, energy, maxEnergy, name, authorPlayerId = "0"){
    this.atk = atk;
    this.maxAtk = maxAtk;
    this.def = def;
    this.maxDef = maxDef;
    this.spd = spd;
    this.maxHealth = maxHealth;
    this.health = health;
    this.actionWeight = actionWeight;
    this.energy = energy;
    this.maxEnergy = maxEnergy;
    this.name = name;
    this.authorPlayerId = authorPlayerId;
  }
}