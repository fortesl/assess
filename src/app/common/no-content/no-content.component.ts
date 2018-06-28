import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-content',
  templateUrl: './no-content.component.html',
  styleUrls: ['./no-content.component.css']
})
export class NoContentComponent implements OnInit {

  constructor(private router: Router) { }

  @Input() statement: string;
  @Input() link: string;
  @Input() name: string;

  ngOnInit() {
  }

  cancel(event: Event) {
    event.preventDefault();
    this.router.navigate([this.link, this.name]);
  }

}
