import { Routes } from '@angular/router';
import {DocsListComponent} from './component/docs-list/docs-list.component';

export const routes: Routes =  [{path:'',pathMatch:"full",redirectTo:'home'},
  {path:'home', component:DocsListComponent},

];
