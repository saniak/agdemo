import { Component, OnInit } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid-community';

@Component({
  selector: 'app-crud-cell-renderer',
  templateUrl: './crud-cell-renderer.component.html',
  styleUrls: ['./crud-cell-renderer.component.css']
})
export class CrudCellRendererComponent implements OnInit ,AgRendererComponent{
  params: any;
  inActionDelete: boolean = false;
  inActionCancel: any = true

  constructor() { }
  refresh(params: ICellRendererParams): boolean {
   return
  }
  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {}

  agInit(params): void {
    this.inActionDelete = false;
    this.params = params;
    let editingCells = params.api.getEditingCells();
    // checks if the rowIndex matches in at least one of the editing cells
    let isCurrentRowEditing = editingCells.some((cell) => {
      return cell.rowIndex === params.node.rowIndex;
    });
  }

  ngOnInit() {
  }

  update(action){
    if(action == 'update' ){
      this.inActionDelete = true;
      this.inActionCancel = false
    }
    else if(action == 'cancel'){
      this.inActionDelete = false;
      this.inActionCancel = true
    }else {
      this.inActionCancel = true
    }
    
  }

}
