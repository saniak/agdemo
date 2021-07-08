import { Component, OnInit } from '@angular/core';
import {IAfterGuiAttachedParams, ICellRendererParams} from "@ag-grid-community/core";
import { AgRendererComponent } from '@ag-grid-community/angular';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit ,AgRendererComponent{
val:any
  params: any;
  constructor() { }
  refresh(params: ICellRendererParams): boolean {
    return
  }
  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {}

  agInit(params): void {
    this.params = params
  if(params.value){
    this.val = '******'
  }
  
  }
  click(){
    this.val === this.params.value ? this.val = '******':this.val = this.params.value
  }

  ngOnInit() {}

} 
