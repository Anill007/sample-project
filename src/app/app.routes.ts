import { Routes } from '@angular/router';
import { UserList } from './components/user-list/user-list';
import { UserDetail } from './components/user-detail/user-detail';
import { NotFoundPage } from './components/not-found-page/not-found-page';

export const routes: Routes = [
  {
    path: '',
    component: UserList
  },
  {
    path: 'user/:id',
    component: UserDetail
  },
  { path: '404', component: NotFoundPage },
  { path: '**', redirectTo: '404' },
];
