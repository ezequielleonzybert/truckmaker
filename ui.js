class Button {
    constructor(menu) {
        this.cell = menu.h;
        this.w = menu.h * .8;
        this.h = menu.h * .8;
        this.r = this.w / 10;
        this.margin = menu.h * .1;
        this.color = 200;
        this.active = false;
        if (menu.buttons.length == 0) {
            this.tool = "wheel";
        }
    }
    render() {
        noStroke();
        fill(this.color);
        rect(this.margin, this.margin, this.w, this.h, this.r);
        if (this.tool == "wheel") {
            stroke(50);
            strokeWeight(2)
            circle(this.cell / 2, this.cell / 2, this.w * .5);
        }
    }
}

class Menu {
    constructor(w, h) {
        this.w = w;
        this.h = h;
        this.buttons = [];
        let bq = 4;
        for (let i = 0; i < bq; i++) {
            this.buttons.push(new Button(this))
        }
    }
    render() {
        noStroke();
        fill(100);
        rect(0, 0, this.w, this.h);

        for (let i = 0; i < this.buttons.length; i++) {
            let b = this.buttons[i];
            let cell = b.w + b.margin * 2
            if (b.active) {
                b.color = 255;
            }
            else if (mouseX > i * cell + b.margin &&
                mouseX < i * cell + cell - b.margin &&
                mouseY > b.margin && mouseY < b.margin + b.h) {
                b.color = 220;
                if (mouseIsPressed) {
                    for (let bb of this.buttons) {
                        bb.active = false;
                    }
                    b.active = true;
                }
            }
            else {
                b.color = 200;
            }
            this.buttons[i].render();
            translate(cell, 0)
        }
        resetMatrix();
    }
}