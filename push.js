const webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BIgWfQpdHIdoSTdNdZGZOYWOaCO_CWyOvBu6Bz4vPveF3DdgGXr0qO5F9Xej2mKWk6HFI_-isNg9et2IBLvaQOA",
    "privateKey": "hBEgHO3WannYjom5E_rcvtu5jEUuD2uqPMkBX4VrvXM"
}

webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

const pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/e4a0J7Swx6o:APA91bF7SoDxHAoxRcJ868d-e0WTRt-utGUDGZOFz70jtlxRD2w9P1Y52foqLFl3Y5WIx6o9T8HDiqF8rVeQpmVU62e0FcGfJ6ieKJ5JFH1Uajpz1RFrdofLL7kGJ0qf2sZ-wcoqtrHm",
    "keys": {
        "p256dh": "BKL/RDyJtPUGMEFktB8eGK1ZvXVGDhbLwFf/PuHg9nU3QxBexMb52l9C4yu+i9YbPcbBJThKKMebQhHeuT1fiTU=",
        "auth": "cJULEZOKZBBN73d2gCivxw=="
    }
};
let payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
let options = {
    gcmAPIKey: '769727268694',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);