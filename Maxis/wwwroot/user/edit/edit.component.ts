import { Component, OnInit, OnDestroy, ViewChildren, ElementRef  } from '@angular/core';
import { Userlist } from './../list/shared/list.interface';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/observable';
import { EditService } from './shared/edit.service';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute , Router } from '@angular/router';
@Component({
    selector: 'edit',
    templateUrl: 'wwwroot/user/edit/edit.component.html',
    styleUrls: ['wwwroot/user/edit/edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    errorMessage: string;
    editform: FormGroup;

    ulist: Userlist;
    private sub: Subscription;
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };

    constructor(private _editservice: EditService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute) {
        // Defines all of the validation messages for the form.
        // These could instead be retrieved from a file or database.
        this.validationMessages = {
            userId: {
                required: 'User Id  is required.'
            },
            userName: {
                required: 'User Name  is required.'
            },
            emailId: {
                range: 'Email Id  is required.'
            },
            mobileNo: {
                range: 'Mobile No is required.'
            },
            department: {
                range: 'Department is required.'
            },
            title: {
                range: 'title is required.'
            }
        };

        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.

    }


    ngOnInit(): void {
        this.editform = this.fb.group({
            userId: ['', Validators.required],
            userName: ['', Validators.required],
            emailId: ['', Validators.required ],
            mobileNo: ['', Validators.required],
            department: ['', Validators.required],
            title: ['', Validators.required]
        });

        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getEditList(id);
            }
        );
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }


    getEditList(id: number): void {
        this._editservice.getEditList(id)
            .subscribe(
            (ulist: Userlist) => this.onlistretrieved(ulist),
            (error: any) => this.errorMessage = <any>error
            );
    }

    onlistretrieved(ulist: Userlist): void {
        if (this.editform) {
            this.editform.reset();
        }
        this.ulist = ulist;

       

        // update the data on the form
        //this.editform.patchvalue({
        //    userId: this.ulist.userId,
        //    userName: this.ulist.userName,
        //    emailId: this.ulist.emailId,
        //    mobileNo: this.ulist.mobileNo,
        //    department: this.ulist.department,
        //    title: this.ulist.title,
        //});
    }

    saveProduct(): void {
        if (this.editform.dirty && this.editform.valid) {
            // copy the form values over the product object values
            let p = Object.assign({}, this.ulist, this.editform.value);

            this._editservice.saveProduct(p)
                .subscribe(
                () => this.onsavecomplete(),
                (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.editform.dirty) {
            this.onsavecomplete();
        }
    }

    onsavecomplete(): void {
        // reset the form to clear the flags
        this.editform.reset();
        this.router.navigate(['/list']);
    }

}
