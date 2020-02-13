let start = () =>
{
    enterWordsInput.value = '';
    enterWordsInput.removeAttribute('disabled');

    correctWordsCount.textContent = 0;
    incorrectWordsCount.textContent = 0;

    milliseconds = defaultMilliseconds;
    interval = setInterval(decrementTime, 1000);
}

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
        let wordsArray = words.split(' ');

        wordsArray.forEach((word) =>
        {
            let p = document.createElement('p');
            p.textContent = word;
            wordsDiv.insertAdjacentElement('beforeEnd', p);
        });
        
        wordsDiv.querySelector('p').classList.add('highlight');

        if (!document.querySelector('#start'))
        {
            let startButton = document.createElement('button');
            startButton.setAttribute('id', 'start');
            startButton.textContent = 'Начать';
            document.body.insertAdjacentElement('beforeEnd', startButton);
            
            startButton.addEventListener('click', start);
        }
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
            let incorrectWordsCountInt = parseInt(incorrectWordsCount.textContent);
            incorrectWordsCount.textContent = ++incorrectWordsCountInt;
        }
        else
        {
            let correctWordsCountInt = parseInt(correctWordsCount.textContent);
            correctWordsCount.textContent = ++correctWordsCountInt;
        }

        highlightWord.remove();
        wordsDiv.querySelector('p').classList.add('highlight');
        inputText.value = '';
    }
}

let decrementTime = () =>
{
    milliseconds -= 1000;

    if (milliseconds === 0)
    {
        clearInterval(interval);
        enterWordsInput.setAttribute('disabled', '');
    }

    let minutes = Math.floor(milliseconds / 1000 / 60);
    let seconds = milliseconds / 1000 % 60;

    if (seconds + 1 > 10)
    {
        timeSpan.textContent = `${minutes}:${seconds}`;
    }
    else
    {
        timeSpan.textContent = `${minutes}:0${seconds}`;
    }
}

let wordsDiv = document.querySelector('#words');
let textFileInput = document.querySelector('#text_file_input');
let enterWordsInput = document.querySelector('#enter_words');
let correctWordsCount = document.querySelector('#correct_words_count');
let incorrectWordsCount = document.querySelector('#incorrect_words_count');
let startButton = document.querySelector('#start');
let timeSpan = document.querySelector('#time');
const defaultMilliseconds = 90 * 1000; // 1 minute 30 seconds
let milliseconds = defaultMilliseconds; 
let interval;

textFileInput.addEventListener('input', (event) =>
{
    getWords(event);
});
enterWordsInput.addEventListener('input', (event) =>
{
    checkInput(event);
});