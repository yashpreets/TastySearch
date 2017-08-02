var noOfQueriesToGenerate = 100000;
var cnt = noOfQueriesToGenerate;
while(cnt--){
    var querySet = [];
    querySet.push(generateRandomQuery());
}

function generateRandomQuery(){
    var noOfWords = Math.floor((Math.random()*10+ Math.random()*10 +1));
    var query = "";
    for(var i = 0;i<noOfWords;i++){
        query += generateRandomWord()+" ";
    }
    return query;
}

function generateRandomWord() {
  var length = Math.floor((Math.random()*10+Math.random()*10 +1));
  var text = "";
  var possible = "abcdefghijklmnopqrstuvwxyz";
  for (var i = 0; i < length; i++){
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}