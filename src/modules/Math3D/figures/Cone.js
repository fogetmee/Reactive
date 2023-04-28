import { Point, Polygon, Edge, Figure } from "../entities";
class Cone extends Figure {
    constructor(a = 4, b = 4, c = 4, count = 10){
        super();
        
        // Точки
        const points = [];
        // Боковая часть
        const T = 2 * Math.PI / count;
        for (let i = -Math.PI; i <= Math.PI; i += T) {
            for (let j = 0; j < 2 * Math.PI; j += T) {
                points.push(new Point(
                    a * i * Math.cos(j),
                    c * i,
                    Math.sin(j) * b * i
                ));
            }
        }

        // Основания
        for (let i = -Math.PI; i <= Math.PI; i += T) {
            for (let j = 0; j < 2 * Math.PI; j += T) {
                points.push(new Point(
                    a * i * Math.cos(j),
                    c * Math.PI,
                    Math.sin(j) * b * i
                ));
            }
        }
        for (let i = -Math.PI; i <= Math.PI; i += T) {
            for (let j = 0; j < 2 * Math.PI; j += T) {
                points.push(new Point(
                    a * i * Math.cos(j), -c * Math.PI,
                    Math.sin(j) * b * i
                ));
            }
        }

        // Грани
        const edges = [];
        for (let i = 0; i < points.length; i++) {
            //вдоль
            if (i + 1 < points.length && (i + 1) % count !== 0) {
                edges.push(new Edge(
                    i,
                    i + 1
                ));
            } else if ((i + 1) % count === 0) {
                edges.push(new Edge(
                    i,
                    i + 1 - count
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

        // Полигоны
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

export default Cone;