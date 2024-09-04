from functools import reduce
from PIL import Image
import os
import re
import shutil

try:
    shutil.rmtree("hun1")
except:
    pass

os.mkdir("hun1")

im = Image.open("hun.png")
print(im.size)
def getval(l, n):
    return l.split(n + "=")[1].split(" ")[0]
with open("hun.fnt", "r") as r:
    for line in r.readlines():
        if not line.startswith("char id="): continue
        try:
            imCrop = im.crop((int(getval(line, "x")), int(getval(line, "y")), int(getval(line, "x")) + int(getval(line, "width")), int(getval(line, "y")) + int(getval(line, "height"))))
            print(getval(line, "char id"))
            imCrop.save("hun1/" + "__" + getval(line, "char id") + ".png", "png", optimize=True)
        except:
            pass
