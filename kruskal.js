/*
* Kruskal algorithm challenge from HackerRank
* https://www.hackerrank.com/challenges/kruskalmstrsub
* */
function checkRecurs(from, to, r) {
    if (~r.join(";").split(";").indexOf(String([from, to]))) {
        return true;
    }

    if (from > to) {
        const from_c = from;
        const to_c = to;
        to = from_c;
        from = to_c;
    }

    const range = [...Array(to - from + 1)].map((_, i) => from + i);
    for (let i = 0; i < range.length; i++) {
        if (~r.join(";").split(";").indexOf(String([from, range[i]]))) {
            return checkRecurs(range[i], to, r);
        }
    }
    
    return false;
}

// set defaults just for a quick test
function kruskals(gNodes=4, gFrom=[1,1,1,1,2,3,4], gTo=[2,3,4,5,3,4,5], gWeight=[20,50,70,90,30,40,60] ) {
    let gl = gFrom.length;
    let gTo_sort = [];
    let gFrom_sort = [];
    let gWeight_sort = [];
    
    const gWeight_mapped = gWeight.map(function(el, i) {
        return { index: i, value: el, found: false };
    }).sort(function(a, b) {
        return a.value - b.value;
    });

    let gWeight_copy = [...gWeight];
    while(gWeight_copy.length) {
        let min = Math.min(...gWeight_copy);
        
        let idx = gWeight_mapped.find((el, edx) => {
            if (!el.found && el.value === min) {
                gWeight_mapped[edx].found = true;
                return el;
            }
        }).index;
        
        gFrom_sort.push(gFrom[idx]);
        gTo_sort.push(gTo[idx]);
        gWeight_sort.push(gWeight[idx]);
        
        delete gWeight_copy[gWeight_copy.indexOf(min)];
        gWeight_copy = gWeight_copy.filter(v=>v);
    }

    let gAr = [gFrom_sort[0], gTo_sort[0]];
    let gArAr = [[gFrom_sort[0], gTo_sort[0]]];
    let sum = gWeight_sort[0];

    for (let i = 1; i < gl; i++) {
        let from = gFrom_sort[i];
        let to = gTo_sort[i];
        let from_connected = null, to_connected = null;
        
        for (let i = 0; i < gArAr.length; i++) {
            if (~gArAr[i].indexOf(from)) {
                from_connected = gArAr[i][gArAr[i].indexOf(from) > 0 ? 0 : 1];
            }
            if (~gArAr[i].indexOf(to)) {
                to_connected = gArAr[i][gArAr[i].indexOf(to) > 0 ? 0 : 1];
            }
        }
        
        // console.log(from, to)
        // console.log(from_connected, to_connected, gArAr)
        
        if (from_connected && to_connected) {
            if (
                ~gArAr.join(";").split(";").indexOf(String([from_connected, to_connected])) ||
                ~gArAr.join(";").split(";").indexOf(String([to_connected, from_connected])) ||
                ~gArAr.join(";").split(";").indexOf(String([from_connected, to])) ||
                ~gArAr.join(";").split(";").indexOf(String([to, from_connected])) ||
                ~gArAr.join(";").split(";").indexOf(String([from, to_connected])) ||
                ~gArAr.join(";").split(";").indexOf(String([to_connected, from]))
            ) {
                // console.log('>contunie');
                continue;
            } else {
                if (checkRecurs(from_connected, to_connected, gArAr)) {
                    // console.log('>>contunie2');
                    continue;
                }
            }
        }
        // console.log('----------------')
    
        gArAr.push([gFrom_sort[i], gTo_sort[i]]);
        sum += gWeight_sort[i];
    }
    
    return sum;
}

// test
//const res = kruskals(4, fromSource, toSource, weightSource);
//console.log(res)
