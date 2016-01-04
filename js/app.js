// Enemies our player must avoid
var Enemy = function(startX, startY) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = startX;
    this.y = startY;

};

// Resets Enemy speed, and position - used upon "win" and "collision" cases
Enemy.prototype.reset = function () {
    var speed = Math.floor((Math.random() * 300) + 50);
    this.x = Math.floor(Math.random() * (-600)) - 100;
};

// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Sets speed multiplier value
    var speed = Math.floor((Math.random() * 300) + 50);

    // Detects enemy/player collisions, resets both upon true
    if (player.y >= this.y - 40 && player.y <= this.y + 40) {
        if (player.x >= this.x - 40 && player.x <= this.x + 40) {
          player.reset();
          // Resets ALL instances of Enemy objects, used instead of this.enemy, which would only reset the single Enemy object involved in collision
          allEnemies.forEach(function(enemy) { enemy.reset(); });
        }
    }

    // Checks if Enemy has reached the end of the board
    if (this.x < 500){
      // Establishes Enemy speed
  		this.x = (this.x + dt * speed);
    }
    // Resets Enemy postition if it has traveled past right edge of board
    else {
      this.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
  // Creates 3 instances of Enemy object, each with a different starting point on y axis
  	for (var i = 0; i < 3; i++) {
      allEnemies[i] = new Enemy(Math.floor(Math.random() * (-600)) - 100, ((i+1)*55)+(i*30));
    }

// Place the player object in a variable called player
var Player = function(playerimage) {
    this.sprite = playerimage;
    // Sets player starting position on board
    this.x = 200;
    this.y = 300;
};

var player = new Player('images/char-boy.png');

// Resets Player position - used upon "win" and "collision" cases
Player.prototype.reset = function () {
    this.x = 200;
    this.y = 300;
};

Player.prototype.update = function(dt){
  // Displays "win" prompt upon reaching water, resets both Player and Enemy positions
    function win(){
      alert("You Win!");
      player.reset();
      allEnemies.forEach(function(enemy) { enemy.reset(); });
    }
    // Triggers "win" upon reaching water
    if ( this.y == -20 ){
      win();
     }
};

// Draw the Player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handles arrow-based keyboard input for Player control, && checks to see if Player has reached board boundary
player.handleInput = function(direction){
    if (direction == 'up' && this.y > 0) {
      this.y = this.y - 80;
    }
    else if (direction == 'down' && this.y < 370) {
      this.y = this.y + 80;
    }
    else if (direction == 'left' && this.x > 0) {
      this.x = this.x - 100;
    }
    else if (direction == 'right' && this.x < 400) {
      this.x = this.x + 100;
    }
};


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
      var allowedKeys = {
          37: 'left',
          38: 'up',
          39: 'right',
          40: 'down'
      };

      player.handleInput(allowedKeys[e.keyCode]);
});
