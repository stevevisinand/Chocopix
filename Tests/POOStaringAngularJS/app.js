/**
 * Created by stevevisinand on 06.10.15.
 */
(function() {

    var appHeroic = angular.module('SuperheroicJS', ['heroes-directives']);

    appHeroic.controller('HerosCtrl', function ($scope) {

        //Controller
        var batman = new Superhero("Bruce", "Wayne", "Batman", 35);
        batman.addPower("Bat-Gadgets");
        batman.addWeakness("Mosquitoes");

        var superman = new Superhero("Clark", "Kent", "Superman", 28);
        superman.addPower("Flight");
        superman.addPower("lazer eyes");
        superman.addWeakness("Kryptonit");

        var spiderman = new Superhero("Peter", "Parker", "Spiderman", 19);
        spiderman.addPower("Super grip");
        spiderman.addWeakness("Jane");

        var hulk = new Superhero("Robert", "Banner", "Hulk", 30);
        hulk.addPower("he is green !");
        hulk.addWeakness("he doesn't like green...");


        var justiceLigue = new Ligue("Justice Ligue");
        justiceLigue.addHero(batman);
        justiceLigue.addHero(superman);

        var avengers = new Ligue("Avengers");
        avengers.addHero(spiderman);
        avengers.addHero(hulk);


        //Affichage
        this.listLigues = [];
        this.listLigues.push(justiceLigue);
        this.listLigues.push(avengers);

        this.newHero = new Superhero("","","",0);

        var me = this;
        this.addHero = function(){
            justiceLigue.addHero(me.newHero);
            me.newHero = new Superhero("","","",0);
        };
    });

})();

