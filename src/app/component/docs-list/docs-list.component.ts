import {Component, OnInit, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef, MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef, MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {DocListService} from '../../service/doc-list.service';
import {DocEditComponent} from '../doc-edit/doc-edit.component';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {CurrencyPipe, NgForOf, SlicePipe} from '@angular/common';
import {MatCheckbox} from '@angular/material/checkbox';
import {SelectionModel} from '@angular/cdk/collections';
import {DocCreateComponent} from '../doc-create/doc-create.component';
import {NotificationsService} from 'angular2-notifications';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatOption} from '@angular/material/core';
import {MatLabel, MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-docs-list',
  imports: [
    MatPaginator,
    MatIconButton,
    MatIcon,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatColumnDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatHeaderCellDef,
    MatTable,
    MatButton,
    MatCheckbox,
    SlicePipe,
    MatFormField,
    MatInput,
    FormsModule,
    MatOption,
    MatSelect,
    NgForOf,MatLabel
  ],
  templateUrl: './docs-list.component.html',
  standalone: true,
  styleUrl: './docs-list.component.css'
})
export class DocsListComponent implements OnInit{
  displayedColumns: string[] = ['select','id', 'title', 'description', 'version', 'abbreviation', 'stage', 'actions'];
  dataSource: MatTableDataSource<any>;
  length = 100;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  private dialogRef!: MatDialogRef<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private servico: DocListService, public dialog: MatDialog, private notificationsService: NotificationsService) {
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit() {
    this.recarregar()
  }

  filters = {
    title: '',
    description: '',
    abbreviation: '',
    stage: ''
  };

  stages = ['','MINUTA', 'VIGENTE', 'OBSOLETO']; // Adapte conforme seu enum

  applyFilter() {
    this.servico.filterDocuments(this.filters).subscribe((documents) => {
      this.dataSource.data = documents;
    },error => {
      this.notificationsService.success("Erro ao filtrar");
    });
  }

  selection = new SelectionModel<any>(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?:any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  recarregar() {
    this.dataSource.data = [];
    const orderBy = 'creationDate';
    const direction = 'desc';

    this.servico.getAll(orderBy, direction).subscribe((valor) => {
      this.dataSource.data = valor;
      this.dataSource.paginator = this.paginator;
    });
  }

  exportCSV(){
    const selectedIds = this.selection.selected.map(item => item.id);
    this.servico.exportDocuments(selectedIds).subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'exported_data.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      this.notificationsService.success("Exportado com sucesso!");
    },error => {
      console.log(error)
      this.notificationsService.error("Erro ao exporta selecione os documentos! ");
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.uploadCsvFile(file);
    }
  }

  uploadCsvFile(file: File) {
    this.servico.uploadCsvFile(file).subscribe({
      next: (response) => {
        this.notificationsService.success("Importado com sucesso!");
      },
      error: (error) => {
        this.notificationsService.success("Erro ao importa! ", error.error.message);
      }
    });
  }


  openDialogAdicionar() {
    const dialogRef = this.dialog.open(DocCreateComponent, {
      width: '700px',
      maxWidth: '90vw',
      panelClass: 'custom-modal',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.recarregar();
    });
  }

  openDialogEditar(any:any) {
    const dialogRef = this.dialog.open(DocEditComponent, {
      width: '900px',
      data: any
    });

    dialogRef.afterClosed().subscribe(result => {
      this.recarregar();
    });
  }

  executeDelete(doc: any) {
    this.servico.deleteDocument(doc.id).subscribe({
      next: value => {
        this.notificationsService.success("Deletado sucesso!");
        this.recarregar();
      },
      error: error => {
        this.notificationsService.error("Erro ao Deletar", error.error.message);
      }
    });
  }
}
