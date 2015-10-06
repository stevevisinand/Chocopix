
var Superhero = function( strFirstName, strLastName, strPseudo , iAge){

    // Invoke the superclass constructor on the new object
    // then use .call() to invoke the constructor as a method of
    // the object to be initialized.
    Person.call( this, strFirstName, strLastName, iAge );


    this.strPseudo = strPseudo;

    this.tab_powers = [];
    this.tab_weakness = [];

};
Superhero.prototype = Object.create( Person.prototype );

Superhero.prototype.addPower = function (strSuperPower) {
    this.tab_powers.push(strSuperPower);
};
Superhero.prototype.addWeakness = function (strWeakness){
    this.tab_weakness.push(strWeakness);
}