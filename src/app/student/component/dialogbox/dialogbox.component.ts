import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.css']
})
export class DialogboxComponent implements OnInit {
  studentForm: FormGroup;

  constructor(private _userService:UsersService, @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm() {
    this.studentForm = new FormGroup({
      userName: new FormControl(this.data.userName, Validators.required),
      email: new FormControl(this.data.email, Validators.required),
      phone: new FormControl(this.data.phone,  Validators.required),
  
    })
  }

  updateData() {
   this._userService.updateUser(this.data.id,this.studentForm.value).subscribe((posres)=>{console.log("data updated")},(err)=>{console.log("err", err )})
   }
   

  }


