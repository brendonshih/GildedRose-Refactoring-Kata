import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  describe('updateQuality', () => {
    it('should foo', () => {
      const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe('foo');
    });

    it('should degrade by 1', () => {
      const gildedRose = new GildedRose([new Item('foo', 4, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(19)
    })

    it('should degrade by 2 if sellIn is < 0', () => {
      const gildedRose = new GildedRose([new Item('foo', -1, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(18)
    })

    it('should not degrade by quality is 0', () => {
      const gildedRose = new GildedRose([new Item('foo', 5, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0)
    })

    it('should call reduceQuality once if default', () => {
      const mockReduceQuality = jest.fn()
      const gildedRose = new GildedRose([new Item('foo', 5, 5)]);
      gildedRose.reduceQuality = mockReduceQuality;
      gildedRose.updateQuality();
      expect(mockReduceQuality.mock.calls.length).toBe(1);
    })

    it('should call reduceQuality twice if conjured', () => {
      const mockReduceQuality = jest.fn()
      const gildedRose = new GildedRose([new Item('Conjured foo', 5, 5)]);
      gildedRose.reduceQuality = mockReduceQuality;
      gildedRose.updateQuality();
      expect(mockReduceQuality.mock.calls.length).toBe(2);
    })

    it('should increase quality if name is aged brie', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 4, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(21)
    })

    it('should increase quality +1 if name includes Backstage Pass and sellIn > 10', () => {
      const gildedRose = new GildedRose([new Item('Backstage Pass', 15, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(11)
    })

    it('should increase quality +2 if name includes Backstage Pass and sellIn between 6 and 10', () => {
      const gildedRose = new GildedRose([new Item('Backstage Pass', 9, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(12)
    })

    it('should increase quality +3 if name includes Backstage Pass and sellIn under 6', () => {
      const gildedRose = new GildedRose([new Item('Backstage Pass', 4, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(13)
    })

    it('should lower quality to 0 if name includes Backstage Pass and sellIn < 0', () => {
      const gildedRose = new GildedRose([new Item('Backstage Pass', 0, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0)
    })
    
    it('should do nothing if item is Sulfuras', () => {
      const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 0, 80)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(80)
    })
  })

  describe('cleanUpItemName', () => {
    it('should return name as category string', () => {
      const gildedRose = new GildedRose([new Item('foo', 0, 10)]);
      const category = gildedRose.cleanUpItemName(0)
      expect(category).toBe('foo')
    })

    it('should return `conjured` as category if name includes conjured', () => {
      const gildedRose = new GildedRose([new Item('Conjured foo', 0, 10)]);
      const category = gildedRose.cleanUpItemName(0)
      expect(category).toBe('conjured')
    })

    it('should return `backstage pass` as category if name includes backstage pass', () => {
      const gildedRose = new GildedRose([new Item('Backstage Pass to foo', 0, 10)]);
      const category = gildedRose.cleanUpItemName(0)
      expect(category).toBe('backstage pass')
    })
  })

  describe('reduceQuality', () => {
    it('should lower quality if sellIn >= 0', () => {
      const item = new Item('foo', 1, 10)
      const gildedRose = new GildedRose([item]);
      gildedRose.reduceQuality(item)
      expect(item.quality).toBe(9)
    })
    it('should lower quality by 2 if sellIn < 0', () => {
      const item = new Item('foo', -1, 10)
      const gildedRose = new GildedRose([item]);
      gildedRose.reduceQuality(item)
      expect(item.quality).toBe(8)
    })
  })
});

