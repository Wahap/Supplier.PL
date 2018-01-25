import { NgModule } from '@angular/core';
import { MatCheckboxModule, MatButtonModule, MatIconModule,MatSelectModule,MatDialogModule,MatProgressSpinnerModule,MatToolbarModule,MatFormFieldModule,MatTabsModule,MatDatepickerModule,MatNativeDateModule } from '@angular/material';
import {MatInputModule} from '@angular/material/input';

// AoT requires an exported function for factories

@NgModule({
    imports: [MatCheckboxModule,MatButtonModule,MatInputModule,MatIconModule,MatSelectModule,MatDialogModule,MatProgressSpinnerModule,MatToolbarModule,MatFormFieldModule,MatTabsModule,MatDatepickerModule,MatNativeDateModule],
  
    exports:[MatCheckboxModule,MatButtonModule,MatInputModule,MatIconModule,MatSelectModule,MatDialogModule,MatProgressSpinnerModule,MatToolbarModule,MatFormFieldModule,MatTabsModule,MatDatepickerModule,MatNativeDateModule]
    
})
export class MaterialModule 
{

}
