import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UpdatepopupComponent } from '../updatepopup/updatepopup.component';

@Component({
  selector: 'app-userlisting',
  templateUrl: './userlisting.component.html',
  styleUrls: ['./userlisting.component.css']
})
export class UserlistingComponent {
  constructor(private service: AuthService, private dialog: MatDialog){
      this.loaduser();
  }
  userlist:any;
  datasource:any;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  loaduser(){
    this.service.GetAll().subscribe(response => {
       this.userlist = response;
       this.datasource = new MatTableDataSource(this.userlist);
       this.datasource.paginator = this.paginator;
       this.datasource.sort = this.sort;
    })
  }
  displayedColumns: string[] = ['id', 'name', 'email', 'role',  'status', 'action'];

  UpdateUser(id:any){
    const popup = this.dialog.open(UpdatepopupComponent,{
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      width: '50%',
      data: {
        id:id
      }
    });

    popup.afterClosed().subscribe(response => {
      this.loaduser();
    })

  }

  opendialog(){

  }
}
