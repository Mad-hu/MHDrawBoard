import { fabric } from "fabric";

export enum DrawGraphType {
    Circle = 'Circle',
    Ellipse = 'Ellipse',
    Line = 'Line',
    Rect = 'Rect',
    Triangle = 'Triangle',
    Text = 'Text',
    Mouse = 'Mouse'
}
/**
 * drow graph
 * includes：Circle Ellipse Line Rect Triangle Text
 *
 * @export
 * @class DrowGraph
 */
export class DrowGraph {
    /**
     * draw text
     *
     * @param {string} [text=''] default text
     * @param {fabric.TextOptions} [options] text options
     * @return {*} 
     * @memberof DrowGraph
     */
    createText(text: string = '', options?: fabric.TextOptions) {
        options = Object.assign({ left: 100, top: 100 }, options);
        const textObj = new fabric.Textbox(text, {
            fontSize: 14,
            borderColor: "#2c2c2c",
            fill: '#E34F51',
            hasControls: true,
            ...options
        });
        textObj.on('mouse:down', ()=> {
            textObj.exitEditing();
        });
        return textObj;
    }

    /**
     * draw line
     *
     * @param {number[]} [points=[0, 0, 1, 1]] [x1,y1,x2,y2]
     * @param {fabric.ILineOptions} [options] line options
     * @return {*} 
     * @memberof DrowGraph
     */
    createLine(points: number[] = [0, 0, 1, 1], options?: fabric.ILineOptions) {
        return new fabric.Line(points, {
            x1: 0,
            y1: 0,
            x2: 1,
            y2: 1,
            fill: 'red',
            stroke: 'red',
            strokeWidth: 2,
            ...options
        });
    }


    /**
     * draw ellipse
     *
     * @param {fabric.IEllipseOptions} [options] ellipse options
     * @return {*} 
     * @memberof DrowGraph
     */
    createEllipse(options?: fabric.IEllipseOptions) {
        return new fabric.Ellipse({
            rx: 100,
            ry: 200,
            fill: 'rgba(255, 255, 255, 0)',
            angle: 90,
            stroke: '#B0B0B0',
            strokeWidth: 3,
            left: 50,
            top: 50,
            ...options
        });
    }


    /**
     * draw triangle
     *
     * @param {fabric.ITriangleOptions} [options] triangle options
     * @return {*} 
     * @memberof DrowGraph
     */
    createTriangle(options?: fabric.ITriangleOptions) {
        return new fabric.Triangle({
            width: 20,
            height: 30,
            left: 50,
            top: 50,
            stroke: 'red',
            strokeWidth: 2,
            fill: "rgba(255, 255, 255, 0)",
            ...options
        });
    }

    /**
     * draw circle
     *
     * @param {fabric.ICircleOptions} [options] circle options
     * @return {*} 
     * @memberof DrowGraph
     */
    createCircle(options?: fabric.ICircleOptions) {
        return new fabric.Circle({
            radius: 20,
            left: 0,
            top: 0,
            stroke: 'red',
            strokeWidth: 2,
            fill: "rgba(255, 255, 255, 0)",
            hasControls: true,
            ...options
        });
    }
    /**
     * craw rectangle
     * 
     *
     * @param {fabric.IRectOptions} [rectOptions] rectangle options
     * @return {*} 
     * @memberof DrowGraph
     */
    createRectangle(options?: fabric.IRectOptions) {
        return new fabric.Rect({
            left: 100,
            top: 100,
            width: 20,
            height: 20,
            stroke: 'red',
            strokeWidth: 2,
            fill: "rgba(255, 255, 255, 0)",
            ...options
        });
    }
}