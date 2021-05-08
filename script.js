import { mt_lib } from './library.js'

const btnTranslate = document.querySelector("#btn-translate");
const minion = document.querySelector("#minion-lang");
const english = document.querySelector("#english");


function translateWord(word) {
    let found = false;
    for (let w_obj in mt_lib){
        if(mt_lib[w_obj].w===word) {
            let translation = mt_lib[w_obj].r;
            found = true;
            return translation
        }
    }
    if(!found){
        return word
    }
}

function translateWordReverse(word) {
    let found = false;
    for (let w_obj in mt_lib){
        if(mt_lib[w_obj].r===word) {
            let translation = mt_lib[w_obj].w;
            found = true;
            return translation
        }
    }
    if(!found){
        return word
    }
}

function sentenceDeconstructor(sentence,mode) {
    const regex = /\w+|\S+/gm;
    const str = sentence;
    let m;
    let matches=[]
    while ((m = regex.exec(str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        
        // The result can be accessed through the `m`-variable.
        m.forEach((match, groupIndex) => {
            // console.log(`Found match, group ${groupIndex}: ${match}`);
            matches.push(match)
        });
    }
    console.log(matches)

    let translated_arr=[]

    if(mode===0) {
    for(let w in matches) {
        let translated_word = translateWord(matches[w])
        translated_arr.push(translated_word);
        // console.log(Object.values(translated_arr))
        }
    }
    else {
    for(let w in matches) {
        let translated_word = translateWordReverse(matches[w])
        translated_arr.push(translated_word);
        // console.log(Object.values(translated_arr))
        }
    }
    let translated_sentence = translated_arr.join(' ')
    translated_sentence = translated_sentence.replace(" ,",",")
    translated_sentence = translated_sentence.replace(" .",".")
    translated_sentence = translated_sentence.replace(" ?","?")
    translated_sentence = translated_sentence.replace(" !","!")
    console.log(translated_sentence)
    return translated_sentence

}



function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function translate(mode){
    if (mode===0) {
        let text = capitalizeFirstLetter(english.value);
        let translatedText = sentenceDeconstructor(text,0)
        console.log(translatedText);
        minion.value = translatedText
    }
    else {
        let text = capitalizeFirstLetter(minion.value);
        let translatedText = sentenceDeconstructor(text,1)
        console.log(translatedText);
        english.value = translatedText
    }
    
}

let inFocus = 0;

function clickHandler() {
    translate(inFocus); // argument: direction of translation  
}

btnTranslate.addEventListener("click", clickHandler);


minion.addEventListener("keydown", (e) => {
    inFocus = 1; // i.e. user is typing in minion
    const keyCode = e.which || e.keyCode;
    if (keyCode=== 13 && !e.shiftKey) {
        e.preventDefault();
        console.log(e.keyCode);
        translate(1);
       }
});

english.addEventListener("keydown", (e) => {
    inFocus = 0; // i.e. user is typing in english
    const keyCode = e.which || e.keyCode;
    if (keyCode=== 13 && !e.shiftKey) {
        e.preventDefault();
        console.log(e.keyCode);
        translate(0);
       }
});
