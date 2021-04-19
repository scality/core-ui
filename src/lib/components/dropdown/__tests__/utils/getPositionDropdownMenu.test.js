import { getPositionDropdownMenu } from '../../utils';

describe('Testing Utils', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getPositionDropdownMenu', () => {
    it('should return an object with left and bottom keys if menu hit left and bottom frame', () => {
      const res = getPositionDropdownMenu({
        isItem: true,
        triggerSize: {
          height: 50,
          left: 60,
          right: 180,
          top: 795,
          width: 120,
        },
        size: {
          height: 100,
          left: 180,
          right: 300,
          top: 610,
          width: 120,
        },
        nbItems: 3,
        itemIndex: 1,
      });

      expect(Object.keys(res)).toEqual(['left', 'bottom']);
    });

    it('should return an object with left and top keys if menu hit left and top frame', () => {
      const res = getPositionDropdownMenu({
        isItem: true,
        triggerSize: {
          height: 50,
          left: 60,
          right: 180,
          top: 80,
          width: 120,
        },
        size: {
          height: 100,
          left: 180,
          right: 300,
          top: 80,
          width: 120,
        },
        nbItems: 3,
        itemIndex: 1,
      });

      expect(Object.keys(res)).toEqual(['left', 'top']);
    });

    it('should return an object with right and top keys if menu hit right and top frame', () => {
      const res = getPositionDropdownMenu({
        isItem: true,
        triggerSize: {
          height: 50,
          left: 890,
          right: 1010,
          top: 80,
          width: 120,
        },
        size: {
          height: 100,
          left: 170,
          right: 880,
          top: 80,
          width: 120,
        },
        nbItems: 3,
        itemIndex: 1,
      });

      expect(Object.keys(res)).toEqual(['right', 'top']);
    });

    it('should return an object with right and bottom keys if menu hit bottom and right frame', () => {
      const res = getPositionDropdownMenu({
        isItem: true,
        triggerSize: {
          height: 50,
          left: 870,
          right: 990,
          top: 610,
          width: 120,
        },
        size: {
          height: 200,
          left: 990,
          right: 1110,
          top: 610,
          width: 120,
        },
        nbItems: 4,
        itemIndex: 2,
      });

      expect(Object.keys(res)).toEqual(['right', 'bottom']);
    });

    it('should return an object with left and top keys if menu hit left frame', () => {
      const res = getPositionDropdownMenu({
        isItem: true,
        triggerSize: {
          height: 50,
          left: 180,
          right: 300,
          top: 470,
          width: 120,
        },
        size: {
          height: 100,
          left: 300,
          right: 420,
          top: 470,
          width: 120,
        },
        nbItems: 3,
        itemIndex: 1,
      });

      expect(Object.keys(res)).toEqual(['left', 'top']);
    });

    it('should return an object with right and top keys if menu hit right frame', () => {
      const res = getPositionDropdownMenu({
        isItem: true,
        triggerSize: {
          height: 50,
          left: 930,
          right: 1050,
          top: 520,
          width: 120,
        },
        size: {
          height: 100,
          left: 1050,
          right: 1170,
          top: 520,
          width: 120,
        },
        nbItems: 3,
        itemIndex: 1,
      });

      expect(Object.keys(res)).toEqual(['right', 'top']);
    });
  });
});
