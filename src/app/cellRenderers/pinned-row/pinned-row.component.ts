import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pinned-row',
  template: `<span class="text-center" [ngStyle]="style">{{ params.value }}</span>`,
  styleUrls: ['./pinned-row.component.css']
})
export class PinnedRowComponent {
  public params: any;
  public style: string;

  agInit(params: any): void {
    this.params = params;
    this.style = this.params.style;
  }

  refresh(): boolean {
    return false;
  }

}
