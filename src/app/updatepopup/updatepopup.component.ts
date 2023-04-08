import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr'
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css']
})
export class UpdatepopupComponent implements OnInit{

  constructor(private builder: FormBuilder, private service: AuthService,
    private toastr: ToastrService, private dialogref: MatDialogRef<UpdatepopupComponent>, @Inject(MAT_DIALOG_DATA) public data:any) {
      
  }

  editdata:any;
  rolelist:any;

  ngOnInit(): void {
    this.service.getAllRoles().subscribe(result =>{
      this.rolelist = result;
    });

    if(this.data.id != null && this.data.id != ''){
      this.service.GetBycode(this.data.id).subscribe(response =>{
        this.editdata = response;
        console.log(this.editdata);
        this.updateform.setValue({
          id: this.editdata.id,
          name: this.editdata.name,
          password: this.editdata.password,
          email: this.editdata.email,
          gender: this.editdata.gender,
          role: this.editdata.role,
          isactive: this.editdata.isactive
        });
      })
    }
  }

  updateform = this.builder.group({
    id: this.builder.control(''),
    name: this.builder.control(''),    
    password: this.builder.control(''),
    email: this.builder.control(''),
    gender: this.builder.control('male'),
    role: this.builder.control('', Validators.compose([Validators.required])),
    isactive: this.builder.control(false)
  });
  proceedupdate() {
    if (this.updateform.valid) {
      this.service.Updateuser(this.editdata.id,this.updateform.value).subscribe(result => {
        this.toastr.success('Updated successfully');
        this.dialogref.close();
      });
    } else {
      this.toastr.warning('Please enter valid data.');
    }
  }
}
