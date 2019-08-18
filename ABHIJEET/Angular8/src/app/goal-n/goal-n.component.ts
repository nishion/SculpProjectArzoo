import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-goal-n',
  templateUrl: './goal-n.component.html',
  styleUrls: ['./goal-n.component.css']
})
export class GoalNComponent implements OnInit {
  constructor(private userService: UserService) { }
  Plans : any;
  ngOnInit() {
    this.userService.Plans("Nutrition").subscribe(res => {
      this.Plans = res;
      console.log(JSON.stringify(this.Plans))
    },
    err => {
      console.log(err);
    })
  }
  
}
