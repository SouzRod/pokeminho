import { AddFavoritePokemonUseCase } from '../add-favorite-pokemon.usecase';

describe('AddFavoritePokemonUseCase', () => {
  const mockRepo = {
    findById: jest.fn(),
    create: jest.fn(),
  };
  const mockApi = {
    findById: jest.fn(),
  };
  const useCase = new AddFavoritePokemonUseCase(mockRepo as any, mockApi as any);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return existing favorite if found', async () => {
    mockRepo.findById.mockResolvedValue({
      id: 1,
      name: 'pikachu',
    });
    const result = await useCase.execute('1');
    expect(result.id).toBe(1);
    expect(mockRepo.findById).toHaveBeenCalledWith(1);
    expect(mockApi.findById).not.toHaveBeenCalled();
  });

  it('should fetch from API and create if not found', async () => {
    mockRepo.findById.mockResolvedValue(undefined);
    mockApi.findById.mockResolvedValue({
      id: 2,
      name: 'bulbasaur',
    });
    mockRepo.create.mockResolvedValue({
      id: 2,
      name: 'bulbasaur',
    });
    const result = await useCase.execute('2');
    expect(result.id).toBe(2);
    expect(mockApi.findById).toHaveBeenCalledWith(2);
    expect(mockRepo.create).toHaveBeenCalledWith({
      id: 2,
      name: 'bulbasaur',
    });
  });

  it('should throw if not found in API', async () => {
    mockRepo.findById.mockResolvedValue(undefined);
    mockApi.findById.mockResolvedValue(undefined);
    await expect(useCase.execute('3')).rejects.toThrow('Pokemon not found');
  });
});
