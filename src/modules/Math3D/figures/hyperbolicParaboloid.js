import { Point, Polygon, Edge, Figure } from "../entities";
class hyperbolicParaboloid extends Figure {
    constructor(count = 20, a = 3, b = 2) {
        super();
    const points = [];
    // точки
    for (let x = -10; x < 10; x++) {
        for (let y = -10; y < 10; y++) {
            points.push(new Point(
                x,
                y,
                x * x / (a * a) - y * y / (b * b)
            ));
        }
    }

    //ребра
    const edges = [];
    for (let i = 0; i < points.length; i++) {
        //вдоль
        if (i + 1 < points.length && (i + 1) % count !== 0) {
            edges.push(new Edge(
                i,
                i + 1
            ));
        }
        //поперек
        if (i < points.length - count) {
            edges.push(new Edge(
                i,
                i + count
            ));
        }
    }

    //полигоны
    const polygons = [];
    for (let i = 0; i < points.length; i++) {
        if (i % 2 === 0) {
            if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count]));
            }
        } else if (i + 1 + count < points.length && (i + 1) % count !== 0) {
            polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count]));
        }
    }

    this.points = points;
    this.edges = edges;
    this.polygons = polygons;
}
}

export default hyperbolicParaboloid;