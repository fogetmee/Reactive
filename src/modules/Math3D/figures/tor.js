import { Point, Polygon, Edge, Figure } from "../entities";
class tor extends Figure {
    constructor(R = 18, r = 6, count = 20) {
        super();



    //точки 
    const points = [];
    const dt = Math.PI * 2 / count;
    for (let i = 0; i < Math.PI * 2; i += dt) {
        for (let j = 0; j < Math.PI * 2; j += dt) {
            points.push(new Point(
                (R + r * Math.cos(i)) * Math.cos(j),
                r * Math.sin(i),
                (R + r * Math.cos(i)) * Math.sin(j)
            ));
        }
    }

    //ребра 
    const edges = [];
    for (let i = 0; i < points.length; i++) {
        //вдоль
        if ((i + 1) % count === 0) {
            edges.push(new Edge(
                i,
                i + 1 - count
            ));
        } else {
            edges.push(new Edge(
                i,
                i + 1
            ));
        }
        //поперек
        if (points[i + count]) {
            edges.push(new Edge(
                i,
                i + count
            ));
        } else {
            edges.push(new Edge(
                i,
                count - (points.length - i)
            ));
        }
    }

    //полигоны
    const polygons = [];
    for (let i = 0; i < points.length; i++) {
        if (i + 1 + count < points.length && (i + 1) % count !== 0) {
            polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count]));
        }
        if (i + count < points.length && (i + 1) % count === 0) {
            polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count]));
        }
        if (!points[i + count] && i + 1 < points.length) {
            polygons.push(new Polygon([i, i + 1, count - (points.length - i) + 1, count - (points.length - i)]));
        }
        polygons.push(new Polygon([19, 0, 380, 399]));
    }
    polygons.sort((a, b) => b.distance - a.distance);

    this.points = points;
    this.edges = edges;
    this.polygons = polygons;
}
}
export default tor;