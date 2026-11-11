import { Routes } from '@angular/router';
import { Dashboard } from './components/pages/dashboard/dashboard';
import { CadastroTarefas } from './components/pages/cadastro-tarefas/cadastro-tarefas';
import { ConsultaTarefas } from './components/pages/consulta-tarefas/consulta-tarefas';
import { Notfound } from './components/errors/notfound/notfound';

export const routes: Routes = [
    {
        path: 'pages/dashboard', // rota
        component: Dashboard     // componente que será renderizado
    },
    {
        path: 'pages/cadastro-tarefas', // rota
        component: CadastroTarefas       // componente que será renderizado
    },
    {
        path: 'pages/consulta-tarefas', // rota
        component: ConsultaTarefas      // componente que será renderizado
    },
    {
        path: '',                       // rota padrão
        pathMatch: 'full',              // corresponde exatamento a rota
        redirectTo: 'pages/dashboard'   // redireciona para a tora de dashboard
    },
    {
        path: '**', // rota para lidar com URLs não encontradas
        component: Notfound // componente que será renderizado para URLs não encontradas
    }
];
