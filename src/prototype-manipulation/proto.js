
Array.prototype.aggregate = function() {
  if (this.some( el => typeof el !== 'number')) return NaN
  return this.reduce( (cur, acc) => cur + acc )
}

console.log([1, 2, 82, 0, 21].aggregate())
console.log([1, 2, 82, 0, "abc", 21].aggregate())