import { Component, OnInit, ElementRef } from '@angular/core';

export class Theme{
  constructor(public name: string){
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  theme = new Theme('red');

  constructor() { 

  }
  
  ngOnInit() {
  }

  onSubmit(theme){
    // console.log(theme.value)
    
  }

}
