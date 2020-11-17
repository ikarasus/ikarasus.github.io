importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
    console.log(`Workbox berhasil dimuat`);
else
    console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([{
        url: '/',
        revision: '1'
    },
    {
        url: '/manifest.json',
        revision: '1'
    },
    {
        url: '/nav.html',
        revision: '1'
    },
    {
        url: '/index.html',
        revision: '1'
    },
    {
        url: '/push.js',
        revision: '1'
    },
    {
        url: '/index.html',
        revision: '1'
    },
    {
        url: '/teamdetail.html',
        revision: '1'
    },
    {
        url: '/register-service-worker.js',
        revision: '1'
    },
    {
        url: '/pages/home.html',
        revision: '1'
    },
    {
        url: '/pages/team.html',
        revision: '1'
    },
    {
        url: '/pages/favorite.html',
        revision: '1'
    },
    {
        url: '/js/api.js',
        revision: '1'
    },
    {
        url: '/js/materialize.min.js',
        revision: '1'
    },
    {
        url: '/js/nav.js',
        revision: '1'
    },
    {
        url: '/js/idb.js',
        revision: '1'
    }, {
        url: '/js/db.js',
        revision: '1'
    }, {
        url: '/js/fav.js',
        revision: '1'
    },
    {
        url: '/css/materialize.min.css',
        revision: '1'
    },
    {
        url: '/css/style.css',
        revision: '1'
    },
    {
        url: '/css/fontawesome/fontawesome.min.css',
        revision: '1'
    },
    {
        url: '/css/fontawesome/all.min.css',
        revision: '1'
    },
    {
        url: '/image/football-image 1.jpg',
        revision: '1'
    },
    {
        url: '/image/football-image 2.jpg',
        revision: '1'
    },
    {
        url: '/image/premier-league-192.png',
        revision: '1'
    },
    {
        url: '/image/premier-league-512.png',
        revision: '1'
    },
    {
        url: '/css/webfonts/fa-solid-900.woff2',
        revision: '1'
    },
    {
        url: '/css/webfonts/fa-solid-900.woff',
        revision: '1'
    },
    {
        url: '/css/webfonts/fa-solid-900.ttf',
        revision: '1'
    },


    ,

]);

workbox.routing.registerRoute(
    new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 15,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
            }),
        ],
    }),
);

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate()
)

workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
    })
);

workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    workbox.strategies.cacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
            }),
        ],
    })
);

workbox.routing.registerRoute(
    new RegExp('/css/materialize.min.css'),
    workbox.strategies.cacheFirst()
);


//Push Notification
self.addEventListener('push', function(event) {
    let body;
    if (event.data) {
        body = event.data.text();

    } else {
        body = 'Push message no payload';;
    }
    const options = {
        body: body,
        image: '/image/premier-league-512.png',
        badge: '/image/premier-league-192.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});