import {Component} from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';
import { AllProfilesListComponent } from './allProfilesList.component';
import { AllProfilesAddComponent } from './allProfilesAdd.component';
import { AllProfilesService } from '../services/allProfiles.service';
import {AllProfilesViewComponent} from './allProfilesView.component';
import { MastersService } from '../../../shared/services/masters.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'rrf-all-profiles',
    template: ' <router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES],
    providers: [AllProfilesService,MastersService,ToastsManager]
})

@Routes([
    { path: '/', component: AllProfilesListComponent },
    { path: '/Edit/:id', component: AllProfilesAddComponent },
    { path: '/View/:id', component: AllProfilesViewComponent }
])
export class AllProfilesComponent {
}
