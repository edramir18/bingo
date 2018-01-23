
const bingorows = [
    "333111111",
    "332211111",
    "322221111",
    "222222111"
];
const bingocols = [
    "331111",
    "322111",
    "222211"
];

console.log(bingorows);
console.log(bingocols);

function random(n) {
    return Math.floor(Math.random() * n);
}

function randomString(s) {    
    const arr = s.split("");
    const result = []
    while(arr.length > 0){        
        const item = arr.splice(random(arr.length),1);
        result.push(Number(item[0]));
    }
    return result;
}

function fillColumn(b, s, row, col, arr){
    let stringArray = s;
    const a = arr.filter((k,i) => {
        if(stringArray.indexOf(k) >= 0){
            stringArray = stringArray.replace(String(k),"#");
            return false;
        }
        return true;
    });
    for(let i = row; i < 6; i++){        
        b[i][col] = a.shift();
    }
}

function checkFirstColumn(b, s, row, ones, twos, threes){
    if (threes == 1){
        fillColumn(b, s, row, 0, randomString("321111"));
        return;
    }
}

function checkRow(b, row){
    for(let i = 0; i<9 ;i++){
        const arr = [];
        for(let j=0; j<6; j++){
            arr.push(b[j][i]);        
        }
        let s = arr.join("");
        let zeros = s.match(/0/g) || [];
        let ones = s.match(/1/g) || [];
        let twos = s.match(/2/g) || [];
        let threes = s.match(/3/g) || [];
        zeros = zeros.length;
        ones = ones.length;
        twos = twos.length;
        threes = threes.length;

        console.log(`0: ${zeros} | 1:${ones} | 2:${twos} | 3:${threes}`);
        if(zeros > 0){
            if (i == 0){
                checkFirstColumn(b, s, row, ones, twos, threes);
            }else if (i==8){
                //check last column            
            }else{
                //check middle column
            }
        }
    }
}

const bingo = [
    randomString(bingorows[random(4)]),
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
];

checkRow(bingo, 1);

console.log(bingo);