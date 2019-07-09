import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppImmediateClick } from './immediate-click.directive';

@NgModule({
    declarations: [AppImmediateClick],
    exports: [AppImmediateClick],
    imports: [CommonModule]
})
export class ImmediateClickModule {}
