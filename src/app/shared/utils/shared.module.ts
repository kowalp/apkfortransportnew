import { MenuService } from './../services/menu.service';
import { SvgIconsComponent } from './../icons/svg-icons/svg-icons.component';
import { FormDropdownComponent } from './form-dropdown/form-dropdown.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { NgxLoadingModule } from 'ngx-loading';
import { DropdownComponent } from './dropdown/dropdown.component';
import {MatMenuModule} from '@angular/material/menu';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MainMenuComponent,
    AppHeaderComponent,
    FormDropdownComponent,
    SvgIconsComponent,
    DropdownComponent,
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    RouterModule
  ],
  exports: [
    MainMenuComponent,
    AppHeaderComponent,
    FormDropdownComponent,
    SvgIconsComponent,
  ],
  providers: [MenuService]
})
export class SharedModule { }
