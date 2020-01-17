export  class Tournament {
  id: number;
  name: string;
  description: string;
  preparationTerm: number;
  tournamentStart: string;
  tournamentEnd: string;

  constructor(id?: number, name?: string, description?: string, preparationTerm?: number, tournamentStart?: string, tournamentEnd?: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.tournamentStart = tournamentStart;
    this.tournamentEnd = tournamentEnd;
    this.preparationTerm = preparationTerm;

  }
}
