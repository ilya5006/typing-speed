let getWords = async (event) =>
{
    let reader = new FileReader();
    let file = event.target.files[0];
    
    reader.readAsText(file);
    
    if (file.type !== 'text/plain')
    {
        alert('Загружать можно только текстовый файл!');
        return;
    }

    reader.addEventListener('load', () =>
    {
        let words = reader.result;

        wordsArray = words.split(' ');

        wordsArray.forEach((word) =>
        {
            let p = document.createElement('p');
            p.textContent = word;
            wordsDiv.insertAdjacentElement('beforeEnd', p);
        });
        
        wordsDiv.querySelector('p').classList.add('highlight');

        enterWordsInput.removeAttribute('disabled');
    });
}

let checkInput = (event) =>
{
    let inputText = event.target;
    let inputTextValue = inputText.value;
    let highlightWord = document.querySelector('.highlight');

    let isIncorrectWord = highlightWord.textContent.indexOf(inputTextValue.trim()) !== 0;

    let isFullWord = inputTextValue[inputTextValue.length - 1] === ' ';
    let isFullWordIncorrect = highlightWord.textContent !== inputTextValue.trim();

    if (isIncorrectWord)
    {
        highlightWord.classList.add('uncorrect_word');
    }
    else
    {
        highlightWord.classList.remove('uncorrect_word');
    }

    if (isFullWord)
    {
        if (isFullWordIncorrect)
        {
            console.log('incorrect');
            let incorrectWordsCountInt = parseInt(incorrectWordsCount.textContent);
            incorrectWordsCount.textContent = ++incorrectWordsCountInt;
        }
        else
        {
            console.log('correct');
            let correctWordsCountInt = parseInt(correctWordsCount.textContent);
            correctWordsCount.textContent = ++correctWordsCountInt;
        }

        highlightWord.remove();
        wordsDiv.querySelector('p').classList.add('highlight');
        inputText.value = '';
    }

}

let wordsDiv = document.querySelector('#words');
let textFileInput = document.querySelector('#text_file_input');
let enterWordsInput = document.querySelector('#enter_words');
let correctWordsCount = document.querySelector('#correct_words_count');
let incorrectWordsCount = document.querySelector('#incorrect_words_count');

let wordsArray = [];


textFileInput.addEventListener('input', (event) =>
{
    getWords(event);
});
enterWordsInput.addEventListener('input', (event) =>
{
    checkInput(event);
});