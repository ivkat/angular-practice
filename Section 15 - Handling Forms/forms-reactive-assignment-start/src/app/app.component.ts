import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;

  forbiddenProjectNames = 'Test';

  ngOnInit(){
    this.projectForm = new FormGroup({
      'projectName': new FormControl(null, [Validators.required/*, this.forbiddenProjects.bind(this)*/], this.forbiddenProjectNamesValidation),
      'email': new FormControl(null, [Validators.email, Validators.required]),
      'status': new FormControl('critical')
    });
  }
  onFormSubmit(){
    console.log(this.projectForm);
  }

  
  forbiddenProjects(control: FormControl): {[s: string]: boolean}{
    
    if(this.forbiddenProjectNames === control.value ){
      return {'projectIsForbidden': true};
      
    }

    return null;
  }

  
  forbiddenProjectNamesValidation(control: FormControl): Promise<any> | Observable<any>{
    const  promise: Promise<any> = new Promise<any>((resolve, reject) =>{
      setTimeout(()=>{
        if(control.value === 'Test'){
          resolve({'projectIsForbidden': true});
        } else{
          resolve (null);
        }
      },1500);
    });

    return promise;
  }
}
