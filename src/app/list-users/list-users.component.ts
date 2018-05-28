import { Component, ViewChild, OnDestroy } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Subscription } from 'rxjs';
import { UserService } from '../common/services/user.service';
import { AssessmentService } from '../common/services/assessment.service';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnDestroy {
  displayedColumns = ['name', 'email', 'role'];
  dataSource: MatTableDataSource<AppUser>;
  private _subscripton: Subscription;
  users: AppUser[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(db: UserService, assessment: AssessmentService) {
    this._subscripton = db.getUsers('CUC-101')
      .subscribe(users => { 
        this.dataSource = new MatTableDataSource(users);
        this.users = users;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;          
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  ngOnDestroy() {
    if (this._subscripton) {
      this._subscripton.unsubscribe();
    }
  }

}
