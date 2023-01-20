import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export function minArrayLength(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        return control.value.length < min ? {insufficientIngredients: {value: control.value.length}} : null;
    };
}