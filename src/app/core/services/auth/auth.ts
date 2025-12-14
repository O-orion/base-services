// Importa o Injectable (para transformar a classe em um service)
// e o signal (novo recurso do Angular para estado reativo)
import { Injectable, signal } from '@angular/core';

// Importa o Router (não está sendo usado ainda, mas normalmente
// é usado para redirecionar o usuário após o login)
import { Router } from '@angular/router';

// Imports de modelos (interfaces / types) usados para tipar os dados
import { DataAuth, Usuario } from '../../../pages/models/Usuario';
import { User } from '../../../shared/models/User';

// Chave usada para salvar e buscar o usuário no localStorage
const USER_STORAGE_KEY = 'currentUserAuth';


// @Injectable diz ao Angular que essa classe é um SERVICE
// providedIn: 'root' → significa que o service é único
// e fica disponível em toda a aplicação
@Injectable({
  providedIn: 'root',
})
export class Auth {

  // Lista fixa de usuários simulando um "banco de dados"
  // Isso é apenas para estudo, em um sistema real viria de uma API
  private usuarios: User[] = [
    { email: 'l@.com', nome: 'l', senha: '123' },
    { email: 'a@.com', nome: 'a', senha: '123' },
  ];

  // Método privado que tenta recuperar o usuário salvo no navegador
  // quando a aplicação é recarregada
  private getInitialUser(): User | null {

    // Busca no localStorage o usuário salvo
    const userJson = localStorage.getItem(USER_STORAGE_KEY);

    // Se existir algo salvo, converte de JSON para objeto
    // Caso contrário, retorna null
    return userJson ? JSON.parse(userJson) : null;
  }

  // Signal que guarda o usuário autenticado
  // Ele começa com o valor retornado do localStorage
  // (ou null, se não houver usuário logado)
  userAuth = signal<User | null>(this.getInitialUser());

  // Signal que indica se o usuário está autenticado ou não
  // O "!!" converte o valor em true ou false
  // Se existir usuário → true
  // Se for null → false
  isAuthenticated = signal<boolean>(!!this.getInitialUser());

  // Método responsável por autenticar o usuário
  // Recebe email e senha digitados no formulário
  autenticar(email: string, senha: string): boolean {

    // Aqui seria o local onde chamamos uma API real
    // Por enquanto, estamos apenas procurando na lista local

    // Procura um usuário pelo email informado
    let user = this.usuarios.find(
      (user) => user.email == email
    );

    // Se o usuário existir
    if (user) {

      // Verifica se a senha está incorreta
      if (user.senha !== senha) {
        return false;
      }

      // Se email e senha estiverem corretos,
      // salva o usuário no signal
      this.userAuth.set(user);

      // Salva o usuário no localStorage
      // Isso permite manter o login mesmo após atualizar a página
      localStorage.setItem(
        USER_STORAGE_KEY,
        JSON.stringify(user)
      );

      // Retorna true indicando que o login foi bem-sucedido
      return true;
    }

    // Se não encontrar o usuário, retorna false
    return false;
  }
}
