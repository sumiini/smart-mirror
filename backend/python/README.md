1. Download requirements.txt

   ($ pip install -r requirements.txt)

   or

   ($ pip3 install -r requirements.txt)

<br>
<br>

2. Edit the path in faceRecognition.py
```buildoutcfg
line 27 : face_cascade = cv2.CascadeClassifier('/Your_path/haarcascade_frontalface_default.xml')
line 33 : filePath="/Your_path/data/"
line 65 : cv2.imwrite("/Your_path/data/" + str(i) + ".png", frame)
line 67 : imgArr.append('/Your_path/data/'+str(i)+'.png')
```

<br>
<br>

3. Add .env file
```buildoutcfg
FACE_API_KEY = YOUR_KEY
FACE_END_POINT = YOUR_END_POINT (I think this is not necessary)
```

<br>
<br>

4. you can run in terminal like this.
```buildoutcfg
$ python faceRecognition.py
```

<br>
<br>

If you want to run in node.js, you have to follow the README.md which in parent directory.