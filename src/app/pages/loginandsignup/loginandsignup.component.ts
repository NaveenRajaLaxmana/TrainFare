import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormArray} from '@angular/forms';
import { LoginsignupService } from '../../services/login/loginsignup.service'
import { Router } from '@angular/router'
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-loginandsignup',
  templateUrl: './loginandsignup.component.html',
  styleUrls: ['./loginandsignup.component.css']
})
export class LoginandsignupComponent implements OnInit {

  loading=false;

   loginform= new FormGroup({
     username: new FormControl(''),
     password: new FormControl('')
   })

   signupform= new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    role: new FormArray([new FormControl('USER')])
  })

  password;
  confirmpassword;

 

  username = '';


  constructor(private loginservice:LoginsignupService,private route:Router,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    
  }

  login(event:Event){
    event.preventDefault();
    this.loading=true;
    this.loginservice.login(this.loginform.value).subscribe(token => {
       localStorage.setItem('token',`Bearer ${token.response}`)
       
       this.loginservice.getname().subscribe(res => {
      
        if(res.response){
        this.username = res.response
        
        this.route.navigate([`/user/${this.username}`])
        }

        
      });

      return
    })

    this.loading=false;
    if(!localStorage.getItem('token')){

      this.openSnackBar("Username or password incorrect","Done");
    }
    
  }

  signup(event:Event){
    event.preventDefault();
    
    this.loginservice.signup(this.signupform.value).subscribe(res => {
     if(res.response == 'Success'){
      
       this.openSnackBar("SignUp Success","Done");
     }
    })
    
    
  }

  adminlogin(event:Event){
    event.preventDefault();
    this.loading=true;
    this.loginservice.login(this.loginform.value).subscribe(token => {
      
      localStorage.setItem('token',`Bearer ${token.response}`)

      this.loginservice.getcredentials()
      if(!localStorage.getItem('token')){

        this.openSnackBar("Username or password incorrect","Done");
      }
        
   
   this.route.navigate([`/admin/trains`])
      return ;
   })
   

   this.loading=false;
   
    
     
     
  
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
