console.log('demo------');

window.g_bus.addListener('ws:refresh:report', (data) => {
  console.log('demo receive data :>> ', data);
});
console.log('addListener');
window.g_bus.addListener('update:basicInfo', (data) => {
  console.log('demo receive data update:basicInfo:>> ', data);
});
