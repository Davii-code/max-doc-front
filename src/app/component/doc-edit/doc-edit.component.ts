import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatOption} from '@angular/material/core';
import {MatFormField, MatLabel, MatSelect} from '@angular/material/select';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatDivider} from '@angular/material/divider';

@Component({
  selector: 'app-doc-edit',
  imports: [
    MatOption,
    MatSelect,
    MatLabel,
    MatFormField,
    ReactiveFormsModule,
    MatInput,
    MatButton,
    MatDivider
  ],
  templateUrl: './doc-edit.component.html',
  standalone: true,
  styleUrl: './doc-edit.component.css'
})
export class DocEditComponent {
  documentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    protected dialogRef: MatDialogRef<DocEditComponent>,
    @Inject(MAT_DIALOG_DATA
    ) public data: any
  ) {
    this.documentForm = this.fb.group({
      title: [ { value: this.data.title  , disabled:  this.data.stage.value =='MINUTA' }, Validators.required],
      description: [ { value: this.data.description , disabled: this.data.stage.value =='MINUTA' }, Validators.required],
      version: [{ value:this.data.version , disabled: true }, Validators.required],
      abbreviation: [{ value: this.data.abbreviation , disabled: true }, Validators.required],
      stage: [{ value: this.data.stage, disabled: true }, Validators.required],
    });
    console.log(this.data)
  }

  onSubmit() {
    if (this.documentForm.valid) {
      const updatedDocument = this.documentForm.value;
      this.dialogRef.close(updatedDocument);
    }
  }
}
