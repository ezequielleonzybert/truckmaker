class Terrain {
    constructor(complexity, strength, length, height) {
        this.complexity = complexity;
        this.strength = strength;
        this.length = length;

        this.points = [];

        let p = { 'x': 0, 'y': height + random(strength) };
        this.points.push(p)
        for (let i = 1; i < complexity; i++) {
            p = { 'x': length / complexity * i, 'y': height + random(strength) }
            this.points.push(p)
        }
        p = { 'x': length, 'y': height + random(strength) };
        this.points.push(p)
    }

    render() {
        stroke(0);
        strokeWeight(1);
        noFill();
        for (let i = 0; i < this.points.length - 1; i++) {

            let x1 = this.points[i].x;
            let y1 = this.points[i].y;
            let x2 = this.points[i + 1].x;
            let y2 = this.points[i + 1].y;

            bezier(x1, y1, x1 + 50, y1, x2 - 50, y2, x2, y2);
        }
    }
}