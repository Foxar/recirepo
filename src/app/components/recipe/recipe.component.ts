import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { map, Subscription, switchMap, tap } from "rxjs";
import { DeleteRecipeDialogComponent } from "src/app/dialogs/confirmDeleteRecipeDialog/dialog-confirm-delete-recipe.component";
import { RecipeApiModel } from "src/app/models/recipe-api.model";
import { RecipesApiService } from "src/app/services/recipesApi.service";


@Component({
    selector: 'app-recipe',
    templateUrl: './recipe.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit, OnDestroy {
    constructor(
            private route: ActivatedRoute,
            private router: Router,
            private ref: ChangeDetectorRef,
            private apiService: RecipesApiService,
            private dialog: MatDialog,
        ){
            this.routerEventsSubscription$ = this.router.events.subscribe(
                (event) => {
                if(event instanceof(NavigationEnd))
                    this.ref.markForCheck();
            });
        }

    recipeId = '';

    recipe: RecipeApiModel | undefined;

    loading = true;

    routeParamSubscription$: Subscription | undefined;
    dialogRefSubscription$: Subscription | undefined;
    routerEventsSubscription$: Subscription | undefined;

    ngOnInit() {
        
        this.routeParamSubscription$ = this.route.params.pipe(
            tap(() =>{
                this.loading = true;
            }),
            switchMap(params => {
                this.recipeId = params['id'];
                return this.apiService.getRecipe(this.recipeId).pipe(
                    map((recipe => {
                        this.recipe = recipe;
                        this.loading = false;
                        this.ref.markForCheck();
                    })),
                )
            })
        ).subscribe();
        
    }

    deleteRecipe(id: string){
        const dialogRef = this.dialog.open(DeleteRecipeDialogComponent);

        this.dialogRefSubscription$ = dialogRef.afterClosed().subscribe(res => {
            if(res){
                this.apiService.deleteRecipe(id).subscribe(() => {
                    this.router.navigate(['/']);
                });
            }
        })
    }

    ngOnDestroy() {
        this.dialogRefSubscription$?.unsubscribe();
        this.routeParamSubscription$?.unsubscribe();
        this.routerEventsSubscription$?.unsubscribe();

    }


}