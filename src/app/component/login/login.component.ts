import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  submitted = false;
  showPassword = false; // ✅ track show/hide password

  constructor(
    private fb: FormBuilder,
    // private api: ApiService,
    // private router: Router,
  ) {
    // Validators.email
    // , Validators.minLength(5), Validators.maxLength(8)
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      console.log('Form Values:', this.loginForm.value);
<<<<<<< HEAD

      let payload = {
        Id: 0,
        Username: this.loginForm.get('email')?.value,
        Email: '',
        Pwd: this.loginForm.get('password')?.value,
        Role: '',
      };
      this.api.login(payload).subscribe((res: any) => {
        if (res.isSuccess) {
          // this.router.navigate(['/dashboard']);
          this.router.navigate(['cart-page']);
        } else {
          alert(res.message);
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
=======
      alert('Login successful!');
>>>>>>> 1141c4925f3f6dd9d81b9922363baf4b31d57d9d
    }
  }

  hasError(controlName: string, errorName: string) {
    return this.submitted && this.loginForm.get(controlName)?.hasError(errorName);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
