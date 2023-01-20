import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { AuthorInfoDialogComponent } from "src/app/dialogs/authorInfoDialog/dialog-author-info.component";



@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    constructor(public dialog: MatDialog){}
    openAuthorInfoDialog(){
        this.dialog.open(AuthorInfoDialogComponent);
    }
}
