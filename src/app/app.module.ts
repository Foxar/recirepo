import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { UnsavedChanges } from './guards/unsaved-changes-guard.service';
import { PreparationTimePipe } from './pipes/preparationTimePipe';
import { RecipeFormComponent } from './components/recipeform/recipe-form.component';
import { AppComponent } from './components/app/app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TablistComponent } from './components/tablist/tablist.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { AuthorInfoDialogComponent } from './dialogs/authorInfoDialog/dialog-author-info.component';
import { DeleteRecipeDialogComponent } from './dialogs/confirmDeleteRecipeDialog/dialog-confirm-delete-recipe.component';
import { UnsavedFormDialogComponent } from './dialogs/unsavedFormDialog/dialog-unsaved-form.component';


const routes = [
  {
    path: 'recipe/:id',
    component: RecipeComponent
  },
  {
    path: 'new',
    component: RecipeFormComponent,
    canDeactivate: [UnsavedChanges],
  },
  {
    path: 'edit/:id',
    component: RecipeFormComponent,
    canDeactivate: [UnsavedChanges],
  }
]

const materialComps = [
  MatDialogModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatTabsModule,
  MatInputModule,
  MatExpansionModule,
  MatSnackBarModule,
]

const components = [
  NavbarComponent,
  TablistComponent,
  RecipeComponent,
  AuthorInfoDialogComponent,
  DeleteRecipeDialogComponent,
  UnsavedFormDialogComponent,
  RecipeFormComponent,
  PreparationTimePipe
]

@NgModule({
  declarations: [
    ...components,
    AppComponent
  ],
  imports: [
    ...materialComps,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [
    UnsavedChanges,
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
