import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { Observable } from "rxjs";
import { Tarefa } from "../models/tarefa.model";

@Injectable({ // habilitar injeção de dependência para o serviço
     providedIn: "root", // todo o aplicativo terá acesso a esse serviço
})

export class TarefaService {

    // injeção de dependência da biblioteca HttpClient para realizar requisições HTTP para a API
    private readonly http=inject(HttpClient)

    // declarar uma variável para armazenar a URL base da API
    private readonly apiUrl=environment.apiUrl;

    // função para buscar todas as tarefas da API
    obterTarefas() : Observable<Tarefa[]>{

        // fazendo uma chamada GET para a API para obter todas as tarefas
        return this.http.get<Tarefa[]>(`${this.apiUrl}/tarefas`);
    }
}