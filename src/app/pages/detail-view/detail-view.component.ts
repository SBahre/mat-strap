import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

export interface IUser {
  name: string;
  email: string;
  phoneNumber: number;
}

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss'],
})
export class DetailViewComponent implements OnInit {
  dict: any = [];

  @Input() interfaceDictionary = <any>{};
  @Input() user = <any>{};

  ngOnInit(): void {
    //let keyInTS: keyof User;
    //type userKey = keyof typeof this.user;
    //type userValue = (typeof this.user)[userKey];

    let keyInTS: keyof typeof this.user;

    for (keyInTS in this.user) {
      this.dict.push({
        key: this.interfaceDictionary[keyInTS],
        value: this.user[keyInTS],
      });
    }
    console.table(this.dict);
  }
}
