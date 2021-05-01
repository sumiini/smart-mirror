import cv2
import datetime
#import requests
import cognitive_face as CF
import os
import sys
from io import BytesIO
#from PIL import Image, ImageDraw
from dotenv import load_dotenv

load_dotenv()
#
# #노트북 카메라에서 영상을 읽어온다
cap = cv2.VideoCapture(0)
# print("hello")


KEY = os.getenv('FACE_API_KEY')
CF.Key.set(KEY)

BASE_URL = 'https://koreacentral.api.cognitive.microsoft.com/face/v1.0/' # 자신의 지역에 해당하는 URL
CF.BaseUrl.set(BASE_URL)


cnt=0
i=0
#얼굴 인식 캐스케이드 파일 읽는다
face_cascade = cv2.CascadeClassifier('/Users/Hong Sumin/anaconda3/Lib/site-packages/cv2/data/haarcascade_frontalface_default.xml')
arr=[1,2,3,4,5]
imgArr=[]
emoArr=[]

emoName=['anger','contempt','disgust','fear','happiness','neutral','sadness','surprise']
filePath="/Users/Hong Sumin/Desktop/smartmirror-web2/smartmirror-web/backend/python/data/"
def removeAllFile(filePath):
    if os.path.exists(filePath):
        for file in os.scandir(filePath):
            os.remove(file.path)
        return "Remove All File"
    else:
        return "Directory Not Found"
removeAllFile(filePath);

while(True):
    # frame 별로 capture 한다
    ret, frame = cap.read()
    # 좌우 반전은 1, 상하반전은 0
    frame = cv2.flip(frame,1)
    # 프레임이 제대로 읽어지지 않은 경우
    if not ret:
        print("Can't receive frame (stream end?). Exiting ...")
        break


    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    #detectMultiScale (InputArray image, std::vector< Rect > &objects, double scaleFactor=1.1, int minNeighbors=3, int flags=0, Size minSize=Size(), Size maxSize=Size())
    faces = face_cascade.detectMultiScale(gray, 1.2, 5)

    # 빨간 사각형으로 인식된 얼굴은 표시한다.
    #if len(faces)>0:
    #for (x,y,w,h) in faces:
    #cv2.rectangle(frame,(x,y),(x+w,y+h),(0,0,255),2)
    #i+=1
    if i<6:
        cv2.IMREAD_UNCHANGED
        cv2.imwrite("/Users/Hong Sumin/Desktop/smartmirror-web2/smartmirror-web/backend/python/data/" + str(i) + ".png", frame)
        #img_url = 'C:/Users/Hong Sumin/Desktop/4-1/capture/1.png' # 이미지 파일의 경로
        imgArr.append('/Users/Hong Sumin/Desktop/smartmirror-web2/smartmirror-web/backend/python/data/'+str(i)+'.png')
        i+=1

    # openCV에서 얼굴이 인식되었더라도 azure에서는 인식되지 않을 수 있음.
    if i==6:
        emoArr=[0,0,0,0,0,0,0,0]
        for j in imgArr:
            faces = CF.face.detect(j,True,False,'age,gender,emotion') # 중요!
            for face in faces:
                emoArr[0]+=face['faceAttributes']['emotion']['anger'];
                emoArr[1]+=face['faceAttributes']['emotion']['contempt'];
                emoArr[2]+=face['faceAttributes']['emotion']['disgust'];
                emoArr[3]+=face['faceAttributes']['emotion']['fear'];
                emoArr[4]+=face['faceAttributes']['emotion']['happiness'];
                emoArr[5]+=face['faceAttributes']['emotion']['neutral'];
                emoArr[6]+=face['faceAttributes']['emotion']['sadness'];
                emoArr[7]+=face['faceAttributes']['emotion']['surprise'];
        #print("faces!!!",face['faceAttributes']['emotion']['anger']) # 터미널 창에 속성값들을 출력

        # print("Max !!",emoName[emoArr.index(max(emoArr))])
        break
        i+=1

    #print("faces!!!",faces)
    #webCamera라는 이름으로 실시간 화면을 보여준다.

    #cv2.imshow('webCamera',frame)
    # q를 누르면 종료되도록 하는 코드이다.
    if cv2.waitKey(1) == ord('q'):
        break

# 메모리를 해제시켜준다.
cap.release()
cv2.destroyAllWindows()


# 데이터 node.js로 전송 (http://localhost:3001)
data = {'emotion' : emoName[emoArr.index(max(emoArr))]}
print(emoName[emoArr.index(max(emoArr))])
