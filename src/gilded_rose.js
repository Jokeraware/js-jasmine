class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      // Si ce n'est pas Aged Brie et Backstage
      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        // Si quality > 0 et ce n'est pas Sulfuras
        if (this.items[i].quality > 0 && this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
          // quality diminue de 1
          this.items[i].quality = this.items[i].quality - 1;
        }
      }
      else {
        // Sinon si quality < 50
        if (this.items[i].quality < 50) {
        // quality augmente de 1
        this.items[i].quality = this.items[i].quality + 1;
          // Spécial si c'est Backstage, sellIn < 11 et quality < 50
          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert' && this.items[i].sellIn < 11 && this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
          // Spécial si Backstage, sellIn < 6 et quality < 50
          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert' && this.items[i].sellIn < 6 && this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }

      // Si ce n'est pas Sulfuras, sellIn diminue de 1
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }

      // Si la date de péremption est passée, sellIn < 0
      if (this.items[i].sellIn < 0) {
        // Si ce n'est pas Aged Brie et Backstage
        if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
          if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
            this.items[i].quality = this.items[i].quality - 1;
          } else {
          // Si quality = 0
          this.items[i].quality = 0;
          }
        } else {
          // Si quality est sup à 50
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }
    return this.items;
  }
};

module.exports = {
  Item,
  Shop
}
