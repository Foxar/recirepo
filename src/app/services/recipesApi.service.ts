import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { catchError, Observable, of, tap } from "rxjs";
import { RecipeApiModel } from "../models/recipe-api.model";
import { RecipeFormModel } from "../models/recipe-form.model";
import { RecipeMapperService } from "./recipeMapper.service";

@Injectable({providedIn: 'root'})
export class RecipesApiService {
    API_KEY = 'f7fd1b4bab39414ba41e14d53485a6a6';
    apiUrl = 'https://www.crudcrud.com/api/' + this.API_KEY;

    httpOptions = {}
    
    //Here's the headers for the 'X-API-KEY' requirement of the task. I've commented it out, however, as crudcrud api service does
    //not allow for this header to be present.
    
    // httpOptions = {
    //     headers: new HttpHeaders({
    //         'X-API-KEY': 'HoA',
    //     })
    // }

    constructor(
            private http: HttpClient,
            private mapper: RecipeMapperService,
            private snackbar: MatSnackBar
        ){}

    postRecipe(recipeFormBody: RecipeFormModel): Observable<RecipeApiModel>{
        const body = this.mapper.mapRecipeToApi(recipeFormBody);
        return this.http.post<RecipeApiModel>(this.apiUrl+'/recipe/', body, this.httpOptions).pipe(
            catchError((error) => {
                console.error(error);
                this.snackbar.open('Failed to post the recipe!', 'Ok', {duration: 1500});
                return of();
            }),
            tap(() => {
                this.snackbar.open('Successfully added recipe!', 'Ok', {duration: 1500});
            })
        )
    }

    getAllRecipes(): Observable<RecipeApiModel[]>{
        return this.http.get<RecipeApiModel[]>(this.apiUrl+'/recipe/', this.httpOptions);
    }

    getRecipe(id: string): Observable<RecipeApiModel>{
        return this.http.get<RecipeApiModel>(this.apiUrl+'/recipe/'+id, this.httpOptions);
    }

    putRecipe(id: string, recipeFormBody: RecipeFormModel): Observable<RecipeApiModel>{
        const body =  this.mapper.mapRecipeToApi(recipeFormBody);
        return this.http.put<RecipeApiModel>(this.apiUrl+'/recipe/' + id, body, this.httpOptions).pipe(
            catchError((error) => {
                console.error(error);
                this.snackbar.open('Failed to modify the recipe!', 'Ok', {duration: 1500});
                return of();
            }),
            tap(() => {
                this.snackbar.open('Successfully modified recipe!', 'Ok', {duration: 1500});
            })
        )
    }

    deleteRecipe(id: string): Observable<void>{
        return this.http.delete<void>(this.apiUrl+'/recipe/'+id, this.httpOptions).pipe(
            catchError((error) => {
                console.error(error);
                this.snackbar.open('Failed to delete the recipe!', 'Ok', {duration: 1500});
                return of();
            }),
            tap(() => {
                this.snackbar.open('Deleted the recipe!', 'Ok', {duration: 1500});
            })
        );
    }
    
}
