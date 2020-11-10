// Create an instance of the engine.
// I'm specifying that the game be 800 pixels wide by 600 pixels tall.
// If no dimensions are specified the game will be fullscreen.
const game = new ex.Engine({
    width: 800,
    height: 600,
})
// todo build awesome game here
const paddle = new ex.Actor({
    x: 150,
    y: game.drawHeight - 40,
    width: 200,
    height: 20
});

// Let's give it some color with one of the predefined
// color constants
paddle.color = ex.Color.Chartreuse;

// Make sure the paddle can partipate in collisions, by default excalibur actors do not collide
paddle.body.collider.type = ex.CollisionType.Fixed;

// `game.add` is the same as calling
// `game.currentScene.add`
game.add(paddle);

// Add a mouse move listener
game.input.pointers.primary.on('move', function (evt) {
    paddle.pos.x = evt.target.lastWorldPos.x
})

// Create a ball
const ball = new ex.Actor(100, 300, 20, 20);

// Set the color
ball.color = ex.Color.Red;

// Set the velocity in pixels per second
ball.vel.setTo(100, 100);

// Set the collision Type to passive
// This means "tell me when I collide with an emitted event, but don't let excalibur do anything automatically"
ball.body.collider.type = ex.CollisionType.Passive;
// Other possible collision types:
// "ex.CollisionType.PreventCollision - this means do not participate in any collision notification at all"
// "ex.CollisionType.Active - this means participate and let excalibur resolve the positions/velocities of actors after collision"
// "ex.CollisionType.Fixed - this means participate, but this object is unmovable"

// Wire up to the postupdate event
ball.on("postupdate", () => {
    // If the ball collides with the left side
    // of the screen reverse the x velocity
    if (ball.pos.x < ball.width / 2) {
        ball.vel.x *= -1;
    }

    // If the ball collides with the right side
    // of the screen reverse the x velocity
    if (ball.pos.x + ball.width / 2 > game.drawWidth) {
        ball.vel.x *= -1;
    }

    // If the ball collides with the top
    // of the screen reverse the y velocity
    if (ball.pos.y < ball.height / 2) {
        ball.vel.y *= -1;
    }
});

// Draw is passed a rendering context and a delta in milliseconds since the last frame
ball.draw = (ctx, delta) => {
    // Optionally call original 'base' method
    // ex.Actor.prototype.draw.call(this, ctx, delta)

    // Custom draw code
    ctx.fillStyle = ball.color.toString();
    ctx.beginPath();
    ctx.arc(ball.pos.x, ball.pos.y, 10, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
};

// Add the ball to the current scene
game.add(ball);

// Start the engine to begin the game.
game.start()