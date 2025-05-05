import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PS13';

  // Registration Fields
  regName: string = '';
  regEmail: string = '';
  regPassword: string = '';

  // Login Fields
  loginEmail: string = '';
  loginPassword: string = '';

  // State
  loggedIn: boolean = false;
  userProfile: any = null;

  ngOnInit() {
    if (typeof window !== 'undefined' && window.localStorage) {
    const loggedUser = localStorage.getItem('loggedInUser');
    if (loggedUser) {
      this.userProfile = JSON.parse(loggedUser);
      this.loggedIn = true;
    }
  }
  }

  onRegister() {
    if (this.regName && this.regEmail && this.regPassword) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      const emailExists = users.some((user: any) => user.email === this.regEmail);
      if (emailExists) {
        alert('Email already registered!');
        return;
      }

      const newUser = {
        name: this.regName,
        email: this.regEmail,
        password: this.regPassword
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      alert('Registration successful!');

      // Clear form
      this.regName = '';
      this.regEmail = '';
      this.regPassword = '';
    } else {
      alert('Please fill in all fields.');
    }
  }

  onLogin() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const matchedUser = users.find(
      (user: any) =>
        user.email === this.loginEmail && user.password === this.loginPassword
    );

    if (matchedUser) {
      this.loggedIn = true;
      this.userProfile = matchedUser;
      localStorage.setItem('loggedInUser', JSON.stringify(matchedUser));
      alert('Login successful!');
    } else {
      alert('Invalid email or password.');
    }

    this.loginEmail = '';
    this.loginPassword = '';
  }

  onLogout() {
    localStorage.removeItem('loggedInUser');
    this.loggedIn = false;
    this.userProfile = null;
    alert('Logout successful.');
  }
}