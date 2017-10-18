import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SharedService } from "./shared.service";
import { UserService } from "./user.service";
//import * as $ from 'jquery';
//declare var $: any;

declare var jquery:any; 
declare var $:any;
//declare var carouFredSel:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  //providers: [SharedService]
})
export class AppComponent implements OnInit {

  eltRef:ElementRef;
  title = 'app works!';
  conGender=localStorage.getItem('gender');
  conName=localStorage.getItem('name');
  displayAdministration=0;
  displayOperations=0;
  connexion:string;
  section="";
  htttc="... Higher Technical Teachers' Training College Of Kumba... ";
  cpt=0;
  constructor(private route: ActivatedRoute,private router: Router,private _sharedService: SharedService, private _flashMessagesService: FlashMessagesService,private userService:UserService)
  { console.log("dans le const:"+ localStorage.getItem('section'));
    _sharedService.changeEmitted$.subscribe(
        text => {
            console.log(text);
            if(String(text).charAt(0)=='D') {this.section = "Dashboard"; localStorage.setItem('section',String(text))}
             else if(String(text).charAt(6)=='1'){            
                this.displayOperations = Number(String(text).charAt(6));
                this.displayAdministration = Number(String(text).charAt(7));
                this.connexion=String(text).substr(0,6);
              }
            else if(String(text).charAt(0)=='*') this.conName = String(text).substring(1);
                else if(String(text).charAt(0)=='#') this.conGender = String(text).substring(1);

                else localStorage.setItem('section',String(text));
            console.log("con: "+this.connexion+" op: "+this.displayOperations+" ad: "+this.displayAdministration);   
        });
        router.events.subscribe(event => this.section = localStorage.getItem('section'));

    if(localStorage.getItem('token')!=null)
     {this.connexion= "Logout";
      this.displayOperations=1;
      if(localStorage.getItem('priority')=="All")
          this.displayAdministration=1;
     if(localStorage.getItem('welcomed')==null) localStorage.setItem('welcomed',"1")
    
      console.log(" Section: "+localStorage.getItem('section'));
    if(localStorage.getItem('section')!=null) 
     this.section = localStorage.getItem('section');
    else {
          this.setSection("Welcome")
         }
  }

    else 
    this.connexion= "Login";
    

    setInterval (() => { //alert("le set");
    if(this.cpt%2==1)
      this.htttc="... Higher Technical Teachers' Training College Of Kumba... ";
    else this.htttc="... Ecole Normale Supérieure d'Enseignement Technique De Kumba  ...";
    this.cpt++;
    }, 60000)
  //if(localStorage.getItem('welcomed')==null)
  
  }
      

  // constructor() {
  //   //if(document.getElementById("testScript").remove()!=null)
  //   //   document.getElementById("testScript").remove()
  //   var testScript = document.createElement("script");
  //   testScript.setAttribute("id", "testScript");
  //   testScript.setAttribute("src", "jquery.carouFredSel-6.2.0-packed.js");
  //   document.body.appendChild(testScript);
  // }
  ngOnInit(): any { 
    if(!this.displayOperations)
  {
    this._flashMessagesService.show('Welcome to H.T.T.T.C Kumba / Bienvenue à l\'ENSET de Kumba', { cssClass: 'alert-success', timeout: 7000 }); 
          this._flashMessagesService.grayOut(false);
    this.userService.getConfigs()
      .subscribe(
                (response) => {
                  localStorage.setItem('periodModif',response.periodModification);
                  localStorage.setItem('dateDeb',response.dateDeb);
                  localStorage.setItem('dateEnd',response.dateEnd);
                  localStorage.setItem('session',response.activeSession);
                  localStorage.setItem('idConf',response.idconfigs);
                  console.log("1  "+localStorage.getItem('session'));
                },
                (error) => console.log(error),
                ()=> console.log("2 "+localStorage.getItem('session'))
              )
    }
    
    //var pgwSlideshow = jQuery(this.elRef.nativeElement);
  //  $(this.eltRef.nativeElement).loa;
  //var pgwSlideshow = $('.pgwSlideshow').pgwSlideshow();
 }

toTop(){
  //document.body.scrollTop = 0;
  window.scrollTo(0,0); 
}
connect(){
  if(this.connexion=="Logout")
    { 
       if(confirm("Are you sure!"))
         {
          localStorage.removeItem('dash');
          localStorage.removeItem('connexion');
          localStorage.removeItem('name');
          localStorage.removeItem('surname');
          localStorage.removeItem('login');
          localStorage.removeItem('priority');
          localStorage.removeItem('token');
          localStorage.removeItem('section');
          localStorage.removeItem('id');
          this.connexion='Login';
          this.displayAdministration=0;
          this.displayOperations=0;
          this.setSection('Welcome');
          this.router.navigate(['/']);

         }
    }
  else
    { this._sharedService.emitChange('Connexion');
      this.section = "Connexion";
      this.router.navigate(['/connexion']);
    }
}

myCount: number = 10;
test: string;
disp=0;
myplaceholder="";
dId=1;
visibleNext=true;
visiblePrev=true;
updateLabel(val){
  this.myplaceholder=val;
}

updatedId(value){  //value=-1 previous page; value=1 next page
  this.dId+=value;

  this.dId!=1? this.visibleNext=true:this.visibleNext=false;
  this.dId!=3? this.visiblePrev=true:this.visiblePrev=false;

}
show(value){
  if(this.disp ==0) this.disp=value;
  else this.disp=0;
}
  search(){
     if(localStorage.getItem('token')!=null) this.router.navigate(['/viewRegistrations']);
  }
  countChange(event) {
    this.myCount = event;
    alert(this.myCount);
  } 
  setSection(label){
    if(label=="All Registrations")
     if(localStorage.getItem('token')==null)  
      {
        this._flashMessagesService.show('No result(s) for you...', { cssClass: 'alert-warning', timeout: 1000 }); 
          this._flashMessagesService.grayOut(false);
        this.section="Welcome";
        localStorage.setItem('section',"Welcome");
      }
      else
      {
        this.section=label;
        localStorage.setItem('section',label);
      }
    else{
        this.section=label;
        localStorage.setItem('section',label);
       }
  }
}
