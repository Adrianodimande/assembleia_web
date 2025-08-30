import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MemberServices } from '../../../../service/http/member/member-services';
import { RouterLink } from '@angular/router';
import {} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CongregationModel } from '../../../../models/congregationModel ';
import { CongregationService } from '../../../../service/http/congregation/congregation-service';
@Component({
  selector: 'app-home-congregation',
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './home-congregation.html',
  styleUrl: './home-congregation.css',
})
export class HomeCongregation {
  formGroupSearch!: FormGroup;
  public congregationsData: CongregationModel[] = [];

  constructor(private congregationService: CongregationService) {
    this.readAllMember();
  }
  ngOnInit(): void {
    this.formGroupSearch = new FormGroup({
      txtSearch: new FormControl(''),
    });
  }

  search() {
    this.congregationService
      .search(this.formGroupSearch.value.txtSearch)
      .subscribe({
        next: (data) => {
          this.congregationsData = data;
          console.log(this.formGroupSearch.value.txtSearch);
        },
        error: (res) => console.log('Erro na pesquisa'),
      });
  }

  readAllMember() {
    this.congregationService
      .getAll()
      .subscribe((item) => (this.congregationsData = item));
  }

  createMember(model: CongregationModel) {
    this.congregationService.create(model).subscribe({
      next: (res) => console.log('cadastrado com successo'),
      error: (res) => console.log('Erro ao cadastrar'),
    });
  }

  deleteMember(id: number) {
    this.congregationService.delete(id).subscribe({
      next: (res) => {
        console.log('Deletado com successo');
        this.readAllMember();
      },
      error: (res) => console.log('Erro ao Deletar'),
    });
  }
}
