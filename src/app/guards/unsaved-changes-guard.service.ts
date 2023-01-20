import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { CanDeactivate, UrlTree } from "@angular/router";
import { Observable, of } from "rxjs";
import { UnsavedFormDialogComponent } from "../dialogs/unsavedFormDialog/dialog-unsaved-form.component";
import { RecipeFormComponent } from "../components/recipeform/recipe-form.component";

@Injectable()
export class UnsavedChanges implements CanDeactivate<RecipeFormComponent> {
    constructor(private dialog: MatDialog){}
    canDeactivate(
        component: RecipeFormComponent
        ): Observable<boolean|UrlTree> {
            if(component.recipeForm.pristine){
                return of(true);
            }else {
                return this.dialog.open(UnsavedFormDialogComponent).afterClosed();
            }
        }
}