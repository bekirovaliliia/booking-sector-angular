export  class Tournament {
  id: number;
  name: string;
  description: string;
  preparationTerm: number;

  constructor(id: number, name: string, description: string, preparationTerm: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.preparationTerm = preparationTerm;
  }
}
