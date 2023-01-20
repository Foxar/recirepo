import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'app-dialog-unsaved-form',
    templateUrl: './dialog-unsaved-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnsavedFormDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<UnsavedFormDialogComponent>,
    ){}

    onNoClick(): void {
        this.dialogRef.close();
    }

}