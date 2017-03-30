import { Component, OnInit } from '@angular/core';
import { Userlist } from './shared/list.interface';
import { ListService } from './shared/list.service';
import { NgForm } from '@angular/forms';
import { DataTableModule, SharedModule, InputTextModule } from 'primeng/primeng';

@Component({
    selector: 'list',
    templateUrl: 'wwwroot/user/list/list.component.html',
    styleUrls: ['wwwroot/user/list/list.component.css']
})
export class ListComponent implements OnInit {

    userlists: Userlist[];
    errorMessage: string;
   
    constructor(private _listService: ListService) {

    }

    ngOnInit(): void {
        this._listService.getUserlist()
            .subscribe(userlists => this.userlists = userlists,
            error => this.errorMessage = <any>error);
    }

    download() {
        this._listService.getPdf()
            .subscribe(
            data => {
                console.log('success:', data);
            },
            err => {
                console.log('error:', err)
            });


    }
    downloadExl() {
        this._listService.getExl()
            .subscribe(
            data => {
                console.log('success:', data);
            },
            err => {
                console.log('error:', err)
            });


    }

}