const PI = Math.PI;

let img = new Image();
img.addEventListener("load", () => {}, false);
img.src = "https://post-phinf.pstatic.net/MjAxOTAzMTZfMjYy/MDAxNTUyNjY5NDMzODI5.j5cRx2bsI7YNqDhsTN-KRHdiZfUB8ogQx5vbxcrquBAg.5d-67hm2jyp9d3mc4TO_G_RQZ6WCJiFEGHYWBdlMQaAg.PNG/07.png?type=w1200";

let flowerImage = new Image();
flowerImage.addEventListener('load', () => {}, false);
flowerImage.src = 'http://www.pickis.co.kr/content/contents/upload/2016-11/582d40808cfea.png';


class App {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.hurdleCount = 50;
    this.hurdleList = [];
    this.keyPressd = [];
    this.drawHandler = window.requestAnimationFrame(this.render);

    this.user = new User(20, this.canvas.height - 50);

    for (let i = 0; i < 3; i++) {
      this.hurdleList.push(new Hurdle(1000 + Math.random() * this.canvas.width, this.canvas.height));
    }

    this.setEventHandler();
  }

  setEventHandler = () => {
    window.onkeydown = e => {
			this.keyPressd[e.keyCode] = true;
			
		}
		window.onkeyup = e => {
			this.keyPressd[e.keyCode] = false;	
		}
  }
  
  render = () => {
    this.drawHandler = window.requestAnimationFrame(this.render);
    this.keyPress();

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // NOTE: Draw User
    this.context.drawImage(img, this.user.x, this.user.y, this.user.size, this.user.size);
    this.user.render(this.context);

    this.hurdleList.forEach((hurdle) => {
      if (hurdle.isCrash(this.user.x, this.user.y, this.user.size)) {
        window.cancelAnimationFrame(this.drawHandler);
      }

      hurdle.render(this.context);
    });
  }

  keyPress = () => {
    if (this.keyPressd[32]) this.user.isJumped = true;
  }
}

class User {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 50;
    this.isJumped = false;
    this.isJumped2 = false;
    this.maxJumpHeight = window.innerHeight - 300;
  }

  render = (context) => {
    context.drawImage(img, this.x, this.y, this.size, this.size);

    this.jump();
  }

  jump = () => {
    if (this.isJumped) {
      if (this.isJumped2) {
        this.y = this.y + (5 * 2);

        if (this.y >= window.innerHeight - this.size) {
          this.isJumped = false;
          this.isJumped2 = false;

          this.y = window.innerHeight - this.size;
        }

      } else if (this.y >= this.maxJumpHeight) {
        this.y = this.y - (5 * 3);    

        if (this.y <= this.maxJumpHeight) {
          this.isJumped2 = true;
        }
      }
    }
  }
}

class Hurdle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 70;
  }

  render = (context) => {
    context.drawImage(flowerImage, this.x, window.innerHeight - this.height, this.width, this.height);
    
    this.x = this.x - (5 * 2);

    if (this.x <= -100) {
      this.x = window.innerWidth;
    }
  }

  isCrash(x, y, size) {
    const isTopCrash = this.y - this.height <= y + size;
    const isLeftCrash = this.x <= x + size;
    const isRightCrash = this.x + this.width >= x - size;

    return isTopCrash && isLeftCrash && isRightCrash;
  }
}

const app = new App();