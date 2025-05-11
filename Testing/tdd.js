const isPalindrome = (x) => {
    if (!x) return null;
    let str = x.toString();
    str = str.toLowerCase();
    return str === str.split('').reverse().join('');
  };
  
  module.exports = isPalindrome;
  