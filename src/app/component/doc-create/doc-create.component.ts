import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatOption} from '@angular/material/core';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatSelect} from '@angular/material/select';
import {MatButton} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {MatInput} from '@angular/material/input';
import {MatDivider} from '@angular/material/divider';
import {DocListService} from '../../service/doc-list.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-doc-create',
  imports: [
    MatOption,
    MatFormField,
    MatSelect,
    ReactiveFormsModule,
    MatButton,
    NgIf,
    MatInput, MatError, MatLabel, MatDivider
  ],
  templateUrl: './doc-create.component.html',
  standalone: true,
  styleUrl: './doc-create.component.css'
})
export class DocCreateComponent implements OnInit{

  documentForm!: FormGroup;
  isMinutaPhase: boolean = true;
  protected dialogRef!: MatDialogRef<any>;

  constructor(private fb: FormBuilder, private servico: DocListService,
  private dialog: MatDialog,
  private dialogRefCurrent: MatDialogRef<any>) { }

  ngOnInit(): void {
    this.documentForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      version: [1, Validators.required],
      abbreviation: ['', Validators.required],
      stage: [{ value: 'MINUTA', disabled: true }, Validators.required]
    });

  }

  onSubmit(): void {
    if (this.documentForm.valid) {
      const formValues = this.documentForm.value;
      formValues.creationDate = new Date().toISOString();
      formValues.updateDate = new Date().toISOString();
      this.servico.createDocument(formValues).subscribe(doc => {
        console.log("Documento criado:", formValues);
      })
    }
    this.dialogRef.afterClosed().subscribe(value => {
      this.dialogRefCurrent.close();
    });
  }
}
