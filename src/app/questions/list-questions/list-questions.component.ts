import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { QuestionService } from '../../common/services/question.service';
import { AssessmentService } from '../../common/services/assessment.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-questions',
  templateUrl: './list-questions.component.html',
  styleUrls: ['./list-questions.component.css']
})
export class ListQuestionsComponent  implements OnDestroy  {
  displayedColumns = ['areas', 'type', 'level'];
  dataSource: MatTableDataSource<any>;
  private _subscripton: Subscription;
  questions: any[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(db: QuestionService, public assessment: AssessmentService,
    route: ActivatedRoute, private router: Router) {
    assessment.currentName = route.snapshot.params['assessment'] || assessment.currentName;
    this._subscripton = db.getByAssessment(assessment.currentName)
      .subscribe(x => {
        this.dataSource = new MatTableDataSource(x);
        this.questions = x;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          }, 0);
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
