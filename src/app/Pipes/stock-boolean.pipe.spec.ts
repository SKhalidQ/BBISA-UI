import { StockBooleanPipe } from './stock-boolean.pipe';

describe('StockBooleanPipe', () => {
  it('create an instance', () => {
    const pipe = new StockBooleanPipe();
    expect(pipe).toBeTruthy();
  });
});
