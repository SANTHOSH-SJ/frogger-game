// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.reset();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    //Reset enemy position once they leave the canvas
    if (this.x > 505) {
        this.reset();
    }
    // Collision
    if ((this.x + 75) >= player.x && this.x <= (player.x + 101) &&
        player.y > this.y && player.y < (this.y + 10)) {
        player.reset(false);
    }
};

// Set enemy initial position and speed
Enemy.prototype.reset = function() {
    this.x = -101;
    this.y = 65 + Math.floor(Math.random() * 3) * 83;
    this.speed = Math.floor(Math.random() * 4) * 20 + 100 * player.level;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// Player class requires an update(), render() and
// a handleInput() method.

// Player and its properties
var Player = function() {
    this.x = 202;
    this.y = 400;
    this.sprite = 'images/char-boy.png';
    this.spriteLife = 'images/Heart-small.png';
    this.score = 0;
    this.lives = 3;
    this.level = 1;
};

Player.prototype.update = function(dt) {};

// Draw the player on the canvas
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    // Set white overlay rectangle
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, 505, 50);

    // Set the text defaults
    ctx.fillStyle = "#ff0000";
    ctx.font = "30px Courier New";

    // Draw the score and level on the canvas
    ctx.fillText(player.score, 10, 40);
    ctx.fillText('Level ' + player.level, 190, 40);

    //  Draw the hearts on the canvas
    for (var i = 0; i < this.lives; i++) {
        ctx.drawImage(Resources.get(this.spriteLife), 410 + i * 30, 20);
    }
};

// Handle keyboard keystrokes
Player.prototype.handleInput = function(key) {

    switch (key) {
        case 'left': // move player to the left
            if (this.x - 101 >= 0) {
                this.x -= 101;
            }
            break;
        case 'up': // move player up
            this.y -= 83;
            if (this.y < 0) {
                // reset player position when reaches the water
                this.reset(true);
            }
            break;
        case 'right': // move player to the right
            if (this.x + 101 < 505) {
                this.x += 101;
            }
            break;
        case 'down': // move player down
            if (this.y + 83 <= 400) {
                this.y += 83;
            }
            break;
    }
};

// Reset player position
Player.prototype.reset = function(win) {
    this.x = 202;
    this.y = 400;
    if (win) {
        // increase score on win
        this.score += 20;
        //increase level on every 100 points
        if (this.score % 100 === 0) {
            this.level++;
        }
    } else {
        // decrease life on collision
        this.lives -= 1;
        // reset values when game is over
        if (this.lives === 0) {
            alert('Game Over! You have reached ' + this.score + ' points!');
            this.score = 0;
            this.lives = 3;
            this.level = 1;
        }
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var player = new Player();
// Create 3 enemies
for (var i = 0; i < 3; i++) {
    allEnemies.push(new Enemy());
}

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
