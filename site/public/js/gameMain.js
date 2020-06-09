"use strict";

//game for the demo page

class Entity { //base class for things that do shit ie NPC's and enemies
  constructor(name, health, baseDamage) {
    this.entityName = name;
    this.health = health;
    this.baseDamage = baseDamage;
  }
}

class Player extends Entity {
  constructor(name, armour) {
    super(name);
    this.armour = armour; //multiplier to lessen base damage from Enemy class, affected by Buffs and Consumable classes
  }
}

class NPC extends Entity { //talks to player or gives actions
  constructor(name, health) {
    super(name, health);
  }
}

class Enemy extends Entity { //causes damage to player
  constructor(name, health, baseDamage) {
    super(name,health,baseDamage);
  }
}

class Item { //flavour text
  constructor(name) {
    this.itemName = name;
  }
}

class Weapon extends Item { //affect base damage
  constructor(name, damageAddition) {
    super(name);
    this.damageAddition = damageAddition;
  }
}

class Buff extends Item { //affect health, or armour rating permanently
  constructor(name, effect, effectMagnitude) {
    super(name);
    this.effect = effect;
    this.effectMagnitude = effectMagnitude;
  }
}

class Consumable extends Buff { //add health or armour for 1 turn duration
  constructor(name, effect, effectMagnitude) {
    super(name, effect, effectMagnitude);
  }
}

class Location { //holds items and entities, flavor text about the place etc
  constructor(name) {
    this.locationName = name;
  }
}

class Map { //holds locations
  constructor() {

  }
}

class Event { //held by location, triggered by NPC, or player action, or entrance to location
  constructor() {

  }
}

class Narrative extends Event { //for speech? user presented with text and are given choices
  constructor() {

  }
}

class Combat extends Event { //turn based, contains two entities seeking input from each in some form, for NPC the turn is randomised
  constructor(entity1, entity2) {

  }
}
