let myGamePiece;

document.addEventListener("DOMContentLoaded", () => {
  startGame();
});

const myGameArea = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 20);

    window.addEventListener("keydown", function (e) {
      e.preventDefault();
      myGameArea.keys = myGameArea.keys || [];
      myGameArea.keys[e.keyCode] = e.type === "keydown";
    });

    window.addEventListener("keyup", function (e) {
      myGameArea.keys[e.keyCode] = e.type === "keydown";
    });
  },
  stop: function () {
    clearInterval(this.interval);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

function component(width, height, color, x, y, type) {
  this.type = type;
  this.width = width;
  this.height = height;
  this.speed = 0;
  this.angle = 0;
  this.moveAngle = 0;
  this.x = x;
  this.y = y;
  this.update = function () {
    const ctx = myGameArea.context;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = color;
    ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
    ctx.restore();
  };
  this.newPos = function () {
    this.angle += this.moveAngle * Math.PI / 180;
    this.x += this.speed * Math.sin(this.angle);
    this.y -= this.speed * Math.cos(this.angle);
  };
}

function startGame() {
  myGamePiece = new component(30, 30, "red", 225, 225);
  myGameArea.start();
}

function updateGameArea() {
  myGameArea.clear();
  myGamePiece.moveAngle = 0;
  myGamePiece.speed = 0;
  if (myGameArea.keys && myGameArea.keys[37]) {
    myGamePiece.moveAngle = -1;
  }
  if (myGameArea.keys && myGameArea.keys[39]) {
    myGamePiece.moveAngle = 1;
  }
  if (myGameArea.keys && myGameArea.keys[38]) {
    myGamePiece.speed = 1;
  }
  if (myGameArea.keys && myGameArea.keys[40]) {
    myGamePiece.speed = -1;
  }
  myGamePiece.newPos();
  myGamePiece.update();
}
