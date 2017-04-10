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
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    errorMessage: string;
    editform: FormGroup;

    ulist: any;
    private sub: Subscription;
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };

    constructor(private _editservice: EditService,
        private _formbuilder: FormBuilder,
        private _fb: FormBuilder,
        private _router: Router,
        private _route: ActivatedRoute) {
        // TODO
        //Defines all of the validation messages for the form.
        // These could instead be retrieved from a file or database.
        //this.validationMessages = {
        //    UserId: {
        //        required: 'User Id  is required.'
        //    },
        //    Username: {
        //        required: 'User Name  is required.'
        //    },
        //    Email: {
        //        range: 'Email Id  is required.'
        //    },
        //    Mobile: {
        //        range: 'Mobile No is required.'
        //    },
        //    Roles: {
        //        range: 'user role is required.'
        //    },
        //    Department: {
        //        range: 'Department is required.'
        //    },
        //    Title: {
        //        range: 'title is required.'
        //    }
        //};

        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.

    }

    public myForm: FormGroup;
    public submitted: boolean;
    public events: any[] = [];

   ngOnInit(): void {
        // TODO
        // this.myForm = new FormGroup({
        //     name: new FormControl('', [<any>Validators.required, <any>Validators.minLength(5)]),
        //     address: new FormGroup({
        //         address1: new FormControl('', <any>Validators.required),
        //         postcode: new FormControl('8000')
        //     })
        // });

        // the short way
        this.myForm = this._fb.group({
            name: ['', <any>Validators.required],
            Username: ['', <any>Validators.required],
            UserId: ['', <any>Validators.required],
            Email: ['', <any>Validators.required],
            Mobile: '',
            RoleId: ['', <any>Validators.required],
            Department: ['', <any>Validators.required],
            Title: '',
            Status: ['', <any>Validators.required]
        });


        // subscribe to form changes  
        this.subcribeToFormChanges();

        // Update single value
        (<FormControl>this.myForm.controls['name'])
            .setValue('John', { onlySelf: true });
        //TODO
        // Update form model
        // const people = {
        // 	name: 'Jane',
        // 	address: {
        // 		street: 'High street',
        // 		postcode: '94043'
        // 	}
        // };

        // (<FormGroup>this.myForm)
        //     .setValue(people, { onlySelf: true });

        //this.editform = new FormGroup({
        //    UserId: new FormControl(),
        //    userName: new FormControl()
        //});
        //this.editform = this._formbuilder.group({
        //    UserId: ['', Validators.required],
        //    userName: ['thiravi', Validators.required],
        //    Email: ['', Validators.required ],
        //    Mobile: ['', Validators.required],
        //    Roles: ['', ],
        //    Department: ['', Validators.required],
        //    Title: ['', Validators.required]
        //});
        //console.log(this._router)
        this.sub = this._route.params.subscribe(
            params => {
                let userId = +params['userId'];
                this.getEditList(userId);
            }
        );
    }
    subcribeToFormChanges() {
        const myFormStatusChanges$ = this.myForm.statusChanges;
        const myFormValueChanges$ = this.myForm.valueChanges;

        myFormStatusChanges$.subscribe(x => this.events.push({ event: 'STATUS_CHANGED', object: x }));
        myFormValueChanges$.subscribe(x => this.events.push({ event: 'VALUE_CHANGED', object: x }));
    }

    save(model: any, isValid: boolean) {
        this.submitted = true;
        console.log(model, isValid);
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
        if (this.editform) {
            this.editform.reset();
        }
        this.ulist = ulist;
        //TODO
        //this.editform.patchValue({
        //    UserId: "this.ulist.userId",
        //    Username: "this.ulist.userName",
        //    Email: "this.ulist.emailId",
        //    Mobile: "this.ulist.mobileNo",
        //    Department: "this.ulist.department",
        //    Title: "this.ulist.title"
        //});
         //Update form model
         
        (<FormControl>this.myForm.controls['UserId'])
            .setValue(ulist.UserId, { onlySelf: true });
        (<FormControl>this.myForm.controls['Username'])
            .setValue(ulist.Username, { onlySelf: true });
        (<FormControl>this.myForm.controls['Email'])
            .setValue(ulist.Email, { onlySelf: true });
        (<FormControl>this.myForm.controls['Mobile'])
            .setValue(ulist.Mobile, { onlySelf: true });
        (<FormControl>this.myForm.controls['RoleId'])
            .setValue(ulist.RoleId, { onlySelf: true });
        (<FormControl>this.myForm.controls['Department'])
            .setValue(ulist.Department, { onlySelf: true });
        (<FormControl>this.myForm.controls['Title'])
            .setValue(ulist.Title, { onlySelf: true });
        (<FormControl>this.myForm.controls['Status'])
            .setValue(ulist.Status, { onlySelf: true });
         //TODO
         //(<FormGroup>this.myForm)
         //    .setValue(ulist, { onlySelf: true });
    }

    saveProduct(): void {
        if (this.myForm.dirty && this.myForm.valid) {
            // copy the form values over the product object values
            let p = Object.assign({}, this.ulist, this.myForm.value);

            this._editservice.saveProduct(p)
                .subscribe(
                () => this.onsavecomplete(),
                (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.myForm.dirty) {
            this.onsavecomplete();
        }
    }

    onsavecomplete(): void {
        // reset the form to clear the flags
        this.myForm.reset();
        this._router.navigate(['/list']);
    }

}
