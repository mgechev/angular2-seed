import { Component} from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';
import { ScheduleInterviewsForRecruitersComponent} from './scheduleInterviews.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { RecruiterScheduleInterviewService} from '../index';

@Component({
    selector: 'schedule-interview-recruiter',
    template: '<router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES],
    providers: [ToastsManager, RecruiterScheduleInterviewService],
})

@Routes([
    { path: '/', component: ScheduleInterviewsForRecruitersComponent }
])
export class ShowScheduleInterviewsComponent {
}
