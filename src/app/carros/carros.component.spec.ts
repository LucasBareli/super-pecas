import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


interface Carros {  // Interface para definir a estrutura dos dados dos carros
  id: number;
  modelo: string;
  fabricante: string;
  codigoUnico: string;
}

@Component({
  selector: 'app-carros',
  templateUrl: './carros.component.html',
  styleUrls: ['./carros.component.css']
})
export class CarrosComponent implements OnInit {
  carros: Carros[] = []; // Lista de carros
  searchText: string = ''; // Texto de busca
  atualPag: number = 1; // Página atual
  carrosporPag: number = 10; // Número de carros por página
  pagCars: Carros[] = []; // Carros a serem exibidos na página atual
  totalPags: number = 1; // Total de páginas
  filtroCarros: Carros[] = []; // Lista filtrada de carros

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.carregueCarros(); // Carregar os carros ao iniciar o componente
  }

  carregueCarros(): void {  // Simulação de carregamento de dados de carros
    this.carros = [
      { id: 1, modelo: 'Modelo 1', fabricante: 'Marca 1', codigoUnico: '123ABC' },
      { id: 2, modelo: 'Modelo 2', fabricante: 'Marca 2', codigoUnico: '456DEF' },
      // Adicione mais carros conforme necessário
    ];
    this.filtreCarros();
  }

  filtreCarros(): void {  // Filtrar os carros com base no texto de busca
    this.atualPag = 1; // Redefina para a primeira página após a filtragem
    this.filtroCarros = this.carros.filter(carro =>
      carro.modelo.toLowerCase().includes(this.searchText.toLowerCase())
    );
    this.atualizaPag();
  }

  atualizaPag(): void {  // Atualizar os dados de paginação
    const startIndex = (this.atualPag - 1) * this.carrosporPag;
    this.pagCars = this.filtroCarros.slice(startIndex, startIndex + this.carrosporPag);
    this.totalPags = Math.ceil(this.filtroCarros.length / this.carrosporPag);
  }

  addCarro(): void {  // Navegar para a página de adição de carro
    this.router.navigate(['/carros/add']);
  }

  editCarro(id: number): void {  // Navegar para a página de edição de carro
    this.router.navigate([`/carros/edit/${id}`]);
  }

  removeCarro(id: number): void {  // Remover um carro da lista
    this.carros = this.carros.filter(carro => carro.id !== id);
    this.filtreCarros();
  }

  proxPag(): void {  // Navegar para a próxima página
    if (this.atualPag < this.totalPags) {
      this.atualPag++;
      this.atualizaPag();
    }
  }

  antesPag(): void {  // Navegar para a página anterior
    if (this.atualPag > 1) {
      this.atualPag--;
      this.atualizaPag();
    }
  }

  irPag(page: number): void {   // Ir para uma página específica
    this.atualPag = page;
    this.atualizaPag();
  }
}
