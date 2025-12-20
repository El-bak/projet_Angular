import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import * as AdminActions from './admin.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { AdminStats } from './admin.model';

@Injectable()
export class AdminEffects {

  private actions$ = inject(Actions);
  private http = inject(HttpClient);

  loadStats$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.loadAdminStats),
      mergeMap(() =>
        this.http.get<AdminStats>('/api/admin/stats').pipe(
          map(stats =>
            AdminActions.loadAdminStatsSuccess({ stats })
          ),
          catchError(() =>
            of(
              AdminActions.loadAdminStatsFailure({
                error: 'Erreur chargement stats admin'
              })
            )
          )
        )
      )
    )
  );
}
