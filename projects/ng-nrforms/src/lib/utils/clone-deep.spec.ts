import { cloneDeep } from './clone-deep';

describe('clone deep', () => {
  it('should clone a Date object', () => {
    const dateOriginal = new Date();
    const dateCloned = cloneDeep(dateOriginal);


    expect(dateOriginal).not.toBe(dateCloned);
    expect(dateCloned instanceof Date).toBeTruthy();
    expect(dateOriginal.toISOString()).toEqual(dateCloned.toISOString());
  });
});
