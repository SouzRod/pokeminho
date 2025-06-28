import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { Model } from 'mongoose';

import { PokemonController } from './presentation/controllers/pokemon.controller';

import { PokeApiService } from './infrastructure/external/pokeapi.service';
import { RedisService } from './infrastructure/external/redis.service';

import { PokemonMongoRepository } from './infrastructure/database/repositories/pokemon-mongo.repository';
import { PokemonSchema } from './infrastructure/database/schemas/pokemon.schema';
import { PokemonApiRepository, RedisCacheRepository } from './infrastructure/database/repositories';

import { AddFavoritePokemonUseCase } from './application/use-cases/add-favorite-pokemon.usecase';
import { GetFavoriteListUseCase } from './application/use-cases/get-favorite-list.usecase';
import { GetPokemonListUseCase } from './application/use-cases/get-pokemon-list.usecase';
import { DeleteFavoriteUseCase } from './application/use-cases/delete-favorite.usecase';
import { Pokemon } from './domain/entities';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI as string),
    MongooseModule.forFeature([{ name: 'Pokemon', schema: PokemonSchema }]),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get('POKEAPI_BASE_URL') as string,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [PokemonController],
  providers: [
    {
      provide: PokeApiService,
      useFactory: (httpService: HttpService, configService: ConfigService) =>
        new PokeApiService(httpService, configService.get('POKEAPI_BASE_URL') as string),
      inject: [HttpService, ConfigService],
    },
    {
      provide: RedisService,
      useFactory: (configService: ConfigService) =>
        new RedisService({
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
          password: configService.get('REDIS_PASSWORD'),
        }),
      inject: [ConfigService],
    },
    {
      provide: 'PokemonApiRepository',
      useFactory: (pokeApiService: PokeApiService) => new PokemonApiRepository(pokeApiService),
      inject: [PokeApiService],
    },
    {
      provide: 'PokemonRepository',
      useFactory: (pokemonModel: Model<Pokemon>) => new PokemonMongoRepository(pokemonModel),
      inject: [getModelToken('Pokemon')],
    },
    {
      provide: 'CacheRepository',
      useFactory: (redisService: RedisService) => new RedisCacheRepository(redisService),
      inject: [RedisService],
    },
    {
      provide: GetPokemonListUseCase,
      useFactory: (api, redis) => new GetPokemonListUseCase(api, redis),
      inject: ['PokemonApiRepository', 'CacheRepository'],
    },
    {
      provide: AddFavoritePokemonUseCase,
      useFactory: (repo, api) => new AddFavoritePokemonUseCase(repo, api),
      inject: ['PokemonRepository', 'PokemonApiRepository'],
    },
    {
      provide: GetFavoriteListUseCase,
      useFactory: (repo) => new GetFavoriteListUseCase(repo),
      inject: ['PokemonRepository'],
    },
    {
      provide: DeleteFavoriteUseCase,
      useFactory: (repo) => new DeleteFavoriteUseCase(repo),
      inject: ['PokemonRepository'],
    },
  ],
})
export class AppModule { }
