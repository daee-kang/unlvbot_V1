var idCounter = 0;

function addClass(){
    idCounter++;
    var html = "<input type='text' id='class" + idCounter +"><input type='text' id='classNum" + idCounter +">";
    document.getElementById('classes').innerHTML += html;
}