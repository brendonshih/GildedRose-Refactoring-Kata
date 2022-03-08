export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  cleanUpItemName(i): String {
    let category
    let lowerCaseName = this.items[i].name.toLowerCase()
    if (lowerCaseName.includes('conjured')) {
      category = 'conjured'
    } else if (lowerCaseName.includes('backstage pass')) {
      category = 'backstage pass'
    } else {
      category = lowerCaseName
    }
    return category
  }
  reduceQuality(item) {
    if (item.quality > 0) {
      item.quality--
    }
    if (item.sellIn < 0 && item.quality > 0) {
      item.quality--
    }  
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      let category = this.cleanUpItemName(i)
      const item = this.items[i]
      
      // Updating sellIn for items other than Sulfuras
      if (category !== 'sulfuras, hand of ragnaros') {
        item.sellIn = item.sellIn - 1;
      }

      // Updating quality
      switch (category) {
        case "aged brie":
          if (item.quality < 50) {
            item.quality++
          }
          if (item.sellIn < 0 && item.quality < 50) {
            item.quality++
          }
          break
        case "backstage pass":
          if (item.sellIn < 0) {
            item.quality = 0
          } else {
            item.quality++
            if (item.sellIn < 11) {
              item.quality++
            }
            if (item.sellIn < 6) {
              item.quality++
            }
          }
          break
        case "sulfuras, hand of ragnaros":
          // do nothing if Sulfuras
          break
        case "conjured":
        default:
          this.reduceQuality(item)
          if (category === 'conjured') {
            this.reduceQuality(item)
          }
          break
      }

    }

    return this.items;
  }
}
