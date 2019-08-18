import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-goal-wl',
  templateUrl: './goal-wl.component.html',
  styleUrls: ['./goal-wl.component.css']
})
export class GoalWLComponent implements OnInit {

  constructor(private userService: UserService) { }
  Plans : any;
  ngOnInit() {
    this.userService.Plans("WeightLoss").subscribe(res => {
      this.Plans = res;
      console.log(JSON.stringify(this.Plans))
    },
    err => {
      console.log(err);
    })
  }
  
}
