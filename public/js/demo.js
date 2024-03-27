console.log('demo------');

window.g_bus.addListener('ws:refresh:report', (data) => {
  console.log('demo receive data :>> ', data);
});
window.g_bus.addListener('update:basicInfo', (data) => {
  console.log('demo receive data :>> ', data);
});
