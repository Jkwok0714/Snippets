//Dynamic programming approach

var range = function (n, elm) {
  var out = [];
  for (var i = 0; i < n; i++) {
    if (Array.isArray(elm)) {
      out.push(elm.slice());
    } else {
      out.push(elm);
    }
  }
  return out;
};

var knapsack = function (maxWeight, weights, vals, n) {
  var table = range(vals.length + 1, range(maxWeight + 1, 0));
  // i = rows, w = cols
  // weights = rows
  // maxWeight = cols
  for (var i = 0; i < n + 1; i++) {
    // w = the currentMax weight when we build it up
    for (var w = 0; w < maxWeight + 1; w++) {
      if (i === 0 || w === 0) {
        table[i][w] = 0;
        // if the current weight of the item can fit in w space
      } else if (weights[i - 1] <= w) {
        // table[i][w] is the max of the current items value + the val of
        // the items if we minus out the weight
        // or the weight if we didn't add it in
        table[i][w] = Math.max(vals[i - 1] + table[i - 1][w - weights[i - 1]], table[i - 1][w]);
      } else {
        // otherwise the value of the the current position is = to the the row above
        table[i][w] = table[i - 1][w];
      }
    }
  }
  return table[n][maxWeight];
};

var val = [6000, 100, 120, 1000];
var wt = [50, 20, 30, 5];
var W = 50;
var n = val.length;

console.log(knapsack(W, wt, val, n));

// ==== Original BRUTALO FORCE ====
var knapsack = function(goods, maximumWeight) {
    if (maximumWeight <= 0) return 0;
    if (!Array.isArray(goods)) throw 'Goods should be an array';
    let maximumWorth = 0;

    let determineNext = (goodsLeft, worth, weight) => {
      //base case: out of goods
      if (goodsLeft.length === 0) {
        return;
      }
      //Look for what can be taken
      for (var i = 0; i < goodsLeft.length; i++) {
        if (weight + goodsLeft[i].weight > maximumWeight) {
          //base case: out of weight capacity
          if (worth > maximumWorth) maximumWorth = worth;
        } else {
          //We can add this item. try adding it to weight and cost and see
          //One optimization may be to temp store the item we took out
          //  and put it back after recursive call instead of passing the array in
          let newGoodsLeft = goodsLeft.slice(0).splice(i, 1);
          determineNext(newGoodsLeft, worth + goodsLeft[i].price, weight + goodsLeft[i].weight);
        }
      }

    }
    determineNext(goods, 0, 0);

    return '$' + maximumWorth;
};

//I'm guessing there will be a constraint of better time complexity soon

// TODO: Write test cases!
let goods = [
  { id: 1, weight: 5, price: 10 },
  { id: 2, weight: 1, price: 100 },
  { id: 3, weight: 3, price: 50 },
  { id: 4, weight: 2, price: 10 },
  { id: 5, weight: 1, price: 400 },
  { id: 6, weight: 3, price: 200 },
  { id: 7, weight: 7, price: 3000 }
  ];

let weight;

weight = 9;
console.log('With weight ' + weight, knapsack(goods, weight));
weight = 12;
console.log('With weight ' + weight, knapsack(goods, weight));
weight = 3;
console.log('With weight ' + weight, knapsack(goods, weight));
weight = 7;
console.log('With weight ' + weight, knapsack(goods, weight));
