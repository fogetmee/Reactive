import { Point, Polygon, Edge, Figure } from "../entities";
class Sphere extends Figure {
    constructor(r = 10, count = 50, color = '#ff8877', center = new Point()) {
        super();
        // about points
        const points = [];
        for (let i = 0; i <= count; i++) {
            const T = Math.PI / count * i;
            for (let j = 0; j < count; j++) {
                const p = 2 * Math.PI / count * j;
                points.push(new Point(
                    center.x + r * Math.sin(T) * Math.cos(p),
                    center.y + r * Math.cos(T),
                    center.z + r * Math.sin(T) * Math.sin(p),
                ));
            }
        }
        // about edges
        const edges = [];
        for (let i = 0; i < points.length; i++) {
            if (points[i + 1]) {
                if ((i + 1) % count === 0) {
                    edges.push(new Edge(i, i + 1 - count));
                } else {
                    edges.push(new Edge(i, i + 1));
                }
            }
            if (points[i + count]) { 
                edges.push(new Edge(i, i + count));
            }
        }
        // about polygons
        const polygons = [];
        for (let i = 0; i < points.length; i++) {
            if (points[i + 1 + count]) {
                if ((i + 1) % count === 0) {
                    polygons.push(new Polygon([
                        i, 
                        i + 1 - count, 
                        i + 1, 
                        i + count
                    ], color));
                } else {
                    polygons.push(new Polygon([
                        i, 
                        i + 1, 
                        i + 1 + count, 
                        i + count
                    ], color));
                }
            }
        }
        const lastNo = points.length - 1;
        const penultimateI = lastNo - count;
        polygons.push(new Polygon([
            penultimateI, 
            penultimateI + 1 - count, 
            penultimateI + 1, 
            penultimateI + count
        ], color));

        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
    }
}
export default Sphere;