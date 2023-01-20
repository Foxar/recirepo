import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from "@angular/core";
import { FormArray, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { switchMap } from "rxjs";
import { RecipeApiModel } from "src/app/models/recipe-api.model";
import { RecipeFormModel } from "src/app/models/recipe-form.model";
import { RecipeMapperService } from "src/app/services/recipeMapper.service";
import { RecipesApiService } from "src/app/services/recipesApi.service";
import { minArrayLength } from "src/app/validators/minArrayLength";
import { UniqueRecipeNameValidator } from "src/app/validators/uniqueRecipeNameValidator";

@Component({
    selector: 'app-recipe-form',
    templateUrl: './recipe-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit {
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private apiService: RecipesApiService,
        private fb: FormBuilder,
        private ref: ChangeDetectorRef,
        private recipeMapper: RecipeMapperService,
        private uniqueRecipeNameValidator: UniqueRecipeNameValidator
        ){}
    
    recipeToEdit: RecipeApiModel | undefined;


    recipeForm = this.initialRecipeForm();

    ngOnInit(): void {
        this.route.params.pipe(
                switchMap((params) => {
                    this.recipeForm = this.initialRecipeForm();
                    this.ref.markForCheck();
                    
                    const recipeId = params['id'];
                    return this.apiService.getRecipe(recipeId);
                })
            ).subscribe(recipeToEdit => {
                this.recipeToEdit = recipeToEdit;
                if(this.recipeToEdit){

                    const mappedRecipe: RecipeFormModel = this.recipeMapper.mapApiToFormRecipe(this.recipeToEdit);
                    
                    for(let i =0;i<mappedRecipe.ingredients!.length-1;i++){
                        this.addIngredient();
                    }

                    this.recipeForm.setValue(mappedRecipe)
                }

          });
    }

    initialRecipeForm() {
        return this.fb.group({
            name: [
                '',
                {
                    validators: [
                        Validators.required,
                        Validators.minLength(3),
                        Validators.maxLength(80),
                    ],
                    asyncValidators: this.uniqueRecipeNameValidator.validate.bind(this.uniqueRecipeNameValidator),
                }
            ],
            description: [
                '',
                [Validators.required,
                Validators.minLength(15),
                Validators.maxLength(255)]
            ],
            preparationTimeInMinutes: [0,Validators.required],
            ingredients: this.fb.array([
                this.fb.group({
                    ingredientName: ['', [
                        Validators.required,
                        Validators.minLength(3),
                        Validators.maxLength(80),
                    ]],
                    ingredientQuantity: ['', [
                        Validators.required,
                        Validators.minLength(3),
                        Validators.maxLength(80),
                    ]]
                })
            ],
            [
                Validators.required,
                minArrayLength(2)
            ])
        });
    }

    get ingredients() {
        return (this.recipeForm.get('ingredients') as FormArray);
    }

    addIngredient(){
        this.ingredients.push(this.fb.group({
            ingredientName: ['',Validators.required],
            ingredientQuantity: ['',Validators.required],
        }))
    }

    onSave() {
        if(this.recipeForm.valid)
        {
            if(this.recipeToEdit){
                this.apiService.putRecipe(this.recipeToEdit._id!, this.recipeForm.value as RecipeFormModel).subscribe(() => {
                    this.recipeForm.markAsPristine();
                    this.router.navigate(['/recipe/' + this.recipeToEdit!._id]);
                });
            } else {
                this.apiService.postRecipe(this.recipeForm.value as RecipeFormModel).subscribe(res => {
                    this.recipeForm.markAsPristine();
                    this.router.navigate(['/recipe/' + res._id]);
                });
            }
        }
    }
}


