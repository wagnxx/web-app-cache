

window.addEventListener('load', () => {
  if (!('serviceWorker' in navigator)) {
    // Service Worker isn't supported on this browser, disable or hide UI.
    return;
  }
  if (!('PushManager' in window)) {
    // Push isn't supported on this browser, disable or hide UI.
    return;
  }
  let promiseChain = new Promise((resolve, reject) => {
    const permissionPromise = Notification.requestPermission((result) => {
      resolve(result);
    });
    if (permissionPromise) {
      permissionPromise.then(resolve);
    }
  }).then((result) => {
    if (result === 'granted') {
      execute();
    } else {
      console.log('no permission');
    }
  });
});

function execute() {
  registerServiceWorker().then((registration) => {
    registration.showNotification('Hello Wold!', {
      body: 'Simple piece of body text.\nSecond line of body text :)',
      icon: '/images/flag.jpg',
      image: '/images/flag.jpg',
    });
  });
}
