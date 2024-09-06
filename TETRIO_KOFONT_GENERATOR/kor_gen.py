from PIL import Image
from PIL import ImageFont
from PIL import ImageDraw
from PIL import ImageFilter

trans = """
     const SOURCE_TRANSLATIONS = {
            '"SINGLE"': '"싱글"',
            '"DOUBLE"': '"더블"',
            '"TRIPLE"': '"트리플"',
            '"QUAD"': '"쿼드"',
            '"\\fc3MINI\\f5 %%PIECE%%-spin"': '"\\fc3미니\\f5 %%PIECE%%-스핀"',
            '"%%PIECE%%-spin"': '"%%PIECE%%-스핀"',
            '"back-to-back"': '"백-투-백"',
            '"BACK-TO-BACK"': '"백-투-백"',
            '"ALL\\nCLEAR"': '"\\fc5 올 클리어"',
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
            "create(`\\fc3FLOOR \\fc9${l}\\f3\\n\\n${e[l]}`)": "create(`\\fc9${l}\\fc4층\\f3\\n\\n${e[l]}`)",
            '"B2B \\fc3X":`B2B \\fc3X\\f5': '"백투백 \\fc3X":`백투백 \\fc3X\\f5',
            "${r} \\fc3PLAYING NOW": "${r} \\fc3명 플레이 중",
        }
        const SOURCE_TRANSLATIONS_REGEX = [
            [/create\("(.*?)\\f3S LEFT"\)/gi, 'create\("$1\\f3초 남았습니다"\)']
        ]
"""

def create_image_with_text(char, font_path, font_size):
    # 폰트 불러오기
    font = ImageFont.truetype(font_path, font_size)

    # 글자의 크기 계산
    left, top, right, bottom = font.getbbox(str(char))
    text_width = right - left
    text_height = bottom - top

    # 이미지 크기 결정 (여유 공간을 위해 10픽셀 추가)
    image_width = text_width
    image_height = text_height + 10

    # 흰색 배경의 이미지 생성
    image = Image.new('RGBA', (image_width, image_height), (0, 0, 0, 0))

    # 이미지를 그리기 위한 객체 생성
    draw = ImageDraw.Draw(image)

    # 텍스트 그리기 (중앙에 위치시키기)
    text_x = (image_width - text_width) // 2
    text_y = (image_height - text_height) // 2 - 7
    draw.text((text_x, text_y), char, font=font, fill=(255, 255, 255), stroke_width=2, stroke_fill=(255, 255, 255, 128))

    image.save('./hun1/__' + str(ord(char)) + ".png")

usedchars = []
for chr in trans:
    if ord(chr) >= 0xAC00 and ord(chr) <= 0xD7A3 and ord(chr) not in usedchars:
        usedchars.append(ord(chr))
        create_image_with_text(chr, "./BMHANNAAir_ttf.ttf", 52)