// Importa o decorator Component e as funções de signals
import { Component, inject, signal } from '@angular/core';

// RouterLink permite navegação no template usando routerLink
import { RouterLink } from '@angular/router';

// Serviço responsável pela autenticação
import { Auth } from '../../services/auth/auth';

@Component({
  selector: 'app-navbar',
  // Como o component é standalone,
  // os recursos usados no template precisam ser importados aqui
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  // Signal responsável por controlar a abertura e fechamento
  // do menu mobile (true = aberto, false = fechado)
  mobileMenuOpen = signal(false);

  // Injeção do serviço de autenticação
  // Ele fornece informações sobre o usuário logado
  private authService = inject(Auth);

  // Indica se o usuário está autenticado
  // Esse valor vem do service de Auth
  userLogged = this.authService.isAuthenticated();

  // Dados do usuário autenticado
  // Pode ser null quando ninguém está logado
  user = this.authService.userAuth();

  // Método chamado ao clicar no botão de menu (mobile)
  // Alterna entre abrir e fechar o menu
  toggleMobileMenu() {
    this.mobileMenuOpen.update(current => !current);
  }

  /**
   * Método chamado ao clicar em "Sair"
   * Aqui normalmente:
   * - limpamos os dados do usuário
   * - encerramos a sessão
   * - redirecionamos para a tela de login
   */
  onLogout() {
    // A implementação do logout será feita no service de Auth
    // Exemplo:
    // this.authService.logout();
  }
}
