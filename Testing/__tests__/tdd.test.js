const isPalindrome = require('../tdd');

test('returns true for a palindrome number', () => {
  expect(isPalindrome(121)).toBe(true);
});

test('returns false for a non-palindrome number', () => {
  expect(isPalindrome(123)).toBe(false);
});

test('returns null for empty input', () => {
  expect(isPalindrome()).toBe(null);
});

test('return true is string is palidrome', () => {
    expect(isPalindrome('aba')).toBe(true);
});

test('return true is string is palidrome and different case', () => {
    expect(isPalindrome('abA')).toBe(true);
});