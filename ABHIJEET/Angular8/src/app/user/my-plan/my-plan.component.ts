import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { Plan } from 'src/app/shared/myPlan.model';

@Component({
  selector: 'app-my-plan',
  templateUrl: './my-plan.component.html',
  styleUrls: ['./my-plan.component.css']
})
export class MyPlanComponent implements OnInit {
myPlan:any;

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
    this.userService.myPlan().subscribe(res=>{
      this.myPlan = res['0'];
      console.log(JSON.stringify(this.myPlan))
    })

  }
  
}
