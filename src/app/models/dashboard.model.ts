export interface PontoGrafico {
    name : string;
    y : number;
}

export interface ResumoGrafico {
    porCategoria: PontoGrafico[];
    porStatus: PontoGrafico[];
}