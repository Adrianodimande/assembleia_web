import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {} from '@angular/common';
import { CongregationService } from '../../../../service/http/congregation/congregation-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CongregationModel } from '../../../../models/congregationModel ';
@Component({
  selector: 'app-form-congregation',
  imports: [ReactiveFormsModule],
  templateUrl: './form-congregation.html',
  styleUrl: './form-congregation.css',
})
export class FormCongregation implements OnInit {
  constructor(
    private congregation: CongregationService,
    private currentRouter: ActivatedRoute,
    private router: Router
  ) {}

  titleBtn: string = 'CADASTRAR';

  idCongregationForUpdate: number = 0;
  congregationForUpdate: CongregationModel | null = null;
  formGroupMember!: FormGroup;
  ngOnInit(): void {
    this.idCongregationForUpdate = Number(
      this.currentRouter.snapshot.paramMap.get('id')
    );

    this.formGroupMember = new FormGroup({
      id: new FormControl(0),
      Name: new FormControl(''),
    });

    if (this.idCongregationForUpdate > 0) {
      this.titleBtn = 'ATUALIZAR';
      this.addMemberInFormGroupToUpdate();
      console.log('adicionando o model para atualizar');
    }
  }

  onSubmitCreateOrUpdate() {
    console.log(this.formGroupMember.value);
    if (this.idCongregationForUpdate > 0) {
      this.updateMember();
      console.log('aqui esta atualizar');
    } else {
      this.createMember();
    }
  }

  createMember() {
    this.congregation.create(this.formGroupMember.value).subscribe({
      next: (res) => {
        console.log('cadastrado com successo');
        this.router.navigate(['/congregation']);
      },
      error: (res) => console.log('Erro ao cadastrar'),
    });
  }

  updateMember() {
    this.congregation
      .update(this.idCongregationForUpdate, this.formGroupMember.value)
      .subscribe({
        next: (res) => {
          console.log('Atualizado com successo');
          this.router.navigate(['/congregation']);
        },
        error: (res) => console.log('Erro ao Atualizar'),
      });
  }

  addMemberInFormGroupToUpdate() {
    this.congregation
      .getById(this.idCongregationForUpdate)
      .subscribe((item) => {
        this.congregationForUpdate = item;
        this.formGroupMember.patchValue({
          Name: this.congregationForUpdate.name,
        });
      });
  }
}
