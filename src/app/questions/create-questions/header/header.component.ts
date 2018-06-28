import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  @Input() statement: string;
  @Input() name: string;
  @Input() link: string;
  @Input() count: string;
  @Input() items: string;

  ngOnInit() {
  }

  cancel(event: Event) {
    event.preventDefault();
    this.router.navigate([this.link, this.name]);
  }

  goToItems(event: Event) {
    const url = `/admin/${this.items}`;
    event.preventDefault();
    this.router.navigate([url, this.name]);
  }

}
