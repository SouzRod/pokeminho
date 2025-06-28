import { GetPokemonListUseCase } from '../get-pokemon-list.usecase';

describe('GetPokemonListUseCase', () => {
  const mockRepo = { findAll: jest.fn() };
  const mockCache = { get: jest.fn(), set: jest.fn() };
  const useCase = new GetPokemonListUseCase(mockRepo as any, mockCache as any);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return cached data if available', async () => {
    mockCache.get.mockResolvedValue('[{"id":1}]');
    const result = await useCase.execute('0', '1');
    expect(result).toEqual([{ id: 1 }]);
    expect(mockRepo.findAll).not.toHaveBeenCalled();
  });

  it('should fetch from repo and cache if not cached', async () => {
    mockCache.get.mockResolvedValue(null);
    mockRepo.findAll.mockResolvedValue([{ id: 2 }]);
    const result = await useCase.execute('0', '1');
    expect(result).toEqual([{ id: 2 }]);
    expect(mockRepo.findAll).toHaveBeenCalledWith('0', '1');
    expect(mockCache.set).toHaveBeenCalledWith('pokemon_list_0_1', JSON.stringify([{ id: 2 }]), 3600);
  });
});
