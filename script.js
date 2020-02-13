let getWords = async (event) =>
{
    let reader = new FileReader();
    let file = event.target.files[0];
    
    reader.readAsText(file);
    
    if (file.type !== 'text/plain')
    {
        alert('Загружать можно только текстовый файл!');
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
    let inputText = event.target
    let inputTextValue = inputText.value;
    let highlightWord = document.querySelector('.highlight');

    let isIncorrectWord = highlightWord.textContent.indexOf(inputTextValue.trim()) === -1;

    let isFullWord = inputTextValue[inputTextValue.length - 1] === ' ';

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
        if (!isIncorrectWord)
        {
            highlightWord.remove();
            wordsDiv.querySelector('p').classList.add('highlight');
            inputText.value = '';
        }
    }

}

let wordsDiv = document.querySelector('#words');
let textFileInput = document.querySelector('#text_file_input');
let enterWordsInput = document.querySelector('#enter_words');
let wordsArray = [];

textFileInput.addEventListener('input', (event) =>
{
    getWords(event);
});
enterWordsInput.addEventListener('input', (event) =>
{
    checkInput(event);
});