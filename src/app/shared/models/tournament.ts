export  class Tournament {
  id: number;
  name: string;
  description: string;
  preparationTerm: number;
  isBooked: boolean

  constructor(id?: number, name?: string, description?: string, preparationTerm?: number, isBooked?: boolean) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.preparationTerm = preparationTerm;
    this.isBooked = isBooked;
  }
}
