import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { User } from "../user.interface";
import { UserService } from "../user.service";
import { SharedService } from "../shared.service";

@Component({
  selector: 'app-profile', 
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'] 
})
export class ProfileComponent implements OnInit {

check1=false;check2=false;check3=false;check4=false;

name="";
surname="";
login="";
nlogin="";
pwd="";
npwd="";
valid=0;
pb=0;
cpt=0;
  constructor(private userService: UserService,private route: ActivatedRoute,private router: Router,private _sharedService: SharedService) { }

  ngOnInit() {
    if(localStorage.getItem('token')==null){
      this.setSection('Welcome');
      this.router.navigate(['/']);
    }
  }


   setSection(label){
    this._sharedService.emitChange(label);
    localStorage.setItem('section',label);
 }

setValid(){ this.pb=0;
     if(this.pwd == "") this.valid=0;
     else 
      if(this.check1==false &&this.check2==false &&this.check3==false &&this.check4==false ) this.valid=0;
      else
      { 
       if(this.check1&&this.name=="") this.pb++;
       if(this.check2&&this.surname=="") this.pb++;
       if(this.check3&&this.nlogin=="") this.pb++;
       if(this.check4&&this.npwd=="") this.pb++; console.log("pb="+this.pb)
       //if((this.check1==true&&this.name=="")||(this.check2==true&&this.surname=="")||(this.check3==true&&this.login=="")||(this.check4==true&&this.npwd==""))
       if(this.pb) 
        this.valid =0;
       else {this.valid = 1;
             this.login = localStorage.getItem('login');
            }
      }
}

 validation(){ console.log("login: "+localStorage.getItem('login'));
   this.userService.updateProfile(this.name,this.surname,localStorage.getItem('login'),this.nlogin, this.pwd,this.npwd,Number(localStorage.getItem('id')))
   .subscribe( 
      (response: Response) => { if(String(response) =="not") 
                                  {
                                    alert("That's not your actual password...");
                                    this.cpt++;
                                    if(this.cpt==3){
                                      this.setSection('Welcome');
                                this._sharedService.emitChange('Welcome');
                                this.router.navigate(['/']);
                                    }
                                  }
                              else{
                                alert("Update successful... You must reconnect to use the new profile!");
                                localStorage.removeItem('dash');
                                localStorage.removeItem('connexion');
                                localStorage.removeItem('name');
                                localStorage.removeItem('surname');
                                localStorage.removeItem('login');
                                localStorage.removeItem('priority');
                                localStorage.removeItem('token');
                                localStorage.removeItem('id');


                                this.setSection('Connexion');
                                this._sharedService.emitChange('Connexion');
                                this.router.navigate(['/connexion']);
                              }

      },
      (error) => console.log(error)
    );
}

}

