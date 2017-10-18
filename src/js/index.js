const initialCats = [
  {
    name: "Alex",
    clickCount: 0,
    imgSrc: "img/cat1.jpg",
    nicknames: ["Alexi", "A-Bone", "Mr. A"]
  },
  {
    name: "John",
    clickCount: 0,
    imgSrc: "img/cat2.jpg",
    nicknames: ["Jonny"]
  },
  {
    name: "Sophia",
    clickCount: 0,
    imgSrc: "img/cat3.jpg",
    nicknames: ["Sophie"]
  },
  {
    name: "Matthew",
    clickCount: 0,
    imgSrc: "img/cat4.jpg",
    nicknames: ["Mr. M", "Matt"]
  },
  {
    name: "Scott",
    clickCount: 0,
    imgSrc: "img/cat5.jpg",
    nicknames: ["Scoty", "S-Boss", "Mr. S"]
  }
];
const ViewModel = function() {
  const self = this;

  this.catList = ko.observableArray([]);
  initialCats.forEach(catData => self.catList.push(new Cat(catData)));
  this.currentCat = ko.observable(this.catList()[0]);

  this.incrementCounter = function() {
    return self.currentCat().clickCount(self.currentCat().clickCount() + 1);
  };

  this.setCat = function(cat) {
    self.currentCat(cat);
  };
};

const Cat = function(data) {
  this.clickCount = ko.observable(data.clickCount);
  this.name = ko.observable(data.name);
  this.imgSrc = ko.observable(data.imgSrc);
  this.nicknames = ko.observableArray(data.nicknames);

  this.level = ko.computed(function() {
    let level = "New Born";
    if (this.clickCount() >= 200) {
      level = "Adult";
    } else if (this.clickCount() >= 100) {
      level = "Teen";
    } else if (this.clickCount() >= 50) {
      level = "Pre-Teen";
    } else if (this.clickCount() >= 10) {
      level = "Infant";
    }
    return level;
  }, this);
};

ko.applyBindings(new ViewModel());
