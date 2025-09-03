import { Component, DestroyRef, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../api/user-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule, Location } from '@angular/common';
import { delay } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-detail.html',
  styleUrls: ['./user-detail.scss'],
})
export class UserDetail {
  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private userService = inject(UserService);

  protected user = signal<any | null>(null);
  protected loading = signal<boolean>(false);

  constructor(private location: Location) {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (!idParam) {
      this.router.navigate(['/404']);
      return;
    }

    const id = Number(idParam);
    if (isNaN(id)) {
      this.router.navigate(['/404']);
      return;
    }

    this.loading.set(true);

    this.userService
      .getUserById(id)
      .pipe(takeUntilDestroyed(this.destroyRef), delay(3000))
      .subscribe({
        next: (data) => {
          if (!data) {
            this.router.navigate(['/404']);
          } else {
            this.user.set(data);
          }
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
          this.router.navigate(['/404']);
        },
      });
  }

  protected goBack() {
    this.location.back();
  }
}
