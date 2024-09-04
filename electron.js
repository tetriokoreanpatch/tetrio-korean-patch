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
            '"ALL\\nCLEAR"': '"\\fc5올 클리어"',
            //'this.effects.set("allclear",new lc.generic.ns.shout(this,{size:60': 'this.effects.set("allclear",new lc.generic.ns.shout(this,{size:55',
            '"COLOR\\nCLEAR"': '"컬러\\n클리어"',
            '"LEVEL\\nCOMPLETE"': '"레벨 완료"',
            '{timer:"time",stopwatch:"time",level:"level",lines:"lines",allclears:"all clears",hold:"hold",pieces:"pieces",pieces_duo:"pieces",finesse_l:"finesse",finesse:"finesse",keys:"inputs",score:"score",spp:"score",garbage:"garbage",attack:"attack",attack_duo:"attack",vs:"VS score",kills:"KO\'s",kills_duo:"KO\'s",placement:"placement"};':
                '{timer:"시간",stopwatch:"시간",level:"레벨",lines:"줄",allclears:"올 클리어",hold:"홀드",pieces:"블록",pieces_duo:"블록",finesse_l:"피네스",finesse:"피네스",keys:"입력",score:"점수",spp:"점수",garbage:"쓰레기 줄",attack:"공격",attack_duo:"공격",vs:"경쟁 점수",kills:"처치",kills_duo:"처치",placement:"놓은 수"};',
            'create("ready")': 'create("준비")',
            'create("GO!")': 'create("시작!")',
            'this.self.hm.H.board.fx("countdown_stride").create("set"),this.sfx.Play("countdown4"),': '',
            'create(t.stats.combo-1+" \\fc3COMBO")': 'create(t.stats.combo-1+" \\fc3콤보")',
            '${t.finesse.faults} fault${1===t.finesse.faults?"":"s"}': '실수 ${t.finesse.faults}개',
            '["","HALL OF BEGINNINGS","THE HOTEL","THE CASINO","THE ARENA","THE MUSEUM","ABANDONED OFFICES","THE LABORATORY","THE CORE","CORRUPTION","PLATFORM OF THE GODS"]':
                '["","시작의 전당","호텔","카지노","투기장","박물관","버려진 사무실","실험실","코어","손상","신들의 플랫폼"]',
            '["","hall of beginnings","the hotel","the casino","the arena","the museum","abandoned offices","the laboratory","the core","corruption","platform of the gods"]':
                '["","시작의 전당","호텔","카지노","투기장","박물관","버려진 사무실","실험실","코어","손상","신들의 플랫폼"]',

            '"HYPERSPEED!!!"': '"초고속 모드!!!"',
            "`floor ${t+1}`": "`${t+1}층`",
            "create(`\\fc3FLOOR \\fc9${l}\\f3\\n\\n${e[l]}`)": "create(`\\fc9${l}\\fc3층\\f3\\n\\n${e[l]}`)",
            '"B2B \\fc3X":`B2B \\fc3X\\f5': '"백투백 \\fc3X":`백투백 \\fc3X\\f5'
        }
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
        //src = src.replace("state:n.gsm.stats.zenith.speedrun?10===n.gsm.stats.zenith.floor?\"win\":\"on\":\"off\"", "state:\"on\"");

        //src = src.replaceAll("rl.get(\"hun\")", "rl.get(\"seg\")");
        /*src = src.replaceAll(`onenter:()=>{na.PlayBgmSmoothly(document.body.classList.contains("inpair")||document.body.classList.contains("matchmaking")?"touhoudaiensei":"kuchu-toshi"),document.body.classList.contains("inpair")||document.body.classList.contains("matchmaking")||Mr("online","menus"),Ps.mount("home-lb"),Ps.mount("menus-persistent-mpu",!0),Ht("Homebanner")}`, `onenter:()=>{
              Kt({header:"Enjoyed Duo?",msg:\`The Duo mod is a <b>TETR.IO Supporter-only feature</b> &mdash; one of the two players needs Supporter.<br><b>$\{St(xt("zenith_party_other_username").textContent.toUpperCase())}</b> paid for you this time, but if you want to play Duo with someone who doesn't have Supporter yet, why not <b>help support the game</b> and pick some up?\`,color:"#ff9d00",icon:"/res/icon/friends.svg",classes:["snotify"],timeout:15e3,onclick:e=>{xi(),e()}})
             }`)*/

        //TODO: ADD SRC FETCH

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
        //TODO: ADD DATA
        callback({
            type: 'image/png',
            data: "",
            encoding: 'base64-data-url'
        });
    }
});

createRewriteFilter("Korean Font Fnt", "https://tetr.io/res/font/hun.fnt", {
    enabledFor: async (storage, request) => {
        return true;
    },
    onStop: async (storage, url, src, callback) => {
        //TODO: ADD DATA
        callback({
            type: 'image/png',
            data: "",
            encoding: 'base64-data-url'
        });
    }
});