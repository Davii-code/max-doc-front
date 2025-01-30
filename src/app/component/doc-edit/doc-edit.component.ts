import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatOption} from '@angular/material/core';
import {MatFormField, MatLabel, MatSelect} from '@angular/material/select';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatDivider} from '@angular/material/divider';
import {DocListService} from '../../service/doc-list.service';
import {NotificationsService} from 'angular2-notifications';

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
    @Inject(MAT_DIALOG_DATA,
    ) public data: any,private documentService: DocListService, private notificationsService: NotificationsService
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


  // Submeter o documento
  submitDocument() {
    this.documentService.submitDocument(this.data.id).subscribe(response => {
      this.notificationsService.success("Subção realizada com sucesso!");
      this.dialogRef.close();
    },error => {
      this.notificationsService.error("Erro ao submiter! ", error.error.message);
    });
  }

  // Obsoletar o documento
  obsoleteDocument() {
    this.documentService.obsoleteDocument(this.data.id).subscribe(response => {
      this.notificationsService.success("Documento Obsoleto");
      this.dialogRef.close();
    },error => {
      this.notificationsService.error("Erro ao mudar para obsoleto! ", error.error.message);
    });
  }

  // Criar uma nova versão do documento
  createNewVersion() {
    this.documentService.createNewVersion(this.data.id).subscribe(response => {
      this.notificationsService.success("Nova versão criada com sucesso!");
      this.dialogRef.close();
    },error => {
      this.notificationsService.error("Erro ao criar nova versão! ", error.error.message);
    });
  }

  onSubmit() {
    if (this.documentForm.valid) {
      const updatedDocument = {
        ...this.documentForm.value,
        id: this.data.id,
        title: this.documentForm.get('title')?.value,
        description: this.documentForm.get('description')?.value,
        version: this.documentForm.get('version')?.value,
        abbreviation: this.documentForm.get('abbreviation')?.value,
        stage: this.documentForm.get('stage')?.value
      };


      this.documentService.updateDocument(this.data.id, updatedDocument).subscribe(response => {
        this.notificationsService.success("Editado com sucesso");
        this.dialogRef.close();
      },error => {
        this.notificationsService.error("Erro ao Editar! ", error.error.message);
      });
    }
  }
}
