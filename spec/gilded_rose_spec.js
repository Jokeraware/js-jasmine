const {Shop, Item} = require('../src/gilded_rose.js');
describe("Gilded Rose", function() {
  it("full test"), () => {
    const items = [
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Aged Brie", 2, 0),
      new Item("Elixir of the Mongoose", 5, 7),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
      
      new Item("Conjured Mana Cake", 3, 6),
    ];
    
    const days = Number(process.argv[2]) || 2;
    const gildedRose = new Shop(items);
    
    console.log("OMGHAI!");
    for (let day = 0; day < days; day++) {
      console.log(`\n-------- day ${day} --------`);
      console.log("name, sellIn, quality");
      items.forEach(item => console.log(`${item.name}, ${item.sellIn}, ${item.quality}`));
      gildedRose.updateQuality();
  }};

  describe("Marchandises générales", function() {
    it("date de péremption passée, la qualité se dégrade 2 fois plus", function() {
      const gildedRose = new Shop([ new Item("+5 Dexterity Vest", 0, 4)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(-1);
      expect(items[0].quality).toEqual(2);
    });

    it("la qualité ne peut pas être négative", function() {
      const gildedRose = new Shop([ new Item("+5 Dexterity Vest", 10, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(9);
      expect(items[0].quality).toEqual(0);
    });

    it("la qualité ne dépasse pas 50", function() {
      const gildedRose = new Shop([ new Item("Elixir of the Moongoose", 20, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(19);
      expect(items[0].quality).toEqual(50);
    });
  });

  describe("Aged Brie", function() {
    it("augmente sa qualité avec le temps", function() {
      const gildedRose = new Shop([ new Item("Aged Brie", 2, 4)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(1);
      expect(items[0].quality).toEqual(5);
    });
  });

  describe("Sulfuras", function() {
    it("pas de date de péremption, pas de perte de qualité", function() {
      const gildedRose = new Shop([ new Item("Sulfuras, Hand of Ragnaros", 0, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(0);
      expect(items[0].quality).toEqual(10);
    });
  })

  describe("Backstage passes", function() {
    it("la qualité augmente de 2 quand il reste 10j ou moins", function() {
      const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(9);
      expect(items[0].quality).toEqual(22);
    });

    it("la qualité augmente de 3 quand il reste 5j ou moins", function() {
      const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(4);
      expect(items[0].quality).toEqual(23);
    });

    it("la qualité tombe à 0 après le concert", function() {
      const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 0, 40)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(-1);
      expect(items[0].quality).toEqual(0);
    });
  });
});
