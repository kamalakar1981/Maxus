import { Component, OnInit } from '@angular/core';
import { HomeService } from './shared/home.service';

@Component({
    selector: 'home',
    templateUrl: 'wwwroot/home/home.component.html',
    styleUrls: ['wwwroot/home/home.component.css'],
    providers: [HomeService]
})

export class HomeComponent implements OnInit {
    title: string;
    serverData: any[];
    constructor(private _homeService: HomeService) {

    }

    ngOnInit() {
        this.title = this._homeService.sayHeyMethod();
        this._homeService.getServerData().subscribe(data => this.serverData = data);
    }
}