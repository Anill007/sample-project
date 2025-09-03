import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { UserService } from '../../api/user-service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { delay } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { CardView } from '../card-view/card-view';
import { ListView } from '../list-view/list-view';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../../models/user-model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [ReactiveFormsModule, NgbPaginationModule, CardView, ListView],
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.scss'],
})
export class UserList {
  private destroyRef = inject(DestroyRef);

  // Signals
  protected users = signal<IUser[]>([]);
  protected currentPage = signal<number>(1);
  protected loading = signal<boolean>(false);
  protected userSearchSignal = signal<string>(''); // signal for search
  protected isListView = signal<boolean>(true); // toggle view

  // Reactive form control
  public userSearch = new FormControl('');

  // Computed: filtered users based on search
  protected filteredUsers = computed(() => {
    const search = this.userSearchSignal().toLowerCase().trim();
    return this.users().filter(
      (user: IUser) =>
        !search ||
        user.name?.toLowerCase().includes(search) ||
        user.email?.toLowerCase().includes(search)
    );
  });

  // Computed: users for the current page
  protected currentPageUsers = computed(() => {
    const startIndex = (this.currentPage() - 1) * 5;
    return this.filteredUsers().slice(startIndex, startIndex + 5);
  });

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
    if (this.route.snapshot.queryParamMap.get('search')) {
      const initialSearch = this.route.snapshot.queryParamMap.get('search') || '';
      this.userSearch.setValue(initialSearch);
      this.userSearchSignal.set(initialSearch);
    }

    this.loading.set(true);

    // Fetch users from API
    this.userService
      .getUserList()
      .pipe(takeUntilDestroyed(this.destroyRef), delay(3000))
      .subscribe({
        next: (data: IUser[]) => {
          this.users.set(data);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      });

    // Update search signal on input changes
    this.userSearch.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        this.userSearchSignal.set(value ?? '');
        this.currentPage.set(1);
        this.router.navigate([], {
          queryParams: { search: value || null },
          queryParamsHandling: 'replace',
          replaceUrl: true,
        });
      });
  }

  protected setCurrentPage(page: number): void {
    this.currentPage.set(page);
  }

  protected toggleView(): void {
    this.isListView.set(!this.isListView());
  }
}
