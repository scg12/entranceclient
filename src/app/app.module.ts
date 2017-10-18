//import {DatePickerModule} from 'ng2-datepicker-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MdFormFieldModule,MdSelectModule,MdTextareaAutosize ,MdDatepickerModule,MatCheckboxModule,MatRadioModule, MdNativeDateModule,MdInputModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { SharedService } from './shared.service';
import { WindowRef } from './WindowRef';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserService } from './user.service';
import { AllRegistrationComponent } from './all-registration/all-registration.component';
import { GeneralConfigsComponent } from './general-configs/general-configs.component';
import { ReportRegistrationComponent } from './report-registration/report-registration.component';
import { DownloadRegistrationComponent } from './download-registration/download-registration.component';
import { ModifyRegistrationComponent } from './modify-registration/modify-registration.component';
import { ValidatedRegistrationsComponent } from './validated-registrations/validated-registrations.component';
import { NonValidatedRegistrationsComponent } from './non-validated-registrations/non-validated-registrations.component';
import { ValidationComponent } from './validation/validation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxGalleryModule } from 'ngx-gallery';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationsdpComponent } from './registrationsdp/registrationsdp.component';
import { RegistrationsdeptComponent } from './registrationsdept/registrationsdept.component';
import { UserslistComponent } from './userslist/userslist.component';
import { ForpdfComponent } from './forpdf/forpdf.component';
import { DepositcenterComponent } from './depositcenter/depositcenter.component';


export const routerConfig =[

  {
    path:'',
    component: WelcomeComponent
  },
  {
    path:'depositcenter',
    component: DepositcenterComponent
  },
  {
    path:'forpdf', 
    component: ForpdfComponent
  },
  {
    path:'validatedRegistrations',
    component: ValidatedRegistrationsComponent
  },
  {
    path:'validation/:name/:surname/:gender/:dateOfBirth/:placeOfBirth/:nationality/:originRegion/:originDivision/:originSubDivision/:employmentSituation/:typeHandicap/:cardID/:cardIDIssueDate/:language1/:maritalStatus/:numberOfChildren/:session/:degreeDiploma/:specialityDiploma/:avgDiploma/:diplomaObtainYear/:obtainingInstitution/:examCenter/:depositPlace/:admissionMode/:cycle/:department/:option/:residenceCity/:tel1/:email/:address/:orderNumber',
    component: ValidationComponent
  },
  {
    path:'validation',
    component: ValidationComponent
  },
  {
    path:'nonValidatedRegistrations',
    component: NonValidatedRegistrationsComponent
  },
  {
    path:'dashboard',
    component: DashboardComponent
  },
  {
    path:'connexion',
    component: ConnexionComponent
  },
   {
    path:'connexion/:idcandidates/:name/:surname',
    component: ConnexionComponent
  },
  {
    path:'registration',

      component:RegistrationComponent
  },
  {
    path:'registration/:name/:surname/:gender/:dateOfBirth/:placeOfBirth/:nationality/:originRegion/:originDivision/:originSubDivision/:employmentSituation/:typeHandicap/:cardID/:cardIDIssueDate/:language1/:maritalStatus/:numberOfChildren/:session/:degreeDiploma/:specialityDiploma/:avgDiploma/:diplomaObtainYear/:obtainingInstitution/:examCenter/:depositPlace/:admissionMode/:cycle/:department/:option/:residenceCity/:tel1/:email/:address/:orderNumber',
    component:RegistrationComponent
  },
  {
    path:'reportregistration/:name/:surname/:gender/:dateOfBirth/:placeOfBirth/:nationality/:originRegion/:originDivision/:originSubDivision/:employmentSituation/:typeHandicap/:cardID/:cardIDIssueDate/:language1/:maritalStatus/:numberOfChildren/:session/:degreeDiploma/:specialityDiploma/:avgDiploma/:diplomaObtainYear/:obtainingInstitution/:examCenter/:depositPlace/:admissionMode/:cycle/:department/:option/:residenceCity/:tel1/:email/:address/:orderNumber',
    component:ReportRegistrationComponent
  },
  {
    path:'reportregistration/:name/:surname/:gender/:dateOfBirth/:placeOfBirth/:nationality/:originRegion/:originDivision/:originSubDivision/:employmentSituation/:typeHandicap/:cardID/:cardIDIssueDate/:language1/:maritalStatus/:numberOfChildren/:session/:degreeDiploma/:specialityDiploma/:avgDiploma/:diplomaObtainYear/:obtainingInstitution/:examCenter/:depositPlace/:admissionMode/:cycle/:department/:option/:residenceCity/:tel1/:email/:address',
    component:ReportRegistrationComponent
  },
  {
    path:'modifyRegistration',

      component:ModifyRegistrationComponent
  },

  {
    path:'viewRegistrations',
    component:AllRegistrationComponent
  },
  {
    path:'configs',
    component:GeneralConfigsComponent
  },

  {
    path:'downloadRegistration',
    component:DownloadRegistrationComponent
  },
  {
    path:'profile',
    component:ProfileComponent
  },
  {
    path:'registrationsDP',
    component:RegistrationsdpComponent
  },
  {
    path:'registrationsDept',
    component:RegistrationsdeptComponent
  },
    {
    path:'userslist',
    component:UserslistComponent
  },
    {
        path: "**",
        component: WelcomeComponent
    }

];




@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ConnexionComponent,
    RegistrationComponent,
    AllRegistrationComponent,
    GeneralConfigsComponent,
    ReportRegistrationComponent,
    DownloadRegistrationComponent,
    ModifyRegistrationComponent,
    ValidatedRegistrationsComponent,
    NonValidatedRegistrationsComponent,
    ValidationComponent,
    DashboardComponent,
    ProfileComponent,
    RegistrationsdpComponent,
    RegistrationsdeptComponent,
    UserslistComponent,
    ForpdfComponent,
    DepositcenterComponent
 
  ],
  imports: [
    BrowserModule,
    //DatePickerModule,
    FormsModule,
    HttpModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdFormFieldModule,
    MdInputModule,
    BrowserAnimationsModule,
    MdSelectModule,
    ChartsModule,
    MatRadioModule,
    MatCheckboxModule,
    FlashMessagesModule,
    NgxGalleryModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routerConfig)

  ],
  providers: [UserService,WindowRef,SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
