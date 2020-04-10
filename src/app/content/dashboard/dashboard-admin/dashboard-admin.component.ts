import { Component, OnInit } from '@angular/core';
import { AdminUpdateDto } from 'src/app/models/admin-update-dto';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {

  admin: AdminUpdateDto = new AdminUpdateDto();

  constructor() { }

  ngOnInit(): void {
  }

}
