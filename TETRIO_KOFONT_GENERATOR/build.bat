@echo off
echo Extracting
python crop_fnt.py
echo Adding Korean
python kor_gen.py
echo Packing
cd hun1
python ../gen_fnt.py
echo Moving
cd..
move hun1.fnt output/hun.fnt
move hun1_0.png output/hun.png