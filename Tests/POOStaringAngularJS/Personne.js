

var Person = function(strFirstName, strLastName, iAge){
 
    this.strFirstName = strFirstName;
    this.strLastName = strLastName;
    this.iAge = iAge;
};
Person.prototype.vieillir = function () {
    this.iAge ++;
};