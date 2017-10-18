import { Component, OnInit } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { Response } from "@angular/http";
import { User } from "../user.interface";
import { UserService } from "../user.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
users: User[];
   galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.galleryOptions = [
            {
                width: '600px',
                height: '466px',
                thumbnailsColumns: 5,
                imageAnimation: NgxGalleryAnimation.Slide
                
            },
            // max-width 800
            { 
                breakpoint: 800,
                width: '100%',
                height: '600px',
                imagePercent: 80,
                thumbnailsPercent: 20,
                thumbnailsMargin: 20,
                thumbnailMargin: 20,
            },
            // max-width 400
            {
                breakpoint: 400,
                preview: false
            }
        ];

        this.galleryImages = [
            {
                small: 'assets/images/7.png',
                medium: 'assets/images/7.png',
                big: 'assets/images/7.png'
            }, 
            
            {
                small: 'assets/images/3.png',
                medium: 'assets/images/3.png',
                big: 'assets/images/3.png'
            },
            {
                small: 'assets/images/1.png',
                medium: 'assets/images/1.png',
                big: 'assets/images/1.png'
            },
            {
                small: 'assets/images/2.png',
                medium: 'assets/images/2.png',
                big: 'assets/images/2.png'
            },
            {
                small: 'assets/images/6.png',
                medium: 'assets/images/6.png',
                big: 'assets/images/6.png'
            },          
            {
                small: 'assets/images/5.png',
                medium: 'assets/images/5.png',
                big: 'assets/images/5.png'
            },
            {
                small: 'assets/images/8.png',
                medium: 'assets/images/8.png',
                big: 'assets/images/8.png'
            },
            {
                small: 'assets/images/dir.png',
                medium: 'assets/images/dir2.png',
                big: 'assets/images/dir.png'
            },
            {
                small: 'assets/images/vc.png',
                medium: 'assets/images/vc.png',
                big: 'assets/images/vc.png'
            },
             {
                small: 'assets/images/exit.png',
                medium: 'assets/images/exit.png',
                big: 'assets/images/exit.png'
            },
            /*{
                small: 'assets/images/2.png',
                medium: 'assets/3-medium.jpg',
                big: 'assets/3-big.jpg'
            }*/
        ];
        
  }

  getUsers(){
    this.userService.getUsers()
      .subscribe(
                (users: User[]) => this.users = users,
                (error: Response) => console.log(error)
              )
  }


}
