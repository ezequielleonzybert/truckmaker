class Terrain {
    constructor(complexity, strength, length, height, resolution = 0.1) {
        this.complexity = complexity;
        this.strength = strength;
        this.length = length;
        this.resolution = resolution;

        this.points = [];
        this.handlers = [];
        this.collisionPoints = [];
        this.collisionSegments = [];

        let p = { 'x': 0, 'y': height + random(strength) };
        this.points.push(p)
        for (let i = 1; i < complexity; i++) {
            p = { 'x': length / complexity * i, 'y': height + random(strength) }
            this.points.push(p)
        }
        p = { 'x': length, 'y': height + random(strength) };
        this.points.push(p)

        for (let i = 0; i < this.points.length - 1; i++) {
            let x1 = this.points[i].x;
            let y1 = this.points[i].y;
            let x2 = this.points[i + 1].x;
            let y2 = this.points[i + 1].y;

            for (let j = 0; j < 1; j += this.resolution) {
                let x = bezierPoint(x1, x1 + 50, x2 - 50, x2, j);
                let y = bezierPoint(y1, y1, y2, y2, j);
                this.collisionPoints.push({ x, y })
            }
        }

        for (let i = 0; i < this.collisionPoints.length - 1; i++) {
            let cp1 = this.collisionPoints[i];
            let cp2 = this.collisionPoints[i + 1];
            this.collisionSegments.push({ cp1, cp2 })
        }

    }

    render() {

        for (let i = 0; i < this.points.length - 1; i++) {
            stroke(0);
            strokeWeight(1);
            noFill();
            let x1 = this.points[i].x;
            let y1 = this.points[i].y;
            let x2 = this.points[i + 1].x;
            let y2 = this.points[i + 1].y;

            bezier(x1, y1, x1 + 50, y1, x2 - 50, y2, x2, y2);
        }
    }
}