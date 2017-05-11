import { Component, OnInit } from '@angular/core';
import { Userlist } from './shared/list.interface';
import { ListService } from './shared/list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DataTableModule, SharedModule, InputTextModule, PaginatorModule } from 'primeng/primeng';
import { DropdownModule } from "ngx-dropdown";
@Component({
    selector: 'list',
    templateUrl: 'wwwroot/user/list/list.component.html',
    styleUrls: ['wwwroot/user/list/list.component.css']
})
export class ListComponent implements OnInit {
    year = new Date().getFullYear();
    userlists: Userlist[];
    errorMessage: string;
    public user = sessionStorage.getItem('currentUser');
    constructor(private _listService: ListService,
        private _router: Router) { }

    ngOnInit(): void {
        this._listService.getUserlist()
            .subscribe(userlists => this.userlists = userlists,
            error => this.errorMessage = <any>error);
    }

    gotoDetail(UserId) {
        this._router.navigate(['/edit', UserId])
    }
}