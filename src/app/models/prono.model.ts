import { Proposition } from './proposition.model';

export class Prono {
  id: number;
  auteur: string;
  intitule: string;
  propositions: Proposition[];
  difficulte: number;
  constructor() { }
}
