// Importa o decorator Component e as funções de signal e inject
import { Component, inject, signal } from '@angular/core';

// RouterOutlet permite que as páginas sejam renderizadas
// de acordo com a rota atual
import { RouterOutlet } from '@angular/router';

// Serviço responsável pela autenticação
import { Auth } from './core/services/auth/auth';

// Componente de navegação (menu)
import { Navbar } from './core/components/navbar/navbar';

@Component({
  selector: 'app-root',

  // Como o AppComponent é standalone,
  // os componentes e diretivas usadas no template
  // precisam ser importados aqui
  imports: [RouterOutlet, Navbar],

  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  // Signal apenas para armazenar o título da aplicação
  protected readonly title = signal('base-services');

  // Injeção do serviço de autenticação
  // Esse serviço controla login, logout e usuário logado
  private authService = inject(Auth);

  // Referência ao signal que indica se o usuário está autenticado
  // Será usado no template para exibir ou ocultar elementos
  autenticado = this.authService.isAuthenticated;

  // Referência ao signal que contém os dados do usuário logado
  // Pode ser null quando ninguém está autenticado
  user = this.authService.userAuth;
}
