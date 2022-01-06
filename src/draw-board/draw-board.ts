import { fabric } from "fabric";
import { DrawGraphType, DrowGraph } from "./draw-graph";
import { v4 as uuidv4 } from 'uuid';

/**
 * 创建画板和各种控制方法
 *
 * @export
 * @class DrowBoard
 */
export class DrowBoard {
    // 画板是否可以画
    drawing = false;
    enableDraw = true;
    drawBoard: fabric.Canvas;
    drawGraph: DrowGraph;
    currentDrawGraph: fabric.Text | fabric.Triangle | fabric.Rect | fabric.Line | fabric.Ellipse | fabric.Circle;
    currentDrawGraphType: DrawGraphType;
    drawGraphArr: Array<fabric.Text | fabric.Triangle | fabric.Rect | fabric.Line | fabric.Ellipse | fabric.Circle> = [];

    mouseFrom = { x: 0, y: 0 };
    mouseTo = { x: 0, y: 0 };

    boardW = 800;
    boardH = 800;
    fontSize: number = 14;
    fontWeight: number | string = 'normal';
    fontFamily: string = '宋体';
    fontStyle: 'italic' | 'normal' = 'normal';

    LineWeight: number = 2;
    color: string = 'red';

    /**
     * Creates an instance of DrowBoard.
     * @param {string} id canvas id.
     * @memberof DrowBoard
     */
    constructor(element: string | HTMLCanvasElement, options?: fabric.ICanvasOptions) {
        options = Object.assign({
            width: this.boardW,
            height: this.boardH,
            skipTargetFind: false,
        }, options);
        this.drawBoard = new fabric.Canvas(element, options);
        this.drawGraph = new DrowGraph();
        console.log('创建画板成功');
    }
    setDrawingMode(flag: boolean) {
        this.drawBoard.isDrawingMode = flag;
    }
    setEnableDraw(flag: boolean) {
        this.enableDraw = flag;
        if(flag) {
            this.addBoardEvent();
        }else {
            this.removeBoardEvent();
        }
    }

    addBoardEvent() {
        // this.removeBoardEvent();
        this.drawBoard.on('mouse:down', this.boardMouseDown.bind(this));
        this.drawBoard.on('mouse:up', this.boardMouseUp.bind(this));
        this.drawBoard.on('mouse:move', this.boardMouseMove.bind(this));
        console.log('创建监听成功');
    }
    removeBoardEvent() {
        this.drawBoard.removeListeners();
    }
    boardMouseDown(options: fabric.IEvent<MouseEvent>) {
        
        const { offsetX, offsetY, target } = options.e;
        console.log('mouse:down1', offsetX, offsetY, target, this.drawBoard.isDrawingMode);
        this.mouseFrom = { x: offsetX, y: offsetY };
        this.setDrawGraph(this.currentDrawGraphType);
        this.drawing = true;
    }

    boardMouseUp(options: fabric.IEvent<MouseEvent>) {
        const { offsetX, offsetY, target } = options.e;
        console.log('mouse:up', offsetX, offsetY);
        this.mouseTo = { x: offsetX, y: offsetY };
        this.drawing = false;
        this.setdrawGraphArr();
    }
    boardMouseMove(options: fabric.IEvent<MouseEvent>) {
        if(!this.drawing) {
            return;
        }
        
        const { offsetX, offsetY } = options.e;
        const target = <HTMLCanvasElement>options.e.target;
        if(['crosshair','n-resize','w-resize','s-resize','e-resize','se-resize','ne-resize', 'sw-resize','nw-resize','move'].includes(target.style.cursor)) {
          return;
        }
        console.log('mouse:Move', offsetX, offsetY);
        this.mouseTo = { x: offsetX, y: offsetY };
        this.setCurrentDrawGraphOptions();
    }
    boardMouseLeave() {

    }

    /**
     * 设置当前渲染绘制图形属性
     *
     * @memberof DrowBoard
     */
    setCurrentDrawGraphOptions() {
        switch (this.currentDrawGraphType) {
            case DrawGraphType.Circle:
                this.setCircleOptions();
                break;
            case DrawGraphType.Ellipse:
                this.setEllipseOptions();
                break;
            case DrawGraphType.Line:
                this.setLineOptions();
                break;
            case DrawGraphType.Rect:
                this.setRectangleOptions();
                break;
            case DrawGraphType.Triangle:
                this.setTriangleOptions();
                break;
            case DrawGraphType.Text:
                this.setTextOptions();
                break;
            case DrawGraphType.Mouse:
                break;
        }
    }

    setdrawGraphArr() {
        this.drawGraphArr.push(this.currentDrawGraph);
    }
    setRectangleOptions() {
        const rect =  <fabric.Rect>this.currentDrawGraph;
        const left = this.mouseFrom.x;
        const top = this.mouseFrom.y;
        const bounds = {left: left, top: top, width: this.mouseTo.x - left, height: this.mouseTo.y - top};
        rect.set(bounds);
    }
    setCircleOptions() {
        const circle =  <fabric.Circle>this.currentDrawGraph;
        const left = this.mouseFrom.x;
        const top = this.mouseFrom.y;
        const radius = (this.mouseTo.x - left) / 2 - 2;
        const bounds = {
            left: left,
            top: top,
            radius: radius < 0 ? 0 : radius,
        }
        
        circle.set(bounds);
        this.drawBoard.renderAll();
    }
    setEllipseOptions() {

    }
    setLineOptions() {

    }
    setTriangleOptions() {

    }
    setTextOptions() {

    }

    getBoard() {
        return this.drawBoard;
    }
    setCurrentDrawGraphType(drawGraphType: DrawGraphType) {
        // 添加画板间监听
        this.addBoardEvent();
        // 设置当前绘制图形类型
        this.currentDrawGraphType = drawGraphType;
    }

    /**
     * 设置绘制图形
     *
     * @param {DrawGraphType} drawGraphType
     * @memberof DrowBoard
     */
    setDrawGraph(drawGraphType: DrawGraphType) {
        // 根据类型，创建绘制图形
        switch (drawGraphType) {
            case DrawGraphType.Circle:
                this.currentDrawGraph = this.drawGraph.createCircle();
                break;
            case DrawGraphType.Ellipse:
                this.currentDrawGraph = this.drawGraph.createEllipse();
                break;
            case DrawGraphType.Line:
                this.currentDrawGraph = this.drawGraph.createLine();
                break;
            case DrawGraphType.Rect:
                this.currentDrawGraph = this.drawGraph.createRectangle();
                break;
            case DrawGraphType.Triangle:
                this.currentDrawGraph = this.drawGraph.createTriangle();
                break;
            case DrawGraphType.Text:
                this.currentDrawGraph = this.drawGraph.createText();
                break;
            case DrawGraphType.Mouse:
                // 屏蔽画板控制，回归一些状态
                // 关闭监听
                this.removeBoardEvent();
                break;
        }
        this.drawBoard.add(this.currentDrawGraph);
    }
    setFont() {

    }
}