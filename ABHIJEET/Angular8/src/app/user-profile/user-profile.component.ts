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
  userDetails;
  oldPassword;
  newPassword;
  isEdit = true;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userService.selectedUser = res['user'];
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

  edit(){
    console.log(JSON.stringify(this.userDetails));
    this.isEdit = false;
  }

  onSubmit(form:NgForm){
    let updatedUser = new User();
    updatedUser = form.value;
    updatedUser.ConfirmPassword = form.value.Password;
    this.userService.updateUser(updatedUser).subscribe((res)=>{
      console.log(res);
    },(err)=>{
      console.log(err);
    })
  }

}