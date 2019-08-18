import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-goal-st',
  templateUrl: './goal-st.component.html',
  styleUrls: ['./goal-st.component.css']
})
export class GoalSTComponent implements OnInit {

  constructor(private userService: UserService) { }
  Plans : any;
  ngOnInit() {
    this.userService.Plans("Stamina").subscribe(res => {
      this.Plans = res;
      console.log(JSON.stringify(this.Plans))
    },
    err => {
      console.log(err);
    })
  }
  

}
