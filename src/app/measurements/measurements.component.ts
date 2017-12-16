import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder,FormArray } 
    from '@angular/forms';
import {MaterializeDirective,MaterializeAction} from "angular2-materialize";
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-measurements',
  templateUrl: './measurements.component.html',
  styles: [`
    .card.large {
      height: 760px;
    }
    
  `],
})
export class MeasurementsComponent implements OnInit {
   //initialization steps
  constructor() {}

  ngOnInit(){
  }

  units = "imperial";
  handSize = "";
  middleFingerLength = new FormControl("");
  palmLength = new FormControl("");
  height = new FormControl("",Validators.required);
  weight = new FormControl("",Validators.required);

  //initialzing form with minimum required form vals
  form= new FormGroup({
        // "handType": this.handType,
        "height": this.height,
        "weight": this.weight,
        // "accuracyLevel":this.accuracyLevel
        "middleFingerLength": this.middleFingerLength,
        "palmLength": this.palmLength
  });


  // Allows for modals in html to open and close
  modalActions = new EventEmitter<string|MaterializeAction>();
  params = []
  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
  }
  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }

 


  handSizeSubmit() {

    window.location.href='http://127.0.0.1:8000/Server/'+ this.handSize + "_hand.zip";
  }

  onAssemblySubmit() {

    window.location.href='http://127.0.0.1:8000/Server/User_Guide_MDP_Hand.pdf';
  }

  onSubmit() {
    var height = 0;
    var weight = 0;
    if(this.units=="imperial"){
      weight = this.weight.value * 0.453592 * 10;
      height = this.height.value * 25.4;
    } else if (this.units == "metric"){
      weight = this.weight.value * 10;
      height = this.height.value;
    }

    var middleFingerLength =(2.9118+0.0441*height+0.0034*weight)/10;
    var middleFingerLengthRounded = Math.round(middleFingerLength * 10)/10 + .1;
    if (middleFingerLengthRounded < 7.8) {
      middleFingerLengthRounded = 7.8;
    } else if(middleFingerLengthRounded > 10.5) {
      middleFingerLengthRounded = 10.5;
    }

    console.log(middleFingerLengthRounded);
    window.location.href='http://127.0.0.1:8000/Server/hand_' + middleFingerLengthRounded + '.zip';
  }

  }





