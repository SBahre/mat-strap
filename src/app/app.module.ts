import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  DragDropModule,
} from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule, JsonPipe, NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './includes/footer/footer.component';
import { HeaderComponent } from './includes/header/header.component';
import { MatModule } from './mat/mat.module';
import { AccordionTrialsComponent } from './pages/accordion-trials/accordion-trials.component';
import { DetailViewComponent } from './pages/detail-view/detail-view.component';
import { InfiniteScrollComponent } from './pages/infinite-scroll/infinite-scroll.component';
import { ListComponent } from './pages/list/list.component';
import { MainComponent } from './pages/main/main.component';
import { TabTrialsComponent } from './pages/tab-trials/tab-trials.component';
//import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { AngularSplitModule } from 'angular-split';
import { ChipTrialComponent } from './pages/chip-trial/chip-trial.component';
import { CustomValidatorComponent } from './pages/custom-validator/custom-validator.component';
import { EditableTableComponent } from './pages/editable-table/editable-table.component';
import { GenerateTreeComponent } from './pages/generate-tree/generate-tree.component';
import { NumberCheckerPipe } from './pipes/number-checker.pipe';
import { InlineEditableTableComponent } from './pages/inline-editable-table/inline-editable-table.component';
import { ConfirmDialogComponent } from './pages/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ApiEditableTableComponent } from './pages/api-editable-table/api-editable-table.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    DetailViewComponent,
    ListComponent,
    InfiniteScrollComponent,
    AccordionTrialsComponent,
    TabTrialsComponent,
    CustomValidatorComponent,
    ChipTrialComponent,
    GenerateTreeComponent,
    EditableTableComponent,
    NumberCheckerPipe,
    InlineEditableTableComponent,
    ConfirmDialogComponent,
    ApiEditableTableComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    CdkDropListGroup,
    CdkDropList,
    NgFor,
    CdkDrag,
    DragDropModule,
    MatListModule,
    MatCheckboxModule,
    MatPaginatorModule,
    ScrollingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatTabsModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatTreeModule,
    AngularSplitModule,
    FormsModule,
    MatSlideToggleModule,
    MatDialogModule,
  ],
  providers: [JsonPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
