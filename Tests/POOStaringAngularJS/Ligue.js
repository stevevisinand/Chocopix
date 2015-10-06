
var Ligue = function(strName){

    this.strName = strName;
    this.tab_superHeroes = [];

};

Ligue.prototype.addHero = function (Hero) {
    this.tab_superHeroes.push(Hero);
};

Ligue.prototype.getSize = function (){
  return this.tab_superHeroes.length;
};

Ligue.prototype.deletehero = function(hero){
    console.log("remove " + hero.strLastName);

    var index = this.tab_superHeroes.indexOf(hero);
    this.tab_superHeroes.splice(index, 1);
};