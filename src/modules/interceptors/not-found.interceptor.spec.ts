import { NotFoundInterceptor } from './not-found.interceptor';

describe('NoContentInterceptor', () => {
  it('should be defined', () => {
    expect(new NotFoundInterceptor()).toBeDefined();
  });
});
