import { Component } from '@angular/core';
import { UserService } from '../../../../service/http/user/user-service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from '../../../../models/userModel';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-user',
  imports: [ReactiveFormsModule],
  templateUrl: './form-user.html',
  styleUrl: './form-user.css',
})
export class FormUser {
  constructor(
    private memberService: UserService,
    private currentRouter: ActivatedRoute,
    private router: Router
  ) {}

  titleBtn: string = 'CADASTRAR';

  idUserForUpdate: number = 0;
  userForUpdate: UserModel | null = null;
  formGroupUser!: FormGroup;
  ngOnInit(): void {
    this.idUserForUpdate = Number(
      this.currentRouter.snapshot.paramMap.get('id')
    );

    this.formGroupUser = new FormGroup({
      id: new FormControl(0),
      Name: new FormControl(''),
      Password: new FormControl(''),
      PasswordConfirm: new FormControl(''),
      Status: new FormControl<boolean | null>(true),
    });

    if (this.idUserForUpdate > 0) {
      this.titleBtn = 'ATUALIZAR';
      this.addMemberInFormGroupToUpdate();
      console.log('adicionando o model para atualizar');
    }
  }

  onSubmitCreateOrUpdate() {
    console.log(this.formGroupUser.value);
    if (this.idUserForUpdate > 0) {
      this.updateMember();
      console.log('aqui esta atualizar');
    } else {
      this.createMember();
    }
  }

  createMember() {
    this.memberService.create(this.formGroupUser.value).subscribe({
      next: (res) => {
        console.log('cadastrado com successo');
        this.router.navigate(['/']);
      },
      error: (res) => console.log('Erro ao cadastrar'),
    });
  }

  updateMember() {
    this.memberService
      .update(this.idUserForUpdate, this.formGroupUser.value)
      .subscribe({
        next: (res) => {
          console.log('Atualizado com successo');
          this.router.navigate(['/']);
        },
        error: (res) => console.log('Erro ao Atualizar'),
      });
  }

  addMemberInFormGroupToUpdate() {
    this.memberService.getById(this.idUserForUpdate).subscribe((item) => {
      this.userForUpdate = item;
      this.formGroupUser.patchValue({
        FirstName: this.userForUpdate.name,
        // LastName: this.userForUpdate.status,
      });
    });
  }
}
