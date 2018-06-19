import { Component, ViewChild, OnDestroy } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../../common/services/user.service';
import { AssessmentService } from '../../common/services/assessment.service';
import { AppUser } from '../../models/app-user';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(db: UserService, public assessment: AssessmentService, private router: Router, route: ActivatedRoute) {
    assessment.currentName = route.snapshot.params['assessment'];
    this._subscripton = db.getUsers(assessment.currentName)
      .subscribe(users => {
        this.dataSource = new MatTableDataSource(users);
        this.users = users;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          }, 2000);
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

  goToAssessment() {
    this.router.navigate([`/admin/assessment`, this.assessment.currentName]);
  }
}
