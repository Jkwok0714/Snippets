class CashAmount {
  constructor (amount) {
    this.value = amount * 100;
    this.worthInPennies = {
        hundreds: 10000,
        fifties: 5000,
        twenties: 2000,
        tens: 1000,
        fives: 500,
        ones: 100,
        quarters: 25,
        dimes: 10,
        nickels: 5,
        pennies: 1
      };
  }

  totalInPennies() {
    return this.value;
  }
  addDoubleAmount(input) {
    this.value += input * 100;

  }
  quantityOfEachDenomination() {
    var denominations = {};
    var valueLeftToCalculate = this.value;
    var numOfCurrentDenomination = 0;
    for (var denomName in this.worthInPennies) {
      numOfCurrentDenomination = Math.floor(valueLeftToCalculate/this.worthInPennies[denomName]);
      valueLeftToCalculate -= this.worthInPennies[denomName] * numOfCurrentDenomination;
      denominations[denomName] = numOfCurrentDenomination;
    }
    return denominations;
  }
  toDouble() {
    return (this.value / 100);
  }
  toDoubleString(){
    return (this.value / 100).toFixed(2).toString();
  }
}

/*
tests
*/

var expects = function(expected, actual, testname) {
  console.log('----', testname);
  console.log(expected === actual, 'expected:', expected, 'got:', actual);
}

var tests = function () {
  var cash = new CashAmount(10.50);
  expects(1050, cash.totalInPennies(), 'Total in pennies');

  cash = new CashAmount(10.50);
  cash.addDoubleAmount(29.33);
  expects(3983, cash.totalInPennies(), 'Total in pennies after adding a double');

  cash = new CashAmount(10.50);
  cash.addDoubleAmount(29.33);
  expects(39.83, cash.toDouble(), 'ToDouble returns a double');

  cash = new CashAmount(10.50);
  cash.addDoubleAmount(29.33);
  expects('39.83', cash.toDoubleString(), 'ToDoubleString returns a string');

  cash = new CashAmount(0.10);
  cash.addDoubleAmount(0.20);
  expects(30, cash.totalInPennies(), 'Adding 0.10 and 0.30 won\'t result in ' + (0.10 + 0.20));

  cash = new CashAmount(125.28);
  var denominations = cash.quantityOfEachDenomination();
  expects(1, denominations.hundreds, '125.28 should have a hundred dollar bill');
  expects(0, denominations.tens, '125.28 should have no ten dollar bills');
  expects(1, denominations.quarters, '125.28 should have a quarter');
  expects(3, denominations.pennies, '125.28 should have three pennies');


}

tests();
