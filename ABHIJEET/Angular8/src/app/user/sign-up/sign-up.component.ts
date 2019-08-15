import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],

})
export class SignUpComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSucessMessage: boolean;
  isVerified = false;
  Email :"";
  OTPMSG="";
  OTPClass : any;
  serverErrorMessages: string;
  constructor(private userService: UserService,private router : Router) { }
  correctOTP = ".}:{P{P{";
  OTP = "";
  ngOnInit() {

  }
  sendOTP(){
    this.userService.OTPverify(this.userService.selectedUser.Email).subscribe(res => {
      this.correctOTP = res.toString();
      console.log(res);
    })
  }
  onVerify(form: NgForm) {
      if (this.OTP == this.correctOTP) {
        this.isVerified = true;
        this.OTPClass = "success"
        this.OTPMSG = "Verified"
      } else {
        this.OTPMSG = "Try Again"
        this.OTPClass = "alert"
      }
  }



  onSubmit(form: NgForm) {
    form.value.UserType = "U"
    this.userService.postUser(form.value).subscribe(
      res => {
        this.showSucessMessage = true;
        this.router.navigateByUrl('/userProfile');
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm(form);
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
      }
    );
  }

  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      FirstName: '',
      LastName: '',
      CountryCode: '',
      MobileNo: '',
      Email: '',
      Password: '',
      ConfirmPassword: '',
      UserType: ''
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }

}
