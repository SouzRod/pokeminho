import { GetFavoriteListUseCase } from '../get-favorite-list.usecase';

describe('GetFavoriteListUseCase', () => {
  const mockRepo = { findAll: jest.fn() };
  const useCase = new GetFavoriteListUseCase(mockRepo as any);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all favorites', async () => {
    mockRepo.findAll.mockResolvedValue([{ id: 1 }, { id: 2 }]);
    const result = await useCase.execute();
    expect(result).toEqual([{ id: 1 }, { id: 2 }]);
    expect(mockRepo.findAll).toHaveBeenCalled();
  });
});
