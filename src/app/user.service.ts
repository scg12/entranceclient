import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { Candidate } from "app/candidate.interface";
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { SharedService } from "./shared.service";


@Injectable()
export class UserService{
  constructor(private http: Http,private route: ActivatedRoute,private router: Router,private _sharedService: SharedService){

  }
  deleteUser(id:number){
    this.checkToken();
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.delete('http://htttc.us-east-2.elasticbeanstalk.com/api/deleteU',new RequestOptions({
                                    headers: headers,
                                    body: {id:id}
                              }))
      .map(
        (response: Response) => {
          return response.json().user;
            },
        error => console.log(error)
      );
  }
  checkToken(){
    if(localStorage.getItem('token')==null)
      { localStorage.setItem('section','Welcome');
        this._sharedService.emitChange('Welcome');
        this.router.navigate(['/']);}
  }
  getUsers(): Observable<any> {
    this.checkToken();
    return this.http.get('http://htttc.us-east-2.elasticbeanstalk.com/api/usersL')
      .map(
        (res) => {return res.json().users;
        }
      );
  }
updateProfile(name:string,surname:string,login:string,nlogin:string, pwd:string,npwd:string,id:number): Observable<any>{
  this.checkToken();
 const headers = new Headers({'Content-Type': 'application/json'});
 return this.http.patch('http://htttc.us-east-2.elasticbeanstalk.com/api/updateU', {name:name,surname:surname,login:login,nlogin:nlogin,pwd:pwd,npwd:npwd,id:id}, {headers: headers})
 .map(
        (response: Response) => {
          return response.json().user;
        },
        error => alert("An error occur in the process!")
      );
}
  createUser(name:string,surname:string,gender:number,tel1:string,tel2:string,email:string,login:string,
   pwd:string,examCenter:string,localisation:string):Observable<any>{
    this.checkToken();
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://htttc.us-east-2.elasticbeanstalk.com/api/createU', JSON.stringify({name:name,surname:surname,gender:gender,tel1:tel1,tel2:tel2,
      email:email,login:login,pwd:pwd,examCenter:examCenter, localisation:localisation}), {headers: headers});
  }

  signin(login:string, pwd:string):Observable<any>{
    const headers = new Headers({'Content-Type': 'application/json'}); console.log({login:login,pwd:pwd});
         console.log(" et "+JSON.stringify({login:login,pwd:pwd}));
    return this.http.post('http://htttc.us-east-2.elasticbeanstalk.com/api/signin', {login:login,pwd:pwd}, {headers: headers})
    .map(
        (response: Response) => {
          const token = response.json().token;
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace('-','+').replace('_','/');
          return {token: token, decoded: JSON.parse(window.atob(base64)),user:response.json().user};
        }
      )
      .do(
          tokenData =>{
              localStorage.setItem('token',tokenData.token);
              console.log(tokenData.token);

          }
      );
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getRegions(): Observable<any> {
    return this.http.get('http://htttc.us-east-2.elasticbeanstalk.com/api/regions')
      .map(
        (response: Response) => {
          return response.json().regions;
        }
      );
  }

  getDivisions(): Observable<any> {
    return this.http.get('http://htttc.us-east-2.elasticbeanstalk.com/api/divisions')
      .map(
        (response: Response) => {
          return response.json().divisions;
        }
      );
  }

  getSubDivisions(): Observable<any> {
    return this.http.get('http://htttc.us-east-2.elasticbeanstalk.com/api/subDivisions')
      .map(
        (response: Response) => {
          return response.json().subDivisions;
        }
      );
  }

  createCandidate(candidate): Observable<any> {
    const body = JSON.stringify(candidate);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://htttc.us-east-2.elasticbeanstalk.com/api/createCandidate', body, {headers: headers})
      .map(
        (response: Response) => {
                    //console.log(body);
                    //console.error();
          return response.json().candidate;
        }
      );
  }

  getRegistrations(): Observable<any> {
    this.checkToken();
    return this.http.get('http://htttc.us-east-2.elasticbeanstalk.com/api/candidatesL')
      .map(
        (response: Response) => {
          return response.json().candidates;
        }
      );
  }

  getRegistrationsvn(isValid): Observable<any> {
    this.checkToken();
    const param = 
      {'isValid':isValid};
      const body = JSON.stringify(param);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://htttc.us-east-2.elasticbeanstalk.com/api/candidatesV', body, {headers: headers})
      .map(
        (response: Response) => {
          return response.json().candidates;
        }
      );
  }


  configsSet(config): Observable<any> {
    this.checkToken();
    const body = JSON.stringify(config);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put('http://htttc.us-east-2.elasticbeanstalk.com/api/setConfigs', body, {headers: headers})
      .map(
        (response: Response) => {
          return response.json().config;
        }
      );
  }

  getConfigs(): Observable<any> {
    return this.http.get('http://htttc.us-east-2.elasticbeanstalk.com/api/configs')
      .map(
        (response: Response) => {
          return response.json().configs;
        }
      );
  }

  validate(candidate): Observable<any> {
    this.checkToken();
    const body = JSON.stringify(candidate);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.patch('http://htttc.us-east-2.elasticbeanstalk.com/api/validate', body, {headers: headers})
      .map(
        (response: Response) => {
          return response.json().candidate;
        }
      );
  }

  getDepartments(): Observable<any> {
    return this.http.get('http://htttc.us-east-2.elasticbeanstalk.com/api/departmentL')
      .map(
        (response: Response) => {
          return response.json().departments;
        }
      );
  }

  getOptions(): Observable<any> {
    return this.http.get('http://htttc.us-east-2.elasticbeanstalk.com/api/optionL')
      .map(
        (response: Response) => {
          return response.json().options;
        }
      );
  }

   getCandidate(cand): Observable<any> {
    /*const param = [
      {'orderNumber':orderNumber},
       {'dateOfBirth':dateb}];*/
       //alert(candidate.dateOfBirth+" here "+candidate.orderNumber);

    const body = JSON.stringify(cand);console.log(JSON.stringify(cand));
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://htttc.us-east-2.elasticbeanstalk.com/api/candidate', body, {headers: headers})
      .map(
              (response: Response) => {
                return response.json().candidate;
                //console.log(response);
              }
      );
  }

  updateCandidate(cand): Observable<any> {
    const body = JSON.stringify(cand);console.log(JSON.stringify(cand));
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put('http://htttc.us-east-2.elasticbeanstalk.com/api/candidateU', body, {headers: headers})
      .map(
              (response: Response) => {
                return response.json().candidate;
              }
      );
  }
  
  getCandidatesBDpl(): Observable<any> {
    this.checkToken();
    return this.http.get('http://htttc.us-east-2.elasticbeanstalk.com/api/candidatesBdpl')
      .map(
        (response: Response) => {
          return response.json().candidates;
        }
      );
  }
//**************************************************************** */

getCandidatesBCycle(): Observable<any> {
  this.checkToken();
    return this.http.get('http://htttc.us-east-2.elasticbeanstalk.com/api/candidatesBCycle')
      .map(
        (response: Response) => {
          return response.json().candidates;
        }
      );
  }
getCandidatesBGender(): Observable<any> {
  this.checkToken();
    return this.http.get('http://htttc.us-east-2.elasticbeanstalk.com/api/candidatesBGender')
      .map(
        (response: Response) => {
          return response.json().candidates;
        }
      );
  }
  getCandidatesBdpt(): Observable<any> { this.checkToken();
    return this.http.get('http://htttc.us-east-2.elasticbeanstalk.com/api/candidatesBdpt')
      .map(
        (response: Response) => {
          return response.json().candidates;
        }
      );
  }
  getCandidatesBDeptOpt(): Observable<any> { this.checkToken();
    return this.http.get('http://htttc.us-east-2.elasticbeanstalk.com/api/candidatesBDeptOpt')
      .map(
        (response: Response) => {
          return response.json().candidates;
        }
      );
  } 
  getcandidatesBExamPl(): Observable<any> { this.checkToken();
    return this.http.get('http://htttc.us-east-2.elasticbeanstalk.com/api/candidatesBExamPl')
      .map(
        (response: Response) => {
          return response.json().candidates;
        }
      );
  }

  getCandidatesBValid(): Observable<any> { this.checkToken();
    return this.http.get('http://htttc.us-east-2.elasticbeanstalk.com/api/candidatesBValid')
      .map(
        (response: Response) => {
          return response.json().candidates;
        }
      );
  }

  getCandidatesBValidBDpl(): Observable<any> { this.checkToken();
    return this.http.get('http://htttc.us-east-2.elasticbeanstalk.com/api/candidatesBValidBDpl')
      .map(
        (response: Response) => {
          return response.json().candidates;
        }
      );
  }
  getDepositPlace(): Observable<any> { this.checkToken();
    return this.http.get('http://htttc.us-east-2.elasticbeanstalk.com/api/depositPlace')
      .map(
        (response: Response) => {
          return response.json().candidates;
        }
      );
  }
  getExamCenter(): Observable<any> { this.checkToken();
    return this.http.get('http://htttc.us-east-2.elasticbeanstalk.com/api/examCenter')
      .map(
        (response: Response) => {
          return response.json().candidates;
        }
      );
  }
  getCandidatesFdpt(dp): Observable<any> { this.checkToken();
    console.log(JSON.stringify({depositPlace:dp}));
    const body = JSON.stringify({depositPlace:dp});
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://htttc.us-east-2.elasticbeanstalk.com/api/candidatesFdpt', body, {headers: headers})
      .map(
              (response: Response) => {//console.log("ser resp: "+response.json().candidates);
                return response.json().candidates;
                
              }
      );
  }

    getCandidatesFCycle(dp): Observable<any> { this.checkToken();
    const body = JSON.stringify({depositPlace:dp});
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://htttc.us-east-2.elasticbeanstalk.com/api/candidatesFCycle', body, {headers: headers})
      .map(
              (response: Response) => {
                return response.json().candidates;
              }
      );
  }

getCandidatesFGender(dp): Observable<any> { this.checkToken();
    const body = JSON.stringify({depositPlace:dp});
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://htttc.us-east-2.elasticbeanstalk.com/api/candidatesFGender', body, {headers: headers})
      .map(
              (response: Response) => {
                return response.json().candidates;
              }
      );
  }
  getCandidatesFDeptOpt(dp): Observable<any> { this.checkToken();
    const body = JSON.stringify({depositPlace:dp});
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://htttc.us-east-2.elasticbeanstalk.com/api/candidatesFDeptOpt', body, {headers: headers})
      .map(
              (response: Response) => {
                return response.json().candidates;
              }
      );
  }
  getCandidatesFValid(dp): Observable<any> { this.checkToken();
    const body = JSON.stringify({depositPlace:dp});
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://htttc.us-east-2.elasticbeanstalk.com/api/candidatesFValid', body, {headers: headers})
      .map(
              (response: Response) => {
                return response.json().candidates;
              }
      );
  }

  getDeposiCenters(): Observable<any> {const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.get('http://htttc.us-east-2.elasticbeanstalk.com/api/depositCenters', {headers: headers})
      .map(
        (response: Response) => {
          return response.json().depositCenters;
        }
      );
  }
}
