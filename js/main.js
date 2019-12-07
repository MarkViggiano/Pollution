const environment = document.getElementById("mainEnvironment").getContext("2d");
var organisms = [];

class Lake {
  constructor(pollution) {
    this.pollution = pollution;
  }

  pollute(lake, addedPollutant) {
    lake.pollution = lake.pollution + addedPollutant;
  }

  cleanUp(lake, removedPollutant) {
    lake.pullution = lake.pollution - removedPollutant;
  }
}


class Animal {
  constructor(age, hunger, thirst, health, rUrge, type, x, y) {
    //Provided Variables
    this.x = x;
    this.y = y;
    this.age = age;
    this.hunger = hunger;
    this.thirst = thirst;
    this.health = health;
    this.rUrge = rUrge;
    this.type = type;

    //Constants
    this.maxHealth = 100;
    this.maxHunger = 100;
    this.maxThirst = 100;
    this.maxAge = 10;
    this.maxRUrge = 10;

    //foxes only
    this.attack = 25;
  }

}




function setupEnvironment() {
  environment.fillStyle = "#47D83B";
  environment.fillRect(0,0,1600,800);
}

window.addEventListener('load', (event) => {
  setupEnvironment()





});
