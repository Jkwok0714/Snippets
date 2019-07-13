X=1;
for i in *.*; do
  mv $i $(printf %04d.%s ${X%.*} ${i##*.})
  let X="$X+1"
done