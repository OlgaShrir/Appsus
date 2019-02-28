
export default {
   getRandomColor,
   saveToStorage,
   loadFromStorage,
   timeConverter,
   getRandomIntInclusive
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
 }


 function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
 }


 function saveToStorage(key, value) {
    var str = JSON.stringify(value);
    localStorage.setItem(key, str);
 }

 function loadFromStorage(key) {
    var str = localStorage.getItem(key)
    return JSON.parse(str)
 }

 function timeConverter(timestamp){
     var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
   var year = timestamp.getFullYear();
   var month = months[timestamp.getMonth()];
   var date = timestamp.getDate();
   var hour = timestamp.getHours();
   var min = timestamp.getMinutes();
   var sec = timestamp.getSeconds();
   var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
   return time;
 }
