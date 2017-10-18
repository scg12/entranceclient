import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Candidate } from "../candidate.interface";
import { Response } from "@angular/http";
import { UserService } from "../user.service";
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { SharedService } from "../shared.service";

@Component({
  selector: 'app-validated-registrations',
  templateUrl: './validated-registrations.component.html',
  styleUrls: ['./validated-registrations.component.css']
})
export class ValidatedRegistrationsComponent implements OnInit {

  candidates: Candidate[];
  candidateselect: Candidate;
  cand:Candidate[];
  filteredItems : Candidate[];
   pages : number = 4;
  pageSize : number = 8;
   pageNumber : number = 0;
   currentIndex : number = 1;
   items: Candidate[];
   pagesIndex : Array<number>;
   pageStart : number = 1;
   inputName : string = '';
   color;

  constructor(private userService: UserService,private route: ActivatedRoute,private router: Router,private _sharedService: SharedService) {
    this.filteredItems = this.candidates;
    this.getRegistration();
       }
 
  ngOnInit() {

          //this.filteredItems = this.candidates;
                console.log(this.candidates);

        this.currentIndex = 1;
         this.pageStart = 1;
         this.pages = 4;

        if(this.filteredItems)
         {this.pageNumber = parseInt(""+ (this.filteredItems.length / this.pageSize));
         if(this.filteredItems.length % this.pageSize != 0){
            this.pageNumber ++;
         }

         if(this.pageNumber  < this.pages){
               this.pages =  this.pageNumber;
         }

         this.refreshItems();
         console.log("this.pageNumber :  "+this.pageNumber);
       }
  }


  FilterByName(){
      this.filteredItems = [];
      if(this.inputName != ""){
            this.candidates.forEach(element => {
                if(element.name.toUpperCase().indexOf(this.inputName.toUpperCase())>=0){
                  this.filteredItems.push(element);
               }
            });
      }else{
         this.filteredItems = this.candidates;
      }
      console.log(this.filteredItems);
      this.ngOnInit();
   }
   fillArray(): any{
      var obj = new Array();
      for(var index = this.pageStart; index< this.pageStart + this.pages; index ++) {
                  obj.push(index);
      }
      return obj;
   }
 refreshItems(){
               this.items = this.filteredItems.slice((this.currentIndex - 1)*this.pageSize, (this.currentIndex) * this.pageSize);
               this.pagesIndex =  this.fillArray();
   }
   prevPage(){
      if(this.currentIndex>1){
         this.currentIndex --;
      }
      if(this.currentIndex < this.pageStart){
         this.pageStart = this.currentIndex;
      }
      this.refreshItems();
   }
   nextPage(){
      if(this.currentIndex < this.pageNumber){
            this.currentIndex ++;
      } 
      if(this.currentIndex >= (this.pageStart + this.pages)){
         this.pageStart = this.currentIndex - this.pages + 1;
      }

      this.refreshItems();
   }
    setSection(label){
    this._sharedService.emitChange(label);
    localStorage.setItem('section',label);
 }

    setPage(index : number){ 
         this.currentIndex = index;
         this.refreshItems();
    }

   getRegistration(){
    this.userService.getRegistrations()
    //.skipWhile(candidates => candidates.length < 3)
      .subscribe(
                  res=>{ //if(localStorage.getItem('priority')=="All")
                              {this.candidates = res
                               this.filteredItems = res;
                              }
                         /* else{this.candidates = res.filter(x=>x.depositPlace ==localStorage.getItem('priority'))
                               this.filteredItems = res.filter(x=>x.depositPlace ==localStorage.getItem('priority'));
                          }*/
                          this.candidates = res.filter(x=>x.isValid==1);
                          this.filteredItems = this.candidates;
                          var i=0, c1="000", c2="00", c3="0",code="";
                          for( i=0;i<this.candidates.length;i++)
                            { if(String(this.candidates[i].idcandidates).length==1) code=c1+this.candidates[i].idcandidates;
                              else if(String(this.candidates[i].idcandidates).length==2) code=c2+this.candidates[i].idcandidates;
                              else if(String(this.candidates[i].idcandidates).length==3) code=c3+this.candidates[i].idcandidates;
                                   else code=""+this.candidates[i].idcandidates;
                              this.candidates[i].optionOfTraining="18"+this.candidates[i].depositPlace[0]+this.candidates[i].depositPlace[2]+code;
                          
                            }
                  },
                  //(candidates: Candidate[]) => this.candidates = candidates,
                  (error: Response) =>  console.log(error),
                )
                //this.filteredItems = this.candidates;
             console.log(this.candidates)
  }

}
