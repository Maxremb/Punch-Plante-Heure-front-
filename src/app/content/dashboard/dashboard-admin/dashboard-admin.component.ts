import { Component, OnInit } from '@angular/core';
import { AdminUpdateDto } from 'src/app/models/admin-update-dto';
import { ConnectedUser } from 'src/app/models/connectedUser';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {

  admin: AdminUpdateDto = new AdminUpdateDto();

  user: ConnectedUser;

  constructor(private service: AdminService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('connectedUser'));
    this.getAdmin();
  }

  getAdmin() {
    this.service.getAdmin(this.user.id).subscribe(
      (responseDto) => {
           if (!responseDto.error) {
              this.admin = responseDto.body;
           }
         }
      );
  }



}
