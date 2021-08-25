import { NotFoundInterceptor } from './not-found.interceptor';

describe.skip('NoContentInterceptor', () => {
  it('should be defined', () => {
    expect(new NotFoundInterceptor()).toBeDefined();
  });
});
