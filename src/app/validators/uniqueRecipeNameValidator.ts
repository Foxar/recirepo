import { Injectable } from "@angular/core";
import { AsyncValidator, AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable, map, of, debounceTime, switchMap, distinctUntilChanged, take } from "rxjs";
import { RecipesApiService } from "../services/recipesApi.service";

@Injectable({ providedIn: 'root' })
export class UniqueRecipeNameValidator implements AsyncValidator {
  constructor(private apiService: RecipesApiService) {}

  validate(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {

    if(!control.valueChanges || control.pristine) {
        return of(null);
    }else{
        return control.valueChanges.pipe(
            debounceTime(500),
            distinctUntilChanged(),
            take(1),
            switchMap((v) => {
                return this.apiService.getAllRecipes().pipe(
                    map(recipes => {
                        if(recipes.some(r => r.name.toLocaleLowerCase().localeCompare(v.toLocaleLowerCase()) == 0)){
                            return {uniqueRecipeName: true};
                        }else{
                            return null;
                        }
                    })
                )
            })
        )
    }
  }
}