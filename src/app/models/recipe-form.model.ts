import { IngredientFormModel } from "./ingredient-form.model";

export interface RecipeFormModel {
    name: string | null;
    description: string | null;
    preparationTimeInMinutes: number | null;
    ingredients: IngredientFormModel[];
}