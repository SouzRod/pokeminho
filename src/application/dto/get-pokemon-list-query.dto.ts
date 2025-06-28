import { IsNumberString } from 'class-validator';

export class GetPokemonListQueryDTO {
  @IsNumberString()
  offset: string;

  @IsNumberString()
  limit: string;
}
