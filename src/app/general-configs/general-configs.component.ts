import { Response } from "@angular/http";
import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import { Config } from "../config.interface";
import { UserService } from "../user.service";
import { NgForm } from "@angular/forms";
import { ChartsModule } from 'ng2-charts/ng2-charts';
import Chart from 'chart.js';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas/dist/html2canvas';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { SharedService } from "../shared.service";

//import * as Chart from 'chart.js/src/chart';

@Component({
  selector: 'app-general-configs',
  templateUrl: './general-configs.component.html',
  styleUrls: ['./general-configs.component.css'],
  
})
export class GeneralConfigsComponent implements OnInit {

 @ViewChild('test') el: ElementRef;
isClassVisible: true;

config: Config;
dateDeb: Date;
dateEnd: Date; 
session: string;
periodModif: number;
pm="";
sess=localStorage.getItem('session');
valid=0;
years=[2015,2016,2017,2018];
check=false;
good=0;
  constructor(private userService: UserService,private route: ActivatedRoute,private router: Router,private _sharedService: SharedService) { 
    
  }
 
  ngOnInit() {
    this.config= {idconfigs:0,dateDeb:new Date("February 4, 2016 10:13:00"),dateEnd:new Date("February 4, 2016 10:13:00"),
                  activeSession:"2018",periodModification:0};
                  console.log("Session: "+this.sess);
    if(this.sess){
      this.config.activeSession=this.sess;
      this.config.dateDeb=new Date(localStorage.getItem('dateDeb')); console.log(localStorage.getItem('dateDeb'));
      this.config.dateEnd=new Date(localStorage.getItem('dateEnd')); 
      this.pm=localStorage.getItem('periodModif');
    }
    //this.test();

 }
  isValid(){
    if(this.valid==1)
      return true;
    else return false;
  }
setSection(label){ 
    this._sharedService.emitChange(label);
    localStorage.setItem('section',label);
 }

 enable(){
   if(this.dateDeb!=null&&this.dateEnd!=null&&this.session!=null&&this.periodModif!=null)
    this.good=1;
  else this.good=0; 
 }

onSubmit(form: NgForm){
  this.config.idconfigs = Number(localStorage.getItem('idConf'));
  this.config.activeSession = this.session;
  this.config.dateDeb = this.dateDeb; //this.config.dateDeb.setDate(this.config.dateDeb.getDate()+1);
  this.config.dateEnd = this.dateEnd; //this.config.dateEnd.setDate(this.config.dateEnd.getDate()+1);
  this.config.periodModification = this.periodModif;
  this.userService.configsSet(this.config)
    .subscribe(
      (response) => { this.setSection('Welcome');
                                localStorage.setItem('periodModif',response.periodModification);
                                localStorage.setItem('dateDeb',response.dateDeb.date); console.log("new datedeb: "+response.dateDeb.date)
                                localStorage.setItem('dateEnd',response.dateEnd.date);
                                localStorage.setItem('session',response.activeSession);
                                localStorage.setItem('idConf',response.idconfigs);
                                console.log(JSON.stringify(response))
                                alert("Updated successfully.");
                                this.router.navigate(['/configs']);
                                }
    );
}
  download() {

        var doc = new jsPDF();
        doc.text(20, 20, 'Hello world!');
        doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
        doc.addPage();
        doc.text(20, 20, 'Do you like that?');

        // Save the PDF
        doc.save('Test.pdf');
    }
    public pdfHtml() {
      //alert(this.el.nativeElement.innerHTML);
        let pdf = new jsPDF();
        let options = {
            pagesplit: true,
            html2canvas: this.test()  
        };
        
         

        pdf.addHTML(this.el.nativeElement, 0, 0, options, () => { 
            pdf.save("test1.pdf");
        });
    }

    test()  {
          html2canvas(document.body).then((canvas) => {
          document.body.appendChild(canvas);
        });
    
    }


}
