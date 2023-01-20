import { IngredientApiModel } from "./ingredient-api.model";

export interface RecipeApiModel{
    _id?: string;
    name: string;
    preparationTimeInMinutes: number;
    description: string;
    ingredients: IngredientApiModel[];
}