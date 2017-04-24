import { Component, OnInit, OnDestroy, ViewChildren, ElementRef  } from '@angular/core';
import { Userlist } from './../list/shared/list.interface';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/observable';
import { EditService } from './shared/edit.service';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'edit',
    templateUrl: 'wwwroot/user/edit/edit.component.html',
    styleUrls: ['wwwroot/user/edit/edit.component.css']
})

export class EditComponent implements OnInit, OnDestroy {
    errorMessage: string;
    ulist: any;
    private sub: Subscription;
    public editForm: FormGroup;

    constructor(private _editservice: EditService,
                private _formbuilder: FormBuilder,
                private _router: Router,
                private _route: ActivatedRoute) { }

   ngOnInit(): void {
       
       this.editForm = this._formbuilder.group({
            Username: ['', <any>Validators.required],
            UserId: ['', <any>Validators.required],
            Email: ['', <any>Validators.required],
            Mobile: '',
            RoleId: ['', <any>Validators.required],
            Department: ['', <any>Validators.required],
            Title: '',
            Status: ['', <any>Validators.required]
        });
     
        this.sub = this._route.params.subscribe(
            params => {
                let userId = +params['userId'];
                this.getEditList(userId);
            }
        );
    }
   
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }


    getEditList(userId: number): void {
        this._editservice.getEditList(userId)
            .subscribe(
            (ulist: any) => {
                console.log(ulist);
                this.onlistretrieved(ulist)
            },
            (error: any) => this.errorMessage = <any>error
            );
    }

    onlistretrieved(ulist: any): void {
       
        this.ulist = ulist;
      
        (<FormControl>this.editForm.controls['UserId'])
            .setValue(ulist.UserId, { onlySelf: true });
        (<FormControl>this.editForm.controls['Username'])
            .setValue(ulist.Username, { onlySelf: true });
        (<FormControl>this.editForm.controls['Email'])
            .setValue(ulist.Email, { onlySelf: true });
        (<FormControl>this.editForm.controls['Mobile'])
            .setValue(ulist.Mobile, { onlySelf: true });
        (<FormControl>this.editForm.controls['RoleId'])
            .setValue(ulist.RoleId, { onlySelf: true });
        (<FormControl>this.editForm.controls['Department'])
            .setValue(ulist.Department, { onlySelf: true });
        (<FormControl>this.editForm.controls['Title'])
            .setValue(ulist.Title, { onlySelf: true });
        (<FormControl>this.editForm.controls['Status'])
            .setValue(ulist.Status, { onlySelf: true });
         //TODO
         //(<FormGroup>this.myForm)
         //    .setValue(ulist, { onlySelf: true });
    }

    saveProduct(): void {
        if (this.editForm.dirty && this.editForm.valid) {
            // copy the form values over the product object values
            let p = Object.assign({}, this.ulist, this.editForm.value);

            this._editservice.saveProduct(p)
                .subscribe(
                () => this.onsavecomplete(),
                (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.editForm.dirty) {
            this.onsavecomplete();
        }
    }

    onsavecomplete(): void {
        // reset the form to clear the flags
        this.editForm.reset();
        this._router.navigate(['/list']);
    }

}
