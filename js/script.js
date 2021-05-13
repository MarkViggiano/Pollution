const canvas = document.getElementById("mainEnvironment");
const ctx = canvas.getContext("2d");
const aFox = document.getElementById("aFox");
const bFox = document.getElementById("bFox");

const aRabbit = document.getElementById("aRabbit");
const bRabbit = document.getElementById("bRabbit");

const plantGrass = document.getElementById("grass");
const animalData = document.getElementById("animals");
var clearCanvas = new Event("canvasCleared");

var organisms = [];
var lakes = [];
var plants = [];
var reproductableRabbit = [];
var reproductableFox = [];

function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

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


class PollutedGround {
  constructor(y, color) {
    this.x = 0;
    this.xOffSet = 1600;
    this.color = color;
    this.y = 0;
    this.yOffSet = y;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.xOffSet, this.yOffSet);
    ctx.stroke();
  }
}


class Plant {
   constructor(x, y, hReplenish) {
     this.x = x;
     this.y = y;
     this.hReplenish = hReplenish;
     this.eaten = false;
     this.polluted = false;
   }
}

class Lake {
  constructor(x, y, range) {
    this.x = x;
    this.y = y;
    this.pollution = 0;
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
    this.reproductAble = true;

    //foxes only
    this.attack = 25;
    this.moveAble = true;
  }

  move() {

    let randomChance = Math.floor(Math.random() * 2);

    let newX = randomIntFromInterval(this.x - 50, this.x + 50);
    let newY = randomIntFromInterval(this.y - 50, this.y + 50);

    this.x = newX;
    this.y = newY;

    if (this.x >= 1600) {
      this.x = randomIntFromInterval(300, 800);
    }

    if (0 > this.x) {
      this.x = randomIntFromInterval(300, 800);
    }

    if (this.y >= 800) {
      this.y = randomIntFromInterval(300, 800);
    }

    if (0 > this.y) {
      this.y = randomIntFromInterval(300, 800);
    }

    if (!this.y >= 80) {
      this.y = randomIntFromInterval(300, 800);
    }

    window.dispatchEvent(clearCanvas);

  }

  moveTo (x, y) {
    this.x = x;
    this.y = y;
  }

  reproduce(animal) {

    var x = randomIntFromInterval(0, 1600);
    var y = randomIntFromInterval(300, 800);

    this.moveable = false;
    animal.moveable = false;

    this.rUrge = 0;
    animal.rUrge = 0;

    //Move both animals to same position
    this.moveTo(x, y);
    animal.moveTo(x, y);

    if (this.type == "Rabbit") {

          organisms.push(newRabbit);
          //Remove parents from reproductive loop.
          let arrayPosition1 = reproductableRabbit.indexOf(this);
          reproductableRabbit.splice(arrayPosition1, 1);

          let arrayPosition2 = reproductableRabbit.indexOf(animal);
          reproductableRabbit.splice(arrayPosition2, 1);
    } else {
          organisms.push(newFox);
          //Remove parents from reproductive loop.
          let arrayPosition1 = reproductableFox.indexOf(this);
          reproductableFox.splice(arrayPosition1, 1);

          let arrayPosition2 = reproductableFox.indexOf(animal);
          reproductableFox.splice(arrayPosition2, 1);
    }

    this.moveable = true;
    animal.moveable = true;

    this.reproductAble = true;
    animal.reproductAble = true;

  }

  kill() {
    let arrayPosition = organisms.indexOf(this);
    organisms.splice(arrayPosition, 1);
  }

  getFood() {
    this.moveAble = false;

    if (this.type == "Rabbit") {

      var plant = Math.floor(Math.random() * plants.length);

      var arrayPosition = plants.indexOf(plant);

      this.moveTo(plant.x, plant.y);
      if (plant.polluted) {
        this.hunger += 10;
      } else {
        this.hunger = 0;
      }
      this.moveAble = true;

      plants.splice(arrayPosition, 1);

    } else if (this.type == "Fox") {

      let random = Math.floor(Math.round() * organisms.length);
      var organism = organisms[random];

      this.hunger = 0;
      this.moveTo(organism.x, organism.y);
      this.moveAble = true;

      organism.kill();

    } else {
      console.log("Unexpected outcome!");
    }
  }

  getWater() {
    let random = Math.floor(Math.random() * lakes.length);

    this.moveAble = false;

    this.moveTo(lakes[random].x - lakes[random].range, lakes[random].y);
    if (lakes[random].pollution >= 5) {
      this.thirst = this.thirst + 10;
    } else {
      this.thirst = 0;
    }

    this.moveAble = true;
  }

}

function drawGrass() {
  for (var i = 0; i < plants.length; i++) {
    ctx.drawImage(plantGrass, plants[i].x, plants[i].y, 20, 20);
    ctx.stroke();
  }
}

function drawLakes() {
  for(var i = 0; i < lakes.length; i++) {
    var lake = lakes[i];

      if (lake.pollution >= 5) {
        ctx.beginPath();
        ctx.fillStyle = "#6D999E";
        ctx.strokeStyle = "#6D999E";
        ctx.arc(lake.x, lake.y, lake.range, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.fillStyle = "aqua";
        ctx.strokeStyle = "aqua";
        ctx.arc(lake.x, lake.y, lake.range, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
      }


  }
}

function setupEnvironment() {
  ctx.fillStyle = "#47D83B";
  ctx.fillRect(0,0,1600,800);
  ctx.stroke();
}

function generateRabbits() {
  for (var i = 0; i < 10; i++) {
    let rabbit1 = new Animal(randomIntFromInterval(2, 8), 0, 0, 100, 2, "Rabbit", randomIntFromInterval(0, 1600), randomIntFromInterval(300, 800));
    organisms.push(rabbit1);
  }
}

function generateFoxes() {
  let fox1 = new Animal(randomIntFromInterval(2, 6), 0, 0, 100, 8, "Fox", randomIntFromInterval(0, 1600), randomIntFromInterval(300, 800));
  let fox2= new Animal(randomIntFromInterval(2, 6), 0, 0, 100, 8, "Fox", randomIntFromInterval(0, 1600), randomIntFromInterval(300, 800));
  organisms.push(fox1);
  organisms.push(fox2);
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

function generateLakes() {
  for (var i = 0; i < 3; i++) {

    var x = Math.floor(Math.random() * 1550);
    var y = Math.floor(Math.random() * 750);
    var radius = Math.floor(Math.random() * 100);

    let lake = new Lake(x, y, radius);
    lakes.push(lake);
  }

  drawLakes();

}

/*
=============================
Start Variable Checking
=============================
*/

function checkRUrge(organism) {
  if (organism.rUrge > 5 && organism.age >= 5) {

    if(organism.reproductAble) {

      switch (organism.type) {
        case "Rabbit":
          reproductableRabbit.push(organism);
          organism.reproductAble = false;
          try {
            reproductableRabbit[0].reproduce(reproductableRabbit[1]);
          } catch (e) {
          }
          break;

        case "Fox":
          reproductableFox.push(organism);
          organism.reproductAble = false;
          try {
            reproductableFox[0].reproduce(reproductableFox[1]);
          } catch (e) {
          }
          break;
      }

    }

  }

  if (organism.rUrge >= 5 && 5 > organism.age) {
    organism.rUrge = 0;
  }

}

function checkAge(organism) {
  if (organism.age >= 10) {
    let arrayPosition = organisms.indexOf(organism);
    organisms.splice(arrayPosition, 1);
  }
}

function checkHunger(organism) {
  if (organism.hunger > 50) {
    organism.getFood();
  }

  if (organism.hunger >= 100) {
    organism.kill();
  }

}

function checkThirst(organism) {
  if (organism.thirst > 50) {
    organism.getWater();
  }

  if (organism.thirst >= 100) {
    organism.kill();
  }
}

/*
=============================
End Variable Checking
=============================
*/


/*
=============================
Road and Car Management [start]
=============================
*/
const redCar = document.getElementById("redCar");
const yellowCar = document.getElementById("yellowCar");
const greenCar = document.getElementById("greenCar");
const blueCar = document.getElementById("blueCar");
const pinkCar = document.getElementById("pinkCar");
const cars = ["../assets/redCar.png", "../assets/blueCar.png", "../assets/yellowCar.png", "../assets/pinkCar.png"];
const activeCars = [];

class Car {
  constructor(asset, x, y) {
    this.x = x;
    this.y = y;
    this.image = asset;
  }

  move() {
    if(this.x >= 1600) {
      let position = activeCars.indexOf(this);
      activeCars.splice(position, 1);
    }

    this.x += 5;
  }
}

function generateCar() {
  let randomCar = Math.floor(Math.random() * cars.length);
  var newCar = new Car(cars[randomCar], 0, 5);
  activeCars.push(newCar);
}

function moveCars() {
  for (var i = 0; i < activeCars.length; i++) {
    activeCars[i].move();
  }
}

function drawCars() {
  for (var i = 0; i < activeCars.length; i++) {
    let currentCar = activeCars[i];
    switch (currentCar.image) {
      case cars[0]:
        ctx.drawImage(redCar, currentCar.x, currentCar.y, 100, 50);
        ctx.stroke();
        break;

      case cars[1]:
        ctx.drawImage(blueCar, currentCar.x, currentCar.y, 100, 50);
        ctx.stroke();
        break;

      case cars[2]:
        ctx.drawImage(yellowCar, currentCar.x, currentCar.y, 100, 50);
        ctx.stroke();
        break;

      case cars[3]:
        ctx.drawImage(pinkCar, currentCar.x, currentCar.y, 100, 50);
        ctx.stroke();
        break;

    }
  }
}

function drawRoads() {
  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 1600, 60);
  ctx.stroke();
}

/*
=============================
Road and Car Management [end]
=============================
*/
var newRabbit = new Animal(0, 0, 0, 100, 0, "Rabbit", 1000, 400);
var newFox = new Animal(0, 0, 0, 100, 0, "Fox", 1000, 400);
var pollutedGround = new PollutedGround(0, "#71905E");

window.addEventListener('load', (event) => {
  setupEnvironment();
  drawGrass();
  drawLakes();
  generateRabbits();
  generateFoxes();
  generateGrass();
  generateLakes();

  /*
   * Every 1 second add to reproductive urge and age | Subtract hunger and thurst
   */
  setInterval(() => {

      for (var i = 0; i < organisms.length; i++) {
        try {
          organisms[i].rUrge += 0.1;
          organisms[i].age += 0.01;
          organisms[i].hunger += 1;
          organisms[i].thirst += 1;

          checkRUrge(organisms[i]);
          checkAge(organisms[i]);
          checkHunger(organisms[i]);
          checkThirst(organisms[i]);

          if (10 > plants.length) {
            generateGrass();
          }
        } catch (err) {
          continue;
        }
    }

    for (var i = 0; i < lakes.length; i++) {
      var lake = lakes[i];

      if(lake.y < 300) {
        lake.pollute(lake, 0.25);
      }


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

      if (!organisms[i].moveAble) {
        continue;
      }

      organisms[i].move();
      organisms[i].moving = true;

      moveCars();

    }

  }, 500);

});

/*
 * Every 2.5 seconds generate a new car
 */

setInterval(() => {
  generateCar();
  drawCars();
}, 2500)

window.addEventListener('canvasCleared', function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.stroke();
  setupEnvironment();
  if (pollutedGround.yOffSet < 300) {
    pollutedGround.yOffSet += 0.25;
  }
  pollutedGround.draw();
  drawGrass();
  drawLakes();
  drawRoads();
  drawCars();

  for (var i = 0; i < plants.length; i++) {
    var plant = plants[i];

    if (pollutedGround.y >= plant.y) {
      plant.polluted = true;
    }

  }

  var sendData = "";
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

    sendData += `
    <div class="col-sm-3 border shadow rounded border-${creature.type} mt-2 p-3">
          <div class="m-1 p-1">
            Thirst: ${creature.thirst}/100<br>
          <div class="progress">
            <div class="progress-bar" role="progressbar" style="width: ${creature.thirst}%" aria-valuenow="${creature.thirst}" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          Hunger: ${creature.hunger}/100<br>
          <div class="progress">
            <div class="progress-bar bg-danger" role="progressbar" style="width: ${creature.hunger}%" aria-valuenow="${creature.hunger}" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          Age: ${Math.round(creature.age)}<br>
          <div class="progress mb-2">
            <div class="progress-bar bg-success" role="progressbar" style="width: ${Math.round(creature.age)}0%" aria-valuenow="${Math.round(creature.age)}" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          Reproductive Urge: ${Math.round(creature.rUrge)}<br>
          <div class="progress mb-2">
            <div class="progress-bar bg-warning" role="progressbar" style="width: ${Math.round(creature.rUrge)}0%" aria-valuenow="${Math.round(creature.rUrge)}" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          </div>
        </div>
    `;

  }

  animalData.innerHTML = sendData;

});
