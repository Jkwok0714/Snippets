/*
Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

For example, given n = 3, a solution set is:

[
  "((()))",
  "(()())",
  "(())()",
  "()(())",
  "()()()"
]
*/

let generateParenthesis = (num) => {
  let results = [];

  let innerRecurse = (numOpened, numClosed, string) => {
    if (string.length === num * 2) {
      results.push(string);
    } else {
      //Still have opening brackets to use
      //We can open one or close one
      if (numOpened < num)
        innerRecurse(numOpened + 1, numClosed, string + '(');
      if (numClosed < numOpened)
        innerRecurse(numOpened, numClosed + 1, string + ')');
    }
  };
  innerRecurse(0, 0, '');

  return results;
};

// ==== TESTS ====

console.log(generateParenthesis(2));
console.log(generateParenthesis(3));
