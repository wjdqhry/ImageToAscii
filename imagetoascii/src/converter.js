export default class Converter {
    alphabet = {
        0: ["@","%","#","*","+","=","-",":","."," "],
        1: ["$","@","B","%","8","&","W","M","#","*","o","a","h","k","b","d","p","q","w","m","Z","O",
                "0","Q","L","C","J","U","Y","X","z","c","v","u","n","x","r","j","f","t","/","\\","|","(",
                ")","1","{","}","[","]","?","-","_","+","~","\<","\>","i","!","l","I",";",":",",","\"","^",
                "`","'","."," "]
    };
    getAscii = (pixels, charType, width) => {
        let string = "";
        let grayStep = Math.ceil( 255 / this.alphabet[charType].length );
        for(let i = 0; i < pixels.data.length; i+=4){
            for(let j = 0; j < this.alphabet[charType].length; j++){
                let r = pixels.data[i];
                let g = pixels.data[i+1];
                let b = pixels.data[i+2];
                if( (r * 0.2126) + (g * 0.7152) + (b * 0.0722) < (j+1) * grayStep ){
                    string += this.alphabet[charType][j];
                    break;	
                }
            }
            if( !((i/4+1) % width) ){
                string += "\n";
            }
        }
        return string;
    }
    getReverse = (pixels) => {
        for (var i = 0; i < pixels.data.length; i += 4) {
            pixels.data[i] = 255 - pixels.data[i];
            pixels.data[i+1] = 255 - pixels.data[i+1];
            pixels.data[i+2] = 255 - pixels.data[i+2];
            pixels.data[i+3] = 255;
        }
    }
}