import { Component, inject, signal } from '@angular/core';
import { TarefaService } from '../../../services/tarefa.service';
import { Tarefa } from '../../../models/tarefa.model';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  selector: 'app-consulta-tarefas',
  styleUrl: './consulta-tarefas.css',
  templateUrl: './consulta-tarefas.html',
})
export class ConsultaTarefas {

  // injeção de dependência do serviço tarefas
  private readonly tarefaService=inject(TarefaService);

  // atributo signal para armazenar a listagem de tarefas
  tarefas = signal<Tarefa[]>([]);

  // formulário reativo para capturar o filtro de datas
  formConsulta = new FormGroup({
    dataMin : new FormControl('', [Validators.required]),
    dataMax : new FormControl('', [Validators.required]),
  });

  // função executada ao iniciar o componente
  ngOnInit() {

    // calculando o primeiro e último dia do mês atual
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = hoje.getMonth();

    const mesFormatado = String(mes + 1).padStart(2, '0');
    const ultimoDia = new Date(ano, mes + 1, 0).getDate();

    // definindo o filtro para carregar as tarefas do primeiro dia ao último dia do mês atual
    this.formConsulta.setValue({
      dataMin: `${ano}-${mesFormatado}-01`,
      dataMax: `${ano}-${mesFormatado}-${ultimoDia}`
    });

    // alert('Teste!');  
    // executando a consulta de tarefas
    this.consultarTarefas();
  }

  // função executada no submit do formulário
  consultarTarefas() {
    // console.log(this.formConsulta.value);
    // executando a consulta de tarefas e exibir os dados no console do navegador
    this.tarefaService.obterTarefas(
    this.formConsulta.value.dataMin as string,
    this.formConsulta.value.dataMax as string)
    .subscribe((tarefas) => { // aguardando a reposta da API
      // console.table(tarefas); // exibindo as tarefas no console do navegador
      this.tarefas.set(tarefas); // armazenar os dados obtidos no atributo signal
    });
  }

  // função para excluir uma tarefa selecionada
  excluirTarefa(id : string) {
    if(confirm('Deseja realmente excluir a tarefa selecionada?')) {
      
      // executar a exclusão da tarefa na API
      this.tarefaService.excluirTarefa(id)
        .subscribe(() => {

        // exibir mensagem
        alert('Tarefa excluída com sucesso!')

        // executando uma consulta 
        this.consultarTarefas();

        });
    }
  }
}
