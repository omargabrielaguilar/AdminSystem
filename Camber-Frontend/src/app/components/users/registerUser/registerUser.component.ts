import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/User';

@Component({
  selector: 'app-registerUser',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registerUser.component.html',
  styleUrls: ['./registerUser.component.css'],
})
export class RegisterUserComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      about: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  createUser(): void {
    const formData: User = this.userForm.value;
    this.userService.createUser(formData).subscribe({
      next: () => {
        this.router.navigateByUrl('/users');
      },
    });
  }
}
