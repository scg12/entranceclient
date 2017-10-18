import { Component, OnInit,ElementRef, ViewChild,ViewContainerRef,Compiler,ComponentFactory  } from '@angular/core';
import Chart from 'chart.js';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import * as html2canvas from 'html2canvas/dist/html2canvas';
import { UserService } from "../user.service";
import { Data } from "../data.interface";
import { Dat } from "../dat.interface";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
dt: Dat[]=[];
depositP:String[]=[];
examC:String[]=[];
data:Data[]=[];
dat:Data[][]=[ [{label:"",value:0}]];
load=0;
ctx2: any;
canvas:any;
size=0;
numServ:number;
taille=[0,0,0,0,0,0,0,0]
c:any;
index=0;
toclick=0;
loadOthers=0;
ind1=0;ind2=0;
colors = ['red', 'green', 'blue', 'orange', 'yellow','white','purple'];
coll=['rgba('+248+','+ 6+','+ 7+','+ 0.3+')','rgba('+0+','+ 255+','+ 12+','+ 0.3+')','rgba('+0+','+ 0+','+ 255+','+ 0.3+')','rgba('+65+','+ 36+','+ 107+','+ 0.3+')','rgba('+191+','+ 73+','+ 222+','+ 0.3+')','rgba('+155+','+ 255+','+ 206+','+ 0.3+')','rgba('+26+','+ 0+','+ 149+','+ 0.3+')','rgba('+190+','+ 0+','+ 56+','+ 0.3+')','rgba('+181+','+ 250+','+ 56+','+ 0.3+')','rgba('+254+','+ 138+','+ 39+','+ 0.3+')','rgba('+249+','+ 231+','+ 1+','+ 0.3+')','rgba('+150+','+ 45+','+ 34+','+ 0.3+')','rgba('+0+','+ 10+','+ 150+','+ 0.3+')','rgba('+0+','+ 169+','+ 71+','+ 0.3+')'];





  constructor(private route: ActivatedRoute,private router: Router,private userService : UserService,private _flashMessagesService: FlashMessagesService) { }

  ngOnInit() { 
    // 1st parameter is a flash message text
        // 2nd parameter is optional. You can pass object with options.
      if(localStorage.getItem('dash')=="0")
        { /*let name = atob(this.route.snapshot.paramMap.get('name'));
          let gender = Number(atob(this.route.snapshot.paramMap.get('gender')))==0? "Mr":"Mrs";
          let right = atob(this.route.snapshot.paramMap.get('examCenter'));
          let surname = atob(this.route.snapshot.paramMap.get('surname'));*/
          let name = localStorage.getItem('name');
          let gender = localStorage.getItem('gender');
          let surname = localStorage.getItem('surname');
          localStorage.setItem('dash','1');
          this._flashMessagesService.show('Welcome '+gender+' '+surname+', '+name, { cssClass: 'alert-success', timeout: 7000 }); 
          this._flashMessagesService.grayOut(true);
        }
    this.numServ = 0;
    var i=0;
//alert("dt: "+this.dt.length)
    this.getDepositPlace();
    this.getExamCenter();
    this.getCandidatesBDpl(); this.numServ++;
    this.getCandidatesBCycle(); this.numServ++;
    this.getCandidatesBGender(); this.numServ++;
    this.getCandidatesBdpt(); this.numServ++;
    this.getCandidatesBDeptOpt(); this.numServ++;
    this.getCandidatesBValid(); this.numServ++;
    this.getcandidatesBExamPl(); this.numServ++;

    //this.getCandidatesBValidBDpl(); this.numServ++;
    
  }
 
 click(){ this.load=1;var i=0;
        //alert(this.dt.length);
        this.bar("# Candidates by Deposit Place");
        this.pieordoughnut("pie","# Candidates by Cycle");
        this.pieordoughnut("doughnut","# Candidates by Gender");
        this.bar("# Candidates by Department");
        this.bar("# Candidates by Option");
        this.pieordoughnut("doughnut","# Candidates by Validity");
        this.bar("# Candidates by Exam Place");
            for(i=0;i<this.depositP.length;i++){ console.log(this.depositP[i]);
            this.getCandidatesFdpt(this.depositP[i]); this.numServ++;
            this.getCandidatesFCycle(this.depositP[i]); this.numServ++;
            this.getCandidatesFGender(this.depositP[i]); this.numServ++;
            this.getCandidatesFDeptOpt(this.depositP[i]); this.numServ++;
            this.getCandidatesFValid(this.depositP[i],(i+1)*5); this.numServ++;
    } //alert("puis: "+this.dt.length+" numser= "+this.numServ);
        
 }
 click2(){
     var i=0;
        this.loadOthers = 1;
     for(i=0;i<this.depositP.length;i++){
        this.bar("# Candidates by Department For-"+this.depositP[i]);
        this.pieordoughnut("pie","# Candidates by Cycle For-"+this.depositP[i]);
        this.pieordoughnut("doughnut","# Candidates by Gender For-"+this.depositP[i]);
        this.bar("# Candidates by Option For-"+this.depositP[i]);
        this.pieordoughnut("doughnut","# Candidates by Validity For-"+this.depositP[i]);
        }
 }
////////////////Bar///////////////////
bar(label){ 
    var id = this.index+1;
  //console.log(this.index+" Bar id="+id+" et "+this.dt[this.index].index+" Response size:"+this.dt[this.index].data.length+" et data "+this.dt[0].data[0].label);
  var ctx2 = document.getElementById("myChart"+id); console.log("myChart"+id);
console.log(" index p:"+(this.index+1));
var labs=[],dats=[],bgs=[],brs=[],i=0,j=0;

 for(i=0;i<this.dt[this.index].data.length;i++)
 labs.push(this.dt[this.index].data[i].label);
 for(i=0;i<this.dt[this.index].data.length;i++)
 dats.push(this.dt[this.index].data[i].value);
 var col,col1,col2;
  for(i=0;i<this.dt[this.index].data.length;i++)
  {
for( j = 0; j < 3; j++)
    {   if(j==0)
        col=(Math.floor(Math.random() * 255));
        if(j==1)
        col1=(Math.floor(Math.random() * 255));
        if(j==2)
        col2=(Math.floor(Math.random() * 255));
    }
    bgs.push( 'rgba('+ col+','+ col1+','+ col2+','+0.3+')');
    brs.push( 'rgba('+ col+','+ col1+','+ col2+','+1+')');
    /*col=(Math.floor(Math.random() * this.coll.length));
    if(col==0)
      {bgs.push( 'rgba('+248+','+ 6+','+ 7+','+ 0.3+')');
      brs.push( 'rgba('+248+','+ 6+','+ 7+','+ 1+')');}
    else
      if(col==1)
      {bgs.push( 'rgba('+0+','+ 255+','+ 12+','+ 0.3+')');
      brs.push( 'rgba('+0+','+ 255+','+ 12+','+ 1+')');}
    else
      if(col==2)
      {bgs.push( 'rgba('+0+','+ 0+','+ 255+','+ 0.3+')');
      brs.push( 'rgba('+0+','+ 0+','+ 255+','+ 1+')');}
    else
      if(col==3)
      {bgs.push( 'rgba('+65+','+ 36+','+ 107+','+ 0.3+')');
      brs.push( 'rgba('+65+','+ 36+','+ 107+','+ 1+')');}
    else
      if(col==4)
      {bgs.push( 'rgba('+191+','+ 73+','+ 222+','+ 0.3+')');
      brs.push( 'rgba('+191+','+ 73+','+ 222+','+ 1+')');}
    else
      if(col==5)
      {bgs.push( 'rgba('+155+','+ 255+','+ 206+','+ 0.3+')');
      brs.push( 'rgba('+155+','+ 255+','+ 206+','+ 1+')');}
    else
      if(col==6)
      {bgs.push( 'rgba('+26+','+ 0+','+ 149+','+ 0.3+')');
      brs.push( 'rgba('+26+','+ 0+','+ 149+','+ 1+')');}
    else
      if(col==7)
      {bgs.push( 'rgba('+190+','+ 0+','+ 56+','+ 0.3+')');
      brs.push( 'rgba('+190+','+ 0+','+ 56+','+ 1+')');}
    else
      if(col==8)
      {bgs.push( 'rgba('+181+','+ 250+','+ 56+','+ 0.3+')');
      brs.push( 'rgba('+181+','+ 250+','+ 56+','+ 1+')');}
    else
      if(col==9)
      {bgs.push( 'rgba('+254+','+ 138+','+ 39+','+ 0.3+')');
      brs.push( 'rgba('+254+','+ 138+','+ 39+','+ 1+')');}
    else
      if(col==10)
      {bgs.push( 'rgba('+249+','+ 231+','+ 1+','+ 0.3+')');
      brs.push( 'rgba('+249+','+ 231+','+ 1+','+ 1+')');}
    else
      if(col==11)
      {bgs.push( 'rgba('+150+','+ 45+','+ 34+','+ 0.3+')');
      brs.push( 'rgba('+150+','+ 45+','+ 34+','+ 1+')');}
    else
      if(col==12)
      {bgs.push( 'rgba('+0+','+ 10+','+ 150+','+ 0.3+')');
      brs.push( 'rgba('+0+','+ 10+','+ 150+','+ 1+')');}
    else
      if(col==13)
      {bgs.push( 'rgba('+0+','+ 169+','+ 71+','+ 0.3+')');
      brs.push( 'rgba('+0+','+ 169+','+ 71+','+ 1+')');}
      else 
        {bgs.push( 'rgba('+0+','+ 10+','+ 150+','+ 0.3+')');
      brs.push( 'rgba('+0+','+ 10+','+ 150+','+ 1+')');}*/

  } 
var myChart = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: labs,
        datasets: [{
            label: label,
            data: dats,
            backgroundColor: bgs,
            borderColor: brs,
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
this.ind1++; this.ind2++;
this.index++;
}
////////////////PieOrDoughnut///////////////////
pieordoughnut(type,label){
  console.log(" index p:"+(this.index+1));
var labs=[],dats=[],bgs=[],brs=[],i=0,j=0;

 for(i=0;i<this.dt[this.index].data.length;i++)
 {
    if(this.ind1==2||this.ind1==9||this.ind1==14||((this.ind1-14>0)&&(this.ind1-14)%5==0))
      {if(this.dt[this.index].data[i].label=="0")
            labs.push("Boys");
      else  labs.push("Girls");
       //if(this.ind1==14) this.ind1=0;
      }
    else
     if(this.ind2==5||this.ind2==11||this.ind2==16||((this.ind2-16>0)&&(this.ind2-16)%5==0))
      {if(this.dt[this.index].data[i].label=="0")
            labs.push("Non-valid");
      else  labs.push("Valid");
       //if(this.ind2==16) this.ind2=0;
      }else
        labs.push(this.dt[this.index].data[i].label);

}
 for(i=0;i<this.dt[this.index].data.length;i++)
 dats.push(this.dt[this.index].data[i].value);
 var col,col1,col2;
  for(i=0;i<this.dt[this.index].data.length;i++)
  {
for( j = 0; j < 3; j++)
    {   if(j==0)
        col=(Math.floor(Math.random() * 255));
        if(j==1)
        col1=(Math.floor(Math.random() * 255));
        if(j==2)
        col2=(Math.floor(Math.random() * 255));
    }
    bgs.push( 'rgba('+ col+','+ col1+','+ col2+','+0.3+')');
    brs.push( 'rgba('+ col+','+ col1+','+ col2+','+1+')');

    /* col=(Math.floor(Math.random() * this.coll.length));
    if(col==0)
      {bgs.push( 'rgba('+248+','+ 6+','+ 7+','+ 0.3+')');
      brs.push( 'rgba('+248+','+ 6+','+ 7+','+ 1+')');}
    else
      if(col==1)
      {bgs.push( 'rgba('+0+','+ 255+','+ 12+','+ 0.3+')');
      brs.push( 'rgba('+0+','+ 255+','+ 12+','+ 1+')');}
    else
      if(col==2)
      {bgs.push( 'rgba('+0+','+ 0+','+ 255+','+ 0.3+')');
      brs.push( 'rgba('+0+','+ 0+','+ 255+','+ 1+')');}
    else
      if(col==3)
      {bgs.push( 'rgba('+65+','+ 36+','+ 107+','+ 0.3+')');
      brs.push( 'rgba('+65+','+ 36+','+ 107+','+ 1+')');}
    else
      if(col==4)
      {bgs.push( 'rgba('+191+','+ 73+','+ 222+','+ 0.3+')');
      brs.push( 'rgba('+191+','+ 73+','+ 222+','+ 1+')');}
    else
      if(col==5)
      {bgs.push( 'rgba('+155+','+ 255+','+ 206+','+ 0.3+')');
      brs.push( 'rgba('+155+','+ 255+','+ 206+','+ 1+')');}
    else
      if(col==6)
      {bgs.push( 'rgba('+26+','+ 0+','+ 149+','+ 0.3+')');
      brs.push( 'rgba('+26+','+ 0+','+ 149+','+ 1+')');}
    else
      if(col==7)
      {bgs.push( 'rgba('+190+','+ 0+','+ 56+','+ 0.3+')');
      brs.push( 'rgba('+190+','+ 0+','+ 56+','+ 1+')');}
    else
      if(col==8)
      {bgs.push( 'rgba('+181+','+ 250+','+ 56+','+ 0.3+')');
      brs.push( 'rgba('+181+','+ 250+','+ 56+','+ 1+')');}
    else
      if(col==9)
      {bgs.push( 'rgba('+254+','+ 138+','+ 39+','+ 0.3+')');
      brs.push( 'rgba('+254+','+ 138+','+ 39+','+ 1+')');}
    else
      if(col==10)
      {bgs.push( 'rgba('+249+','+ 231+','+ 1+','+ 0.3+')');
      brs.push( 'rgba('+249+','+ 231+','+ 1+','+ 1+')');}
    else
      if(col==11)
      {bgs.push( 'rgba('+150+','+ 45+','+ 34+','+ 0.3+')');
      brs.push( 'rgba('+150+','+ 45+','+ 34+','+ 1+')');}
    else
      if(col==12)
      {bgs.push( 'rgba('+0+','+ 10+','+ 150+','+ 0.3+')');
      brs.push( 'rgba('+0+','+ 10+','+ 150+','+ 1+')');}
    else
      if(col==13)
      {bgs.push( 'rgba('+0+','+ 169+','+ 71+','+ 0.3+')');
      brs.push( 'rgba('+0+','+ 169+','+ 71+','+ 1+')');}
      else 
        {bgs.push( 'rgba('+0+','+ 10+','+ 150+','+ 0.3+')');
      brs.push( 'rgba('+0+','+ 10+','+ 150+','+ 1+')');}*/

  }
    var id = this.index+1;
    var ctx = document.getElementById("myChart"+id);
                console.log("myChart"+id);
    var myPieChart = new Chart(ctx,{
    type: type,  //pie or doughnut
  
    data: {
    datasets: [{
        
        data: dats,
    
    backgroundColor: bgs,
    borderColor: brs,
            borderWidth: 1,
}],
    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: labs,
},
    options: {

        title: {
        display: true,
        text: label
      }
    }
});
this.ind1++; this.ind2++;
this.index++;
}
//////////////////////////Service////////////////////////

getDepositPlace() {
    this.userService.getDepositPlace()
    .subscribe( 
      (response: string[]) =>{  var i =0;
                                for(i=0;i<response.length;i++)
                                this.depositP.push(response[i]['depositPlace']);                                
                            },
      (error) => console.log(error),
      ()=> { 
      }
    );        
} 

getExamCenter() {
    this.userService.getExamCenter()
    .subscribe( 
      (response: string[]) =>{  var i =0;
                                for(i=0;i<response.length;i++)
                                this.examC.push(response[i]['examCenter']);                                
                            },
      (error) => console.log(error),
      ()=> {}
    );        
    }

  getCandidatesBDpl() {
    this.userService.getCandidatesBDpl()
    .subscribe( 
      (response: Data[]) =>{   let d : Dat={index:0,data:[]};
                               d.index=this.numServ;
                               d.data = response;
                               console.log(response)
                               this.dt.push(d),
                               console.log("numServ:"+this.numServ+"taille "+this.taille[this.numServ])
                               
                            },
      (error) => console.log(error),
      ()=> {}
    ); //form.reset();        
    } 

  getCandidatesBCycle() {
    this.userService.getCandidatesBCycle()
    .subscribe( 
      (response: Data[]) =>{   let d : Dat={index:0,data:[]};
                               d.index=this.numServ;
                               d.data = response;
                               console.log(response)
                               this.dt.push(d),
                               console.log("numServ:"+this.numServ+"taille "+this.taille[this.numServ])
                               
                            },
      (error) => console.log(error),
      ()=> {}
    ); //form.reset();
}
  getCandidatesBGender() {
    this.userService.getCandidatesBGender()
    .subscribe( 
      (response: Data[]) =>{   let d : Dat={index:0,data:[]};
                               d.index=this.numServ;
                               d.data = response;
                               console.log(response)
                               this.dt.push(d),
                               console.log("numServ:"+this.numServ+"taille "+this.taille[this.numServ])
                               
                            },
      (error) => console.log(error),
      ()=> {}
    ); //form.reset();
}
  getCandidatesBdpt() {
    this.userService.getCandidatesBdpt()
    .subscribe( 
      (response: Data[]) =>{   let d : Dat={index:0,data:[]};
                               d.index=this.numServ;
                               d.data = response;
                               console.log(response)
                               this.dt.push(d),
                               console.log("numServ:"+this.numServ+"taille "+this.taille[this.numServ])
                               
                            },
      (error) => console.log(error),
      ()=> {}
    ); //form.reset();
}
  getCandidatesBDeptOpt() {
    this.userService.getCandidatesBDeptOpt()
    .subscribe( 
      (response: Data[]) =>{   let d : Dat={index:0,data:[]};
                               d.index=this.numServ;
                               d.data = response;
                               console.log(response)
                               this.dt.push(d),
                               console.log("numServ:"+this.numServ+"taille "+this.taille[this.numServ])
                               
                            },
      (error) => console.log(error),
      ()=> {}
    ); //form.reset();
}
  getcandidatesBExamPl() {
    this.userService.getcandidatesBExamPl()
    .subscribe( 
      (response: Data[]) =>{   let d : Dat={index:0,data:[]};
                               d.index=this.numServ;
                               d.data = response;
                               console.log(response)
                               this.dt.push(d),
                               console.log("numServ:"+this.numServ+"taille "+this.taille[this.numServ])
                               
                            },
      (error) => console.log(error),
      ()=> {}
    ); //form.reset();
}
  getCandidatesBValid() {
    this.userService.getCandidatesBValid()
    .subscribe( 
      (response: Data[]) =>{   let d : Dat={index:0,data:[]};
                               d.index=this.numServ;
                               d.data = response;
                               console.log(response)
                               this.dt.push(d),
                               console.log("numServ:"+this.numServ+"taille "+this.taille[this.numServ])
                               
                            },
      (error) => console.log(error),
      ()=> {}
    ); //form.reset();
}
  getCandidatesBValidBDpl() {
    this.userService.getCandidatesBValidBDpl()
    .subscribe( 
      (response: Data[]) =>{   let d : Dat={index:0,data:[]};
                               d.index=this.numServ;
                               d.data = response;
                               console.log(response)
                               this.dt.push(d),
                               console.log("numServ:"+this.numServ+"taille "+this.taille[this.numServ])
                               
                            },
      (error) => console.log(error),
      ()=> {}
    ); //form.reset();
}

  getCandidatesFdpt(dp){
   this.userService.getCandidatesFdpt(dp)
   .subscribe( 
      (response: Data[]) =>{   let d : Dat={index:0,data:[]};
                               d.index=this.numServ;
                               d.data = response;
                               console.log(response)
                               this.dt.push(d),
                               console.log("numServ:"+this.numServ+"resp "+response[0].label)
                               
                            },
      (error) => console.log(error),
      ()=> {console.log("firts numserv:"+this.numServ)}
    );   
  }

  getCandidatesFCycle(dp){
   this.userService.getCandidatesFCycle(dp)
   .subscribe( 
      (response: Data[]) =>{   let d : Dat={index:0,data:[]};
                               d.index=this.numServ;
                               d.data = response;
                               console.log(response)
                               this.dt.push(d),
                               console.log("numServ:"+this.numServ+"taille "+this.taille[this.numServ])
                               
                            },
      (error) => console.log(error),
      ()=> {}
    );   
  }
  getCandidatesFValid(dp,j){
   this.userService.getCandidatesFValid(dp)
   .subscribe( 
      (response: Data[]) =>{   let d : Dat={index:0,data:[]};
                               d.index=this.numServ;
                               d.data = response;
                               console.log(response)
                               this.dt.push(d),
                               console.log("numServ:"+this.numServ+"taille "+this.taille[this.numServ])
                               
                            },
      (error) => console.log(error),
      ()=> {console.log("last numserv:"+this.numServ+" et rank:"+j)
                if(j==this.depositP.length*5) this.click2();
        }
    );   
  }
  getCandidatesFGender(dp){
   this.userService.getCandidatesFGender(dp)
   .subscribe( 
      (response: Data[]) =>{   let d : Dat={index:0,data:[]};
                               d.index=this.numServ;
                               d.data = response;
                               console.log(response)
                               this.dt.push(d),
                               console.log("numServ:"+this.numServ+"taille "+this.taille[this.numServ])
                               
                            },
      (error) => console.log(error),
      ()=> {}
    );   
  }
  getCandidatesFDeptOpt(dp){
   this.userService.getCandidatesFDeptOpt(dp)
   .subscribe( 
      (response: Data[]) =>{   let d : Dat={index:0,data:[]};
                               d.index=this.numServ;
                               d.data = response;
                               console.log(response)
                               this.dt.push(d),
                               console.log("numServ:"+this.numServ+"taille "+this.taille[this.numServ])
                               
                            },
      (error) => console.log(error),
      ()=> {}
    );   
  }


}
