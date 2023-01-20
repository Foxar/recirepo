import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TablistComponent } from './components/tablist/tablist.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { AuthorInfoDialogComponent } from './components/dialogs/authorInfoDialog/dialog-author-info.component';
import { DeleteRecipeDialogComponent } from './components/dialogs/confirmDeleteRecipeDialog/dialog-confirm-delete-recipe.component';
import { RecipeFormComponent } from './components/recipeform/recipe-form.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { UnsavedFormDialogComponent } from './components/dialogs/unsavedFormDialog/dialog-unsaved-form.component';
import { UnsavedChanges } from './components/guards/unsaved-changes-guard.service';
import { HttpClientModule } from '@angular/common/http';
import { PreparationTimePipe } from './pipes/preparationTimePipe';


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
