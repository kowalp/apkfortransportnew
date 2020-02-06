import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-choose-company',
  templateUrl: './choose-company.component.html',
  styleUrls: ['./choose-company.component.scss']
})
export class ChooseCompanyComponent implements OnInit {
  companies: any = [{
    title: 'Krakow Welcome',
    subtitle: 'Krakow welcome dostarcza usług w zakresie dojazdów na lotniska oraz prywatne wycieczki',
    maxNumberOfPeople: 10,
    cars: ['mercedes Vito', 'mercedes Benz'],
    rate: '5stars',

  }];
  constructor() { }

  ngOnInit() {
  }

}
