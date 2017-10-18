import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas/dist/html2canvas';
import { Candidate } from "../candidate.interface";
import { UserService } from "../user.service";
import { SharedService } from "../shared.service";
@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html', 
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent implements OnInit {
c : Candidate;
   private sub: any;
   name: string; surname: string;
   gender;dateOfBirth;cardIDate;numberOfChildren:string;
   id : any;
   visible = true;
   choice=0;
   disp=0;
   text="";
   check=false;
@ViewChild('test') el: ElementRef;
isClassVisible: true;

  constructor( private userService: UserService,private route: ActivatedRoute,private router: Router,private _sharedService: SharedService) { }

  ngOnInit() {
      //alert("Click on the document to download it!");
      this.c = {name:"",surname:"",gender:false,dateOfBirth:new Date(),placeOfBirth:"",originRegion:"",originDivision:"",originSubDivision:"",
                      employmentSituation:"",typeHandicap:"",nationality:"",cardID:"",cardIDIssueDate:"",language1:"",language2:"",maritalStatus:"",
                      numberOfChildren:0,specialityDiploma:"",seriesDiploma:"",avgDiploma:0.0,diplomaObtainYear:"",degreeDiploma:"",obtainingInstitution:"",
                      examCenter:"",depositPlace:"",optionOfTraining:"",admissionMode:"",cycle:"",department:"",option:"",session:"",residenceCity:"",tel1:"",tel2:"",
                      email:"",bp:"",fax:"",address:"",practicedSport:"",othersActivities:"",dateFirstRegistration:new Date(),dateModification:new Date(),dateValidation:new Date(),
                      orderNumber:0,dateForDeposit:0,isValid:false,periodModification:0};
                      
      this.c.name = this.route.snapshot.paramMap.get('name');
      this.c.surname = this.route.snapshot.paramMap.get('surname');
      Number(this.route.snapshot.paramMap.get('gender'))==1?this.gender="Female" : this.gender="Male";
      this.dateOfBirth = this.route.snapshot.paramMap.get('dateOfBirth');      
      this.c.dateOfBirth = new Date(this.dateOfBirth);
      this.dateOfBirth =(this.c.dateOfBirth.getMonth()+1)+"/"+this.c.dateOfBirth.getDate()+"/"+this.c.dateOfBirth.getFullYear();
      this.c.placeOfBirth = this.route.snapshot.paramMap.get('placeOfBirth');
      this.c.nationality = this.route.snapshot.paramMap.get('nationality');
      this.c.originRegion = this.route.snapshot.paramMap.get('originRegion');
      this.c.originDivision = this.route.snapshot.paramMap.get('originDivision');
      this.c.originSubDivision = this.route.snapshot.paramMap.get('originSubDivision');
      this.c.employmentSituation = this.route.snapshot.paramMap.get('employmentSituation');
      this.c.typeHandicap = this.route.snapshot.paramMap.get('typeHandicap');
      this.c.cardID = this.route.snapshot.paramMap.get('cardID');
      this.cardIDate = this.route.snapshot.paramMap.get('cardIDIssueDate');
      this.cardIDate = new Date(this.cardIDate);
      this.cardIDate = (this.cardIDate.getMonth()+1)+"/"+this.cardIDate.getDate()+"/"+this.cardIDate.getFullYear();
      this.c.language1 = this.route.snapshot.paramMap.get('language1');
      this.c.maritalStatus = this.route.snapshot.paramMap.get('maritalStatus');
      this.numberOfChildren = this.route.snapshot.paramMap.get('numberOfChildren');
      this.c.session = this.route.snapshot.paramMap.get('session');
      this.c.degreeDiploma = this.route.snapshot.paramMap.get('degreeDiploma');
      this.c.specialityDiploma = this.route.snapshot.paramMap.get('specialityDiploma');
      this.c.avgDiploma = Number(this.route.snapshot.paramMap.get('avgDiploma'));
      this.c.diplomaObtainYear = this.route.snapshot.paramMap.get('diplomaObtainYear');
      this.c.obtainingInstitution = this.route.snapshot.paramMap.get('obtainingInstitution');
      this.c.examCenter = this.route.snapshot.paramMap.get('examCenter');
      this.c.depositPlace = this.route.snapshot.paramMap.get('depositPlace');
      this.c.admissionMode = this.route.snapshot.paramMap.get('admissionMode');
      this.c.cycle = this.route.snapshot.paramMap.get('cycle');
      this.c.department = this.route.snapshot.paramMap.get('department');
      this.c.option = this.route.snapshot.paramMap.get('option');
      this.c.residenceCity = this.route.snapshot.paramMap.get('residenceCity');
      this.c.tel1 = this.route.snapshot.paramMap.get('tel1');
      this.c.email = this.route.snapshot.paramMap.get('email');
      this.c.address = this.route.snapshot.paramMap.get('address');
      this.c.orderNumber = Number(this.route.snapshot.paramMap.get('orderNumber'));
      this.c.optionOfTraining = this.route.snapshot.paramMap.get('orderNumber');
  }

   setSection(label){
    this._sharedService.emitChange(label);
    localStorage.setItem('section',label);
 }
  public pdfHtml() {
      //alert(this.el.nativeElement.innerHTML);
        this.visible = false;
        let pdf = new jsPDF();
        let options = {
            pagesplit: true,
            html2canvas: this.test(),
            
        };
        
         

        pdf.addHTML(this.el.nativeElement, 0, 0, options, () => {
            
            pdf.save("registration.pdf");
        });
        //this.remove();
    }
    
    test()  {
          html2canvas(document.body.getElementsByClassName('ici')).then((canvas) => {
          document.body.appendChild(canvas);
        });
    
    }

    remove()  {
          html2canvas(document.body.getElementsByClassName('ici')).then((canvas) => {
          //document.body.removeChild(canvas);
          document.body.removeChild(document.body.getElementsByClassName('ici')[0])
        });
    
    }
onchange(val){
  console.log(this.choice);
  if(val==1) {this.disp=1;this.text="";}
  if(val==2) this.disp=2;
}

  validation(){

  if(this.check)
    {this.userService.validate(this.c)
      .subscribe(
                  res=>{  
                          this.c = res;
                          alert('Validation performed successfully.');
                          this.setSection('Non Validated Registrations');
                        //window.location.href="/nonValidateRegistrations";
                        this.router.navigate(['/nonValidatedRegistrations']); 
                  },
                  (error: Response) =>  console.log(error),
                )
             console.log(this.c)
    }
  else alert("Select validate first."); 
  }
  checkchange(){
      //if(this.check==0) this.check = 1;
      //else this.check==0
      console.log(this.check);
  }

}
