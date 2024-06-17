import { Routes } from '@angular/router';
import { NewComponent } from './components/new/new.component';
import { StatsComponent } from './components/stats/stats.component';

export const routes: Routes = [
    {path: '', component: NewComponent},
    {path: 'stats', component: StatsComponent}
];
