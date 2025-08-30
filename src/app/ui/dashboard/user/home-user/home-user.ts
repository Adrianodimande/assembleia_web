import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserModel } from '../../../../models/userModel';
import { UserService } from '../../../../service/http/user/user-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-user',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './home-user.html',
  styleUrl: './home-user.css',
})
export class HomeUser {
  formGroupSearch!: FormGroup;
  public userData: UserModel[] = [];

  constructor(private userService: UserService) {
    this.readAllMember();
  }
  ngOnInit(): void {
    this.formGroupSearch = new FormGroup({
      txtSearch: new FormControl(''),
    });
  }

  search() {
    this.userService.search(this.formGroupSearch.value.txtSearch).subscribe({
      next: (data) => {
        this.userData = data;
        console.log(this.formGroupSearch.value.txtSearch);
      },
      error: (res) => console.log('Erro na pesquisa'),
    });
  }

  readAllMember() {
    this.userService.getAll().subscribe((item) => (this.userData = item));
  }

  createMember(model: UserModel) {
    this.userService.create(model).subscribe({
      next: (res) => console.log('cadastrado com successo'),
      error: (res) => console.log('Erro ao cadastrar'),
    });
  }

  deleteMember(id: number) {
    this.userService.delete(id).subscribe({
      next: (res) => {
        console.log('Deletado com successo');
        this.readAllMember();
      },
      error: (res) => console.log('Erro ao Deletar'),
    });
  }
}
