/*
    Interface para representar uma tarefa no sistema.
    Contrato que define a estrutura de uma tarefa.
*/
export interface Tarefa {
    
    id: number;         // identificador único da tarefa
    nome: string;       // nome ou título da tarefa
    data: string;       // data da criação ou prazo da tarefa
    hora: string;       // horas da criação ou prazo da tarefa
    categoria: string;  // categoria ou tipo da tarefa
    prioridade: string; // prioridade da tarefa (alta, média, baixa)
    finalizado: boolean // indica se a tarefa foi concluída ou não
    comentarios: string // comentário ou descrição adicional da tarefa
}