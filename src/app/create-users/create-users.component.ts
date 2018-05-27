import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../common/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../common/services/user.service';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.css']
})
export class CreateUsersComponent implements OnInit {

  constructor(fb: FormBuilder, private auth: AuthService, private router: Router, private db: UserService) {
    this.form = fb.group({
      createUser: fb.group({
        email: ['', [
          Validators.required,
          Validators.email]],
        name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-z ,.'-]+$/i)]],
        role: ['user', Validators.required]
      }),
    });
  }

  form: FormGroup;
  createUserFailed = '';
  createUserSuccess = '';
  private readonly assessment = 'CUC-100';

  ngOnInit() {
  }

  get email() {
    return this.form.get('createUser.email');
  }

  get name() {
    return this.form.get('createUser.name');
  }

  submit(value) {
    this.createUserFailed = '';
    const {name, email, role } = value.createUser;
    const names = name.split(' ');
    const password = `1${names[0]}9`;

    this.auth.createUser({email: email, password: password})
      .then(user => {
        this.db.saveNewUser({ uid: user.uid, name: name, email: email, roles: role });
        this.createUserSuccess = `${value.createUser.name} created with initial password: ${password}`;
        this.form.reset();
        this.form.markAsPristine();
        this.form.markAsUntouched();
        user.updateProfile({
          displayName: name,
          photoURL: 'https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/person.png'});
      })
      .catch(error => this.createUserFailed = error.message);
  }

  cancel(event: Event) {
    event.preventDefault();
    this.router.navigate(['/']);
  }

}
