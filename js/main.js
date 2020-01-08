const canvas = document.getElementById("mainEnvironment");
const ctx = canvas.getContext("2d");
const aFox = document.getElementById("aFox");
const bFox = document.getElementById("bFox");

const aRabbit = document.getElementById("aRabbit");
const bRabbit = document.getElementById("bRabbit");

const plantGrass = document.getElementById("grass");
var clearCanvas = new Event("canvasCleared");


var organisms = [];
var lakes = [];
var plants = [];

function getRandomX() {
  let newX = Math.floor(Math.random() * 300);

  return newX;
}

function getRandomY() {
    let newY = Math.floor(Math.random() * 300);

    return newY;
}

function getDistance(x1, y1, x2, y2) {
  var distanceX = x2 - x1;
  var distanceY = y2 - y1;
  var sqDistanceX = Math.pow(distanceX, 2);
  var sqDistanceY = Math.pow(distanceY, 2);

  var addedDistance = sqDistanceX + sqDistanceY;

  var sqrtDistance = Math.sqrt(addedDistance);

  return sqrtDistance;
}

class Plant {
   constructor(x, y, hReplenish) {
     this.x = x;
     this.y = y;
     this.hReplenish = hReplenish;
     this.eaten = false;
     this.polluted;
   }
}

class Lake {
  constructor(range) {
    this.pollution;
    this.range = range;
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
    this.velocity = 50;
    this.moving = false;
    this.maxHealth = 100;
    this.maxHunger = 100;
    this.maxThirst = 100;
    this.maxAge = 10;
    this.maxRUrge = 10;
    this.moveToX;
    this.moveToY;

    //foxes only
    this.attack = 25;
    this.hunting;
  }

  move() {

    let randomChance = Math.floor(Math.random() * 2);

    let newX = getRandomX();
    let newY = getRandomY();

    if (randomChance == 0) {
      this.x = this.x + newX;
      this.y = this.y + newY;
    }

    if (randomChance == 1) {
      this.x = this.x - newX;
      this.y = this.y - newY;
    }

    if (this.x >= 1600) {
      this.x = newX;
    }

    if (0 > this.x) {
      this.x = newX;
    }

    if (this.y >= 800) {
      this.y = newY;
    }

    if (0 > this.y) {
      this.y = newY;
    }

    window.dispatchEvent(clearCanvas);

  }

  reproduce(animal) {

    if (this.type == animal.type) {
      if(this.rUrge >= 5 && this.health >= 50) {
        if(animal.rUrge >= 5 && animal.health >= 50) {
          let creature = new Animal(5, 100, 100, 100, 6, this.type, this.x, this.y);
          organisms.push(creature);
        } else {
          animal.move();
          this.move();
        }
      } else {
        animal.move();
        this.move();
      }
    } else {
      animal.move();
      this.move();
    }

  }

}

function drawGrass() {
  for (var i = 0; i < plants.length; i++) {
    plants[i]
    ctx.drawImage(plantGrass, plants[i].x, plants[i].y, 20, 20);
    ctx.stroke();
  }
}

function setupEnvironment() {
  ctx.fillStyle = "#47D83B";
  ctx.fillRect(0,0,1600,800);
  ctx.stroke();

  drawGrass();
}

function generateRabbits() {
  let rabbit1 = new Animal(6, 100, 100, 100, 6, "Rabbit", 56, 130);
  let rabbit2 = new Animal(2, 100, 100, 100, 6, "Rabbit", 56, 130);
  let rabbit3 = new Animal(3, 100, 100, 100, 6, "Rabbit", 56, 130);

  organisms.push(rabbit1);
  organisms.push(rabbit2);
  organisms.push(rabbit3);
}

function generateFoxes() {
  let fox1 = new Animal(2, 100, 100, 100, 8, "Fox", 1245, 45);
  let fox2= new Animal(5, 100, 100, 100, 8, "Fox", 1245, 45);
  let fox3 = new Animal(5, 100, 100, 100, 8, "Fox", 1245, 45);
  organisms.push(fox1);
  organisms.push(fox2);
  organisms.push(fox3);
}

function generateGrass() {
  for (var i = 0; i < 100; i++) {

    var x = Math.floor(Math.random() * 1550);
    var y = Math.floor(Math.random() * 750);

    let grass = new Plant(x, y, 20);
    plants.push(grass);
  }

  drawGrass();

}

window.addEventListener('load', (event) => {
  setupEnvironment();
  generateRabbits();
  generateFoxes();
  generateGrass();

  /*
   * Every 1 second add to reproductive urge and age | Subtract hunger and thurst
   */
  setInterval(() => {
    for (var i = 0; i < organisms.length; i++) {

      organisms[i].rUrge = organisms[i].rUrge + 0.1;
      organisms[i].age = organisms[i].age + 0.01;
      organisms[i].hunger = organisms[i].hunger - 0.5;
      organisms[i].thirst = organisms[i].rUrge - 0.5;

    }
  }, 1000);

  /*
   * Every half second loop through all creatures and move them if they are not already moving
   */
  setInterval(() => {
    for (var i = 0; i < organisms.length; i++) {

      if(organisms[i].moving) {
        continue;
      }

      organisms[i].move();
      organisms[i].moving = true;
    }

  }, 500);

});

window.addEventListener('canvasCleared', function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.stroke();
  setupEnvironment();

  for (var i = 0; i < organisms.length; i++) {

    var creature = organisms[i];

    if (creature.type == "Rabbit") {
      if (organisms[i].age >= 5) {
        ctx.drawImage(aRabbit, creature.x, creature.y, 30, 40);
        ctx.stroke();
      } else {
        ctx.drawImage(bRabbit, creature.x, creature.y, 20, 25);
        ctx.stroke();
      }
    }

    if (organisms[i].type == "Fox") {
      if (organisms[i].age >= 5) {
        ctx.drawImage(aFox, creature.x, creature.y, 50, 60);
        ctx.stroke();
      } else {
        ctx.drawImage(bFox, creature.x, creature.y, 30, 35);
        ctx.stroke();
      }
    }

    creature.moving = false;

  }
});
