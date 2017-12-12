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
  // handWidth = new FormControl("", Validators.required)
  middleFingerLength = new FormControl("");
  palmLength = new FormControl("");
  // handType = new FormControl("",Validators.required)
  height = new FormControl("",Validators.required);
  weight = new FormControl("",Validators.required);
  // accuracyLevel = new FormControl(1,Validators.required)

  // //needed to ensure that the form does not get duplicated formcontrol values
  // //if user decides to change accuracy vals
  // accuracyLevelChanged = false
  // accuracyLevelTwoEnabled = false
  // accuracyLevelThreeEnabled = false

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

 
  
  // accuracyLevelChange(){

  //   if(this.accuracyLevel.value == 1){

  //     //if user pressed decides to change accuracy level
  //     //ensure that the form does not contain other addtional inputs
  //     //allows next button to continue
  //     if(this.accuracyLevelTwoEnabled == true){
  //       this.form.removeControl("handWidth");
  //       this.accuracyLevelChanged = false;
  //       this.accuracyLevelTwoEnabled = false;
  //     }

  //     if(this.accuracyLevelThreeEnabled == true){
  //       this.form.removeControl("handWidth");
  //       this.form.removeControl("handLength")
  //       this.accuracyLevelChanged = false;
  //       this.accuracyLevelThreeEnabled = false;
  //     }



  //   }
  //   if (this.accuracyLevel.value == 2 && !this.accuracyLevelTwoEnabled) {
  //       this.form.addControl("handWidth", this.handWidth);
  //       this.accuracyLevelTwoEnabled = true;
  //       this.accuracyLevelChanged = true
  //   }

  //   if (this.accuracyLevel.value == 3 && !this.accuracyLevelThreeEnabled) {
  //       this.form.addControl("handWidth", this.handWidth);
  //       this.form.addControl("handLength", this.handWidth);
  //       this.accuracyLevelThreeEnabled = true;
  //       this.accuracyLevelChanged = true
  //   }

    
  // }

  handSizeSubmit() {

    window.location.href='http://127.0.0.1:8000/model/'+ this.handSize + ".zip";
  }

  onSubmit() {
    // var url = "http://127.0.0.1:8000/model/";
    // this.http.get('http://127.0.0.1:8000/model/Palm.STL').subscribe(data => {
    //   console.log(data);
    // });

    if(this.units=="imperial"){

    }
    window.location.href='http://127.0.0.1:8000/model/hand.zip';
  }

  }





