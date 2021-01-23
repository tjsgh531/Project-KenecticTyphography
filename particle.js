import {
    RANDOM_TEXT
}from './visual.js';

const FRICTION = 0.86;
const COLOR_SPEED = 0.12;

export class Particle {
    constructor(pos) {
        this.savedX = pos.x;
        this.savedY = pos.y;
        this.x = pos.x;
        this.y = pos.y;
        this.vx = 0;
        this.vy = 0;
        this.radius = 10;

        this.textArr = RANDOM_TEXT.split('');
        this.cur = 0;
        this.total = this.textArr.length;

        this.fps = 15;
        this.fpsTime = 1000 / this.fps;

        this.savedRgb = 0x000000;
        this.rgb = 0x000000;
    }

    collide(){
        this.rgb = 0xf3316e;
        this.textArr = this.shuffle(this.textArr);
    }
    draw(ctx, t){
        this.rgb += (this.savedRgb - this.rgb) * COLOR_SPEED;

        if(!this.time){
            this.time = t;
        }

        const now = t - this.time;
        if(now > this.fpsTime){
            this.time = t;
            this.cur += 1;
            if(this.cur == this.total){
                this.cur = 0;
            }
        }

        this.vx *= FRICTION;
        this.vy *= FRICTION;

        this.x += this.vx;
        this.y += this.vy;

        const red = ((this.rgb >> 16) & 0xFF) | 0;
        const green = ((this.rgb >> 8) & 0xFF) | 0;
    }

    shuffle(arr){
        return arr.sort(()=> Math.random() - 0.5);
    }
}