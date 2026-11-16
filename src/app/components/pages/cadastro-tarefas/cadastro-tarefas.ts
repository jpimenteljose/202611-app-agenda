import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  selector: 'app-cadastro-tarefas',
  styleUrl: './cadastro-tarefas.css',
  templateUrl: './cadastro-tarefas.html',
})
export class CadastroTarefas {

  // formulario reativo
  formCadastro = new FormGroup({
    nome : new FormControl('', [Validators.required]),
    data : new FormControl('', [Validators.required]),
    hora : new FormControl('', [Validators.required]),
    categoria : new FormControl(''),
    prioridade : new FormControl(''),
    finalizado : new FormControl(''),
    comentarios : new FormControl('', [Validators.required]),
  });

  // função executada quando o botão SUBMIT do formulário for clicado
  cadastrarTarefa() {
    // imprimir os dados do formulário no console do navegador
    console.log(this.formCadastro.value);
  }
}
