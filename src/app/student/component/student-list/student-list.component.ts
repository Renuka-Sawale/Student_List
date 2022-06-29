import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from 'src/app/service/users.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { HttpErrorResponse } from '@angular/common/http';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';

export interface StudentElement {
  StudentName: string;
  Contact: string;
  Age: string;
  Gender: string;
}

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})

export class StudentListComponent implements OnInit {
  STUDENT_DATA:any[]=[];
  studentDetails:string[]=[];
  viewData:any;
  message:string = '';
  messageisnull: any;
  displayedColumns: string[] = ['userName','email', 'phone', 'action'];
  dataSource = new MatTableDataSource<any>(this.STUDENT_DATA);
 
  @ViewChild(MatPaginator) paginator: MatPaginator|any;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private _userService:UsersService, public dialog: MatDialog) { 
    //console.log(this.studentForm)
  }

  ngOnInit() {
    this._userService.getUsers().subscribe((result:any)=>{
      console.log("result",result)
      this.STUDENT_DATA=result;
      this.dataSource = new MatTableDataSource<any>(this.STUDENT_DATA);

    })
  }

  studentForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    email: new FormControl('',Validators.required),
    phone: new FormControl('', Validators.required),
    password: new FormControl('',Validators.required)

  })

  deleteUser(id){
    this._userService.deleteUser(id).subscribe((posRes)=>{
      console.log('user deleted')
    },(err:HttpErrorResponse)=>{
      console.log(err)
    })
  }

  addStudentData() {
    this._userService.createUser(this.studentForm.value).subscribe((posres)=>{console.log("posres", posres)},(err)=>{console.log("err", err )})
  }
 
  openDialog(element): void {
    const dialogRef = this.dialog.open(DialogboxComponent, {
      width: '250px',
      data: element,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

