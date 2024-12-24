class Usuario {
  public nome: string;
  public matricula: string;
  public idade: number;
  public cargo: string;
  public tipo: number; // 1 para admin, 2 para comum

  constructor(nome: string, matricula: string, idade: number, cargo: string, tipo: number) {
    this.nome = nome;
    this.matricula = matricula;
    this.idade = idade;
    this.cargo = cargo;
    this.tipo = tipo;
  }
}

export default Usuario;
