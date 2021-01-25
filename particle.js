import {
    RANDOM_TEXT
}from './visual.js';

export class Particle {
    constructor(pos) {
        /*파라미터 pos는 text클래스의 dotPos()메소드에 의해
         Particle이 있어야 하는 좌표*/
        this.savedX = pos.x;
        this.savedY = pos.y;
        this.x = pos.x;
        this.y = pos.y;

        this.textArr = RANDOM_TEXT.split('');
        this.cur = 0;
        this.total = this.textArr.length;

        this.fps = 15;
        this.fpsTime = 1000 / this.fps;
    }
    
    draw(ctx, t){
        /* 15프레임 마다 text를 바꿔주는 코드 */
        if(!this.time){
            this.time = t;
        }
        /*const now의 값은 경과 시간 : t는 현재 시간 - this.time은 전전전...메소드의 실행되었던 시간*/
        const now = t - this.time;

        /* 경과 시간이 15hz이상이 되었을 때 text를 바꿔주는 것 */
        if(now > this.fpsTime){
            this.time = t;
            this.cur += 1;
            if(this.cur == this.total){
                this.cur = 0;
            }
        }

        const str = this.textArr[this.cur];

        ctx.beginPath();
        ctx.fillStyle = 'black';

        const fontWidth = 700;
        const fontSize = 14;
        const fontName = 'Hind';
        ctx.font = `${fontWidth} ${fontSize}px ${fontName}`;
        ctx.textBaseline = `middle`;
        const textPos = ctx.measureText(str);
        ctx.fillText(
            str,
            this.x - (textPos.width / 2),
            this.y + ((fontSize - textPos.actualBoundingBoxAscent) / 2)
        );
    }
}