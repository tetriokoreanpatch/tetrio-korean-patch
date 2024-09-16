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
            "`${n} seconds`": "`${n}초`",
            "`${n} minutes`": "`${n}분`",
            "`${n} hours`": "`${n}시간`",
            "`${n} days`": "`${n}일`",
            "`${n} months`": "`${n}개월`",
            "`${n} years`": "`${n}년`",

            ".toLocaleString()": `.toLocaleString('ko-KR')`,
            '.toLocaleString("en-US")': `.toLocaleString('ko-KR')`,

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

            '"CLEAR!"': '"클리어!"',
            '"REVIVE!"': '"부활!"',
            '"REVIVED!"': '"부활!"'

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
    image_width = text_width + 10
    image_height = text_height + 10

    # 흰색 배경의 이미지 생성
    image = Image.new('RGBA', (image_width, image_height), (0, 0, 0, 0))

    # 이미지를 그리기 위한 객체 생성
    draw = ImageDraw.Draw(image)

    # 텍스트 그리기 (중앙에 위치시키기)
    text_x = (image_width - text_width) // 2
    text_y = (image_height - text_height) // 2 - 7
    draw.text((text_x, text_y), char, font=font, fill=(255, 255, 255), stroke_fill=(255, 255, 255), stroke_width=1)

    image = image.resize([image_width // 2, image_height // 2], Image.Resampling.BILINEAR)
    image = image.resize([image_width // 2 * 2, image_height // 2 * 2], Image.Resampling.BILINEAR)
    image.save('./hun1/__' + str(ord(char)) + ".png")

usedchars = []
for chr in trans:
    if ord(chr) >= 0xAC00 and ord(chr) <= 0xD7A3 and ord(chr) not in usedchars:
        usedchars.append(ord(chr))
        create_image_with_text(chr, "./BMHANNAAir_ttf.ttf", 52)