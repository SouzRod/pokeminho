import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../app.module';

// Atenção: para rodar esses testes, MongoDB e Redis devem estar ativos!
describe('PokemonController (integration)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/pokemon/list (GET) deve retornar lista paginada', async () => {
    const res = await request(app.getHttpServer()).get('/pokemon/list?offset=0&limit=2').expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('id');
    expect(res.body[0]).toHaveProperty('name');
  });

  it('/pokemon/favorites (GET) deve retornar array', async () => {
    const res = await request(app.getHttpServer()).get('/pokemon/favorites').expect(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('/pokemon/favorite (POST) deve adicionar favorito', async () => {
    const res = await request(app.getHttpServer()).post('/pokemon/favorite?id=1').expect(201);
    expect(res.body).toHaveProperty('id', 1);
    expect(res.body).toHaveProperty('name');
  });

  it('/pokemon/favorite (DELETE) deve remover favorito', async () => {
    const res = await request(app.getHttpServer()).delete('/pokemon/favorite?id=1').expect(200);
    expect(res.body).toHaveProperty('message');
  });
});
