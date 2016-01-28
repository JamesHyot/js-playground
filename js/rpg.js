/**
 * Created by james on 07/12/15.
 */

'use strict'

class Character {
    //private var _name, _hp, _level, _xp, _attack, _resistance;

    constructor(name, hp, level, xp, attack, resistance)
    {
        this._name = name;
        this._hp = hp;
        this._level = level;
        this._xp = xp;
        this._attack = attack;
        this._resistance = resistance;
    }


    set hp(value) {
        this._hp = value;
    }

    set name(value) {
        this._name = value;
    }

    set level(value) {
        this._level = value;
    }

    set xp(value) {
        if(value >= 10)
        {
            this.level(this.level() +1);
            document.write("You leveled up to " + this.level() + "!");
            this.xp(0);
        }
        this._xp = value;

    }

    set attack(value) {
        this._attack = value;
    }

    set resistance(value) {
        this._resistance = value;
    }

    get name() {
        return this._name;
    }

    get hp() {
        return this._hp;
    }

    get level() {
        return this._level;
    }

    get xp() {
        return this._xp;
    }

    get attack() {
        return this._attack;
    }

    get resistance() {
        return this._resistance;
    }

    attack(character){
        character.hp(character.hp() - Math.max(0, this.attack() - character.resistance()));
        document.write(character + " hits " + this + " for " + Math.max(0, this.attack() - character.resistance()));
    }
}

module.exports = Character;

class Mob extends Character {


}

class Player extends Character {
    //private var _x, _y, _nbPots;

    constructor(name, hp, level, xp, attack, resistance, x, y, nbPots)
    {
        super(name,hp,level, xp,attack,resistance);
        this._x = x;
        this._y = y;
        this._nbPots = nbPots;
    }


    get nbPots() {
        return this._nbPots;
    }

    set nbPots(value) {
        this._nbPots = value;
    }

    get x() {
        return _x;
    }

    set x(value) {
        this._x = value;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
    }

    moveUp(){
        this._y++;
        document.write(this + "is at" + this.x() + this.y());
        if (Math.random() > 0.9){
            var rat = new Mob("Rat", 50, 1, 0, 5, 3);
            combat(rat);
        }
    }

    moveDown(){
        this.y(this._y - 1);
        document.write(this + "is at" + this.x() + this.y());
        if (Math.random() > 0.9){
            var bird = new Mob("Bird", 50, 1, 0, 8, 0);
            combat(bird);
        }
    }

    moveLeft(){
        this.x(this._x - 1);
        document.write(this + "is at" + this.x() + this.y());
        if (Math.random() > 0.9){
            var crocodile = new Mob("Crocodile", 75, 1, 0, 4, 5);
            combat(crocodile);
        }
    }

    moveRight(){
        this.x(this._x + 1);
        document.write(this + "is at" + this.x() + this.y());
        if (Math.random() > 0.9){
            var bat = new Mob("Bat", 30, 2, 0, 5, 3);
            combat(bat);
        }
    }

    combat(monster) {
        document.write(this + "is battling" + monster + "!");
        var initiative = 0;
        if (monster.level() > this.level()) {
            initiative = 0;
        }
        else {
            initiative = 1;
        }

        do {

            do {
                //var command = window.prompt("Do you wish to attack, usepot, or flee ?", "attack");
                var command = "attack";
            } while (command !== "attack" && command !== "usepot" && command !== "flee");

            if (command === "attack") {
                if (initiative = 1) {
                    this.attack(monster);
                    if (monster.hp() <= 0) {
                        document.write(monster + "died.");
                        this.xp(this.xp() + 1);
                        document.write("You gained experience ! You now have : " + this.xp);
                        return;
                    }
                    else {
                        monster.attack(this);
                    }

                }
                else {

                    monster.attack(this);
                    if (this.hp() <= 0) {
                        document.write(this + "died.");
                        return;
                    }
                    else {
                        this.attack(monster);
                    }
                }
            }
            else if (command === "usepot") {
                this.hp(this.hp + 30);
                nbPots(nbPots() - 1);
                monster.attack(this);
            }

            else if (command === "flee") {
                if (Math.random() > 0.75) {
                    document.write(this + "fled.");
                    return;
                }
                else {
                    monster.attack(this);
                }
            }


            initiative = !initiative;
        } while (monster.hp() > 0 && this.hp() > 0)


    }
}

var james = new Player("James",100,1,0,10,2,0,0,3);


do{
    do {
        //var move = window.prompt("Do you wish to moveUp, moveDown, moveLeft or moveRight ?", "moveUp");
        var move = "moveUp";
    } while (move !== "moveUp" && move !== "moveDown" && move !== "moveRight" && move !== "moveLeft");

    switch(move){
        case "moveUp":
                james.moveUp();
            break;
        case "moveDown":
                james.moveDown();
            break;
        case "moveLeft":
                james.moveLeft();
            break;
        case "moveRight":
                james.moveRight();
            break;
    }

}while(this._hp>0);

document.write("GAME OVER !");

