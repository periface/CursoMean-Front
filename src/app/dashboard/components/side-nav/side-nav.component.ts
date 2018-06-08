import { Component, OnInit, NgZone } from '@angular/core';
const MAX_WIDTH_BREAKPOINT = 720;
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  links: Array<{ url: string; name: string }> = [
    {
      url: 'dashboard',
      name: 'Dashboard'
    },
    {
      url: 'invoices',
      name: 'Invoices'
    },
    {
      url: 'clients',
      name: 'Clients'
    }
  ];
  constructor(zone: NgZone) {
    this.mediaMatcher.addListener(mql => {
      zone.run(() => {
        this.mediaMatcher = mql;
      });
    });
  }
  private mediaMatcher: MediaQueryList = matchMedia(
    `(max-width : ${MAX_WIDTH_BREAKPOINT}px)`
  );
  ngOnInit() {}
  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }
}
