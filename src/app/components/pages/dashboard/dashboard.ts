import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TarefaService } from '../../../services/tarefa.service';
import { Chart, ChartModule } from 'angular-highcharts';

@Component({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChartModule
  ],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard {

  // injeções de dependência
  private readonly tarefaService = inject(TarefaService);

  // gráficos
  graficoDonut = signal(new Chart());
  graficoColuna = signal(new Chart());

  // estrtutura do formulário
  formDashboard = new FormGroup({
    dataMin : new FormControl('', [Validators.required]),
    dataMax : new FormControl('', [Validators.required])
  })

  // evento executado ao carregar o componente
  ngOnInit() {

    // calculando o primeiro e último dia do mês atual
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = hoje.getMonth();

    const mesFormatado = String(mes + 1).padStart(2, '0');
    const ultimoDia = new Date(ano, mes + 1, 0).getDate();

    // definindo o filtro para carregar as tarefas do primeiro dia ao último dia do mês atual
    this.formDashboard.setValue({
      dataMin: `${ano}-${mesFormatado}-01`,
      dataMax: `${ano}-${mesFormatado}-${ultimoDia}`
    });

    this.gerarGraficos();
  }

  // função para criar os gráficos no dashboard
  gerarGraficos() {

    // executando a consulta que irá trazer os resumos dos gráficos
    this.tarefaService.obterResumoGraficos(
      this.formDashboard.value.dataMin as string,
      this.formDashboard.value.dataMax as string
    ).subscribe((data) => {
        // console.log(data); // imprimindo no console

        // popular o gráfico de donut
        this.graficoDonut.set(new Chart({
          chart : { type : 'pie', backgroundColor : '#ffffff' },
          title : { text : 'Tarefas por Status'},
          credits : { enabled : false },
          colors : [ '#33FF33', '#0000FF'],
          plotOptions: {
            pie : {
              innerSize : '65%',
              dataLabels : { format : '{point.name} : {point.y}' }
            }
          },
          series : [{
            type : 'pie',
            name : 'Tarefas',
            data : data.porStatus 
          }]
        }));
      
        // popular o gráfico de colunas
        this.graficoColuna.set(new Chart({
          chart : { type : 'colum', backgroundColor : '#ffffff' },
          title : { text : 'Tarefas por Categoria' },
          credits : { enabled : false },
          legend : { enabled : false },
              xAxis: {
                categories: data.porCategoria.map(ponto => ponto.name)
              },
              yAxis: {
                  min: 0,
                  allowDecimals: false,
                  title: { text: 'Quantidade de tarefas' }
              },
              series: [{
                  type: 'column',
                  name: 'Tarefas',
                  color: '#0d6efd',
                  data: data.porCategoria.map(ponto => ponto.y)
              }]
            }));
        });
    }
}
