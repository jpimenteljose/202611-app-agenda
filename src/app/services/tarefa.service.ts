import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { Tarefa } from "../models/tarefa.model";

@Injectable({ //Habilitar injeção de dependência para o serviço
  providedIn: "root", //Todo o aplicativo terá acesso a este serviço
})
export class TarefaService {

    // Injeção de dependência da biblioteca HttpClient para realizar requisições HTTP para a API
    private readonly http = inject(HttpClient);

    // declarar uma variavel para armazenar a URL base da API
    private readonly apiUrl = environment.apiUrl;

    // função para buscar todas as tarefas da API
    obterTarefas(dataMin: string, dataMax: string) : Observable<Tarefa[]> {
        
        // criando o filtro de pesquisa por data
        const params = new HttpParams()
            .set('data_gte', dataMin)    // datas que sejam maior ou igual a..
            .set('data_lte', dataMax)    // datas que sejam menor ou igual a..
            .set('_sort', 'data,hora');  // ordenação
        // fazendo uma chamada GET para a API para obter todas as tarefas
        return this.http.get<Tarefa[]>(`${this.apiUrl}/tarefas`, { params });
    }

    // função para obter uma tarefa através do ID
    obterTarefaPorId(id: string) : Observable<Tarefa> {
        // fazendo uma chamada GET na API passando o ID da tarefa
        return this.http.get<Tarefa>(`${this.apiUrl}/tarefas/${id}`);

    }

    // função para cadastrar uma tarefa na API
    incluirTarefa(tarefa: Tarefa) : Observable<Tarefa> {
        //Fazendo uma chamada POST para a API para incluir uma tarefa
        return this.http.post<Tarefa>(`${this.apiUrl}/tarefas`, tarefa);
    }

    // função para atualizar uma tarefa na API
    alterarTarefa(id: string, tarefa: Tarefa) : Observable<Tarefa> {
        //Fazendo uma chamada PUT para a API para editar uma tarefa
        return this.http.put<Tarefa>(`${this.apiUrl}/tarefas/${id}`, tarefa);
    }

    // função para excluir uma tarefa na API
    excluirTarefa(id: string) : Observable<void> {
        
        //Fazendo uma chamada DELETE para a API para excluir uma tarefa
        return this.http.delete<void>(`${this.apiUrl}/tarefas/${id}`);
    }


}