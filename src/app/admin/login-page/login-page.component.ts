import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public form!: FormGroup;

  public submitted = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  public submit() {
    if(this.form.invalid) {
      return;
    }

    const user = {
      email: this.form.get('email')!.value,
      password: this.form.get('password')!.value,
      returnSecureToken: true
    }

    console.log('SEND');
    this.auth.login(user).subscribe(res => {
      this.form.reset();
      this.router.navigate(['/admin','tests']);
      console.log(res);
    })
  }

}
