import { Controller, Get, Post, Delete, Query } from '@nestjs/common';
import { GetPokemonListQueryDTO } from '../../application/dto/get-pokemon-list-query.dto';
import {
  AddFavoritePokemonUseCase,
  DeleteFavoriteUseCase,
  GetFavoriteListUseCase,
  GetPokemonListUseCase,
} from 'src/application/use-cases';

@Controller('pokemon')
export class PokemonController {
  constructor(
    private readonly getPokemonListUseCase: GetPokemonListUseCase,
    private readonly addFavoritePokemonUseCase: AddFavoritePokemonUseCase,
    private readonly getFavoriteListUseCase: GetFavoriteListUseCase,
    private readonly deleteFavoriteUseCase: DeleteFavoriteUseCase,
  ) { }

  @Get('list')
  async getPokemonList(@Query() query: GetPokemonListQueryDTO) {
    return this.getPokemonListUseCase.execute(
      query.offset?.toString() ?? '0',
      query.limit?.toString() ?? '10',
    );
  }

  @Get('favorites')
  async getFavoriteList() {
    return this.getFavoriteListUseCase.execute();
  }

  @Post('favorite')
  async addFavoritePokemon(@Query('id') id: string) {
    return this.addFavoritePokemonUseCase.execute(id);
  }

  @Delete('favorite')
  async deleteFavorite(@Query('id') id: string) {
    await this.deleteFavoriteUseCase.execute(id);
    return { message: 'Pokémon removido dos favoritos com sucesso.' };
  }
}
