#! /bin/node
const readline = require('readline');
const _ = require('lodash')
function sum(xs) {
  let result = 0;
  for (let i = 1; i <= 6; i++) result += i * xs[i];
  return result;
}
function max(xs) {
  let result = 0;
  for (let i = 0; i < xs.length; i++) result = Math.max(result, xs[i]);
  return result;
}
function pow(b, x) {
  if (x <= 0) return 1;
  if (x === 1) return b;
  let pow2 = pow(b, Math.floor(x / 2));
  return pow2 * pow2 * (x % 2 === 1 ? b : 1);
}
function intToDecArray(n) {
  n = parseInt(n);
  let arr = [];
  while (n > 0) {
    arr.push(n % 10);
    n = Math.floor(n / 10);
  }
  return arr;
}

function sort(n) {
  let arr = intToDecArray(n)
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
        if (nextKey in next) next[nextKey] += pre[p];
        else next[nextKey] = pre[p];
      }
    }
    results[level] = next;
    return next;
  }
  return impl;
})();

class Chara {
  constructor(args) {
    [this.name, this.level, this.check] = args;
  }
  print() {
    function skillNothingToDo(decArr, check) { return 0; }
    function skillRerollAnyoneOnce(decArr, check) {
      // 一番入れ替えて確率が高くなるはずのi番目を振り直す
      console.log(decArr);

      let decArrBase = _.cloneDeep(decArr);
      let resultMax = 0;
      for (let i = 0; i < decArr.length; i++) {
        let result = 0;
        for (let j = 1; j <= 6; j++) {
          decArr[i] = j;
          if (check(decArr)) result++;
        }
        resultMax = Math.max(resultMax, result);
        decArr[i] = decArrBase[i];
      }
      return resultMax / 6;
    }
    console.log("LV", this.level, ":", this.getPercentWithSkill(skillNothingToDo), ":", this.getPercentWithSkill(skillRerollAnyoneOnce), ":", this.name);
  }
  getPercentWithSkill(skill) {
    function decArrayToX(decArr) {
      let arr = [0, 0, 0, 0, 0, 0, 0];
      for (let d of decArr) arr[d]++;
      return arr
    }
    let denom = pow(6, this.level);
    let mole = 0;
    let table = getTable(this.level);
    for (let k in table) {
      if (this.check(decArrayToX(intToDecArray(k)))) {
        mole += table[k];
        continue;
      }
      // 降って出なかったのでスキル
      mole += table[k] * skill(intToDecArray(k), arr => this.check(decArrayToX(arr)));
    }
    return (Math.floor((mole * 100 / denom) * 100) / 100) + "%";
  }

}



console.log("LEVEL: 素で取れる確率 : １回振り直しで取れる確率 : 名前");
let charasByLevel = [
  [ // 3
    ["チルノ", 3, x => sum(x) === 9],
    ["ミスティア", 3, x => sum(x) === 12],
    ["リグル", 3, x => x[4] === 0 && x[6] === 0],
    ["ルーミア", 3, x => sum(x) >= 13],
    ["レティ", 3, x => sum(x) <= 8],
    ["慧音", 3, x => x[1] === 0 && x[3] === 0 && x[5] === 0],
    ["橙", 3, x => x.some(y => y >= 2)],
  ], [  // 4
    ["アリス", 4, x => x.every(y => y < 2)],
    ["てゐ", 4, x => sum(x) >= 17],
    ["にとり", 4, x => sum(x) <= 11],
    ["メルラン", 4, x => x[1] === 0 && x[2] === 0],
    ["リリカ", 4, x => x[3] === 0 && x[4] === 0],
    ["ルナサ", 4, x => x[5] === 0 && x[6] === 0],
    ["美鈴", 4, x => (x[1] + x[3] + x[5] >= 4) || (x[2] + x[4] + x[6] >= 4)],
  ], [ // 5
    ["イナバ", 5, x => x[2] === 0 && x[4] === 0 && x[6] === 0],
    ["パチュリー", 5, x => x.filter(y => y >= 1).length >= 5],
    ["咲夜", 5, x => sum(x) <= 12],
    ["早苗", 5, x => max(x) >= 4],
    ["魔理沙", 5, x => sum(x) >= 23],
    ["妖夢", 5, x => x[1] + x[2] + x[3] >= 5],
    ["霊夢", 5, x => x[1] === 0 && x[2] === 0 && x[3] === 0],
  ], [ // 6
    ["レミリア", 6, x => sum(x) <= 12],
    ["衣玖", 6, x => x.filter(y => y >= 1).length >= 6],
    ["永琳", 6, x => max(x) >= 5],
    ["幽香", 6, x => sum(x) >= 30],
    ["幽々子", 6, x => x[2] + x[4] + x[6] >= 6],
    ["藍", 6, x => x.filter(y => y >= 1).length <= 2],
  ], [ // 7
    ["フランドール", 7, x => x[1] + x[2] >= 7],
    ["輝夜", 7, x => max(x) >= 6],
    ["小町", 7, x => sum(x) === 13],
    ["天子", 7, x => x[1] === 0 && x[2] === 0 && x[3] === 0 && x[4] === 0],
    ["妹紅", 7, x => sum(x) >= 38],
  ], [ // 8
    ["萃香", 8, x => max(x) >= 7],
    ["四季映姫", 8, x => sum(x) <= 11],
    ["紫", 8, x => x[2] === 0 && x[3] === 0 && x[4] === 0 && x[5] === 0],
    ["神奈子", 8, x => sum(x) >= 46],
  ]
].map(x => x.map(x => new Chara(x)));
for (let charas of charasByLevel) {
  for (let chara of charas) chara.print()
  let level = charas[0].level;
  (new Chara([`LV${level}のうちの誰か`, level, x => {
    for (let i = 0; i < charas.length; i++) if (charas[i].check(x)) return true;
    return false;
  }])).print();
  break;
  console.log("-----------------------------------------");
}
// for (let i = 1; i <= 8; i++) getTable(i);
// [0~2]回振り直し有りで取れる確率を知りたい
// 6^3:216     <=> (5+3)C5:56
// 6^6:46656   <=> (5+6)C5:462
// 6^8:1679616 <=> (5+8)C5:1287