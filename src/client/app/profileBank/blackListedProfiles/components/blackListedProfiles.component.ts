import {Component} from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';
import { BlackListedProfilesListComponent } from './blackListedProfilesList.component';
import { BlackListedProfilesAddComponent } from './blackListedProfilesAdd.component';
import { BlackListedProfilesService } from '../services/blacklistedProfiles.service';
import {BlackListedProfilesViewComponent} from './blackListedProfilesView.component';
import { MastersService } from '../../../shared/services/masters.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'rrf-black-listed-profiles',
    template: ' <router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES],
    providers: [BlackListedProfilesService,MastersService,ToastsManager]
})

@Routes([
    { path: '/', component: BlackListedProfilesListComponent },
    { path: '/Edit/:id', component: BlackListedProfilesAddComponent },
    { path: '/View/:id', component: BlackListedProfilesViewComponent }
])
export class BlackListedProfilesComponent {
}
