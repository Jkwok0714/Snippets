var productExceptSelfN2Time = function(nums) {
    let result = [];
    for (var i = 0; i < nums.length; i++) {
        result.push(nums.reduce((acc, ele, j) => {
            console.log(acc, ele, j, i);
           return (j !== i) ? acc * ele : acc;
        }));
    }
    return result;
};

var productExceptSelfWithDiv = function(nums) {
    let result = [];
    let total = nums.reduce((acc, val) => {return acc * val});
    for (var ele of nums) {
    	result.push(total/ele);
    }
    return result;
};

var productExceptSelf = function(nums) {
    let result = [1];
    for (var i = 1; i < nums.length; i++) {
    	result[i] = result[i - 1] * nums[i - 1];
    }
    let acc = 1;
    for (var i = nums.length - 1; i >= 0; i--) {
    	result[i] *= acc;
      acc *= nums[i];
    }

    return result;
};

console.log(productExceptSelf([1,2,3,4]));
