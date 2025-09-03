import { Component, input } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../../models/user-model';

@Component({
  selector: 'app-card-view',
  imports: [],
  templateUrl: './card-view.html',
  styleUrl: './card-view.scss'
})
export class CardView {
  public users = input.required<IUser[]>();

  constructor(private router: Router) {}

  public navigateToDetail(userId: number) {
    this.router.navigate(['/user', userId]);
  }
}
