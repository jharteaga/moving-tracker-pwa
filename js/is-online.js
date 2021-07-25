function updateOnlineStatus() {
  window.location.href = window.sessionStorage.getItem('backOnline');
}
function updateOfflineStatus() {
  window.sessionStorage.setItem('backOnline', window.location.href);
  window.location.href = '/pages/not-network.html';
}
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOfflineStatus);
