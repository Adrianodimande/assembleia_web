import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MemberServices } from '../../../../service/http/member/member-services';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberModel } from '../../../../models/memberModel';
import { GenderEnum } from '../../../../constants/enums/genderEnum';
@Component({
  selector: 'app-form-member',
  imports: [ReactiveFormsModule],
  templateUrl: './form-member.html',
  styleUrl: './form-member.css',
})
export class FormMember implements OnInit {
  constructor(
    private memberService: MemberServices,
    private currentRouter: ActivatedRoute,
    private router: Router
  ) {}

  titleBtn: string = 'CADASTRAR';

  idMemberForUpdate: number = 0;
  memberForUpdate: MemberModel | null = null;
  formGroupMember!: FormGroup;
  ngOnInit(): void {
    this.idMemberForUpdate = Number(
      this.currentRouter.snapshot.paramMap.get('id')
    );

    this.formGroupMember = new FormGroup({
 id: new FormControl(0),
  FirstName: new FormControl(''),
  LastName: new FormControl(''),
  Date: new FormControl(),
  Gender: new FormControl<number | null>(null),
  MaritalStatus: new FormControl<number | null>(null), // aqui
  Address: new FormControl(''),
  Phone: new FormControl(''),
  Email: new FormControl(''),
  Congregation: new FormControl(''),
  Baptized: new FormControl<boolean | null>(null),
    
    });

    if (this.idMemberForUpdate > 0) {
      this.titleBtn = 'ATUALIZAR';
      this.addMemberInFormGroupToUpdate();
    console.log('adicionando o model para atualizar')
    }
  }

  onSubmitCreateOrUpdate() {
    console.log(this.formGroupMember.value);
    if (this.idMemberForUpdate > 0) {
      this.updateMember();
      console.log('aqui esta atualizar')
    } else {
      this.createMember();
    }
  }

  createMember() {
    this.memberService.create(this.formGroupMember.value).subscribe({
      next: (res) => {
        console.log('cadastrado com successo');
        this.router.navigate(['/']);
      },
      error: (res) => console.log('Erro ao cadastrar'),
    });
  }

  updateMember() {
    this.memberService
      .update(this.idMemberForUpdate, this.formGroupMember.value)
      .subscribe({
        next: (res) => {
          console.log('Atualizado com successo');
          this.router.navigate(['/']);
        },
        error: (res) => console.log('Erro ao Atualizar'),
      });
  }

  addMemberInFormGroupToUpdate() {
    this.memberService.getById(this.idMemberForUpdate).subscribe((item) => {
      this.memberForUpdate = item;
      this.formGroupMember.patchValue({
    FirstName: this.memberForUpdate.firstName,
  LastName: this.memberForUpdate.lastName,
  Gender: this.memberForUpdate.gender,
  MaritalState: this.memberForUpdate.maritalStatus,
  Address: this.memberForUpdate.address,
  Phone: this.memberForUpdate.phone,
  Email: this.memberForUpdate.email,
  Congregation: this.memberForUpdate.congregation,
  Baptized: this.memberForUpdate.baptized
      });
    });
  }
}
