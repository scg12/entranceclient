import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { User } from "../user.interface";
import { Response } from "@angular/http";
import { UserService } from "../user.service";
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { SharedService } from "../shared.service";

@Component({
  selector: 'app-depositcenter',
  templateUrl: './depositcenter.component.html',
  styleUrls: ['./depositcenter.component.css']
})
export class DepositcenterComponent implements OnInit {
users: User[]=[];
exs: string[]=[];
check=false;check2=false;
name:string="";
surname:string="";
gender:string="";
tel1:string="";
tel2:string="";
email:string="";
login:string="";
pwd:string="";
examCenter:string="";
localisation:string="";
intGender=0;
valid=0;
gends:string[]=['M','W'];
dpcs: string[]=[];
 constructor(private userService: UserService,private route: ActivatedRoute,private router: Router,private _sharedService: SharedService) { }

  ngOnInit() {
      //this.user{login:"",pwd:""};
      if(localStorage.getItem('token')==null)
        { this.setSection('Welcome');
          this.router.navigate(['/'])
        }
      this.getUsers();
      this.getDeposiCenters();

  }

   setSection(label){
    this._sharedService.emitChange(label);
    localStorage.setItem('section',label);
 }
 
 getDeposiCenters() {
    this.userService.getDeposiCenters()
    .subscribe( 
      (response: string[]) =>{  var i =0;
                                for(i=0;i<response.length;i++)
                                this.exs.push(response[i]['libelle']);                               
                            },
      (error) => console.log(error),
      ()=> { }
    );        
}


 validation(){
  if(this.name!=null&&this.name!=""&&this.surname!=null&&this.surname!=""&&this.gender!=null&&this.gender!=""&&this.tel1!=null&&this.tel1!=""&&this.email!=null&&this.email!=""
  &&this.login!=null&&this.login!=""&&this.pwd!=null&&this.pwd!=""&&this.examCenter!=null&&this.examCenter!=""&&this.localisation!=null&&this.localisation!=""&&this.tel2!=null&&this.tel2!=""
  ){
    this.valid=1;
  }
  else {
    this.valid=0;
  }
  console.log(this.name+" "+this.surname+" "+this.gender+" "+this.tel1+" "+this.tel2+" "+this.email+" "+this.login+" "+this.pwd+" "+this.examCenter+" "
  +this.localisation+" ");
 }
 setGender(){
  if(this.gender=="W") this.intGender=1;
  else this.intGender = 0;
 }
submit(){
    this.userService.createUser(this.name,this.surname,this.intGender,this.tel1,this.tel2,this.email,this.login,this.pwd,this.examCenter,this.localisation)
    .subscribe(
           (res) => {      
                                alert("User added successfully...");
                                this.setSection('Users List');
                                this._sharedService.emitChange('Users List');
                                this.getUsers();
                                this.router.navigate(['/userslist']);                          
           },

           (error)=> {console.log(error)}

    )
}
getUsers(){
  this.userService.getUsers()
  .subscribe(
    response => {  var i=0;
              this.users=[];
              for(i=0;i<response.length;i++) 
              this.users.push(response[i]);
              console.log(response[0].idusers);     
          },
    error => console.log(error) 
  )
}

delete(cb){
  if(confirm("Are you sure?"))
   {
     this.userService.deleteUser(cb.value)
     .subscribe(
             res => {
                       if(res=="ok"){
                         this.getUsers();
                         alert('Deleted');
                        this.router.navigate(['/userslist'])
                       } 
                   }
     )
   }
  else 
  console.log(cb.value);
}

}
 