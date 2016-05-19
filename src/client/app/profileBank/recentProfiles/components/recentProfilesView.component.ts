import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, OnActivate, RouteSegment, Router } from '@angular/router';
import { MyProfilesInfo } from '../../myProfiles/model/myProfilesInfo';
import { RecentProfilesService } from '../services/recentProfiles.service';

@Component({
    selector: 'rrf-allprofiles-view',
    templateUrl: 'app/profileBank/recentProfiles/components/recentProfilesView.component.html',
    directives: [ROUTER_DIRECTIVES],
})
export class RecentProfilesViewComponent implements OnActivate {
    params: string;
    errorMessage: string;
    profile: MyProfilesInfo;
    constructor(private _recentProfilesService: RecentProfilesService,
        private _router: Router) {
        this.profile = new MyProfilesInfo();
    }
    routerOnActivate(segment: RouteSegment) {
        this.params = segment.getParam('id');
        if (this.params) {
            this._recentProfilesService.getCandidateProfile(this.params)
                .subscribe(
                results => {
                    this.profile = results;
                },
                error => this.errorMessage = <any>error);
        }
    }

}
