//* means it works and I don't have to worry about it anymore
//add the button event handler

//set up all variables, objects, and functions
//basic player
var player = {
    name: "",
    health: 100,
};

//item object
function item() {
    var name;
    var canAttack;
    var canHeal;
};

//enemy constructor
function enemy() {
    var health;
    var attack;
    var name;
};

//name randomizer *
var firstNames = ["James", "John", "Jill", "Jan", "Bob", "Bill", "Bonnie", "Brianna", "Kent", "Kayla", "Megan",
                    "Mel", "Neigel", "Nana", "Tom", "Tara", "Zach", "Helen"];

var lastNames = ["Biggins", "Bobbins", "Farfin", "Derger", "Piddles", "Snuggles", "Gnitwhit"];

var title = ["Goblin", "Troll", "Gnome", "Slime", "Goat", "Ogre", "Dragon"];

function randomPlayerName() {
    return firstNames[random(firstNames.length - 1)] + " " + lastNames[random(lastNames.length - 1)];
}

function randomMonsterName() {
    var chance = random(10);
    if (chance >= 5){
        return firstNames[random(firstNames.length - 1)] + " the " + title[random(title.length - 1)];
    } else {
        return title[random(title.length - 1)] + " " + lastNames[random(lastNames.length - 1)];
    }
}

//get the player's name
function getName() {
    player.name = prompt("Please, tell me what your name is.");
    var tries = 5;
    var name = randomPlayerName();
    while (player.name == "" && tries > 0){
        player.name = prompt("I need to know who you are.");
        tries--;
    };
    if (player.name == "") {
        alert("I guess you don't care what your name is. I shall call you " + name + ".");
        player.name = name;
    }
}
//number randomizer *
function random(range) {
    return Math.round(Math.random() * range);
};
getName();
console.log(player.name);
/*
function gameStart() {

};
*/