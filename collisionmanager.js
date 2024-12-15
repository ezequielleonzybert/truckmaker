class CollisionManager {
    constructor(colliders) {
        this.terrain = colliders.terrain;
        this.wheels = colliders.wheels;
    }

    update() {
        for (let i = 0; i < this.terrain.collisionSegments.length - 1; i++) {
            const t = this.terrain.collisionSegments[i];
            for (let w of this.wheels) {
                const resultado = circleSegmentCollision(w.x, w.y, w.r, t.cp1.x, t.cp1.y, t.cp2.x, t.cp2.y);

                if (resultado.colision) {
                    // Calcular el vector normal al segmento
                    const dx = t.cp2.x - t.cp1.x;
                    const dy = t.cp2.y - t.cp1.y;
                    const segmentLength = Math.sqrt(dx ** 2 + dy ** 2);

                    const normalX = -dy / segmentLength;
                    const normalY = dx / segmentLength;

                    // Reflejar la velocidad según la normal
                    const dot = w.velx * normalX + w.vely * normalY;
                    w.velx -= 2 * dot * normalX * 0.9;
                    w.vely -= 2 * dot * normalY * 0.9;

                    // Reubicar el círculo fuera del segmento
                    const overlapX = w.x - resultado.puntoCercano.x;
                    const overlapY = w.y - resultado.puntoCercano.y;
                    const overlapLength = Math.sqrt(overlapX ** 2 + overlapY ** 2);

                    w.x = resultado.puntoCercano.x + (overlapX / overlapLength) * w.r;
                    w.y = resultado.puntoCercano.y + (overlapY / overlapLength) * w.r;
                }
            }
        }
    }
}

function circleSegmentCollision(cx, cy, radio, x1, y1, x2, y2) {
    /**
     * Detecta si un círculo colisiona con un segmento.
     *
     * Parámetros:
     * cx, cy   - Coordenadas del centro del círculo.
     * radio     - Radio del círculo.
     * x1, y1   - Coordenadas del primer punto del segmento.
     * x2, y2   - Coordenadas del segundo punto del segmento.
     *
     * Retorna:
     * Un objeto con información de la colisión.
     */

    // Vector del segmento
    const dx = x2 - x1;
    const dy = y2 - y1;

    // Vector desde el círculo al inicio del segmento
    const fx = cx - x1;
    const fy = cy - y1;

    // Proyección del círculo sobre el segmento
    const len2 = dx ** 2 + dy ** 2;
    const t = Math.max(0, Math.min(1, (fx * dx + fy * dy) / len2));

    // Punto más cercano al círculo en el segmento
    const px = x1 + t * dx;
    const py = y1 + t * dy;

    // Distancia del círculo al punto más cercano
    const dist2 = (cx - px) ** 2 + (cy - py) ** 2;

    if (dist2 <= radio ** 2) {
        return { colision: true, puntoCercano: { x: px, y: py } };
    }

    return { colision: false };
}

// Ejemplo de uso
const cx = 0, cy = 0, radio = 5;
const x1 = -10, y1 = 0, x2 = 10, y2 = 5;

const colision = circleSegmentCollision(cx, cy, radio, x1, y1, x2, y2);
console.log("¿Hay colisión?", colision);
