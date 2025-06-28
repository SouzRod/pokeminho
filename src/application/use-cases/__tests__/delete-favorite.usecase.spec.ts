import { DeleteFavoriteUseCase } from '../delete-favorite.usecase';

describe('DeleteFavoriteUseCase', () => {
  const mockRepo = { deleteById: jest.fn() };
  const useCase = new DeleteFavoriteUseCase(mockRepo as any);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should delete favorite by id', async () => {
    mockRepo.deleteById.mockResolvedValue(true);
    const result = await useCase.execute('1');
    expect(result).toBe(true);
    expect(mockRepo.deleteById).toHaveBeenCalledWith(1);
  });
});
