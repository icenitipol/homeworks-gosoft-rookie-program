# HTTP Status / REST API : Homework 1

## โจทย์

```
ให้ทำการสร้าง File hw1.js 
ให้ทำการสร้างการเก็บข้อมูล พนักงานในบริษัท โดยจะต้องใช้ REST API (GET,PUT,POST,DELETE) 
โดยในกรณีของการ Update และ Delete ถ้าหากว่าส่งข้อมูล id เข้ามาผิดจะต้องทำการ Return เป็น HTTP Response 400 และบอกว่าข้อมูลไม่ถูกต้อง 
โดยข้อมูลของพนักงานกำหนดให้รับข้อมูลดังนี้ (ชื่อ,นามสกุล,รหัสพนักงาน,ตำแหน่ง,เบอร์ติดต่อ,email)

ถ้ามีข้อมูล email และ เบอร์โทรศัพท์อยู่ในระบบอยู่แล้วจะต้องไม่สามารถสร้างข้อมูลใหม่มาทับซ้อนได้และ ห้ามแก้ไขข้อมูล ชื่อ นามสกุล 
ถ้าหากเข้าเงื่อนไขเหล่านี้ให้ Return เป็น HTTP Response 400 และ ทำให้ทำการสร้าง Ngrok เพื่อใช้สำหรับการทดสอบผลลัพท์ได้
```

- ให้ทำการสร้างไฟล์ `hw1.js`
- สร้าง Router ในการ รับข้อมูล เลขจำนวน 4 ตัวเลข
- ตัวเลขทั้ง 4 จะต้องเป็นจำนวนที่ไม่เกิน 1-9 
- หากมีตัวเลขใดใน 4 ตัวมีค่าเกินกว่า 1-9 ให้ทำการ Response เป็น 403 กลับไป 
- ถ้าตัวเลขทั้ง 4 ตัวเลขนั้น เป็นตัวเลข 1-9 ทั้งหมด ให้นำตัวเลขทั้ง 4 นั้นมาคำนวนว่า สามารถ บวก ลบ คูณ หรือ หาร แล้วได้เลขเป็น 24 หรือไม่
- หากได้ให้ Return Response สูตรในการคำนวน และ บอกว่า Success
- ถ้าไม่สามารถทำได้ให้ Return Response บอกว่า Fail

## ผลลัพท์

### Success
![img](https://i.imgur.com/Moo2AGC.png)

### Failed
![img](https://i.imgur.com/W7LoAoS.png)

### Invalid
![img](https://i.imgur.com/KCma5Vb.png)