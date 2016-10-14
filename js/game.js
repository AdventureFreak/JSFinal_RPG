//* means it works and I don't have to worry about it anymore
//add the button event handler

//set up all variables, objects, and functions
//basic player
var Player = {
    name: "",
    health: 50,
    maxhealth: 50,
    attack: 0,
};

//item object
function Item(nam, typ, pow, use) {
    var name;
    var type;
    var power;
    var uses;
    this.name = nam;
    this.type = typ;
    this.power = pow;
    this.uses = use;
};

//enemy constructor
function Enemy(heal, atk, nam) {
    var health;
    var attack;
    var name;
    this.health = heal;
    this.attack = atk;
    this.name = nam;
};

//variables that must exist in the global scope
var inventory = [];
var baseHealth = 70;
var baseAttack = 3;
var dead = false;

//name randomizers *
//arrays of names
var firstNames = ["James", "John", "Jill", "Jan", "Bob", "Bill", "Bonnie", "Brianna", "Kent", "Kayla", "Megan",
                    "Mel", "Neigel", "Nana", "Tom", "Tara", "Zach", "Helen"];

var lastNames = ["Biggins", "Bobbins", "Farfin", "Derger", "Piddles", "Snuggles", "Gnitwhit"];

var title = ["Goblin", "Troll", "Gnome", "Slime", "Goat", "Ogre", "Dragon"];

var weaponNames = ["Sword", "Bow", "Axe", "Knife", "Staff", "Mace", "Fire Spell", "Ice Spell", "Lightning Spell"];
var healingNames = ["Potion", "Elixer", "Charm", "Food"];
var powerNames = ["Great Sword", "Revolver", "Battle Axe", "War Hammer", "Inferno Spell", "Blizzard Spell", "Storm Spell"];

//player name randomizer
function RandomPlayerName() {
    return firstNames[Random(firstNames.length - 1)] + " " + lastNames[Random(lastNames.length - 1)];
}

//enemy name randomizer
function RandomMonsterName() {
    var chance = Random(10);
    if (chance >= 5){
        return firstNames[Random(firstNames.length - 1)] + " the " + title[Random(title.length - 1)];
    } else {
        return title[Random(title.length - 1)] + " " + lastNames[Random(lastNames.length - 1)];
    }
}

//item name randomizer
function RandomItemName(list) {
    return list[Random(list.length - 1)];
}

//get the player's name *
function GetName() {
    Player.name = prompt("Please, tell me what your name is.");
    var tries = 5;
    var name = RandomPlayerName();
    while (Player.name == "" && tries > 0){
        Player.name = prompt("I need to know who you are.");
        tries--;
    };
    if (Player.name == "") {
        alert("I guess you don't care what your name is. I shall call you " + name + ".");
        Player.name = name;
    }
    console.log("Player's name is now " + Player.name);
}

//number randomizer *
function Random(range) {
    return Math.round(Math.random() * range);
};

//item prompts
function GetItem(number) {
    alert("You found " + number + " items!")
    var list = [];
    var name;
    var type;
    var power;
    var uses;
    for (var i = 0; i <= number - 1; i++) {
        var options = Random(5);
        switch (options) {
            case 5:
                name = RandomItemName(healingNames);
                type = 2;
                power = Random(20) + 30;
                uses = Random(2) + 4;
                break;
        
            case 4:
                name = RandomItemName(healingNames);
                type = 2;
                power = Random(20) + 60;
                uses = Random(2) + 2;
                break;

            case 3:
                name = RandomItemName(powerNames);
                type = 1;
                power = Random(4) + 12;
                uses = Random(2) + 2;
                break;

            default:
                name = RandomItemName(weaponNames);
                type = 1;
                power = Random(3) + 5;
                uses = Random(3) + 3;
                break;
        }
        list.push(new Item(name, type, power, uses));
    }
    var menu = GetMenu(list);
    var choice = parseInt(prompt("What will you choose?\n" + menu + "Enter 1 - " + number) - 1);
    while (choice < 0 || choice > number - 1) {
        alert("Not a valid choice.");
        choice = parseInt(prompt("What will you choose?\n" + menu + "Enter 1 - " + number) - 1);
    }
    inventory.push(new Item(list[choice].name, list[choice].type, list[choice].power, list[choice].uses));
    alert("You obtained the " + list[choice].name);
}

//menu handler
function GetMenu(list) {
    var menu = "";
    for (var i = 0; i <= list.length - 1; i++) {
        if (list[i].type == 2) {
            menu += (i+1) + " - " + list[i].name + ": Heals " + list[i].power + "% of your total health, " + list[i].uses + " uses.\n";
        } else {
            if (list[i].uses > 0) {
                menu += (i+1) + " - " + list[i].name + ": " + (list[i].power + Player.attack) + " attack power, " + list[i].uses + " uses.\n";
            } else {
                menu += (i+1) + " - " + list[i].name + ": " + (list[i].power + Player.attack) + " attack power.\n";
            }
        }
    }
    return menu;
}

//Encounter handler
function Encounter() {
    var event = Battle();
    switch (event) {
        case "win":
            alert("Your foe has been defeated.");
            alert("Your health has increased.");
            alert("Your attack power has increased.");
            Player.maxhealth += 20;
            Player.attack += 3;
            Player.health = Player.maxhealth;
            baseAttack += 5;
            baseHealth += 40;
            break;
    
        default:
            alert("You fall in battle. The land is doomed.");
            dead = true;
            break;
    }
}

//Battle handler
function Battle() {
    var outcome;
    var amount;
    var chance;
    var enemy = new Enemy(baseHealth + Random(15), baseAttack, RandomMonsterName());
    alert(enemy.name + " appears!");
    while (Player.health * enemy.health > 0) {
        alert(Player.name + " has " + Player.health + " health.\n" + enemy.name + " has " + enemy.health + " health.");
        var menu = GetMenu(inventory);
        var choice = parseInt(prompt("Which item will you use?\n" + menu + "Enter 1 - " + inventory.length) - 1);
        while (choice < 0 || choice > inventory.length - 1) {
            alert("Not a valid choice.");
            choice = parseInt(prompt("Which item will you use?\n" + menu + "Enter 1 - " + inventory.length) - 1);
        }
        if (inventory[choice].type == 2) {
            amount = Math.round((inventory[choice].power / 100) * Player.maxhealth);
            Player.health += amount;
            alert("You healed yourself for " + amount + " health.");
            if (Player.health > Player.maxhealth) {
                Player.health = Player.maxhealth;
            }
        } else {
            chance = Random(100);
            if (chance < 95) {
                amount = inventory[choice].power + Player.attack + Random(3);
                enemy.health -= amount;
                alert(enemy.name + " took " + amount + " damage!");
            } else {
                alert("Your attack missed!");
            }
        }
        inventory[choice].uses--;
        if (inventory[choice].uses == 0) {
            inventory.splice(choice, 1);
        }
        if (enemy.health > 0) {
            chance = Random(100);
            alert(enemy.name + " attacks!");
            if (chance < 95) {
                amount = enemy.attack + Random(3);
                Player.health -= amount;
                alert("You took " + amount + " damage!");
            } else {
                alert("The enemy missed!");
            }
        }
    }
    if (Player.health < 1) {
        outcome = "lose";
    } else {
        outcome = "win";
    }
    return outcome;
}

//Reset player values and inventory
function PlayerSet() {
    Player.name = "";
    Player.health = 50;
    Player.maxhealth = 50;
    Player.attack = 0;
    inventory.splice(0,inventory.length);
}

//Get the button to enable events
var button = document.getElementById('start');

//The ganme itself
var game = function gameStart() {
    if (inventory.length != 0) {
        PlayerSet();
        console.log("Game needs to be reset, and thus I have done so. You are welcome.");
    }
    console.log("Game started");
    GetName();
    inventory.push(new Item("Stick of Whacking", 1, 3, -1));
    inventory.push(new Item("Bandage", 2, 25, 8));
    alert(Player.name + ", the brave adventurer, has been sent by the people to slay the evil that resides within the castle. The events that unfold will determine the fate of the land.");
    alert("Before you set off on your journey you get your gear together.  You the Stick of Whacking and some bandages, but you need one more thing.  You open your chest to get it.");
    GetItem(2);
    alert("Setting off, you head toward the castle as you approach the gaurd at the gate isn't happy to see you.");
    Encounter();
    if (dead == false) {
        alert("Making your way inside you discover a store room.  Why not help yourself to something?");
        GetItem(5);
        alert("After a quick loot, you make your way to the tower where the evil master dwells.  Suddenly, you are ambushed!");
        Encounter();
    }
    if (dead == false) {
        alert("Your attacker had something on them.  This will help you.");
        GetItem(5);
        alert("You finally arrive at the tower, and your greatest foe stands before you.");
        Encounter();
    }
    if (dead == false) {
        alert("The evil master lies defeated. You have saved the land from evil.");
        alert("You Win!");
    } else {
        alert("Game Over!");
    }
};

//Event handler
button.addEventListener('click', game);