let paddle_x, paddle_y, paddle_width, paddle_height, paddle_dx;
let ball_x, ball_y, ball_diameter, ball_dx, ball_dy;
let brick_x, brick_y, brick_width, brick_height;
let brick_exists = true;

function setup() {
  createCanvas(400, 400);
  background("black");
  paddle_width = 100;
  paddle_x = width / 2 - paddle_width / 2;
  paddle_y = height - 25;
  paddle_height = 15;
  paddle_dx = 3;

  ball_diameter = 20;
  ball_dx = 1;
  ball_dy = 3;
  ball_x = width / 2 - ball_diameter / 2;
  ball_y = height / 2 - ball_diameter / 2;

  brick_width = 80;
  brick_height = 30;
  brick_x = width / 2 - brick_width / 2;
  brick_y = 40;
}

function draw() {
  background("black");

  //ball bouncing from the edges of canvas
  if (ball_x + ball_diameter / 2 > width) {
    ball_dx = -ball_dx;
  }

  if (ball_x - ball_diameter / 2 < 0) {
    ball_dx = -ball_dx;
  }

  if (ball_y + ball_diameter / 2 > height) {
    ball_dy = -ball_dy;
  }
  if (ball_y - ball_diameter / 2 < 0) {
    ball_dy = -ball_dy;
  }

  ball_x = ball_x + ball_dx;
  ball_y = ball_y + ball_dy;

  //keyboard control
  if (keyIsDown(LEFT_ARROW)) {
    paddle_x = paddle_x - paddle_dx;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    paddle_x = paddle_x + paddle_dx;
  }

  //ball collision with paddle
  if (
    ball_dy > 0 &&
    ball_x < paddle_x + paddle_width + ball_diameter / 2 &&
    ball_x + ball_diameter / 2 > paddle_x &&
    ball_y + ball_diameter / 2 < paddle_y + paddle_height / 2 &&
    ball_y + ball_diameter / 2 > paddle_y
  ) {
    ball_dy = -ball_dy;
  }

  //brick collision with ball
  if (
    brick_exists == true &&
    ball_x < brick_x + brick_width + ball_diameter / 2 &&
    ball_x + ball_diameter / 2 > brick_x &&
    ball_y - ball_diameter / 2 < brick_y + brick_height &&
    ball_y + ball_diameter / 2 > brick_y
  ) {
    ball_dy = -ball_dy;
    brick_exists = false;
  }

  if (brick_exists == true) {
    rect(brick_x, brick_y, brick_width, brick_height);
  }

  circle(ball_x, ball_y, ball_diameter);

  // keeping paddle edges within canvas
  if (paddle_x + paddle_width > width) 
    paddle_x = width - paddle_width;
  if (paddle_x < 0) paddle_x = 0;
  rect(paddle_x, paddle_y, paddle_width, paddle_height);
}
