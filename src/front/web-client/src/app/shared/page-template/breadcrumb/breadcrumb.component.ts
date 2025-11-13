import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Breadcrumb } from '@app/models/breadcrumb.model';
import { BreadcrumbService } from '@app/services/breadcrumb.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-breadcrumb',
    imports: [AsyncPipe, RouterLink],
    templateUrl: './breadcrumb.component.html',
    styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs$?: Observable<Breadcrumb[]>;

  breadcrumbService = inject(BreadcrumbService);
  destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.breadcrumbs$ = this.breadcrumbService.breadcrumbs$.pipe(takeUntilDestroyed(this.destroyRef));
  }
}
