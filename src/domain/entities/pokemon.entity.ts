type PokemonProps = {
  id?: number;
  name?: string;
  types?: string[];
  weight?: number;
};

export class Pokemon {
  id: number;
  name: string;
  types: string[];
  weight: number;

  constructor(props: PokemonProps) {
    this.id = props.id ?? 0;
    this.name = props.name ?? '';
    this.types = props.types ?? [];
    this.weight = props.weight ?? 0;
  }
}
