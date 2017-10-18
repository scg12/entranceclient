import { Component, OnInit } from '@angular/core';
import { NgForm,FormControl,Validators } from "@angular/forms";
import { WindowRef } from '../WindowRef';
import { Response } from "@angular/http";
import { Region } from "../region.interface";
import { Division } from "../division.interface";
import { SubDivision } from "../subDivision.interface";
import { Candidate } from "../candidate.interface";
import { Department } from "../department.interface";
import { Option } from "../option.interface";
import { UserService } from "../user.service";
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { SharedService } from "../shared.service";

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
    numberOfChildren: string; 
    cardIDate: any;
    dateOfBirth: any;
    vre="";
    nameParam:any;
  nativeWindow: any;
 ok=0;
  depts: Department[];
  opt;opt1: [Option];
  regions: Region[];
  dfd: Division;
  divisions1;divisions: Division[];
  subDivisions1;subDivisions: SubDivision[];
  candidate: Candidate;
  datefor=new Date();
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(EMAIL_REGEX)]);


  constructor(private userService: UserService,private winRef: WindowRef,private route: ActivatedRoute,private router: Router,private _sharedService: SharedService) { 
    this.nativeWindow = winRef.getNativeWindow();
  }

  ngOnInit() { console.log("ls:"+localStorage.getItem('gender'))
    this.candidate = {name:"",surname:"",gender:false,dateOfBirth:new Date(),placeOfBirth:"",originRegion:"",originDivision:"",originSubDivision:"",
                      employmentSituation:"",typeHandicap:"",nationality:"",cardID:"",cardIDIssueDate:"",language1:"",language2:"",maritalStatus:"",
                      numberOfChildren:0,specialityDiploma:"",seriesDiploma:"none",avgDiploma:0.0,diplomaObtainYear:"",degreeDiploma:"",obtainingInstitution:"",
                      examCenter:"",depositPlace:"",optionOfTraining:"none",admissionMode:"",cycle:"",department:"",option:"",session:"",residenceCity:"",tel1:"",tel2:"",
                      email:"",bp:"",fax:"",address:"",practicedSport:"",othersActivities:"",dateFirstRegistration:new Date(),dateModification:new Date(),dateValidation:new Date(),
                      orderNumber:0,dateForDeposit:0,isValid:false,periodModification:0};

                            
    this.userService.getDepartments()
      .subscribe(
                (departments: Department[]) => this.depts = departments,
                (error: Response) => console.log(error)
              )
    this.userService.getOptions()
      .subscribe(
                (options: Option[]) => this.opt = options,
                (error: Response) => console.log(error)
              )
    this.userService.getRegions()
      .subscribe(
                (regions: Region[]) => this.regions = regions,
                (error: Response) => console.log(error)
              )
    this.userService.getDivisions()
     .subscribe(
                (divisions: Division[]) => this.divisions = divisions,
                (error: Response) => console.log(error)
              )
    this.userService.getSubDivisions()
      .subscribe(
                (subDivisions: SubDivision[]) => this.subDivisions = subDivisions,
                (error: Response) => console.log(error)
              )

     if(this.route.snapshot.paramMap.get('name'))
            { console.log(this.route.snapshot.paramMap.get('gender'));
              console.log(Number(this.route.snapshot.paramMap.get('gender')));
              this.nameParam = this.route.snapshot.paramMap.get('name');
             this.candidate.name = this.route.snapshot.paramMap.get('name');
      this.candidate.surname = this.route.snapshot.paramMap.get('surname');
      this.gender=Number(this.route.snapshot.paramMap.get('gender'))==0?this.gender="M" : this.gender="W";
      this.dateOfBirth = this.route.snapshot.paramMap.get('dateOfBirth');      
      this.candidate.dateOfBirth = new Date(this.dateOfBirth);
      this.dateOfBirth =this.candidate.dateOfBirth.getDate()+"/"+this.candidate.dateOfBirth.getMonth()+"/"+this.candidate.dateOfBirth.getFullYear();
      this.candidate.placeOfBirth = this.route.snapshot.paramMap.get('placeOfBirth');
      this.candidate.nationality = this.route.snapshot.paramMap.get('nationality');
      this.candidate.originRegion = this.route.snapshot.paramMap.get('originRegion');
      this.candidate.originDivision = this.route.snapshot.paramMap.get('originDivision');
      this.candidate.originSubDivision = this.route.snapshot.paramMap.get('originSubDivision');
      console.log(this.candidate.originRegion+"-"+this.candidate.originDivision+"-"+this.candidate.originSubDivision);
      this.candidate.employmentSituation = this.route.snapshot.paramMap.get('employmentSituation');
      this.candidate.typeHandicap = this.route.snapshot.paramMap.get('typeHandicap');
      this.candidate.cardID = this.route.snapshot.paramMap.get('cardID');
      this.candidate.cardIDIssueDate = this.route.snapshot.paramMap.get('cardIDIssueDate');
      this.cardIDate = new Date(this.candidate.cardIDIssueDate);
      this.cardIDate = this.cardIDate.getDate()+"/"+this.cardIDate.getMonth()+"/"+this.cardIDate.getFullYear();
      this.candidate.language1 = this.route.snapshot.paramMap.get('language1');
      this.candidate.maritalStatus = this.route.snapshot.paramMap.get('maritalStatus');
      this.numberOfChildren = this.route.snapshot.paramMap.get('numberOfChildren');
      this.candidate.session = this.route.snapshot.paramMap.get('session');
      this.candidate.degreeDiploma = this.route.snapshot.paramMap.get('degreeDiploma');
      this.candidate.specialityDiploma = this.route.snapshot.paramMap.get('specialityDiploma');
      this.candidate.avgDiploma = Number(this.route.snapshot.paramMap.get('avgDiploma'));
      this.candidate.diplomaObtainYear = this.route.snapshot.paramMap.get('diplomaObtainYear');
      this.candidate.obtainingInstitution = this.route.snapshot.paramMap.get('obtainingInstitution');
      this.candidate.examCenter = this.route.snapshot.paramMap.get('examCenter');
      this.candidate.depositPlace = this.route.snapshot.paramMap.get('depositPlace');
      this.candidate.admissionMode = this.route.snapshot.paramMap.get('admissionMode');
      this.candidate.cycle = this.route.snapshot.paramMap.get('cycle');
      this.candidate.department = this.route.snapshot.paramMap.get('department');
      this.candidate.option = this.route.snapshot.paramMap.get('option');
      this.candidate.residenceCity = this.route.snapshot.paramMap.get('residenceCity');
      this.candidate.tel1 = this.route.snapshot.paramMap.get('tel1');
      this.candidate.email = this.route.snapshot.paramMap.get('email');
      this.candidate.address = this.route.snapshot.paramMap.get('address');
      this.candidate.orderNumber = Number(this.route.snapshot.paramMap.get('orderNumber'));
            }

  }

  // getRegions(){
  //   this.userService.getRegions()
  //     .subscribe(
  //               (regions: Region[]) => this.regions = regions,
  //               (error: Response) => console.log(error)
  //             )
  //}
  selectNat=1;
  addNat=0;
  nationalities=['Cameroonian','Other'];
  dt:Date;
  datenaiss:string;
  gender:string;
  cardissuedate:Date;
maritalStatus=['Single','Married'];
languages=['English','français'];
situations=['Unemployed','Employed'];
handicaps=['None','Limping','Other'];
 head="Personal Information 1/4";
 date1="";dateB:Date;
 validate=false;
 divId=1;
 ddselect="";
 mmselect="";
 input1="";
 input2="";
 input3="";
 input4="";
 theDate: Date;
 adate: Date;
 placeOfBirth="";
 OSD="";
 EPS="";
 TH="";
 vr;
 IDNum="";
 NumChildren="0";
 MaritalStatus="";
 Olang="";
 entranceSession="";
 admissionDiploma="";
 specialityOfDiploma="";
 average="";
 obtainingYear="";
 obtainingInstitution="";
 examCenter="";
 depositPlace="";
 admissionMode="";
 cycle="";
 department="";
 option="";
 cityOfResidence="";
 tel1=""; tel2="";
 email="";
 BP="";
 Fax="";
 Address="";
 PracticedSport="";
 othersActivities="";

 OR="";
 OD="";
 nationality="";
 name="";
 surname="";
 yearB="";
 yearBi="";
 ddB;

 PracticedSportLabel="";
 othersActivitiesLabel="";
 AddressLabel="";
 FaxLabel="";
 BPLabel="";
 emailLabel="";
 tel1Label="";
 tel2Label="";
 cityOfResidenceLabel="";
 optionLabel="";
 departmentLabel="";
 cycleLabel="";
 admissionModeLabel="";
 depositPlaceLabel="";
 examCenterLabel="";
 obtainingInstitutionLabel="";
 obtainingYearLabel="";
 averageLabel="";
 specialityOfDiplomaLabel="";
 admissionDiplomaLabel="";
 entranceSessionLabel="";
 OlangLabel="";
 MaritalStatusLabel="";
 NumChildrenLabel="";
 IDNumLabel="";
 THLabel="";
 EPSLabel="";
 OSDLabel="";
 placeOfBirthLabel="";
 genderLabel="";
 ORLabel="";
 ODLabel="";
 nameLabel="";
 surnameLabel="";
 visibleNext=true;
 visiblePrev=false;

 ddiLabel="";
 mmiLabel="";
 yeariLabel="";
 ddLabel="";
 mmLabel="";
 yearLabel="";
 nationalityLabel=""; 

 dateBirth:Date;
 genders=['M','W'];
 dd=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
 mm=[1,2,3,4,5,6,7,8,9,10,11,12];

 ddi=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
 mmi=[1,2,3,4,5,6,7,8,9,10,11,12];
 ADEn=['GCE AL','Baccalauréat','Bachelor','Licence'];
 eyears=[2018,2019,2020,2021];
 Years=[2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017];
 ECs=['Bafoussam','Douala','Kumba','Maroua','Yaounde'];
 DPs=['Bafoussam','Douala','Kumba','Maroua','Yaounde'];
 AMs=['Common Entrance'];
 CY=['First Cycle','Second Cycle'];
 DP=['Agriculture','Computer Science','Fashion clothing','Guidance Concelling','Mechanical','Sciences of Education','Topography','Tourism'];
 OPTs=['Industrial Computing','Technologies of Information and Communication'];

 ORs=['Adamaoua','Centre','Est','Extreme-Nord','Littoral','Nord','Nord-Ouest','Ouest','Sud','Sud-Ouest'];
 ODs=[['Djérem','Faro-et-Déo','Mayo-Banyo','Mbéré','Vina']];
 firstDate;
 progressBarValue = 0;
 selectedRegion="";
 selectedDivision="";
 selectedSubDivision="";
 completePage=0;
 progress=0;
 nbpage1=10;nbpage2;nbpage3;nbpage4;
 continue=1;
 operation = "";
 p1=0;p2=0;p3=0;p4=0;
 valid=0;
 valid2=0;




 //selectedRegion=this.regions[1];

 updateDivId(value){  //value=-1 previous page; value=1 next page
   this.divId+=value;
   if(this.divId==1) this.head="Personal Information 1/4";
   if(this.divId==2) this.head="Diploma of entrance 2/4";
   if(this.divId==3) this.head="Training choice 3/4";
   if(this.divId==4) this.head="Personal Address 4/4"; 
   this.divId!=1? this.visibleNext=true:this.visibleNext=false; 
   this.divId!=4? this.visiblePrev=true:this.visiblePrev=false;
  /* if(this.divId==4 && this.p3==0)
    {
      this.p3=1;
      this.progressBarValue+=25;
      this.completePage +=1;
    }*/

 }

 setSection(label){
    this._sharedService.emitChange(label);
    localStorage.setItem('section',label);
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
  checkIfEmpty(d){
    //if(this.theDate=="") this.theDate="Select the date";
    this.theDate= d.value;
  }

  updatenameLabel(val){
    this.nameLabel=val;
  }

  updatesurnameLabel(val){
    this.surnameLabel=val;
  }
  updateddLabel(val){
    this.ddLabel=val;
    //this.dateBirth.setDate(parseInt(this.ddLabel));
  }
  updatemmLabel(val){
    this.mmLabel=val;
    //this.dateBirth.setDate(parseInt(this.mmLabel));
  }
  updateyearLabel(val){
    this.yearLabel=val;
    this.date1 = this.yearB+"-"+this.mmselect+"-"+this.ddselect;
    this.dateB = new Date(this.date1)
    console.log(this.dateB);
    //this.dateBirth.setDate(parseInt(this.yearB));
  }
  updatedd(val){
  //  this.dateBirth.setDate(parseInt(val));
  }

  updatemm(val){
    //this.dateBirth.setMonth(parseInt(val));
  }

updatenationalityLabel(nationality){
  this.nationalityLabel=nationality;
}
updateORLabel(OR){
  this.ORLabel=OR;
}
updateODLabel(OD){
  this.ODLabel=OD;
}
updategenderLabel(gender){
  this.genderLabel=gender;
}
updateplaceOfBirthLabel(val){
  this.placeOfBirthLabel=val;
}
updateOSDLabel(OSD){
  this.OSDLabel=OSD;
}
updateEPSLabel(EPS){
  this.EPSLabel=EPS;
}
updateTHLabel(TH){
  this.THLabel=TH;
}
updateIDNumLabel(IDNum){
  this.IDNumLabel=IDNum;
}

updateddiLabel(val){
  this.ddiLabel=val;
  //this.dateBirth.setDate(parseInt(this.ddLabel));
}
updatemmiLabel(val){
  this.mmiLabel=val;
  //this.dateBirth.setDate(parseInt(this.mmLabel));
}
updateyeariLabel(val){
  this.yeariLabel=val;
  //this.dateBirth.setDate(parseInt(this.yearB));
}
updateNumChildrenLabel(val){
  this.NumChildrenLabel=val;
}
updateMaritalStatusLabel(val){
  this.MaritalStatusLabel=val;
}
updateOlangLabel(val){
  this.OlangLabel=val;
}
updateentranceSessionLabel(val){
  this.entranceSessionLabel=val;
}
updateadmissionDiplomaLabel(val){
  this.admissionDiplomaLabel=val;
}
updatespecialityOfDiplomaLabel(val){
  this.specialityOfDiplomaLabel=val;
}
updateaverageLabel(val){
  this.averageLabel=val;
}
updateobtainingYearLabel(val){
  this.obtainingYearLabel=val;
}
updateobtainingInstitutionLabel(val){
  this.obtainingInstitutionLabel=val;
}
updateexamCenterLabel(val){
  this.examCenterLabel=val;
}
updatedepositPlaceLabel(val){
  this.depositPlaceLabel=val;
}
updateadmissionModeLabel(val){
  this.admissionModeLabel=val;
}
updatecycleLabel(val){
  this.cycleLabel=val;
}
updatedepartmentLabel(val){
  this.departmentLabel=val;
}
updateoptionLabel(val){
  this.optionLabel=val;
}
updatecityOfResidenceLabel(val){
  this.cityOfResidenceLabel=val;
}
updatetel1Label(val){
  this.tel1Label=val;
}
updatetel2Label(val){
  this.tel2Label=val;
}
updateemailLabel(val){
  this.emailLabel=val;
}
updateBPLabel(val){
  this.BPLabel=val;
}
updateFaxLabel(val){
  this.FaxLabel=val;
}
updateAddressLabel(val){
  this.AddressLabel=val;
}
 updatePracticedSportLabel(val){
   this.PracticedSportLabel=val;
 }
 updateothersActivitiesLabel(val){
   this.othersActivitiesLabel=val;
 }
selectOD(val){

}
onChange(region) {
   this.divisions1 = this.divisions.filter((division) => division.idr === region.idr);
   this.candidate.originRegion = region.rle;
  }
onChange2(division) {
    this.subDivisions1 = this.subDivisions.filter((subDivision) => subDivision.idd === division.idd);
    this.candidate.originDivision = division.dle;
  }
  onChange3(subDivision) {
    this.candidate.originSubDivision = subDivision.sdle;
  }
onChangeDept(dept) {
   this.opt1 = this.opt.filter((opt) => opt.schoolDepartments_id === dept.iddepartments);
   this.candidate.department = dept.libelle;
  }
onChangeOpt(opt) {
   this.candidate.option = opt.libelle;
  }
updateprogressbar(page){
if(page==1)
if(this.candidate.name!=""&&this.candidate.surname!=""&&this.candidate.dateOfBirth!=(new Date())
   &&this.candidate.placeOfBirth!=""&&this.candidate.nationality!=""&&this.candidate.originRegion!=""&&
   this.candidate.originDivision!=""&&this.candidate.originSubDivision!=""&&this.candidate.employmentSituation!=""
   &&this.candidate.typeHandicap!=""&&this.candidate.cardID!=""&&this.candidate.cardIDIssueDate!=""&&
   this.candidate.language1!=""&&this.candidate.maritalStatus!="")
   {this.nbpage1 = 14; this.operation="incr"; }
else {
    this.nbpage1--;
    this.operation="decr";
    if(this.nbpage1==13) this.continue=1;
    else this.continue=0;

}

if(page==2)
if(this.candidate.session!=""&&this.candidate.degreeDiploma!=""&&this.candidate.specialityDiploma!=""
&&this.candidate.avgDiploma!=0.0&&this.candidate.diplomaObtainYear!=""&&this.candidate.obtainingInstitution!="")
{this.nbpage2 = 6; this.operation="incr"; }
else {
 this.nbpage2--;
 this.operation="decr";
 if(this.nbpage2==5) this.continue=1;
 else this.continue=0;
}


if(page==3)
if(this.candidate.examCenter!="" && this.candidate.depositPlace!="" && this.candidate.admissionMode!="" && this.candidate.cycle!=""
  &&this.candidate.department!=""&&this.candidate.option!="")
{this.nbpage3 = 6; this.operation="incr"; }
else {
 this.nbpage3--;
 this.operation="decr";
 if(this.nbpage3==5) this.continue=1;
 else this.continue=0;
}

if(page==4)
if(this.candidate.residenceCity!="" && this.candidate.tel1!="" && this.candidate.email!="" && this.candidate.address!="")
{this.nbpage4 = 4; this.operation="incr"; }
else {
 this.nbpage4--;
 this.operation="decr";
 if(this.nbpage4==3) this.continue=1;
 else this.continue=0;
}




 if(this.operation=="incr" && ((page==1 && this.p1==0)||(page==2 && this.p2==0)||(page==3 && this.p3==0)||(page==4 && this.p4==0)))
  { if(this.completePage==4) this.progress =100;
   if(this.completePage==3) this.progress =75;
   if(this.completePage==2) this.progress =50;
   if(this.completePage==1) this.progress =25;
   if(this.completePage==0) this.progress =0;
   if(this.progress==75)
    {this.progress=100; this.valid=1; this.completePage =4;}
   if(this.progress==50)
    {this.progress=75; this.valid=0; this.completePage =3;}
   if(this.progress==25)
    {this.progress=50; this.valid=0; this.completePage =2;}
   if(this.progress==0)
    {this.progress=25; this.valid=0; this.completePage =1;}
   if(this.progress==100)
    {this.valid=1; this.completePage =4;}

    this.progressBarValue =this.progress;
    if(page==1) this.p1=1; if(page==2) this.p2=1; if(page==3) this.p3=1; if(page==4) this.p4=1;
  }

   if(this.operation=="decr"){
    if(this.continue==1 && ((page==1 && this.p1==1)||(page==2 && this.p2==1)||(page==3 && this.p3==1)||(page==4 && this.p4==1)) ){

      if(this.completePage==4) this.progress =100;
      if(this.completePage==3) this.progress =75;
      if(this.completePage==2) this.progress =50;
      if(this.completePage==1) this.progress =25;
      if(this.completePage==0) this.progress =0;
      if(this.progress==100)
       {this.progress=75; this.valid=0; this.completePage =3;}
      else
      if(this.progress==75)
       {this.progress=50; this.valid=0; this.completePage =2;}
      else
      if(this.progress==50)
       {this.progress=25; this.valid=0; this.completePage =1;}
      else
      if(this.progress==25)
       {this.progress=0; this.valid=0; this.completePage=0;}

       this.progressBarValue =this.progress;
      if(page==1) this.p1=0; if(page==2) this.p2=0; if(page==3) this.p3=0; if(page==4) this.p4=0;
    }
     }

//if(this.entranceSession!="")

}

onSubmit(form: NgForm){ 
  this.datefor = this.candidate.dateOfBirth;
  console.log("submit datenaiss="+this.datefor)
 if(this.candidate.bp=="") this.candidate.bp="none";
 if(this.candidate.fax=="") this.candidate.fax="none";
 if(this.candidate.practicedSport=="") this.candidate.practicedSport="none";
 if(this.candidate.othersActivities=="") this.candidate.othersActivities="none";
 if(this.candidate.tel2=="") this.candidate.tel2="none";
if(!this.nameParam){ this.candidate.dateOfBirth.setDate(this.candidate.dateOfBirth.getDate()+1);
      console.log("et apres chgmt="+this.datefor);
  this.userService.createCandidate(this.candidate)
    .subscribe(  
      //() => alert('Cancidate created!'),
      (response: Candidate) => {console.log(response); 
        
                                var i=0, c1="000", c2="00", c3="0",code="";
                               this.datefor.setDate(this.datefor.getDate()-1)
                               this.candidate = response
                              if(String(this.candidate.idcandidates).length==1) code=c1+this.candidate.idcandidates;
                              else if(String(this.candidate.idcandidates).length==2) code=c2+this.candidate.idcandidates;
                              else if(String(this.candidate.idcandidates).length==3) code=c3+this.candidate.idcandidates;
                              else code=""+this.candidate.idcandidates; 
                              this.candidate.optionOfTraining="18"+this.candidate.depositPlace[0]+this.candidate.depositPlace[2]+code;
                              this.ok=1;
                          
                            
    }
    ); //form.reset();
}
else{ //console.log(this.candidate); 
      this.userService.updateCandidate(this.candidate)
    .subscribe( 
      (response: Candidate) =>{ console.log(response)
                                 var i=0, c1="000", c2="00", c3="0",code="";
                              this.candidate = response
                            { if(String(this.candidate.idcandidates).length==1) code=c1+this.candidate.idcandidates;
                              else if(String(this.candidate.idcandidates).length==2) code=c2+this.candidate.idcandidates;
                              else if(String(this.candidate.idcandidates).length==3) code=c3+this.candidate.idcandidates;
                              else code=""+this.candidate.idcandidates; 
                              this.candidate.optionOfTraining="18"+this.candidate.depositPlace[0]+this.candidate.depositPlace[2]+code;
                          
                            }
                              },
      (error) => console.log(error)
    )
    }
    
}
setGender(){
  if(this.gender=='M') this.candidate.gender = false;
  else this.candidate.gender = true;

}
setdatenaiss(){
  this.datenaiss = ""+this.candidate.dateOfBirth;
  console.log(this.datenaiss+" et "+this.candidate.dateOfBirth);
}
setlang2(){
  this.candidate.language1 == "M"? this.candidate.language2="W":this.candidate.language2="M";
}
setCardIssueDate(){
  this.candidate.cardIDIssueDate = ""+this.cardissuedate;
}
protected assignActity(type: string): void {
       var newWindow = this.nativeWindow.open('/#/reportregistration');
       newWindow.location = '/reportregistration';
}
setAddNationality(nat){
if(nat=='Other')
  {
  this.addNat = 1;
  this.selectNat = 0;
}
else this.addNat = 0;
}
addNationality(n){ 
  //this.vre = this.nationalities.find(x => x.toLowerCase() == n.value.toLowerCase());
  
  /*if(this.vre=="")
    {this.nationalities.push(n.value);
    console.log(this.nationalities);
    this.vr = n.value;
    }
  this.addNat = 0;
  this.selectNat = 1;*/
  this.candidate.nationality=n.value;
}
getDisable()
{
  if(this.nameParam)
    return 'disabled';
  else return 'rien';
}
setCssDynamical($event) {
    console.log($event);
    $event.source.trigger.nativeElement.childNodes[0].setAttribute("style", "font-size: 12px;font-weight: bold")
  }

}
