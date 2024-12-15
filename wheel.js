class Wheel {
    constructor(x, y, r, rot) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.velx = 0;
        this.vely = 0;
        this.accy = 0.2;
        this.rot = rot;
    }

    update() {
        this.vely += this.accy;
        this.x += this.velx;
        this.y += this.vely;
    }

    render() {
        fill(200)
        stroke(0);
        strokeWeight(1);
        translate(this.x, this.y);
        rotate(this.rot);
        circle(0, 0, this.r * 2);
        line(0, 0, this.r, 0)
        resetMatrix();
    }
}