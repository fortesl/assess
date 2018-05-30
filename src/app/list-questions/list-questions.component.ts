import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { QuestionService } from '../common/services/question.service';
import { AssessmentService } from '../common/services/assessment.service';

@Component({
  selector: 'app-list-questions',
  templateUrl: './list-questions.component.html',
  styleUrls: ['./list-questions.component.css']
})
export class ListQuestionsComponent  implements OnDestroy  {
  displayedColumns = ['description', 'areas'];
  dataSource: MatTableDataSource<any>;
  private _subscripton: Subscription;
  questions: any[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(db: QuestionService, assessment: AssessmentService) {
    this._subscripton = db.get(assessment.currentName)
      .subscribe(x => {
        this.dataSource = new MatTableDataSource(x);
        this.questions = x;
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
