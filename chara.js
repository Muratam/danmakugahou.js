const readline = require('readline');



// 数字:その出目に,R:振り直し,D:除外
let print = console.log;

function range(a, b) {
  let result = [];
  for (let i = a; i < b; i++) result.push(i);
  return result;
}

function when(sum, dice, id) {
  // dice: 0はダミー
  //和
  if (id === 31) return [sum == 9, "合計 9"];
  if (id === 32) return [sum == 12, "合計 12"];
  if (id === 34) return [sum >= 13, "合計 13 以上"];
  if (id === 42) return [sum >= 17, "合計 17 以上"];
  if (id === 55) return [sum >= 23, "合計 23 以上"];
  if (id === 64) return [sum >= 30, "合計 30 以上"];
  if (id === 75) return [sum >= 38, "合計 38 以上"];
  if (id === 84) return [sum >= 46, "合計 46 以上"];
  if (id === 35) return [sum <= 8, "合計 8 以下"];
  if (id === 43) return [sum <= 11, "合計 11 以下"];
  if (id === 53) return [sum <= 12, "合計 12 以下"];
  if (id === 61) return [sum <= 12, "合計 12 以下"];
  if (id === 73) return [sum == 13, "合計 13 以下"];
  if (id === 82) return [sum <= 11, "合計 11 以下"];

  // ~が出ていない
  if (id === 33) return [dice[4] + dice[6] === 0, "4 6 が出ていない"];
  if (id === 37) return [dice[1] + dice[3] + dice[5] === 0, "1 3 5 が出ていない"];
  if (id === 44) return [dice[1] + dice[2] === 0, "1 2 が出ていない"];
  if (id === 45) return [dice[3] + dice[4] === 0, "3 4 が出ていない"];
  if (id === 46) return [dice[5] + dice[6] === 0, "5 6 が出ていない"];
  if (id === 51) return [dice[2] + dice[4] + dice[6] === 0, "2 4 6 が出ていない"];
  if (id === 57) return [dice[1] + dice[2] + dice[3] === 0, "1 2 3 が出ていない"];
  if (id === 74) return [dice[1] + dice[2] + dice[3] + dice[4] === 0, "1 2 3 4 が出ていない"];
  if (id === 83) return [dice[2] + dice[3] + dice[4] + dice[5] + dice[6] === 0, "2 3 4 5 6 が出ていない"];

  // ある指定した数字の出目が...
  if (id === 47) return [dice[2] + dice[4] + dice[6] >= 4 || dice[1] + dice[3] + dice[5] >= 4, "偶数か奇数の出目が 4 以上"];
  if (id === 56) return [dice[1] + dice[2] + dice[3] >= 5, "1 2 3 の出目が 5 以上"];
  if (id === 65) return [dice[2] + dice[4] + dice[6] >= 6, "2 4 6 の出目が 6 以上"];
  if (id === 71) return [dice[1] + dice[2] >= 7, "1 2 の出目が 7 以上"];

  // 同じ数のものが...
  if (id === 41) return [!dice.some(x => x >= 2), "出目が全て異なる"];
  if (id === 36) return [dice.some(x => x >= 2), "同じ出目が 2 以上"];
  if (id === 54) return [dice.some(x => x >= 4), "同じ出目が 4 以上"];
  if (id === 63) return [dice.some(x => x >= 5), "同じ出目が 5 以上"];
  if (id === 72) return [dice.some(x => x >= 6), "同じ出目が 6 以上"];
  if (id === 81) return [dice.some(x => x >= 7), "同じ出目が 7 以上"];
  if (id === 62) return [dice.sort()[1] >= 1, "出目が 6種類"];
  if (id === 52) return [dice.sort()[2] > 0, "出目が 5種類以上"];
  if (id === 66) return [dice.sort()[4] === 0, "出目が 2種類"];
}

function changeable(dice, id) {
  function impl() {
    if (id === 31) return [
      [
        [null, null, null, 3, 4, 5],
        [null, null, null, 3, 4, 5]
      ], "4,5,6 を 2 個 -1"
    ];
    if (id === 32) return [
      [
        [2, 3, 4, null, null, null],
        [2, 3, 4, null, null, null]
      ], "1,2,3 を 2 個 +1"
    ];
    if (id === 33) return [
      ["R", null, "R", null, "R", null], "奇数 を 1個 振り直し"
    ];
    if (id === 34) return [
      ["R", "R", "R", "R", null, null], "1,2,3,4 を 1個 振り直し"
    ];
    if (id === 35) return [
      [null, null, "R", "R", "R", "R"], "3,4,5,6 を 1個 振り直し"
    ];
    if (id === 36) return [
      ["D", "D", "D", "D", "D", "D"], "ダイス を 1個 除外"
    ];
    if (id === 37) return [
      [null, "R", null, "R", null, "R"], "偶数 を 1個 振り直し"
    ];
    if (id === 41) return [
      ["R", "R", "R", "R", "R", "R"], "ダイス を 1個 振り直し"
    ];
    if (id === 42) return [
      ["A", null, null, null, null, null], "1 を 1個 任意に"
    ];
    if (id === 43) return [
      [null, null, null, null, null, "A"], "6 を 1個 任意に"
    ];
    if (id === 44) return [
      [2, 3, 4, 5, 6, null], "ダイス を 1個 +1"
    ];
    if (id === 45) {
      let s = dice.map((x, i) => x === 1 ? i : 0).sort().filter(x => x > 0);
      return [
        [s, s, s, s, s, s], "ダイス を 1個 数が1個の任意の出目に"
      ]
    }
    if (id === 46) return [
      [null, 1, 2, 3, 4, 5], "ダイス を 1個 -1"
    ];
    if (id === 47) return [
      [
        [null, "D", null, "D", null, "D"],
        [null, "D", null, "D", null, "D"],
        [null, "D", null, "D", null, "D"]
      ], "偶数 を 3個 除外してから 4個 追加"
    ]
    if (id === 51) return [
      [
        [2, 4, 6], null, [2, 4, 6], null, [2, 4, 6], null
      ], "奇数 を 1個 偶数 に"
    ]
    if (id === 52) return [
      null, "偶数か奇数を選んで全て降り直し"
    ];
    if (id === 53) {
      let s = dice.map((x, i) => x > 0 ? [x, i] : false).filter(x => x)[0][1];
      return [
        [s, s, s, s, s, s], "ダイス を 1個 最小の出目に"
      ]
    }
    if (id === 54) return [
      [
        [null, null, null, null, "A", null],
        [null, null, null, null, "A", null],
      ], "5 を 2個 任意に"
    ];
    if (id === 55) {
      let s = dice.map((x, i) => x > 0 ? [x, i] : false).filter(x => x)[0];
      s = s[s.length - 1];
      return [
        [s, s, s, s, s, s], "ダイス を 1個 最大の出目に"
      ]
    }
    if (id === 56) return [
      ["D", 1, 1, 2, 2, 3], "ダイス 1個 を半分(切捨)の値に,0は除外"
    ];
    if (id === 57) return [
      [6, 5, 4, 3, 2, 1], "ダイス 1個 を 裏返す"
    ];
    if (id === 61) return [
      [
        [null, 1,
          [1, 2],
          [1, 2, 3],
          [1, 2, 3, 4],
          [1, 2, 3, 4, 5]
        ]
      ], "ダイス 1個 を 元の値未満の任意値に"
    ];
    if (id === 62) return [
      null, "同じ出目のダイス 2個 を除外して 3個追加"
    ];
    if (id === 63) return [
      [
        [2, 3, 4, 5, 6, null],
        [null, 1, 2, 3, 4, 5],
      ], "ダイス 1個 を -1 して ダイス 1個 を +1"
    ]
    if (id === 64) return [
      [
        [2, 3, 4, 5, 6],
        [3, 4, 5, 6],
        [4, 5, 6],
        [5, 6],
        6,
        null
      ], "ダイス 1個 を 元の値より大きいの任意値に"
    ];
    if (id === 65) return [
      [
        [4, 4, 4, 4, 4, 4],
        [4, 4, 4, 4, 4, 4],
      ], "ダイス 2個 を 4 に"
    ]
    if (id === 66) {
      let val = dice.map((x, i) => x > 0 ? i : false).filter(x => x);
      return [
        [
          [val, val, val, val, val, val]
        ], "ダイス 1個を今場にある任意の出目に"
      ]
    }
  }
  let [result, text] = impl();
  if (result !== null) {
    if (result.some(x => !Array.isArray(x))) result = [result];
    result[0] = result[0].map(x => x !== "A" ? x : [1, 2, 3, 4, 5, 6]);
  }
  return [result, text];
}

function beforeChara(dice, id) { }

function afterChara(dice, id) {
  if (id === 47) return 4;
  if (id === 63) return 3;
}

// [選択可能,...] 返却 => 2選択 => 変更
function setupCharas() {
  const charasByLevel = [
    ["チルノ", "ミスティア", "リグル", "ルーミア", "レティ", "慧音", "橙"],
    ["アリス", "てゐ", "にとり", "メルラン", "リリカ", "ルナサ", "美鈴"],
    ["優曇華院", "パチュリー", "咲夜", "早苗", "魔理沙", "妖夢", "霊夢"],
    ["レミリア", "衣玖", "永琳", "幽香", "幽々子", "藍"],
  ];
  let result = [];
  let level = 3;
  for (let charas of charasByLevel) {
    let index = 1;
    for (let chara of charas) {
      let id = level * 10 + index;
      result.push({
        name: chara,
        id: id,
        when: (sum = 0, dice = [0, 1, 2, 3, 4, 5, 6]) => when(sum, dice, id),
        change: (dice = [0, 1, 2, 3, 4, 5, 6]) => changeable(dice, id),
      })
      index++;
    }
    level++;
  }
  return result;
}

let charas = setupCharas();
let level = 3;
let gots = [];

function getAvailable(dices = null) {
  function formatDice(dices) {
    let result = [0, 0, 0, 0, 0, 0, 0];
    for (let dice of dices) result[dice]++;
    return result;
  }
  let result = charas.filter(x => x.id < level * 10 + 10)
    .filter(x => gots.length === 0 ? true : gots.find(y => y !== x.id));
  if (dices === null) return result;
  let formatted = formatDice(dices);
  return result.filter(x => Math.floor(x.id / 10) === dices.length).filter(x => x.when(dices.reduce((a, b) => a + b), formatted)[0]);
}

function printTurn() {
  print("Current Characters:");
  print(gots);
  print("Availables:");
  print(getAvailable().map(x => [x.name, x.when()[1], x.change()[1]]));
  print("input level");
}

function tryDice(level) {
  return range(0, level).map(x => 1 + Math.floor(Math.random() * 6)).sort();
}


let state = 0;
let dices = [];
printTurn();
readline.createInterface({
  input: process.stdin,
  output: process.stdout
}).on("line", line => {
  function lineLimit(min, max) {
    if (+line > max || +line < min) {
      print(`input : ${min} ~ ${Math.min(max, level)}`);
      return true;
    }
    return false;
  }
  if (state === 0) {
    if (lineLimit(3, Math.min(level, 6))) return;
    dices = tryDice(+line);
    let oks = getAvailable(dices);
    print(dices);
    print(oks.map((x, i) => `${i} :: ${x.name}|${x.when()[1]}|${x.change()[1]}`));
    if (oks.length === 0) {
      print("No Cards...");
      return;
    }
    state = 1;
  } else if (state === 1) {
    let oks = getAvailable(dices);
    if (lineLimit(0, oks.length - 1)) return;
    gots.push(oks[+line].id);
    level = Math.max(level, Math.floor(1 + oks[+line].id / 10));
    printTurn();
    state = 0;
  }
});