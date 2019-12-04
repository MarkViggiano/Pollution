const environment = document.getElementById("mainEnvironment").getContext("2d");

class Rabbit {
  constructor(age, hunger, thirst, health, rUrge) {
    //Provided Variables
    this.age = age;
    this.hunger = hunger;
    this.thirst = thirst;
    this.health = health;
    this.rUrge = rUrge;

    //Constants
    this.maxHealth = 100;
    this.maxHunger = 100;
    this.maxThirst = 100;
    this.maxAge = 10;
    this.maxRUrge = 10;
  }

  reproduce(rabbitName) {
    if(this.age >= 3 && this.rUrge >= 4) {
      if(rabbitName.age >= 3 && rabbitName.rUrge >= 4) {
        console.log('Reproduction has occured!');
      } else {
        console.log('One or more rabbits cannot reproduce!');
      }
    } else {
      console.log('Cannot yet reproduce!');
    }
  }

}


function generateLakes() {
  var lakeNumber = Math.floor(Math.random() * 3);
  coordinates = [];

  for (var i = 0; i < lakeNumber; i++) {
    //Add 200 to make sure lakes cannot spawn between 0 - 200 pixels
    var coordinateX = Math.floor(Math.random() * 1400) + 200;
    var coordinateY = Math.floor(Math.random() * 1400) + 200;

    coordinates.push([coordinateX, coordinateY]);
  }

  console.log(coordinates);

  coordinates.forEach( function(cords) {
    console.log(`A lake has spawned at cords ${cords}`);
  });

}

function setupEnvironment() {
  environment.fillStyle = "#47D83B";
  environment.fillRect(0,0,1600,800);
  generateLakes()
}

window.addEventListener('load', (event) => {
  setupEnvironment()

  var rabbitA = new Rabbit(5, 80, 56, 100, 6);
  var rabbitB = new Rabbit(5, 20, 90, 20, 4);
  rabbitB.reproduce(rabbitA);
});
