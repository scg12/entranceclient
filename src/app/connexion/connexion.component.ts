import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { UserService } from "../user.service";
import { SharedService } from "../shared.service";
import { Candidate } from "../candidate.interface";
import { User } from "app/user.interface";
 
@Component({ 
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'] 
}) 
export class ConnexionComponent implements OnInit {
    error: string;
   @Output()
   connected: EventEmitter<number> = new EventEmitter<number>();
   count=0;
   c : Candidate; 
   private sub: any;
   name: string; surname: string;
   login:string; pwd:string;
   id : any;
   user: User;
   cpt=0;
   //user:User;
   //params['id']
  constructor(private userService:UserService, private route: ActivatedRoute,private router: Router,private _sharedService: SharedService) { }

  ngOnInit() {
      this.name = this.route.snapshot.paramMap.get('name');
      this.surname = this.route.snapshot.paramMap.get('surname');
    //console.log(this.id);
    this.sub = this.route.params.subscribe(params => {
       this.c = params['candidate']
  //.switchMap((params: Params) => this.c= params['candidate']) 
});
      console.log('Actual Token: '+localStorage.getItem('token'));
      //localStorage.removeItem('token')
      //console.log('Et apres remove Token: '+localStorage.getItem('token'));
  }
  connect(){ //console.log(this.login+" - "+this.pwd)
      this.error="";
      this.userService.signin(this.login,this.pwd)
      .subscribe(
                (response ) =>{ 
                                localStorage.setItem('dash','0');
                                localStorage.setItem('id',response.user.idusers); console.log("idu: "+response.user.idusers);
                                localStorage.setItem('section','Dashboard');
                                console.log('Connexion:'+ localStorage.getItem('section'));
                                localStorage.setItem('connexion','Deconnexion');
                                localStorage.setItem('login',response.user.login); console.log("login con:" +response.user.login )
                                localStorage.setItem('name',response.user.name);
                                localStorage.setItem('surname',response.user.surname);
                                response.user.gender==0? localStorage.setItem('gender','Mr'):localStorage.setItem('gender','Mrs');
                                localStorage.setItem('priority',response.user.examCenter);
                                if(response.user.examCenter=="All")
                                  this._sharedService.emitChange('Logout11');
                                else this._sharedService.emitChange('Logout10');
                                this._sharedService.emitChange('Dashboard');
                                this._sharedService.emitChange('*'+response.user.name);
                                this._sharedService.emitChange('#'+localStorage.getItem('gender'));
                                this.router.navigate(['/dashboard']);
                              },
                (error: Response) => {console.log(error)
                                      this.cpt++;
                                      this.login=""; this.pwd="";
                                      this.error="Unrecognized User!";
                                      if(this.cpt==3) 
                                        this.router.navigate(['/welcome']);
                                       },
                () => console.log("finito")
      )
  }

  /*updatelabel(value){
    this.login=value;
  } 
  updatepwd(value){
    this.pwd=value;
  }*/ 
increment() {
    this.count++;
    this.connected.emit(this.count);
  }

  decrement() {
    this.count--;
    this.connected.emit(this.count);
  }
}
