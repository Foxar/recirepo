import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'app-dialog-author-info',
    templateUrl: './dialog-author-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorInfoDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<AuthorInfoDialogComponent>,
    ){}

    onNoClick(): void {
        this.dialogRef.close();
    }
}