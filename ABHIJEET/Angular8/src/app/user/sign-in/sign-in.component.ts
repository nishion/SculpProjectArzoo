import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { UserService } from '../../shared/user.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private userService: UserService,private router : Router) { }

  model ={
    MobileNo :'',
    password:''
  };
  serverErrorMessages:string;


  ngOnInit() {
  }
  onSubmit(form : NgForm){
    this.userService.login(form.value).subscribe(
      res => {
        //console.log(JSON.stringify(res))
        this.userService.setToken(res['token']);
        this.router.navigateByUrl('/userProfile');
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }


}
