import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, OnActivate} from '@angular/router';
import {Interview} from '../../shared/model/interview';
import {InterviewersScheduleService} from '../services/interviewers.schedule.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MasterData } from  '../../../shared/model/index';
import { FullCalendarComponent} from  '../../../shared/components/calendar/fullCalendar';
import {CalendarDetails, Event, Resource} from '../../scheduleInterview/model/calendarDetails';

@Component({
    moduleId: module.id,
    selector: 'interviewers-shedule',
    templateUrl: 'interviewers.schedule.component.html',
    directives: [ROUTER_DIRECTIVES, FullCalendarComponent],
    providers: [Interview, ToastsManager, InterviewersScheduleService]
})

export class RecruitmentInterviewScheduleComponent implements OnActivate {
    returnPath: string;
    Title: string;
    errorMessage: string;
    InterviewInformation: Array<Interview> = new Array<Interview>();
    AwaitedInterviewInformation: Array<Interview> = new Array<Interview>();
    InterviewInformationForCalendar: Array<Interview> = new Array<Interview>();
    interviewdd: Interview = new Interview();
    InterviewerCalendarDetails: CalendarDetails = new CalendarDetails();
    header: any = {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
    };


    constructor(private _router: Router,
        private toastr: ToastsManager,
        private _interviewService: InterviewersScheduleService) {
        this.InterviewInformation = new Array<Interview>();
        this.AwaitedInterviewInformation = new Array<Interview>();
        this.InterviewInformationForCalendar = new Array<Interview>();
        //this.getMyAllInterviewsDetailsOfCalendar();

    }
    //Router method overrid from OnActivate class
    routerOnActivate() {
        this.getMyInterviews();
        this.InterviewerCalendarDetails.Events = <any>this._interviewService.getEvent();
        this.InterviewerCalendarDetails.Resources = <any>this._interviewService.getResources();

        this.getMyAllInterviewsDetailsOfCalendar();
        this.returnPath = sessionStorage.getItem('returnPath');
    }
    Back() {
        if (this.returnPath !== undefined)
            this._router.navigate([this.returnPath]);
    }

    //Get all interviews assigned and accepted by current logged in user from service.
    getMyInterviews() {
        this._interviewService.getMyInterviews()
            .subscribe(
            (results: any) => {
                this.InterviewInformation = results;
            },
            error => {
                this.errorMessage = <any>error;
                this.toastr.error(<any>error);
            });
    }

    //used for calender view
    getMyAllInterviewsDetailsOfCalendar() {
        this._interviewService.getMyAllInterviewsDetailsOfCalendar()
            .subscribe(
            (results: any) => {
                this.InterviewerCalendarDetails = results;
            },
            error => {
                this.errorMessage = <any>error;
                this.toastr.error(<any>error);
            });
    }
    
    showIEF(_interviewID: string) {
        console.log('showing IEF form..!');
        this._router.navigate(['/App/Recruitment Cycle/Interviewers/ief/' + _interviewID]);
    }

    rejectInterview(_rrfID: MasterData) {
        let modalpopup: any = $('#rejectInterview');
        modalpopup.modal();
    }

    acceptInterview(_rrfID: MasterData) {
        /** */
    }
}
