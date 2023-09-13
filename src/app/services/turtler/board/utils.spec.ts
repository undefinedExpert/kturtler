import { angleToRad } from './utils';

fdescribe('utils', () => {
  fdescribe('angleToRad', () => {
    it('should correctly convert angles to radians', () => {
      expect(angleToRad(0)).toEqual(0);
      expect(angleToRad(45)).toEqual(Math.PI / 4);
      expect(angleToRad(90)).toEqual(Math.PI / 2);
      expect(angleToRad(180)).toEqual(Math.PI);
      expect(angleToRad(360)).toEqual(2 * Math.PI);
    });

    it('should handle negative angles', () => {
      expect(angleToRad(-90)).toEqual(-Math.PI / 2);
    });
  });
});
