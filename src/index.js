const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

function decodeLetters(morse_letters) {
    let word = '';
    for (let morse_letter of morse_letters) {
        word += MORSE_TABLE[morse_letter];
    }
    return word;
}

function decodeLetterToMorse(couple_letter) {
    let morse_letter = '';
    for (let couple of couple_letter) {
        switch(couple) {
            case '00': break;
            case '10': morse_letter += '.'; break;
            case '11': morse_letter += '-'; break;
            default:
        }
    }
    return morse_letter;
}
function decodeWordToMorse(coupled_letters) {
    let morse_word = [];
    let j = 0;
    for (let couple_letter of coupled_letters) {
        let morse_letter = decodeLetterToMorse(couple_letter);
        morse_word[j++] = morse_letter;
    }
    return morse_word;
}
function coupleLetters(letters) {
    let couple_letters = [];
    let k = 0;
    for (let letter of letters) {
        let tmp = '';
        let i = 1;
        let j = 0;
        let couple = [];
        for (let symbol of letter) {
            tmp += symbol;
            if (i % 2 === 0) {
                couple[j++] = tmp;
                tmp = '';
            }
            i++;
        }
        couple_letters[k++] = couple;
    }
    return couple_letters;
}

//return:'numbers array with 10 length each element'
function splitByLetters(word) {
    let letter = [];
    let letter_tmp = '';
    let k = 0;
    
    for (let i = 0, j = 0; i < word.length; i++, j++) {
        if (j === 10) {
            letter[k++] = letter_tmp;
            letter_tmp = '';
            j = 0;
        }
        letter_tmp += word[i];
    }
    letter[k++] = letter_tmp;
    
    return letter;
}

//income:'numbers with 10 length'
function splitByWords(words) {
    let decoded_sentence = '';
    for (let word of words) {
        let letters = splitByLetters(word);
        
        let coupled_letters = coupleLetters(letters);
        
        let morse_letters = decodeWordToMorse(coupled_letters);
        
        decoded_sentence += decodeLetters(morse_letters);
        decoded_sentence += " ";
    }
    return decoded_sentence.trim();
}

//income:'numbers splited by asteriks'
function decode(expr) {
    let words = expr.split('**********');
    let decoded_sentence = splitByWords(words);
    return decoded_sentence;
}

module.exports = {
    decode
}