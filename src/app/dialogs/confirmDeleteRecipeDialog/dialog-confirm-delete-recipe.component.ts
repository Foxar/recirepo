import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'app-dialog-confirm-delete-recipe',
    templateUrl: './dialog-confirm-delete-recipe.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteRecipeDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<DeleteRecipeDialogComponent>,
    ){}

    onNoClick(): void {
        this.dialogRef.close();
    }
}