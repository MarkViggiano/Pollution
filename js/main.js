const canvas = document.getElementById("mainEnvironment");
const ctx = canvas.getContext("2d");
var clearCanvas = new Event("canvasCleared");
var organisms = [];

function getRandomX() {
  let newX = Math.floor(Math.random() * 1600);

  return newX;
}

function getRandomY() {
    let newY = Math.floor(Math.random() * 800);

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

class Lake {
  constructor(pollution) {
    this.pollution = pollution;
    this.range = 10;
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

  reproduce(animal) {
    if(this.rUrge >= 5 && this.health >= 50) {
      if(animal.rUrge >= 5 && animal.health >= 50) {
        console.log("Reproduce");
      } else {
        console.log("Reproduction Failed!");
      }
    } else {
      console.log("Reproduction Failed!");
    }
  }

  move() {

    let newX = getRandomX();
    let newY = getRandomY();

    while(this.x != newX) {

      if(newX >  this.x) {
        this.x = newX;
        break;
      }

      if(this.x >= newX) {

        this.x = this.x - this.velocity;


      } else if(this.x <= newX) {

        this.x = this.x + this.velocity;

      }
    }

    while(this.y != newY) {

      if(newY > this.y) {
        this.y = newY;
        break;
      }

      if(this.y >= newY) {

        this.y = this.y - this.velocity;

      } else if(this.y <= newY) {

        this.y = this.y + this.velocity;

      }
    }

    window.dispatchEvent(clearCanvas);

  }

}

function setupEnvironment() {
  ctx.fillStyle = "#47D83B";
  ctx.fillRect(0,0,1600,800);
  ctx.stroke();
}

window.addEventListener('load', (event) => {
  setupEnvironment()
  let rabbit1 = new Animal(5, 100, 100, 100, 6, "Rabbit", 56, 130);
  let rabbit2 = new Animal(5, 100, 100, 100, 6, "Rabbit", 56, 130);
  let rabbit3 = new Animal(5, 100, 100, 100, 6, "Rabbit", 56, 130);
  let fox1 = new Animal(5, 100, 100, 100, 8, "Fox", 1245, 45);
  let fox2= new Animal(5, 100, 100, 100, 8, "Fox", 1245, 45);
  let fox3 = new Animal(5, 100, 100, 100, 8, "Fox", 1245, 45);
  organisms.push(rabbit1);
  organisms.push(rabbit2);
  organisms.push(rabbit3);
  organisms.push(fox1);
  organisms.push(fox2);
  organisms.push(fox3);

  setInterval(() => {
    for (var i = 0; i < organisms.length; i++) {

      if(organisms[i].moving) {
        continue;
      }

      organisms[i].move();
      organisms[i].moving = true;
    }

  }, 1000);

});

window.addEventListener('canvasCleared', function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.stroke();
  setupEnvironment();

  for (var i = 0; i < organisms.length; i++) {

    var creature = organisms[i];

    if (creature.type == "Rabbit") {
      ctx.fillStyle = "gray";
      ctx.fillRect(creature.x,creature.y,50,50);
      ctx.stroke();
    }

    if (organisms[i].type == "Fox") {
      ctx.fillStyle = "red";
      ctx.fillRect(creature.x,creature.y,50,50);
      ctx.stroke();
    }

    creature.moving = false;

  }
});
