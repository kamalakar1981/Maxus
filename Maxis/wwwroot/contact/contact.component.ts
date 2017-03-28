import { Component, OnInit } from '@angular/core';
import { ContactService } from './shared/contact.service';
import { NgForm } from '@angular/forms';
import { Contact } from './shared/contact.interface';
import { DataTableModule, SharedModule, InputTextModule } from 'primeng/primeng';

declare let jsPDF; 

@Component({
    selector: 'contact',
    templateUrl: 'wwwroot/contact/contact.component.html',
    styleUrls: ['wwwroot/contact/contact.component.css']
})


export class ContactComponent implements OnInit {
    contacts: Contact[];

   // cols: any[];
    download() {
        var doc = new jsPDF();
        doc.text(20, 20, 'Hello world!');
        doc.save('Test.pdf');
    }
    constructor(private contactService: ContactService) { }

    ngOnInit() {
        this.contactService.getCarsSmall().then(Contact => this.contacts = Contact);

        //this.cols = [
        //    { field: 'UserId', header:"UserId" },
        //    { field: 'UserName', header: 'UserName' },
        //    { field: 'EmailId', header: 'EmailId' },
        //    { field: 'MobileNo', header: 'MobileNo' },
        //    { field: 'Department', header: 'Department' },
        //    { field: 'Title', header: 'Title' },
        //    { field: 'Status', header: 'Status' },
        //    { field: 'Roles', header: 'Roles' }
        //];
    }

}
