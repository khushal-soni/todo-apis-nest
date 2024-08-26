import { OptionsMiddleware } from './options.middleware';

describe('OptionsMiddleware', () => {
  it('should be defined', () => {
    expect(new OptionsMiddleware()).toBeDefined();
  });
});
