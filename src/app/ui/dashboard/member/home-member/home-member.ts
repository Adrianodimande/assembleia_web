import { Component, OnInit } from '@angular/core';
import { MemberServices } from '../../../../service/http/member/member-services';
import { MemberModel } from '../../../../models/memberModel';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-home-member',
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './home-member.html',
  styleUrl: './home-member.css',
})
export class HomeMember implements OnInit {
  
  formGroupSearch!: FormGroup;
  public membersData: MemberModel[] = [];

  constructor(private memberService: MemberServices) {
    this.readAllMember();
  }
  ngOnInit(): void {
    this.formGroupSearch = new FormGroup({
      txtSearch: new FormControl(''),
    });
  }

  search() {
    this.memberService.search(this.formGroupSearch.value.txtSearch).subscribe({
      next: (data) => {
        this.membersData = data;
        console.log(this.formGroupSearch.value.txtSearch);
      },
      error: (res) => console.log('Erro na pesquisa'),
    });
  }

  readAllMember() {
    this.memberService.getAll().subscribe((item) => (this.membersData = item));
  }

  createMember(model: MemberModel) {
    this.memberService.create(model).subscribe({
      next: (res) => console.log('cadastrado com successo'),
      error: (res) => console.log('Erro ao cadastrar'),
    });
  }

  deleteMember(id: number) {
    this.memberService.delete(id).subscribe({
      next: (res) => {
        console.log('Deletado com successo');
        this.readAllMember();
      },
      error: (res) => console.log('Erro ao Deletar'),
    });
  }
}
