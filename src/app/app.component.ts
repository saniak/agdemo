import { Component, ɵbypassSanitizationTrustResourceUrl } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { AgDataService } from './services/agData_service';
import { PasswordComponent } from './cellRenderers/password/password.component';
import { PinnedRowComponent } from './cellRenderers/pinned-row/pinned-row.component'
import { CrudCellRendererComponent } from './cellRenderers/crud-cell-renderer/crud-cell-renderer.component';
import { Action } from 'rxjs/internal/scheduler/Action';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private _agService: AgDataService) {
    this.gridOptions = <GridOptions>{
      context: { componentParent: this }
    }

    this.rowClassRules = {

    }
  }
  title = 'ag-demo';
  gridOptions: any;
  rowData: any[];
  pinnedTopRowData;
  gridApi: any;
  gridColumnApi: any;
  rowClassRules: any;
  paginationPageSize = 15;

  columnDefs = [
    {
      headerName: 'Personal Details', marryChildren: true, children: [
        {
          headerName: 'Name', field: 'name',
          headerCheckboxSelection: true,
          headerCheckboxSelectionFilteredOnly: true,
          checkboxSelection: true
        },
        { headerName: 'Address', field: 'address' },
        { headerName: 'Mobile', field: 'mobile' },
      ]
    },
    {
      headerName: 'Identity Proofs', marryChildren: true,
      children: [
        { headerName: 'PAN Card', field: 'pan', columnGroupShow: 'closed', },
        { headerName: 'Aadhar Card', field: 'aadhar' },]
    },
    {
      headerName: 'Credentials', marryChildren: true,
      children: [
        {
          headerName: 'Username', field: 'username', 
          pinnedRowCellRenderer: 'PinnedRowComponent',
          pinnedRowCellRendererParams: { style: { 'font-style': 'italic', 'color': '#F9938E' } }
        },
        {
          headerName: 'Password', field: 'password', cellRenderer: 'passwordComp',
          pinnedRowCellRenderer: 'PinnedRowComponent',
          pinnedRowCellRendererParams: { style: { 'font-style': 'italic', 'color': '#F9938E' } }
        },

      ]
    },
    {
      headerName: "action",
      field : 'action',
      minWidth: 150,
      cellRenderer: 'CrudCellRendererComponent',
      editable: false,
      colId: "action",
      pinnedRowCellRenderer: 'PinnedRowComponent',
      pinnedRowCellRendererParams: { style: { 'font-style': 'italic', 'color': '#F9938E' } }
    }
  ];

  frameworkComponents = { 
    passwordComp: PasswordComponent,
    PinnedRowComponent: PinnedRowComponent,
    CrudCellRendererComponent : CrudCellRendererComponent
  }

  ngOnInit() {
    this.gridOptions = {
      context: { componentParent: this },
      rowData: this.rowData,
      columnDefs: this.columnDefs,
      pagination: true,
      rowSelection: 'multiple',
      singleClickEdit: false,
      stopEditingWhenCellsLoseFocus: true, 
      rowHeight: 37,
      defaultColDef: {
        sortable: true,
        flex: 1,
        minWidth: 100,
        editable: true,
        filter: true,
      },
      onCellClicked(params) {
        if (params.column.colId === "action" && params.event.target.dataset.action) {
          let action = params.event.target.dataset.action;
          if (action === "edit") {
            params.api.startEditingCell({
              rowIndex: params.node.rowIndex,
              colKey: params.columnApi.getDisplayedCenterColumns()[0].colId
            });
          }
    
          if (action === "delete") {
            params.api.applyTransaction({
              remove: [params.node.data]
            });
          }
    
          if (action === "update") {
            params.api.stopEditing(false);
          }
    
          if (action === "cancel") {
            params.api.stopEditing(true);
          }
        }
      },
    
      // onRowEditingStarted: (params) => {
      //   params.api.refreshCells({
      //     columns: ["action"],
      //     rowNodes: [params.node],
      //     force: true
      //   });
      // },
      // onRowEditingStopped: (params) => {
      //   params.api.refreshCells({
      //     columns: ["action"],
      //     rowNodes: [params.node],
      //     force: true
      //   });
      // },
      editType: "fullRow",
    };
    this._agService.getgridData().then(data => {
      this.rowData = [...data]
    });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.pinnedTopRowData = this.createData();
  }

  getRowStyle(params) {
    if (params.node.rowPinned) {
      return { 'font-weight': 'bold', 'color': '#26421A' };
    } else if (params.rowIndex % 2 == 0) {
      return { 'background-color': '#D0EBC4' }
    }
  };

  createData() {
    let result = []
    result.push({
      name: 'Name as per ID',
      address: 'Permanent Address',
      mobile: 'Registered Number',
      pan: 'Pan card number',
      aadhar: 'Aadhar number',
      username: 'Login Name',
      password: 'Login Password',
      action : "Update/Delete Data"
    });

    return result
  } 

  delete(){
    this.gridApi.applyTransaction({ remove: this.gridApi.getSelectedNodes().map(node => node.data)});
  }


  add(){
    let newRow = [{ 
    name: '',
    address: '',
    mobile: '',
    pan: '',
    aadhar: '',
    username: '',
    password: ''}]
    this.gridApi.applyTransaction({ add: newRow,addIndex : 0});
  }

  export(){
    this.gridApi.exportDataAsCsv();
  }

}
