import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-chip-trial',
  templateUrl: './chip-trial.component.html',
  styleUrls: ['./chip-trial.component.scss'],
})
export class ChipTrialComponent {
  userForm!: FormGroup;
  myControl = new FormControl();
  dataSourceField = new FormControl();
  options = [
    {
      displayOrderId: 1,
      code: '1111',
      description: '1111 Description',
    },
    {
      displayOrderId: 2,
      code: '2222',
      description: '2222 Description',
    },
    {
      displayOrderId: 3,
      code: '3333',
      description: '3333 Description',
    },
    {
      displayOrderId: 4,
      code: '4444',
      description: '4444 Description',
    },
    {
      displayOrderId: 5,
      code: '44467',
      description: '44467 Description',
    },
  ];
  filteredOptions!: Observable<any>;
  filteredPsmds: any[] = [];
  // @ViewChild('templateDataSource') private trigger!: MatAutocompleteTrigger;
  @ViewChild('autoCompleteInput', {
    static: false,
    read: MatAutocompleteTrigger,
  })
  trigger!: MatAutocompleteTrigger;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initialiseForm();
    this.autoCompleteValueChanges();
    this.siteCodeAutoCompleteFilter();
  }

  /**Initialises form group */
  initialiseForm() {
    this.userForm = new FormGroup({
      siteCode: new FormControl(undefined, [
        Validators.required,
        this.requireMatch.bind(this),
      ]),
    });
  }

  ngAfterOnInit() {
    this.trigger.panelClosingActions.subscribe((e) => {
      this.userForm.controls['siteCode'].setValue(null);
    });
  }

  /**This function does something */
  autoCompleteValueChanges() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  private _filter(value: any) {
    let filterValue = '';
    if (typeof value === 'string') {
      filterValue = value.toLowerCase();
    } else {
      filterValue = value.description.toLowerCase();
    }

    return this.options.filter(
      (option) => option.description.toLowerCase().indexOf(filterValue) === 0
    );
  }

  displayFn(value: any) {
    return value ? value.description : undefined;
  }

  private siteCodeAutoCompleteFilter() {
    this.userForm.controls['siteCode'].valueChanges
      .pipe(
        startWith(''),
        map((value: string) => {
          const name: string = typeof value === 'string' ? value : value;
          if (name.length > 2) {
            //let filter = <IDataFilter> {searchText:name}
            //this.options = await this.companyService.findItems(0,0,filter)
            return name
              ? this._siteCodefilter(name as string)
              : this.options.slice();
          }
          return;
        })
      )
      .subscribe((res) => {
        this.filteredPsmds = <any[]>res;
      });
  }

  private _siteCodefilter(value: string): any[] {
    const filterValue = value.toLowerCase();

    let result: any[] = this.options.filter((option) =>
      option.code.toLowerCase().includes(filterValue)
    );

    return result;
  }

  displaySiteCodeFn(psmd: any): string {
    const test = psmd && psmd.code ? psmd.code : '';
    return test;
  }

  onSiteSelected(event: any) {
    console.log(event, ': A site is selected');
  }

  onClearClick() {
    this.userForm.controls['siteCode'].reset();
    console.log(
      `After reset, control value:: ${this.userForm.controls['siteCode'].value}`
    );
  }

  private requireMatch(control: FormControl): ValidationErrors | null {
    const selection: any = control.value;
    if (this.options && this.options.indexOf(selection) < 0) {
      return { requireMatch: true };
    }
    return null;
  }
}
