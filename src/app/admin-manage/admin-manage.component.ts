import { Component } from '@angular/core';
import { User } from '../_models/user';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-admin-manage',
  templateUrl: './admin-manage.component.html',
  styleUrls: ['./admin-manage.component.css']
})
export class AdminManageComponent {

  selectedAdmin! : User;
  userToAdmin! : User;
  admins = [] as User[];
  regularUsers = [] as User[];
  allUsers = [] as User[];

  constructor(private authService: AuthService, private tokenService: TokenStorageService, private userService: UserService) { }

  ngOnInit(): void {
    this.authService.getAdmins().subscribe({
      next: (data) => {
        this.admins = data;
        this.admins = this.admins.filter(admin => admin.email != this.tokenService.getUser().email)
        if(this.admins.length > 0) {
          this.selectedAdmin = this.admins[0]
        }
        this.allUsers.push(...this.admins);
      }
    })

    this.userService.getRegularUsers().subscribe({
      next: (data) => {
        this.regularUsers = data;
        if(this.regularUsers.length > 0) {
          this.userToAdmin = this.regularUsers[0]
        }
        this.allUsers.push(...this.regularUsers);
      }
    })
  }

  demoteAdmin() {
    this.authService.demoteAdmin(this.selectedAdmin.email).subscribe({
      next: () => {
          this.admins = this.admins.filter(admin => admin.email != this.selectedAdmin.email);
          this.regularUsers.push(this.selectedAdmin);
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  promoteToAdmin() {
    this.authService.promoteToAdmin(this.userToAdmin.email).subscribe({
      next: () => {
        this.admins.push(this.userToAdmin);
        this.regularUsers = this.regularUsers.filter(user => user.email != this.userToAdmin.email);
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
