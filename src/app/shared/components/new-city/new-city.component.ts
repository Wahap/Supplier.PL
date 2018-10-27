import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { City } from '../../DTOs/city';
import { CommonService } from '../../common.service';
import { IConfig, ConfigService } from '../../../app.config';

@Component({
  selector: 'app-new-city',
  templateUrl: './new-city.component.html',
  styleUrls: ['./new-city.component.scss']
})
export class NewCityComponent implements OnInit {

  @Output() onCitySaved=new EventEmitter();
  config: IConfig;
  city:City=new City();
  constructor(private commonService:CommonService,private configService: ConfigService) { }

  ngOnInit() {
    this.config = this.configService.getAppConfig();
  }

  saveCity()
  {
    this.commonService.saveCity(this.config.saveCityUrl,this.city).subscribe(city=>{
      this.onCitySaved.emit(city);
    });
  }

}
