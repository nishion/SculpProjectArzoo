import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  
  Mobile = "";
  isEdit = true;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userService.selectedUser = res['user'];
        this.Mobile ="+" +  this.userService.selectedUser.CountryCode+" " + this.userService.selectedUser.MobileNo;
      },
      err => { 
        console.log(err); 
      }
    );
  }

  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

  

}