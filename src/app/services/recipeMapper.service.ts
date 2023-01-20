import { Injectable } from "@angular/core";
import { IngredientApiModel } from "../models/ingredient-api.model";
import { IngredientFormModel } from "../models/ingredient-form.model";
import { RecipeApiModel } from "../models/recipe-api.model";
import { RecipeFormModel } from "../models/recipe-form.model";

@Injectable({providedIn: 'root'})
export class RecipeMapperService {

    mapRecipeToApi(recipeFormBody: RecipeFormModel): RecipeApiModel {
        const {ingredients, ...mappedRecipe} = recipeFormBody;
        return {
            name: mappedRecipe.name!,
            description: mappedRecipe.description!,
            preparationTimeInMinutes: mappedRecipe.preparationTimeInMinutes!,
            ingredients: ingredients!.map((i: IngredientFormModel) => {
                return {
                    _id: Date.now().toString(),
                    name: i.ingredientName!,
                    quantity: i.ingredientQuantity!
                }
            })
        }
    }

    mapApiToFormRecipe(recipeApi: RecipeApiModel): RecipeFormModel{

        const mappedIngredients = recipeApi.ingredients.map((ri: IngredientApiModel) => {
            return {
                ingredientName: ri.name,
                ingredientQuantity: ri.quantity
            }
        })

        return {
            name: recipeApi.name!,
            description: recipeApi.description,
            preparationTimeInMinutes: recipeApi.preparationTimeInMinutes,
            ingredients: mappedIngredients,
        }

    }
}