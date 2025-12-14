// Módulos básicos do Angular
import { CommonModule } from '@angular/common';

// Component → cria o component
// signal → estado reativo
// computed → valores derivados de signals
// inject → injeção de dependência sem constructor
import { Component, computed, inject, signal } from '@angular/core';

// FormsModule → necessário para usar [(ngModel)]
import { FormsModule } from '@angular/forms';

// Router → usado para navegação após o login
import { Router } from '@angular/router';

// Service de autenticação
import { Auth } from '../../core/services/auth/auth';

@Component({
  selector: 'app-login',
  // Como estamos usando Standalone Components,
  // os módulos são importados diretamente aqui
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  // Pede ao Angular uma instância do serviço de autenticação
  // (injeção de dependência)
  authService = inject(Auth);

  // Instância do Router para redirecionar o usuário
  router = inject(Router);

  // Controla se o formulário está em estado de carregamento
  // (pode ser usado para desabilitar o botão)
  isLoading: boolean = false;

  // Signal que indica se o formulário já foi enviado
  // Usado normalmente para exibir mensagens de erro
  formSubmit = signal<boolean>(false);

  // Signal que armazena o valor digitado no campo senha
  password = signal<string>("");

  // Signal que armazena o valor digitado no campo email
  email = signal<string>("");

  // Computed que verifica se o email é inválido
  // Retorna true quando o campo está vazio
  emailInvalid = computed(() => {
    return this.email() === "";
  });

  // Computed que verifica se a senha é inválida
  // Retorna true quando o campo está vazio
  passwordInvalid = computed(() => {
    return this.password() === "";
  });

  // Computed responsável pela mensagem de erro
  // Se email OU senha forem inválidos, mostra a mensagem
  errorMessage = computed(() => {
    return this.passwordInvalid() || this.emailInvalid()
      ? "Usuário inválido"
      : "";
  });

  // Método chamado ao submeter o formulário
  onSubmit() {

    // Primeiro valida se email e senha não estão vazios
    if (!this.emailInvalid() && !this.passwordInvalid()) {

      // Chama o método de autenticação do service
      let result = this.authService.autenticar(
        this.email(),
        this.password()
      );

      // Se o login for bem-sucedido
      if (result) {
        // Reseta o estado de envio do formulário
        this.formSubmit.set(false);

        // Redireciona para a página inicial
        this.router.navigate(['/']);
      }

      // Limpa os campos do formulário
      this.email.set("");
      this.password.set("");

      // Marca que o formulário foi enviado
      this.formSubmit.set(true);
    }

    // Caso caia fora do if (campos inválidos),
    // ainda assim marca que o formulário foi enviado
    this.formSubmit.set(true);
  }
}
