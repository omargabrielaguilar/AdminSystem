import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-updateUser',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './updateUser.component.html',
  styleUrls: ['./updateUser.component.css'],
})
export class UpdateUserComponent implements OnInit {
  userForm: FormGroup;
  userId!: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required]],
      about: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
      this.getUserDetails();
    });
  }

  getUserDetails() {
    this.userService.getUserById(this.userId).subscribe((user) => {
      this.userForm.patchValue({
        name: user.name,
        email: user.email,
        about: user.about,
      });
    });
  }

  updateUser() {
    const updatedUserData = this.userForm.value;
    this.userService.updateUser(this.userId, updatedUserData).subscribe({
      next: () => {
        this.router.navigateByUrl('/users');
      },
    });
  }
}
