import * as I from ".."
import * as _ from "lodash"
class Chara {
  name: string
  lv: number
  diceDiff: number
  cond: (x: number[]) => boolean
  skill: any
  constructor(name: string, lv: number, diceDiff: number, cond: (x: number[]) => boolean, skill) {
    this.name = name;
    this.lv = lv
    this.diceDiff = diceDiff;
    this.cond = cond
    this.skill = skill
  }
}
function weightedSum(x: number[]): number {
  let result = 0
  for (let i = 1; i < x.length; i++)result += i * x[i]
  return result
}

function changeFunc(a, b) { }
function changeFunc2(a, b) { }
function rerollFunc(a) { }
function changeFunc1Or2(a, b, c) { }
let deletedNumber = -100
let charasByLevel = [
  [ // 3
    new Chara("チルノ", 3, 0, x => weightedSum(x) == 9, changeFunc2(x => x[0] >= 4 && x[1] >= 4, x => [[x[0] - 1], [x[1] - 1]])),
    new Chara("ミスティア", 3, 0, x => weightedSum(x) == 12, changeFunc2(x => x[0] <= 3 && x[1] <= 3, x => [[x[0] + 1], [x[1] + 1]])),
    new Chara("リグル", 3, 0, x => x[4] == 0 && x[6] == 0, rerollFunc(x => x % 2 == 1)),
    new Chara("ルーミア", 3, 0, x => weightedSum(x) >= 13, rerollFunc(x => x <= 4)),
    new Chara("レティ", 3, 0, x => weightedSum(x) <= 8, rerollFunc(x => x >= 3)),
    new Chara("慧音", 3, -1, x => x[1] == 0 && x[3] == 0 && x[5] == 0, changeFunc(x => true, [deletedNumber])),
    new Chara("橙", 3, 0, x => x.some(x => x >= 2), rerollFunc(x => x % 2 == 0),
  ], [  // 4
    new Chara("アリス", 4, 0, x => x.every(x => x < 2), rerollFunc(x => true)),
    new Chara("てゐ", 4, 0, x => weightedSum(x) >= 17, changeFunc(x => x == 1, x => [1, 2, 3, 4, 5, 6])),
    new Chara("にとり", 4, 0, x => weightedSum(x) <= 11, changeFunc(x => x == 6, x => [1, 2, 3, 4, 5, 6])),
    new Chara("メルラン", 4, 0, x => x[1] == 0 && x[2] == 0, changeFunc(x => true, x => [x + 1])),
    new Chara("リリカ", 4, 0, x => x[3] == 0 && x[4] == 0, changeFunc(x => true, (x, dices) => _.range(1, 7).filter(y => dices.toCounts()[y] == 1))),
    new Chara("ルナサ", 4, 0, x => x[5] == 0 && x[6] == 0, changeFunc(x => true, x => [x - 1])),
    new Chara("美鈴", 4, 1, x => (x[1] + x[3] + x[5] >= 4) || (x[2] + x[4] + x[6] >= 4), "skillOfMeirin"),
  ], [ // 5
    new Chara("イナバ", 5, 0, x => x[2] == 0 && x[4] == 0 && x[6] == 0, changeFunc(x => x % 2 == 1, x => [2, 4, 6])),
    // new Chara("パチュリー", 5,0, x => x.filterx(x >= 1).len >= 5,skillOfPache),
    new Chara("咲夜", 5, 0, x => weightedSum(x) <= 12, changeFunc(x => true, (x, dices) => [dices.min()])),
    new Chara("早苗", 5, 0, x => _.max(x) >= 4, changeFunc2(x => x[0] == 5 && x[1] == 5, x => [_.range(1, 7), _.range(1, 7)])),
    new Chara("魔理沙", 5, 0, x => weightedSum(x) >= 23, changeFunc(x => true, (x, dices) => [dices.max()])),
    new Chara("妖夢", 5, -1, x => x[1] + x[2] + x[3] >= 5, changeFunc(x => x % 2 == 1, x => [x == 1 ? deletedNumber : Math.floor(x / 2)])),
    new Chara("霊夢", 5, 0, x => x[1] == 0 && x[2] == 0 && x[3] == 0, changeFunc(x => true, x => [7 - x])),
  ], [ // 6
    new Chara("レミリア", 6, 0, x => weightedSum(x) <= 12, changeFunc(x => true, x => _.range(1, x + 1))),
    new Chara("衣玖", 6, 1, x => x.filter(x => x >= 1).length >= 6, "skillOfIku"),
    new Chara("永琳", 6, 0, x => _.max(x) >= 5, changeFunc2(x => true, x => [[x[0] + 1], [x[1] - 1]])),
    new Chara("幽香", 6, 0, x => weightedSum(x) >= 30, changeFunc(x => true, x => _.range(x + 1, 7))),
    new Chara("幽々子", 6, 0, x => x[2] + x[4] + x[6] >= 6, changeFunc2(x => true, x => [[4], [4]])),
    new Chara("藍", 6, 0, x => x.filter(x => x >= 1).length <= 2, changeFunc(x => true, (x, dices) => dices.deduplicate())),
  ], [ // 7
    new Chara("フランドール", 7, 0, x => x[1] + x[2] >= 7, changeFunc1Or2(x => true, x => [_.max([1, x - 2])], x => [[x[0] - 1], [x[1] - 1]])),
    new Chara("輝夜", 7, 0, x => _.max(x) >= 6, changeFunc2(x => true, x => [[1], [6]])),
    new Chara("小町", 7, 1, x => weightedSum(x) == 13, "skillOfKomachi"),
    new Chara("天子", 7, 0, x => x[1] == 0 && x[2] == 0 && x[3] == 0 && x[4] == 0, "skillOfTenshi"),
    new Chara("妹紅", 7, 0, x => weightedSum(x) >= 38, changeFunc1Or2(x => true, x => [_.max([6, x + 2])], x => [[x[0] + 1], [x[1] + 1]])),
  ], [ // 8
    new Chara("萃香", 8, 0, x => _.max(x) >= 7, "skillOfSuika"),
    new Chara("四季映姫", 8, 0, x => weightedSum(x) <= 11, "skillOfShiki"),
    new Chara("紫", 8, 0, x => x[2] == 0 && x[3] == 0 && x[4] == 0 && x[5] == 0, "skillOfYukari"),
    new Chara("神奈子", 8, 2, x => weightedSum(x) >= 46, "skillOfKanako"),
  ]
]


// 弾幕画報の冒険l

export function gahouAdventure(scene: I.Scene) {
  let S: I.DataStore = {
    lv: I.toStore(3),
    selectingLv: I.toStore(3),
    myCharas: new I.Store<number[]>([])
  }
  let colorScheme = I.ColorScheme.fromHue(300)
  let colors = _.range(6).map(i => I.ColorScheme.fromHue(250 - 50 * i))
  let boxOption: I.BoxOption = {
    filter: new I.Filter({
      dropShadow: { x: 3, y: 3, blur: 3, color: "#888" },
      // opacxy: 0.5
    }),
    fontSize: 43,
    isXYLeftTop: true,
    padding: { top: 15, left: 25, right: 20, bottom: 20 },
    border: { width: 2, style: "solid", radius: 5 },
    colorScheme: colorScheme,
  }
  let backGround = new I.FitBox(scene, { colorScheme: "#333", padding: 20 })
  // 所持キャラの名前,LV,能力
  let infoBox = I.FlexBox.column(backGround, {
    width: 280,
    fit: { x: "right", y: "bottom" },
    ...boxOption
  }).tree(p => {
    new I.Text(p, S.lv.to(s => `LV : ${s}`))
  })
  // そのLVで撮れるキャラクターの名前・条件・能力・確率
  let cardInfo = new I.Box(scene, {
    ...boxOption,
    width: 940, height: 460, y: 22, x: 20,
  }).tree(p => {
    new Text("I am lv" + S.selectingLv)
  })
  function setCardInfo(lv: number, force = false) {
    if (!force && S.selectingLv.getRaw() === lv) return
    cardInfo
      .to({ filter: new I.Filter({ opacity: 0 }) }, { duration: 0.2 })
      .next({
        filter: new I.Filter({ opacity: 1 }),
        colorScheme: colors[lv - 3]
      }, { duration: 0.2 })
    S.selectingLv.set(lv)
  }
  for (let i = 0; i < 6; i++) {
    let lv = i + 3
    let lvBox = new I.Box(scene, {
      ...boxOption,
      width: 150, height: 100, y: 500, x: 160 * i + 10,
      // padding: { left: 30, top: 10 },
      colorScheme: colors[i]
    }).tree(p => {
      new I.Text(p, "LV " + lv)
    }).toRelativeOnHover({ scale: 1.02 }).on("click", () => { setCardInfo(lv) })
    S.lv.regist(x => {
      lvBox.to({ colorScheme: x === lv ? colors[i] : I.ColorScheme.from("#222", "pale") })
    })
  }
  scene.reserveExecuteNextFrame(() => {
    S.lv.set(3)
    setCardInfo(3, true)
  })
}
