self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('message', ({ data, source: { id } }) => {
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      if (client.id !== id) client.postMessage(data);
    });
  });
});
