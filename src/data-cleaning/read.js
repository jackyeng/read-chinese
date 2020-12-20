
// Requiring fs module in which 
// readFile function is defined. 
const { clear } = require('console');
const fs = require('fs') 
 
function removeAccent (str) {
    var map = {
        '-' : ' ',
        '-' : '_',
        'a' : 'ā|á|ǎ|à',
        'e' : 'ē|é|ě|è',
        'i' : 'ī|í|ǐ|ì',
        'o' : 'ō|ó|ǒ|ò',
        'u' : 'ū|ú|ǔ|ù',
    };
    
    for (var pattern in map) {
        str = str.replace(new RegExp(map[pattern], 'g'), pattern);
    };

    return str;
};
var characterObjects = "";
// Reading data in utf-8 format 
// which is a type of character set. 
// Instead of 'utf-8' it can be  
// other character set also like 'ascii' 
fs.readFile('Input.txt', 'utf-8', (err, data) => { 
    if (err) throw err; 
  
    // Converting Raw Buffer to text 
    // data using tostring function. 
    var lines = data.split('\n');
   
    var i;
    for (i = 0; i < 300; i ++){
        var row = lines[i].split('\t');
        const chinese = {
            character: row[1],
            pinyin: row[3],
            pinyinWithoutTone: removeAccent(row[3]),
            meaning: row[2],
            rank: row[0],
        }
        characterObjects += chinese;
        characterObjects += ",";
        console.log(chinese);
        console.log(",");
    };
}); 

fs.writeFile('CharacterObjects.txt', characterObjects, (err) => { 
      
    // In case of a error throw err. 
    if (err) throw err; 
}) 