import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/spaceman.json',
  };

  animationCreated(animationItem: AnimationItem) {
    console.log(animationItem);
  }
  constructor(private router: Router, private ngZone: NgZone) {}

  ngOnInit(): void {}
  onComplete() {
    this.ngZone.run(() => {
      this.router.navigate(['/searchlist']);
    });
  }
}
