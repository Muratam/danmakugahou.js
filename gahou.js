#! /bin/node
const readline = require('readline');
const _ = require("lodash");
class Chara {
  constructor(name, level, check) {
    this.name = name;
    this.level = level;
    this.check = check;
  }
}
let charas = [
  ["チルノ", 3, x => x.sum() === 9],
  ["ミスティア", 3, x => x.sum() === 12],
  ["リグル", 3, x => x[4] === 0 && x[6] === 0],
  ["ルーミア", 3, x => x.sum() >= 13],
  ["レティ", 3, x => x.sum() <= 8],
  ["慧音", 3, x => x[1] === 0 && x[3] === 0 && x[5] === 0],
  // ["橙", 3, x => , #同じ出目が二個以上
];
function sort(n) {
  let arr = [];
  while (n > 0) {
    arr.push(n % 10);
    n = Math.floor(n / 10);
  }
  arr.sort();
  let result = 0;
  for (let a of arr) result = result * 10 + a;
  return result;
}
let getTable = (() => {
  let results = { 1: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1 } };
  function impl(level) {
    if (level in results) return results[level];
    let pre = impl(level - 1);
    let next = {};
    for (let p in pre) {
      for (let i = 1; i <= 6; i++) {
        let nextKey = sort(p * 10 + i)
        if (nextKey in next) next[nextKey] += 1;
        else next[nextKey] = 1;
      }
    }
    results[level] = next;
    return next;
  }
  return impl;
})();
for (let i = 1; i <= 8; i++) getTable(i);
// [0~2]回振り直し有りで取れる確率を知りたい
// 6^3:216     <=> (5+3)C5:56
// 6^6:46656   <=> (5+6)C5:462
// 6^8:1679616 <=> (5+8)C5:1287