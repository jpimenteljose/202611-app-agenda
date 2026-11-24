import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TarefaService } from '../../../services/tarefa.service';
import { Tarefa } from '../../../models/tarefa.model';

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

  // injeção de dependência
  private readonly tarefaService = inject(TarefaService);

  // variável signal para exibir mensagem na página
  mensagem = signal<string>('');

  // variáveis signal para guardar as opções de categorias
  categorias = signal<string[]>([
    'Trabalho', 'Estudo', 'Casa', 'Saúde', 'Lazer', 'Outros'
  ]);

  // variáveis signal para guardar as opções de pioridades
  prioridades = signal<string[]>([
    'Alta', 'Média', 'Baixa'
  ]);

  // variáveis signal para guardar as opções de campo finalizado
  opcoesFinalizado = signal<{ valor : string, descricao : string }[]>([
    { valor: 'true', descricao: 'Sim' },
    { valor: 'false', descricao: 'Não' }, 
  ]);

  // formulario reativo
  formCadastro = new FormGroup({
    nome : new FormControl('', [Validators.required, Validators.minLength(6)]),
    data : new FormControl('', [Validators.required]),
    hora : new FormControl('', [Validators.required]),
    categoria : new FormControl('', [Validators.required]),
    prioridade : new FormControl('', [Validators.required]),
    finalizado : new FormControl('', [Validators.required]),
    comentarios : new FormControl('', [Validators.required]),
  });

  // função executada quando o botão SUBMIT do formulário for clicado
  cadastrarTarefa() {
    // imprimir os dados do formulário no console do navegador
    //console.log(this.formCadastro.value);
    
    // capturar os campos preenchidos no formulário
    const tarefa : Tarefa = {
      id : '', // gerado pela API do JSON SERVER
      nome : this.formCadastro.get('nome')?.value as string,
      data : this.formCadastro.get('data')?.value as string,
      hora : this.formCadastro.get('hora')?.value as string,
      categoria : this.formCadastro.get('categoria')?.value as string,
      prioridade : this.formCadastro.get('prioridade')?.value as string,
      finalizado : this.formCadastro.get('finalizado')?.value === 'true',
      comentarios : this.formCadastro.get('comentarios')?.value as string,
    };

    // envio para o método de cadastro da API
    this.tarefaService.incluirTarefa(tarefa)
    .subscribe((response) => {
      this.mensagem.set(`Parabéns, a tarefa "${response.nome}", foi incluida com sucesso.`);
      this.formCadastro.reset(); // limpar os campos do formulário
    });
  }
}
