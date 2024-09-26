function base64ArrayBuffer(arrayBuffer) {
    /*
MIT LICENSE
Copyright 2011 Jon Leighton
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


    var base64 = ''
    var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

    var bytes = new Uint8Array(arrayBuffer)
    var byteLength = bytes.byteLength
    var byteRemainder = byteLength % 3
    var mainLength = byteLength - byteRemainder

    var a, b, c, d
    var chunk

    // Main loop deals with bytes in chunks of 3
    for (var i = 0; i < mainLength; i = i + 3) {
        // Combine the three bytes into a single integer
        chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]

        // Use bitmasks to extract 6-bit segments from the triplet
        a = (chunk & 16515072) >> 18 // 16515072 = (2^6 - 1) << 18
        b = (chunk & 258048) >> 12 // 258048   = (2^6 - 1) << 12
        c = (chunk & 4032) >> 6 // 4032     = (2^6 - 1) << 6
        d = chunk & 63               // 63       = 2^6 - 1

        // Convert the raw binary segments to the appropriate ASCII encoding
        base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
    }

    // Deal with the remaining bytes and padding
    if (byteRemainder == 1) {
        chunk = bytes[mainLength]

        a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2

        // Set the 4 least significant bits to zero
        b = (chunk & 3) << 4 // 3   = 2^2 - 1

        base64 += encodings[a] + encodings[b] + '=='
    } else if (byteRemainder == 2) {
        chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1]

        a = (chunk & 64512) >> 10 // 64512 = (2^6 - 1) << 10
        b = (chunk & 1008) >> 4 // 1008  = (2^6 - 1) << 4

        // Set the 2 least significant bits to zero
        c = (chunk & 15) << 2 // 15    = 2^4 - 1

        base64 += encodings[a] + encodings[b] + encodings[c] + '='
    }

    return base64
}


createRewriteFilter("Koreanify", "https://tetr.io/js/tetrio.js*", {
    enabledFor: async (storage, request) => {
        return true;
    },
    onStop: async (storage, url, src, callback) => {
        const SOURCE_TRANSLATIONS = {
            '"SINGLE"': '"싱글"',
            '"DOUBLE"': '"더블"',
            '"TRIPLE"': '"트리플"',
            '"QUAD"': '"쿼드"',
            '"\\fc3MINI\\f5 %%PIECE%%-spin"': '"\\fc3미니\\f5 %%PIECE%%-스핀"',
            '"%%PIECE%%-spin"': '"%%PIECE%%-스핀"',
            '"back-to-back"': '"백-투-백"',
            '"BACK-TO-BACK"': '"백-투-백"',
            '"ALL\\nCLEAR"': '"올\\n클리어"',
            //'this.effects.set("allclear",new lc.generic.ns.shout(this,{size:60': 'this.effects.set("allclear",new lc.generic.ns.shout(this,{size:55',
            '"COLOR\\nCLEAR"': '"컬러\\n클리어"',
            '"LEVEL\\nCOMPLETE"': '"레벨 완료"',
            '{timer:"time",stopwatch:"time",level:"level",lines:"lines",allclears:"all clears",hold:"hold",pieces:"pieces",pieces_duo:"pieces",finesse_l:"finesse",finesse:"finesse",keys:"inputs",score:"score",spp:"score",garbage:"garbage",attack:"attack",attack_duo:"attack",vs:"VS score",kills:"KO\'s",kills_duo:"KO\'s",placement:"placement"};':
                '{timer:"시간",stopwatch:"시간",level:"레벨",lines:"줄",allclears:"올 클리어",hold:"홀드",pieces:"블록",pieces_duo:"블록",finesse_l:"피네스",finesse:"피네스",keys:"입력",score:"점수",spp:"점수",garbage:"쓰레기 줄",attack:"공격",attack_duo:"공격",vs:"VS 점수",kills:"KO 수",kills_duo:"KO 수",placement:"순위"};',
            'create("ready")': 'create("레디")',
            'create("set")': 'create("셋")',
            'create("GO!")': 'create(e.stride?"고!":"시작!")',
            'create(t.stats.combo-1+" \\fc3COMBO")': 'create(t.stats.combo-1+" \\fc3콤보")',
            '${t.finesse.faults} fault${1===t.finesse.faults?"":"s"}': '실수 ${t.finesse.faults}개',
            '["","HALL OF BEGINNINGS","THE HOTEL","THE CASINO","THE ARENA","THE MUSEUM","ABANDONED OFFICES","THE LABORATORY","THE CORE","CORRUPTION","PLATFORM OF THE GODS"]':
                '["","시작의 전당","호텔","카지노","아레나","박물관","버려진 사무실","실험실","코어","손상","신들의 플랫폼"]',
            '["","hall of beginnings","the hotel","the casino","the arena","the museum","abandoned offices","the laboratory","the core","corruption","platform of the gods"]':
                '["","시작의 전당","호텔","카지노","아레나","박물관","버려진 사무실","실험실","코어","손상","신들의 플랫폼"]',

            '"HYPERSPEED!!!"': '"초고속 모드!!!"',
            "`floor ${t+1}`": "`${t+1}층`",
            "create(`\\fc3FLOOR \\fc9${l}\\f3\\n\\n${e[l]}`)": "create(`\\fc9${l}\\fc4층\\f3\\n\\n${e[l]}`)",
            'B2B \\fc3X': '백투백 \\fc3X',
            "${r} \\fc3PLAYING NOW": "${r} \\fc3명 플레이 중",
            "rasterizeSize:1024": "rasterizeSize:4096",
            'create("CLUTCH")': 'create("클러치")',
            "`${Math.floor(t)} seconds`": "`${Math.floor(t)}초`",
            "`${n} minutes`": "`${n}분`",
            "`${n} hours`": "`${n}시간`",
            "`${n} days`": "`${n}일`",
            "`${n} months`": "`${n}개월`",
            "`${n} years`": "`${n}년`",

            ".toLocaleString()": `.toLocaleString('ko-KR')`,
            '.toLocaleString("en-US")': `.toLocaleString('ko-KR')`,

            

            '"CLEAR!"': '"클리어!"',
            '"REVIVE!"': '"부활!"',
            '"REVIVED!"': '"부활!"'

        }
        var str = `
        const PROMPT_TRANSLATIONS = {
            "Perform a 3-Combo": "3-콤보 하기",
            "Clear 2 Doubles": "더블 2번 하기",
            "Clear a Quad": "쿼드 하기",
            "Clear 6 Lines": "6줄 지우기",
            "Clear a Double\\nusing an O-Piece": "O 블록을 사용하여\\n더블 하기",
            "Clear 4 Garbage Lines": "쓰레기 줄 4줄 지우기",
            "Clear a Double\\nusing an S or Z-Piece": "S나 Z 블록을 사용하여\\n더블 하기",
            "Clear a Triple\\nusing an L or J-Piece": "L이나 J 블록을 사용하여\\n더블 하기",
            "Perform a T-Spin Mini": "T-스핀 미니 하기",
            "Clear a T-Spin Single": "T-스핀 싱글 하기",
            "Clear a T-Spin Double": "T-스핀 더블 하기",
            "Clear an S/Z-Spin": "S/Z-스핀 하기",
            "Clear an L/J-Spin": "L/J-스핀 하기",
            "Perform a 5-Combo": "5-콤보 하기",
            "Clear 2 Lines using\\nhorizontal I-Pieces": "눕힌 I 블록으로\\n2줄 지우기",
            "Tank 4 Garbage Lines": "쓰레기 줄 4줄 탱크하기",
            "Cancel 4 Garbage Lines": "쓰레기 줄 4줄 상쇄하기",
            "Clear 4 Doubles": "더블 4번 하기",
            "Place 3 pieces in a row\\nwithout moving or rotating": "회전하거나 이동하지 않고\\n블록을 연속으로 3개 놓기",
            "Place 14 pieces in a row\\nwithout clearing any lines": "줄을 지우지 않고\\n블록을 연속으로 14개 놓기",
            "Send 6 Lines": "6줄 보내기",
            "Place 20 pieces": "블록 20개 놓기",
            "Clear 2 Doubles\\nusing S or Z-Pieces": "S나 Z 블록으로\\n더블 2번 하기",
            "Clear 2 Triples\\nusing L or J-Pieces": "L이나 J 블록으로\\n트리플 2번 하기",
            "Clear an I-Spin": "I-스핀 하기",
            "Clear a Quad in the\\nupper half of the board": "필드 절반 위에서\\n쿼드 하기",
            "Clear a T-Spin Triple": "T-스핀 트리플 하기",
            "Place 25 pieces in a row\\nwithout using Hold": "홀드 없이\\n블록을 연속으로 25개 놓기",
            "Clear 3 Triples": "트리플 3번 하기",
            "Reach B2B x4": "백투백 x4 찍기",
            "Clear a Quad in\\n2 different columns": "2개의 다른 열에서\\n쿼드 하기",
            "Use Hold on\\n12 pieces in a row": "블록을 12번 연속으로\\n홀드 하기",
            "Place 10 pieces without\\nreleasing Soft Drop": "소프트 드랍을 누른 채로\\n블록 10개 두기",
            "Have part of your stack in\\nthe top 3 rows for 3 seconds": "쌓은 블록들을\\n위쪽 3줄에 3초동안 있게 하기",
            "Clear 10 Lines without\\nclearing with T or I-pieces": "T나 I 블록을 쓰지 않고\\n10줄 지우기",
            "Clear an S/Z-Spin Triple": "S/Z-스핀 트리플 하기",
            "Clear 2 Doubles consecutively\\nusing two O-Pieces": "2개의 O 블록을 사용하여\\n더블을 연속으로 2번 하기",
            "Clear 4 T-Spin Minis": "T-스핀 미니 4번 하기",
            "Clear 6 Lines\\nusing O-Pieces": "O 블록으로\\n6줄 지우기",
            "Clear Spin-Clears\\nwith 3 different pieces": "3개의 다른 블록으로\\n스핀-클리어하기",
            "Clear 4 Quads": "쿼드 4번 하기",
            "Place 5 pieces in a row\\nwithout moving or rotating": "회전하거나 이동하지 않고\\n블록을 연속으로 5개 놓기",
            "Send 18 Lines": "18줄 보내기",
            "Clear an L/J-Spin Triple": "L/J-스핀 트리플 하기",
            "Clear 2 Quads in a row": "쿼드를 연속으로 2번 하기",
            "Clear 8 Singles without doing\\nother clears or using Hold": "다른 클리어를 하거나 홀드를 사용하지 않고\\n싱글 8번 연속으로 하기",
            "Have no Garbage Lines on\\nyour board for 4 seconds": "필드에 가비지 라인이 없는 상태를\\n4초 유지하기",
            "Rotate 100 times": "회전 100번 하기",
            "Don't cancel any\\ngarbage for 8 seconds": "8초 동안\\n쓰레기 줄 상쇄하지 않기",
            "Perform a 7-Combo": "7-콤보 하기",
            "Clear an I-Spin Double": "I-스핀 더블 하기",
            "Clear two S/Z-Spin\\nDoubles consecutively": "S/Z-스핀 더블을\\n연속으로 두번 하기",
            "Clear two L/J-Spin\\nDoubles consecutively": "L/J-스핀 더블을\\n연속으로 두번 하기",
            "Perform a Color Clear": "컬러 클리어 하기",
            "Clear 40 Lines": "40줄 지우기",
        };`

        const SOURCE_TRANSLATIONS_REGEX = [
            [/create\("(.*?)\\f3S LEFT"\)/gi, 'create\("$1\\f3초 남았습니다"\)']
        ]
        
        for (const [k, v] of Object.entries(SOURCE_TRANSLATIONS)) {
            //console.log("replace: " + k + " to " + v);
            src = src.replaceAll(k, v);
        }
        for (var a of SOURCE_TRANSLATIONS_REGEX) {
            src = src.replace(a[0], a[1]);
        }
        src = src.replace(/zenith.ns.zenithprompts(.*?)update\(e\){/gi, "zenith.ns.zenithprompts$1update(e){" + str + `
            var newe = []
            for (var asdf of e) {
                var trans = asdf;
                for (const [abab, cdcd] of Object.entries(PROMPT_TRANSLATIONS)) {
                    trans.label = trans.label.replace(abab, cdcd);
                }
                newe.push(trans);
            }
            e = newe;
        `);

        //src = src.replace("state:n.gsm.stats.zenith.speedrun?10===n.gsm.stats.zenith.floor?\"win\":\"on\":\"off\"", "state:\"on\"");

        //src = src.replaceAll("rl.get(\"hun\")", "rl.get(\"seg\")");
        /*src = src.replaceAll(`onenter:()=>{na.PlayBgmSmoothly(document.body.classList.contains("inpair")||document.body.classList.contains("matchmaking")?"touhoudaiensei":"kuchu-toshi"),document.body.classList.contains("inpair")||document.body.classList.contains("matchmaking")||Mr("online","menus"),Ps.mount("home-lb"),Ps.mount("menus-persistent-mpu",!0),Ht("Homebanner")}`, `onenter:()=>{
              Kt({header:"Enjoyed Duo?",msg:\`The Duo mod is a <b>TETR.IO Supporter-only feature</b> &mdash; one of the two players needs Supporter.<br><b>$\{St(xt("zenith_party_other_username").textContent.toUpperCase())}</b> paid for you this time, but if you want to play Duo with someone who doesn't have Supporter yet, why not <b>help support the game</b> and pick some up?\`,color:"#ff9d00",icon:"/res/icon/friends.svg",classes:["snotify"],timeout:15e3,onclick:e=>{xi(),e()}})
             }`)*/

        src += await (await fetch("https://tetriokoreanpatch.github.io/tetrio-korean-patch/translate.js")).text();

        callback({
            type: 'text/javascript',
            data: src,
            encoding: 'text'
        });
    }
})

createRewriteFilter("Korean Font Png", "https://tetr.io/res/font/hun.png", {
    enabledFor: async (storage, request) => {
        return true;
    },
    onStop: async (storage, url, src, callback) => {
        var data = await (await fetch("https://tetriokoreanpatch.github.io/tetrio-korean-patch/TETRIO_KOFONT_GENERATOR/output/hun.png")).arrayBuffer();

        callback({
            type: 'image/png',
            data: "data:image/png;base64," + base64ArrayBuffer(data),
            encoding: 'base64-data-url'
        });
    }
});

createRewriteFilter("Korean Font Fnt", "https://tetr.io/res/font/hun.fnt", {
    enabledFor: async (storage, request) => {
        return true;
    },
    onStop: async (storage, url, src, callback) => {
        var data = await (await fetch("https://tetriokoreanpatch.github.io/tetrio-korean-patch/TETRIO_KOFONT_GENERATOR/output/hun.fnt")).arrayBuffer();
        callback({
            type: 'image/png',
            data: "data:image/png;base64," + base64ArrayBuffer(data),
            encoding: 'base64-data-url'
        });
    }
});
