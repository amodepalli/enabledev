import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';


interface Rect{
	startX:number;
	startY:number;
	w:number;
	h:number;

}
@Component({
  selector: 'app-automeasure',
  templateUrl: './automeasure.component.html',
  styleUrls: ['./automeasure.component.css']
})




export class AutomeasureComponent implements AfterViewInit {

	//REFACTOR GHETTO CODE WHEN YOU GOTTA CHANCE BRO
	//keep track of mouse pixel position in canvas
	startX:number = -1;
	endX:number = -1;
	startY:number = -1;
	endY:number = -1;

	//use to save uploaded image
	imgObj= new Image();
	imageUploaded:boolean = false;

	context:CanvasRenderingContext2D;
	rectangleEnable:boolean = false;
	lineEnable:boolean = false;

	drag = false;
	rect:Rect = {startX: 0, startY: 0, w:0, h:0}

	measurements = [];
	pixelsPerMetric:number = 0;
	imgRatio:number = 0;
	newWidth:number = -1;
	newHeight:number = -1;
	canvas:any;

  @ViewChild("myCanvas") myCanvas;

  constructor() { }

  ngAfterViewInit() { 
    this.canvas = this.myCanvas.nativeElement;
    this.context = this.canvas.getContext("2d");
  }

   keepAspectRatio(imgObj){
	        var wrh = imgObj.width / imgObj.height;
	        var newWidth = this.myCanvas.nativeElement.width;
	        var newHeight = newWidth / wrh;
	        if (newHeight > this.myCanvas.nativeElement.height) {
	            newHeight = this.myCanvas.nativeElement.height;
	            newWidth = newHeight * wrh;
	        }

	        return {nw: newWidth, nh: newHeight}
	}


	//CANCER - when each of these event functions passed to add/RemoveEventListeners below
	// need to bind the "this" since we are trying to access AutoMeasureComponents vars inside
	// the scope of current function
	mouseDownRectHandler = this.mouseDownRect.bind(this);
	mouseMoveRectHandler = this.mouseMoveRect.bind(this);
	mouseUpRectHandler = this.mouseUpRect.bind(this);
	mouseDownLineHandler = this.mouseDownLine.bind(this);
	mouseUpLineHandler = this.mouseUpLine.bind(this);

	//IS THIS EVEN CLEAN CODE?
    rectangleListeners(){

    	if(this.lineEnable){
    		this.myCanvas.nativeElement.removeEventListener("mousedown", this.mouseDownLineHandler, false);
   			this.myCanvas.nativeElement.removeEventListener("mouseup", this.mouseUpLineHandler, false);
   			this.lineEnable = false;
    	}
        this.myCanvas.nativeElement.addEventListener("mousedown", this.mouseDownRectHandler, false);
        this.myCanvas.nativeElement.addEventListener("mousemove", this.mouseMoveRectHandler, false);
        this.myCanvas.nativeElement.addEventListener("mouseup", this.mouseUpRectHandler, false);
        this.rectangleEnable = true;
    }
    
    lineListeners(){

    	if(this.rectangleEnable){
    		this.myCanvas.nativeElement.removeEventListener("mousedown", this.mouseDownRectHandler, false);
	        this.myCanvas.nativeElement.removeEventListener("mousemove", this.mouseMoveRectHandler, false);
	        this.myCanvas.nativeElement.removeEventListener("mouseup", this.mouseUpRectHandler, false);
	        this.rectangleEnable = false;
	    }

        this.myCanvas.nativeElement.addEventListener("mousedown", this.mouseDownLineHandler,false);
        this.myCanvas.nativeElement.addEventListener("mouseup",this.mouseUpLineHandler,false);
        this.lineEnable = true;
    }

    distance(X1,Y1,X2,Y2){
        return Math.sqrt(Math.pow(X2-X1,2)+Math.pow(Y2-Y1,2))
    } 

    erase() {
        this.context.clearRect(0, 0, this.myCanvas.nativeElement.width, this.myCanvas.nativeElement.height);
        this.context.drawImage(this.imgObj,0,0, this.myCanvas.nativeElement.width, this.myCanvas.nativeElement.height);
    }

    upload(fileInput) {
        this.imageUploaded = true;
        var reader = new FileReader();
        reader.onload = (event) => {

            this.imgObj.onload = ()=> {
                var newWH = this.keepAspectRatio(this.imgObj);
                this.myCanvas.nativeElement.width = newWH.nw;
                this.myCanvas.nativeElement.height = newWH.nh;
                this.newWidth = newWH.nw;
                this.newHeight = newWH.nh;
                this.context.drawImage(this.imgObj,0,0, newWH.nw, newWH.nh);
            }
            this.imgObj.src = event.target['result'];	
        }
        reader.readAsDataURL(fileInput.target.files[0]);     
    }

    //mouse position of canvas
    getMousePos(canvas, evt) {
	    var rect = canvas.getBoundingClientRect();
	    return {
	      x: evt.clientX - rect.left,
	      y: evt.clientY - rect.top
	    };
	}

    //LINES
    drawLine(toX,toY){
        this.context.beginPath();
        this.context.strokeStyle = "red";
        this.context.lineWidth = 2;
        this.context.moveTo(this.startX, this.startY);
        this.context.lineTo(toX,toY);
        this.context.stroke();
    }

    mouseDownLine(evt) {
        if (this.imageUploaded){
        	var pos = this.getMousePos(this.canvas, evt);
            this.startX = pos.x;
            this.startY = pos.y;
        }
        
    }

    mouseUpLine(evt) {
    		var pos = this.getMousePos(this.canvas, evt);
            this.endX = pos.x;
            this.endY = pos.y;
            this.drawLine(this.endX,this.endY);
            let measurement = this.distance(this.startX,this.startY,this.endX,this.endY)
            console.log(measurement)
            this.measurements.push(measurement)
     }


    //RECTANGLE 
    mouseMoveRect(evt) {

        if (this.drag == true) {
        	var pos = this.getMousePos(this.canvas, evt);
            this.context.clearRect(0, 0, this.newWidth, this.newHeight);
            this.context.drawImage(this.imgObj,0,0, this.newWidth, this.newHeight);
            this.rect.w = pos.x - this.rect.startX;
            this.rect.h = pos.y - this.rect.startY;
            this.context.strokeStyle = 'red';
            this.context.strokeRect(this.rect.startX, this.rect.startY, this.rect.w, this.rect.h);
        }
    }

    mouseDownRect(evt) {
    	var pos = this.getMousePos(this.canvas, evt);
        if (this.imageUploaded){
            this.rect.startX = pos.x;
            this.rect.startY = pos.y;
            this.drag = true;
        }
        
    }

    mouseUpRect() { this.drag = false;}
}
