import { Point, Polygon, Edge, Figure } from "../entities";
class Ellipsoid extends Figure {
    constructor(a = 10, b = 5, c = 7, count = 20) {
        super();
        
        //Точки
        const points = [];
        for (let i = 0; i <= count; i++) {
            const T = ((2 * Math.PI) / count) * i;
            for (let j = 0; j < count; j++) {
                const p = ((2 * Math.PI) / count) * j;
                points.push(
                    new Point(
                        a * Math.sin(T) * Math.cos(p),
                        c * Math.cos(T),
                        b * Math.sin(T) * Math.sin(p))
                );
            }
        }

        //Грани
        const edges = [];
        for (let i = 0; i < points.length; i++) {
            if (i + 1 < points.length && (i + 1) % count !== 0) {
                edges.push(new Edge(i, i + 1));
            } else if ((i + 1) % count === 0) {
                edges.push(new Edge(i, i + 1 - count));
            }
            if (i < points.length - count) {
                edges.push(new Edge(i, i + count));
            }
        }

        //Полигоны
        const polygons = [];
        for (let i = 0; i < points.length; i++) {
            if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count]));
            } else if (i + count < points.length && (i + 1) % count === 0) {
                polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count]))
            }
        }
    

        
        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
    }
}
export default Ellipsoid;
