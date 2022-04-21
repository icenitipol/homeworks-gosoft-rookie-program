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
- สร้างการเก็บข้อมูลพนักงานในบริษัท โดยจะต้องใช้ REST API (GET,PUT,POST,DELETE)
- การ Update และ Delete ถ้าหากว่าส่งข้อมูล id เข้ามาผิดจะต้องทำการ Return เป็น HTTP Response 400 และบอกว่าข้อมูลไม่ถูกต้อง
- ข้อมูลของพนักงานกำหนดให้รับข้อมูลดังนี้ (ชื่อ,นามสกุล,รหัสพนักงาน,ตำแหน่ง,เบอร์ติดต่อ,email)
- ถ้ามีข้อมูล email และ เบอร์โทรศัพท์อยู่ในระบบอยู่แล้วจะต้องไม่สามารถสร้างข้อมูลใหม่มาทับซ้อน 
- ห้ามแก้ไขข้อมูล ชื่อ นามสกุล 
- ถ้าหากเข้าเงื่อนไขเหล่านี้ให้ Return เป็น HTTP Response 400
- ทำให้ทำการสร้าง Ngrok เพื่อใช้สำหรับการทดสอบผลลัพท์ได้

## ผลลัพท์

### Method
| Method | Path                |  Description |
|--------|---------------------|--------------|
| GET    | /getEmployeeData    | ดูข้อมูล       |
| POST   | /addEmployeeData    | เพิ่มข้อมูล     |
| PUT    | /updateEmployeeData | แก้ไขข้อมูล    |
| DELETE | /deleteEmployeeData | ลบข้อมูล      |

### [GET] /getEmployeeData
> ดึงข้อมูล Employee 
![img](https://i.imgur.com/Fg5VPI0.png)

### [POST] /addEmployeeData
> เพิ่มข้อมูล Employee 
![img](https://i.imgur.com/2kowm19.png)
> เพิ่มข้อมูล Employee (เมื่อข้อมูลซ้ำ)
![img](https://i.imgur.com/wpBGAxA.png)
> เพิ่มข้อมูล Employee (เมื่อข้อมูลไม่ครบ)
![img](https://i.imgur.com/aB02MXm.png)

### [PUT] /updateEmployeeData
> แก้ไขข้อมูล Employee 
![img](https://i.imgur.com/nYp081P.png)
> แก้ไขข้อมูล Employee (เมื่อไม่พบผู้ใช้)
![img](https://i.imgur.com/0WJfYBu.png)
> แก้ไขข้อมูล Employee (เมื่อข้อมูลผิดพลาด)
![img](https://i.imgur.com/7Fjonn5.png)

### [DELETE] /deleteEmployeeData
> เพิ่มข้อมูล Employee 
![img](https://i.imgur.com/2kowm19.png)
> เพิ่มข้อมูล Employee (เมื่อข้อมูลซ้ำ)
![img](https://i.imgur.com/wpBGAxA.png)