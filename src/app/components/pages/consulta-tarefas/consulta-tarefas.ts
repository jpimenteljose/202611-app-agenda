import { Component, inject, signal } from '@angular/core';
import { TarefaService } from '../../../services/tarefa.service';
import { Tarefa } from '../../../models/tarefa.model';
import { CommonModule } from '@angular/common';

@Component({
  imports: [
    CommonModule
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

  // função executada ao iniciar o componente
  ngOnInit() {
    // alert('Teste!');  
    // executando a consulta de tarefas e exibir os dados no console do navegador
    this.tarefaService.obterTarefas()
      .subscribe((tarefas) => { // aguardando a reposta da API
        // console.table(tarefas); // exibindo as tarefas no console do navegador
        this.tarefas.set(tarefas); // armazenar os dados obtidos no atributo signal
      });
  }
}
