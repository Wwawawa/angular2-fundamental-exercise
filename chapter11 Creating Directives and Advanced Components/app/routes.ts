import {Routes} from '@angular/router'
import {EventsListComponent} from './events/events-list.component'
import {EventDetailComponent} from './events/event-detail/event-detail.component'
import {CreateEventComponent} from './events/create-event.component'
import {CreateSessionComponent} from './events/event-detail/create-session.component'

import {Error404Component} from './errors/404.component'

import {EventRouteActivator} from './events/event-detail/event-route-activator.service'

import {EventListResolver} from './events/events-list-resolver.service'

export const appRoutes: Routes = [
    //order matters
    { path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent'] }, //Guarding Against Route De-activation using function, canDeactivateCreateEvent is provider name which points to a function
    { path: 'events', component: EventsListComponent, resolve: { events1: EventListResolver } }, //call EventListResolver before using the component, bind resolver result to a property events1, and this property will be passed to the component
    { path: 'events/:id', component: EventDetailComponent, canActivate: [EventRouteActivator] }, //Guarding Against Route Activation using service
    { path: 'events/session/new', component: CreateSessionComponent },
    { path: '404', component: Error404Component },
    { path: '', redirectTo: '/events', pathMatch: 'full' },  //pathMatch: prefix or full

    // user prefix, localhost/user/x, will load module here: app/user/user.module and the module name is UserModule, concat '#'
    { path: 'user', loadChildren: 'app/user/user.module#UserModule' }
]
