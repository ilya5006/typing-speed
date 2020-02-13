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

        words = words.split(' ');

        words.forEach((word) =>
        {
            let p = document.createElement('p');
            p.textContent = word;
            wordsDiv.insertAdjacentElement('beforeEnd', p);
        });
        
        wordsDiv.querySelector('p').classList.add('highlight');
    });
}

let checkInput = (event) =>
{
    
}

let wordsDiv = document.querySelector('#words');
let textFileInput = document.querySelector('#text_file_input');
let enterWordsInput = document.querySelector('#enter_words');

textFileInput.addEventListener('input', (event) =>
{
    getWords(event);
});
enterWordsInput.addEventListener('input', (event) =>
{
    checkInput(event);
});