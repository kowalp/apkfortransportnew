import { MenuService } from './../services/menu.service';
import { SvgIconsComponent } from './../icons/svg-icons/svg-icons.component';
import { FormDropdownComponent } from './form-dropdown/form-dropdown.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MainMenuComponent } from './main-menu/main-menu.component';


@NgModule({
  declarations: [
    MainMenuComponent,
    AppHeaderComponent,
    FormDropdownComponent,
    SvgIconsComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MainMenuComponent,
    AppHeaderComponent,
    FormDropdownComponent,
    SvgIconsComponent
  ],
  providers: [MenuService]
})
export class SharedModule { }
