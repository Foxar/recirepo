import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { NavigationEnd, Router } from "@angular/router";
import { concat, mergeMap, of } from "rxjs";
import { DeleteRecipeDialogComponent } from "src/app/dialogs/confirmDeleteRecipeDialog/dialog-confirm-delete-recipe.component";
import { IngredientApiModel } from "src/app/models/ingredient-api.model";
import { RecipeApiModel } from "src/app/models/recipe-api.model";
import { RecipesApiService } from "src/app/services/recipesApi.service";


@Component({
    selector: 'app-tablist',
    templateUrl: './tablist.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./tablist.component.scss']
})
export class TablistComponent implements OnInit {
    constructor(
        public dialog: MatDialog,
        private apiService: RecipesApiService,
        private ref: ChangeDetectorRef,
        private router: Router){}

    mockRecipes: RecipeApiModel[] = [];
    filteredRecipes: RecipeApiModel[] = [];

    ngOnInit(): void {
        this.getAllRecipesAndRefresh();
        
        
        this.searchForm.valueChanges.subscribe((v: string | null) => this.filterRecipes(v))
        this.router.events.subscribe(
            (event) => {
                if(event instanceof(NavigationEnd))
                {
                    this.getAllRecipesAndRefresh();
                }
            }
        )
    }

    searchForm = new FormControl('');


    filterRecipes(v: string | null){
        if(v && v?.length > 1)
            this.filteredRecipes = this.mockRecipes.filter(r => {
                return  r.name.toLocaleLowerCase().includes(v.toLocaleLowerCase()) || 
                        r.ingredients.some((i: IngredientApiModel) => i.name.toLocaleLowerCase().includes(v.toLocaleLowerCase()))
            })
        else
            this.filteredRecipes = this.mockRecipes;
    }

    deleteRecipe(id: string){
        const dialogRef = this.dialog.open(DeleteRecipeDialogComponent);

        dialogRef.afterClosed().pipe(
            mergeMap(res => {
                if(res){
                    return concat(
                        this.apiService.deleteRecipe(id),
                        this.apiService.getAllRecipes(),
                    )
                }else{
                    return of([])
                }
            })
        ).subscribe(recipes => {
            this.mockRecipes = recipes!;
            this.filterRecipes(this.searchForm.value ?? '')
            this.ref.markForCheck();
            this.router.navigate(['/']);
        })
    }

    getAllRecipesAndRefresh(){
        this.apiService.getAllRecipes().subscribe(res => {
            this.mockRecipes = res;
            this.filteredRecipes = this.mockRecipes;
            this.filterRecipes(this.searchForm.value ?? '');
            this.ref.markForCheck();
        })
    }

}