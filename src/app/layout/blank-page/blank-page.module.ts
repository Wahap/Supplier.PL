import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DropdownModule} from 'primeng/primeng';
import { BlankPageRoutingModule } from './blank-page-routing.module';
import { BlankPageComponent } from './blank-page.component';
import { FormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
@NgModule({
    imports: [ImageCropperModule,CommonModule, BlankPageRoutingModule,DropdownModule,FormsModule ],
    declarations: [BlankPageComponent]
})
export class BlankPageModule {}
