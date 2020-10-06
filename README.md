- [English document version](https://github.com/xang555/facerecon_dashboard/blob/master/README.en.md)
- [Lao document version](https://github.com/xang555/facerecon_dashboard/blob/master/README.md)

# FaceRecon dashboard

Web Application ສຳລັບໃຊ້ງານ [FaceRecon API](https://github.com/xang555/face_recon)

![Demo](img/my_monitor.png)

# Install

clone project ແລະ ເຂົ້າໄປທີ່ root ຂອງ project ໃຊ້ຄຳສັ່ງ

```commandline
$ npm install
```

### Run dashboard

```commandline
$ npm start
```

ຫຼັງຈາກນັ້ນເຂົ້າໄປທີ່ [http://localhost:3000](http://localhost:3000)

### Build dashboard

```commandline
$ npm build
```

# Usage

### Setting API Url

![demo](img/setting.png)

ໂດຍທົ່ວໄປ dashboard ຈະຮ້ອງ faceRecon API ຈາກ url `http://localhost:8080/api/v1` ເຊິ່ງສາມາດປ່ຽນໄດ້ໂດຍໄປທີ່ `App Setting` ແລະ ກຳນົດ API URL ທີ່ຕ້ອງການໄດ້ເລີຍ

### Login

![demo](img/login.png)

login ດ້ວຍ default authentication ເຊິ່ງສາມາດປ່ຽນໄດ້ທີ່ຫຼັງ

> username ແມ່ນ `admin` ແລະ password ແມ່ນ `admin`

### Upload know person image

![demo](img/upload.png)

ເພື່ອໃຫ້ລະບົບຈົດຈຳໃບໜ້າໄດ້ຕ້ອງໄດ້ upload ຮູບທີ່ສາມາດ detect ໃບໜ້າ ແລະ ມີຄົນຜູ້ນັ້ນຢູ່ໃນຮູບພຽງຄົນດຽວເທົ່ານັ້ນ ເພື່ອໃຫ້ລະບົບ detect ໜ້າແລ້ວແປງເປັນ embedding vector ເພື່ອ save ເກັບໄວ້ຢູ່ໃນ file ເພື່ອອ່ານຂຶ້ນມາປຽບທຽບກັບໜ້າອື່ນໆໃນພາຍຫຼັງ. ສຳລັບຮູບທີ່ upload ນັ້ນລະບົບຍັງ support ແຕ່ 1 image/person ເຊິ່ງມັນກໍ່ພຽງພໍແລ້ວຕໍ່ການ verify

### Deploy

![demo](img/deploy.png)

ຂັ້ນຕອນການ deploy ແມ່ນການໃຫ້ລະບົບ detect ໜ້າຂອງບຸກຄົນຕ່າງໆແລ້ວແປງເປັນ embedding vector ຫຼັງຈາກນັ້ນກໍ່ save ເກັບໄວ້ເປັນ file

### Add camera

![](img/camera.png)

ໃນການເພີ່ມກ້ອງນັ້ນກໍ່ໃຫ້ປ້ອນຂໍ້ມູນໃສ່ form ໃຫ້ຄົບຖວນ ກໍ່ເປັນອັນສຳເລັດ


ຫຼັງຈາກນັ້ນກໍ່ໄປທີ່ monitor ແລະ ກົດ start ກ້ອງທີ່ຕ້ອງການ ເທົ່ານີ້ກໍ່ສາມາດໃຊ້ໄດ້ແລ້ວ.

**ນັ້ນກໍ່ຄືທັງໝົດ!! `Enjoy`**

# TODO

- Drag and drop camera pannel
- add support usb camera
- new style camera pannel
- run with docker
- add english version
- write test

# Credit

dashboard ນີ້ພັດທະນາ ແລະ ປັບປຸງຕໍ່ຈາກ project ຂອງ [Vanvixay Thammavong
](https://github.com/skillmonster) ຂໍ້ຂອບໃຈມາຍັງທີ່ນີ້ດ້ວຍ!
