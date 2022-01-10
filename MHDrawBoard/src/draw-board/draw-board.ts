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
    // 画板是否正在画
    drawing = false;
    // 画板是否被禁用
    enableDraw = false;
    drawBoard: fabric.Canvas;
    drawGraph: DrowGraph;
    currentDrawGraph: fabric.Textbox | fabric.Triangle | fabric.Rect | fabric.Line | fabric.Ellipse | fabric.Circle | null;
    currentDrawGraphType: DrawGraphType;
    drawGraphArr: Array<fabric.Textbox | fabric.Triangle | fabric.Rect | fabric.Line | fabric.Ellipse | fabric.Circle> = [];

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

    deleteTargetGraphState = false;
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
            selectable: false,
            // selection: false
        }, options);
        this.drawBoard = new fabric.Canvas(element, options);
        this.drawGraph = new DrowGraph();
        // 添加画板间监听
        this.addBoardEvent();
        console.log('创建画板成功');
    }
    /**
     * 设置是否可以自由画画
     *
     * @param {boolean} flag true 可以  false 不可以
     * @memberof DrowBoard
     */
    setDrawingMode(flag: boolean) {
        this.drawBoard.isDrawingMode = flag;
        if(this.deleteTargetGraphState) {
            this.deleteTargetGraphState = false;
        }
    }
    setFreeDraw(flag: boolean) {
        this.cancleText();
        this.setDrawingMode(flag);
        this.currentDrawGraphType  = DrawGraphType.Mouse;
        this.currentDrawGraph = null;
        this.drawBoard.freeDrawingBrush.color = this.color;
        this.drawBoard.freeDrawingBrush.width = this.LineWeight;
        
    }
    setEnableDraw(flag: boolean) {
        this.enableDraw = flag;
    }

    /**
     * add draw board event
     *
     * @memberof DrowBoard
     */
    addBoardEvent() {
        this.drawBoard.on('mouse:down', this.boardMouseDown.bind(this));
        this.drawBoard.on('mouse:up', this.boardMouseUp.bind(this));
        this.drawBoard.on('mouse:move', this.boardMouseMove.bind(this));
        // 解决边缘拖动，鼠标up不生效
        this.drawBoard.on('mouse:out', this.boardMouseUp.bind(this));
        this.drawBoard.on("selection:created",  this.boardSelectionCreated.bind(this));
        console.log('创建监听成功');
    }
    /**
     * remove draw board event
     *
     * @memberof DrowBoard
     */
    removeBoardEvent() {
        this.drawBoard.removeListeners();
        console.log('清空画板监听');
    }
    /**
     * 画板选择并创建
     *
     * @param {fabric.IEvent<MouseEvent>} e
     * @memberof DrowBoard
     */
    boardSelectionCreated(e: fabric.IEvent<MouseEvent>) {
        console.log('selection:created');
        // 点击删除
        if(this.deleteTargetGraphState) {
            this.drawBoard.remove(e.target);
            // 清楚选中框
            this.drawBoard.discardActiveObject(); 
        }
    }
    boardMouseDown(options: fabric.IEvent<MouseEvent>) {
        const { offsetX, offsetY } = options.e;
        const target = <HTMLCanvasElement>options.e.target;
        this.mouseFrom = { x: offsetX, y: offsetY };
        console.log('开始点击:', offsetX, offsetY, target);
        this.drawText();
        if (this.enableDraw == false) {
            return;
        }
        if (target.style.cursor != 'default') {
            return;
        }
        this.drawing = true;
    }
    drawText() {
        if(this.currentDrawGraphType == DrawGraphType.Text) {
            // 没有创建图形，先创建图形，在改变图形
            if (!this.currentDrawGraph) {
                this.setDrawGraph(this.currentDrawGraphType);
            } else {
                (<fabric.Textbox>this.currentDrawGraph).exitEditing();
                this.currentDrawGraph = null;
                this.setDrawGraph(this.currentDrawGraphType);
            }
            this.setCurrentDrawGraphOptions();
            // 图形通过set改变形状以后，选中拉伸的框，不会随着大小变化，这里移除再加入以后会解决此问题
            this.drawBoard.remove(this.currentDrawGraph);
            this.drawBoard.add(this.currentDrawGraph);
        }
    }
    cancleText() {
        if(this.currentDrawGraphType == DrawGraphType.Text) {
            // 没有创建图形，先创建图形，在改变图形
            if (this.currentDrawGraph) {
                console.log('清理画板文字');
                (<fabric.Textbox>this.currentDrawGraph).exitEditing();
                this.currentDrawGraph = null;
            }
        }
        this.deleteTargetGraphState = false;
    }

    boardMouseUp(options: fabric.IEvent<MouseEvent>) {
        const { offsetX, offsetY } = options.e;
        const target = <HTMLCanvasElement>options.e.target;
        if (this.enableDraw == false) {
            return;
        }
        if (target.style.cursor != 'default') {
            return;
        }
        if(!this.currentDrawGraph) {
            return;
        }
        this.mouseTo = { x: offsetX, y: offsetY };
        this.drawing = false;
        
        // 添加到画板内容列表
        this.setdrawGraphArr();
        if(this.currentDrawGraphType == DrawGraphType.Text) {
            return;
        }

        // 图形通过set改变形状以后，选中拉伸的框，不会随着大小变化，这里移除再加入以后会解决此问题
        this.drawBoard.remove(this.currentDrawGraph);
        this.drawBoard.add(this.currentDrawGraph);

        
        // 抬起的时候，清理当前图形
        this.currentDrawGraph = null;
    }
    boardMouseMove(options: fabric.IEvent<MouseEvent>) {
        if (!this.drawing) {
            return;
        }
        if(this.deleteTargetGraphState) {
            return;
        }
        const { offsetX, offsetY } = options.e;
        const target = <HTMLCanvasElement>options.e.target;
        if (this.enableDraw == false) {
            return;
        }
        if (target.style.cursor != 'default') {
            return;
        }
        if(this.currentDrawGraphType == DrawGraphType.Text) {
            return;
        }

        this.mouseTo = { x: offsetX, y: offsetY };
        // 没有创建图形，先创建图形，在改变图形
        if (!this.currentDrawGraph) {
            this.setDrawGraph(this.currentDrawGraphType);
        }
        this.setCurrentDrawGraphOptions();
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
        const rect = <fabric.Rect>this.currentDrawGraph;
        const left = this.mouseFrom.x;
        const top = this.mouseFrom.y;
        const bounds = { 
            left: left, 
            top: top, 
            width: this.mouseTo.x - left, 
            height: this.mouseTo.y - top,
            stroke: this.color
        };
        rect.set(bounds);
        this.drawBoard.renderAll();
    }
    setCircleOptions() {
        const circle = <fabric.Circle>this.currentDrawGraph;
        const left = this.mouseFrom.x;
        const top = this.mouseFrom.y;
        const radius = (this.mouseTo.x - left) / 2 - 2;
        const bounds = {
            left: left,
            top: top,
            radius: radius < 0 ? 0 : radius,
            stroke: this.color
        }
        circle.set(bounds);
        this.drawBoard.renderAll();
    }
    setEllipseOptions() {

    }
    setLineOptions() {
        const line = <fabric.Line>this.currentDrawGraph;
        line.set({
            x1: this.mouseFrom.x,
            y1: this.mouseFrom.y,
            x2: this.mouseTo.x,
            y2: this.mouseTo.y,
            stroke: this.color
        })
        this.drawBoard.renderAll();
    }
    setTriangleOptions() {
        const triangle = <fabric.Triangle>this.currentDrawGraph;
        let left = this.mouseFrom.x;
        let top = this.mouseFrom.y;
        let height = this.mouseTo.y - this.mouseFrom.y;
        let width = this.mouseTo.x - this.mouseFrom.x;
        const bounds = {
            left: left,
            top: top,
            width : width < 0? 1: width, 
            height : height < 0? 1: height,
            stroke: this.color
        }
        triangle.set(bounds);
        this.drawBoard.renderAll();
    }
    setTextOptions() {
        const text = <fabric.Textbox>this.currentDrawGraph;
        const bounds = {
            left: this.mouseFrom.x,
            top: this.mouseFrom.y,
            fontSize: 18,
            borderColor: "#2c2c2c",
            fill: this.color
          }
        text.set(bounds);
        text.enterEditing();
        text.hiddenTextarea.focus();
        this.drawBoard.renderAll();
    }

    getBoard() {
        return this.drawBoard;
    }
    setBounds(bounds: {width: number, height: number}) {
        this.drawBoard.setWidth(bounds.width);
        this.drawBoard.setHeight(bounds.height);
    }
    setBackgroundColor(backgroundColor: string | fabric.Pattern | fabric.Gradient, callback: Function = null) {
        this.drawBoard.setBackgroundColor(backgroundColor, callback);
    }
    setBackgroundImage(image: string | fabric.Image, callback: Function, options?: fabric.IImageOptions) {
        this.drawBoard.setBackgroundImage(image, callback, options);
    }
    setCurrentDrawGraphType(drawGraphType: DrawGraphType) {
        this.cancleText();
        // 设置当前绘制图形类型
        this.currentDrawGraphType = drawGraphType;
        
        console.log('设置画板：', drawGraphType);
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
                break;
        }
        this.drawBoard.add(this.currentDrawGraph);
    }

    /**
     * 关闭当前模式得功能。
     *
     * @param {string} type
     * @memberof DrowBoard
     */
    disableCurrentModeFunc(type: string) {
        switch(type) {
            case 'deleteTargetGraph':
                this.deleteTargetGraphState = false;
                break;
            case 'text':
                this.currentDrawGraph = null;
                this.currentDrawGraphType = DrawGraphType.Mouse;
        }
    }
    setFont() {

    }
    setColor(color: string) {
        this.color = color;
    }
    clear() {
        this.drawBoard.clear();
        this.drawGraphArr = [];
        this.cancleText();
    }
    undo() {
        if(this.drawBoard._objects.length > 0){
            this.drawGraphArr.push(this.drawBoard._objects.pop());
            this.drawBoard.renderAll();
        }
        this.cancleText();
    }
    redo() {
        if(this.drawGraphArr.length > 0){
            this.drawBoard.add(this.drawGraphArr.pop());
            this.drawBoard.renderAll();
        }
        this.cancleText();
    }
    setDeleteTargetGraphState(flag?: boolean) {
        this.cancleText();
        this.deleteTargetGraphState = flag == undefined? !this.deleteTargetGraphState: flag;
    }
}