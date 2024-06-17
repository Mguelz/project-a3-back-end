import { CreateLoginDto } from './login.dto';

describe('LoginDto', () => {
  it('should be defined', () => {
    expect(new CreateLoginDto()).toBeDefined();
  });
});
