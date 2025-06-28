import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PokeApiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly baseUrl: string,
  ) {}

  async getPokemonList(offset: string, limit: string) {
    const url = `${this.baseUrl}/pokemon?offset=${offset}&limit=${limit}`;
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }

  async getPokemonById(id: number) {
    const url = `${this.baseUrl}/pokemon/${id}`;
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }

  async getPokemonByUrl(url: string) {
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }
}
