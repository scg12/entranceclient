import { Component, OnInit } from '@angular/core';
import { NgForm,FormControl,Validators } from "@angular/forms";
import { Response } from "@angular/http";
import { Candidate } from "../candidate.interface";
import { UserService } from "../user.service";
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { SharedService } from "../shared.service";

@Component({
  selector: 'app-download-registration',
  templateUrl: './download-registration.component.html',
  styleUrls: ['./download-registration.component.css']
})
export class DownloadRegistrationComponent implements OnInit {
    last: any;
    today: any;

candidate: Candidate;
candidate2: Candidate;
orderNumber: number=0;
dateOfBirth:Date;
local="";
valid=0;
valid2=0; name="";
unknown="rien";
orderN="";
  constructor(private userService: UserService,private route: ActivatedRoute,private router: Router,private _sharedService: SharedService) {
    //this.dateAdapter.setLocale('nl');
  }

  ngOnInit() {
    /*if(this.today.getTime()>this.last.getTime()) 
    {alert("Modification period is over!")
      window.location.href="/"
    }
    var timeDiff= Math.abs(this.last.getTime() - this.today.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));*/
    this.candidate = {idcandidates:0,name:"",surname:"",gender:false,dateOfBirth:new Date(),placeOfBirth:"",originRegion:"",originDivision:"",originSubDivision:"",
                      employmentSituation:"",typeHandicap:"",nationality:"",cardID:"",cardIDIssueDate:"",language1:"",language2:"",maritalStatus:"",
                      numberOfChildren:0,specialityDiploma:"",seriesDiploma:"none",avgDiploma:0.0,diplomaObtainYear:"",degreeDiploma:"",obtainingInstitution:"",
                      examCenter:"",depositPlace:"",optionOfTraining:"none",admissionMode:"",cycle:"",department:"",option:"",session:"",residenceCity:"",tel1:"",tel2:"",
                      email:"",bp:"",fax:"",address:"",practicedSport:"",othersActivities:"",dateFirstRegistration:new Date(),dateModification:new Date(),dateValidation:new Date(),
                      orderNumber:0,dateForDeposit:0,isValid:false,periodModification:0};
  }

setdatenaiss(){
  //this.dateb = ""+this.c.dateOfBirth;
  this.candidate.dateOfBirth = this.dateOfBirth ;
  //this.candidate.name="1995-11-07";
  //this.candidate.name=this._to2digit(this.dateOfBirth.getFullYear())
  let day = (this.dateOfBirth+"").substring(8,10);
  this.candidate.name = this.dateOfBirth.getFullYear()+"-"+(this.dateOfBirth.getMonth()+1)+"-"+day;
  this.local=this.candidate.name;
  //alert(this.candidate.name+" init "+this.dateOfBirth);
  console.log(this.candidate.name);

  //this.candidate.name = this.dateOfBirth.getFullYear()+"-"+this.dateOfBirth.getMonth()+"-"+this.dateOfBirth.getDay()
}
setorder(){
 this.candidate.orderNumber = this.orderNumber ;
}
data(){
  this.setdatenaiss(); 
  this.setorder();
  //alert(this.candidate.name+" init "+this.candidate.orderNumber);
}
 //window.location.href="/reportregistration/"+response.name
 //form.reset();  
onSubmit(form:NgForm){ 
  let orderNum= this.orderN.substring(4); console.log("on: "+orderNum);
  let i=0;
  while(orderNum.charAt(i)=="0" && i<4) i++;
  if(i==3) this.orderNumber = Number(orderNum.charAt(3));
  else if(i==2) this.orderNumber = Number(orderNum.charAt(2)+orderNum.charAt(3));
  else if(i==1) this.orderNumber = Number(orderNum.charAt(1)+orderNum.charAt(2)+orderNum.charAt(3));
  else if(i==0) this.orderNumber = Number(orderNum.charAt(0)+orderNum.charAt(1)+orderNum.charAt(2)+orderNum.charAt(3));
  this.candidate.orderNumber=this.orderNumber;
  console.log("on en question: "+this.orderNumber)
  this.unknown="unknown";
  this.userService.getCandidate(this.candidate)
    .subscribe( 
      (res) => { 
        if(res.length==1) 
        {this.candidate = {idcandidates:res[0].idcandidates,name:res[0].name,surname:res[0].surname,gender:res[0].gender,dateOfBirth:res[0].dateOfBirth,placeOfBirth:res[0].placeOfBirth,originRegion:res[0].originRegion,originDivision:res[0].originDivision,originSubDivision:res[0].originSubDivision,
                      employmentSituation:res[0].employmentSituation,typeHandicap:res[0].typeHandicap,nationality:res[0].nationality,cardID:res[0].cardID,cardIDIssueDate:res[0].cardIDIssueDate,language1:res[0].language1,language2:res[0].language2,maritalStatus:res[0].maritalStatus,
                      numberOfChildren:res[0].numberOfChildren,specialityDiploma:res[0].specialityDiploma,seriesDiploma:res[0].seriesDiploma,avgDiploma:res[0].avgDiploma,diplomaObtainYear:res[0].diplomaObtainYear,degreeDiploma:res[0].degreeDiploma,obtainingInstitution:res[0].obtainingInstitution,
                      examCenter:res[0].examCenter,depositPlace:res[0].depositPlace,optionOfTraining:res[0].optionOfTraining,admissionMode:res[0].admissionMode,cycle:res[0].cycle,department:res[0].department,option:res[0].option,session:res[0].session,residenceCity:res[0].residenceCity,tel1:res[0].tel1,tel2:res[0].tel2,
                      email:res[0].email,bp:res[0].bp,fax:res[0].fax,address:res[0].address,practicedSport:res[0].practicedSport,othersActivities:res[0].othersActivities,dateFirstRegistration:res[0].dateFirstRegistration,dateModification:res[0].dateModification,dateValidation:res[0].dateValidation,
                      orderNumber:res[0].orderNumber,dateForDeposit:res[0].dateForDeposit,isValid:res[0].isValid,periodModification:res[0].periodModification};
        var i=0, c1="000", c2="00", c3="0",code="";
                          
                             if(String(this.candidate.idcandidates).length==1) code=c1+this.candidate.idcandidates;
                              else if(String(this.candidate.idcandidates).length==2) code=c2+this.candidate.idcandidates;
                              else if(String(this.candidate.idcandidates).length==3) code=c3+this.candidate.idcandidates;
                              else code=""+this.candidate.idcandidates; 
                              this.candidate.optionOfTraining="18"+this.candidate.depositPlace[0]+this.candidate.depositPlace[2]+code;  
      }
        else this.candidate.name="unknown";
        /*this.candidate2 = candidate;
        console.log(this.candidate2);
        this.name=this.candidate2[0].name;
        console.log(this.candidate2[0].name);*/
        console.log(this.candidate)
      },
      (error: Response) =>  {console.log(error)
                              
                            },
      ()=> {
            console.log("Finished")}
      )
      
        //window.location.href="/reportregistration/"+response.name  

     //this.name =this.candidate.name   
}
isValid(){
    if(this.valid==1){
      //this.valid=2;
      return true;}
      
    else return false;
  }
  setValid2(f){
    this.onSubmit(f);
    this.valid2 = 1;
    this.valid = 2;
    this.isValid();
    console.log(this.valid2);
    //this.isValid2();
  }
  isValid2(){
    if(this.valid2==1)
      return true;
    else return false;
  }
  checkForm(){
   // if((this.orderN.length==8) &&(this.dateOfBirth!=new Date() || ""+this.dateOfBirth!="" ))
    if((this.orderN.length==8) &&(this.dateOfBirth!=null))
     this.valid=1;
    else this.valid = 0;
     this.unknown="rien";
  }
  setUnknown(){
    this.unknown="";
  }
  verifyCand(){
    if(this.candidate.name==this.unknown)
      {this.valid=0;
        return true;
    }
  }
 setSection(label){
    this._sharedService.emitChange(label);
    localStorage.setItem('section',label);
 }  
}
