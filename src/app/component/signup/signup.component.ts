import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
  ) {
    this.signupForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(8),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordsMatch },
    );
  }

  passwordsMatch(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirm = control.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Sign Up Data:', this.signupForm.value);
      if (this.signupForm.valid) {
        console.log('Form Values:', this.signupForm.value);

        let payload = {
          Id: 0,
          Username: this.signupForm.get('email')?.value,
          Email: this.signupForm.get('email')?.value,
          Pwd: this.signupForm.get('confirmPassword')?.value,
          Role: 'local',
        };
        this.api.register(payload).subscribe((res: any) => {
          if (res.isSuccess) {
            this.router.navigate(['/login']);
          } else {
            alert(res.message);
          }
        });
      } else {
        this.signupForm.markAllAsTouched();
      }
    } else {
      this.signupForm.markAllAsTouched();
    }
  }
}
