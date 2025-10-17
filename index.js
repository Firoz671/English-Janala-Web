const createElements = (arr)=>{
  const htmlElement = arr.map((item)=> `<span class="btn">${item}</span>`)
  return htmlElement.join(' ')
}


const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

console.log("Connected")

const loadData = () =>{
    const url = 'https://openapi.programming-hero.com/api/levels/all#'
    fetch(url)
    .then(res => res.json())
    .then(json => disPlayLevel(json.data))
}
loadData()

const removeActive = () =>{
    const lessonButtons = document.querySelectorAll(".lesson-btn");
  //   console.log(lessonButtons);
  lessonButtons.forEach((btn) => btn.classList.remove("btn-active"));
}
const loadWord = (id)=>{
  manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
      loadWordsDisplay(data.data)
      removeActive()
      const clickedBtn = document.getElementById(`lesson-btn-${id}`)
      clickedBtn.classList.add('btn-active')
    })
}

const loadWordDetail = async (id) =>{
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url)
    const data = await res.json()
    displayWordDetails(data.data)
}

displayWordDetails = word =>{
    const showWord = document.getElementById('show-word')
    showWord.innerHTML = `
    <div class="">
    <p class="py-4 font-bold text-3xl">${word.word}</p>
    <p class="py-4">Meaning-${word.meaning}</p>
    <p class="py-4">Pronounciation-${word.pronunciation}</p>
    <p class="py-4">Sentence-${word.sentence}</p>
    <p class="py-4">Parts Of Speech-${word.partsOfSpeech}</p>
    </div>

    <div>
    <p class="font-bold py-5">Synonyms</p>
    <div class="">
    ${createElements(word.synonyms)}
    </div>
    </div>
    
    `
    document.getElementById('my_modal_5').showModal()
}

const loadWordsDisplay = words =>{

    const wordContainer = document.getElementById('word-container')
    wordContainer.innerHTML = ''

  if(words.length === 0){
    wordContainer.innerHTML = `
    
      <div class="mx-auto col-span-full space-y-3">
      <img class="mx-auto" src="./assets/alert-error.png"/>
      <p class="font-hind text-gray-500 text-center text-2xl">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
      <p class="font-hind font-bold text-center text-3xl">নেক্সট Lesson এ যান</p>
    </div>
    `
    manageSpinner(false);
    return;
  }

    for(const word of words) {
        const wordDiv = document.createElement('div')
        wordDiv.innerHTML = `
        <div
        class="bg-sky-100 rounded-xl shadow-sm text-center py-10 px-5 space-y-4"
      >
        <h2 class="font-bold text-2xl">${
          word.word?word.word: 'N/A'
        }</h2>
        <p class="font-semibold">Meaning /Pronounciation</p>
        <div class="text-2xl font-medium font-bangla">"${
          word.meaning?word.meaning: 'N/A'
        } / ${
      word.pronunciation?word.pronunciation: 'N/A'
    }"</div> 
        <div class="flex justify-between items-center">
          <button onclick="loadWordDetail(${
            word.id
          })"  class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <button onclick="pronounceWord('${
            word.word
          }')" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>`
        wordContainer.append(wordDiv)
    }
    manageSpinner(false);
}
const disPlayLevel = levels => {
    const btnContainer = document.getElementById('learning-container')
    btnContainer.innerHTML = ''

    for( const level of levels){
                const levelDiv = document.createElement('div')

        levelDiv.innerHTML = `
            <button id="lesson-btn-${level.level_no}" onclick="loadWord(${level.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-lines-leaning"></i>Lesson - ${level.level_no}</button>
        `
        btnContainer.appendChild(levelDiv)
    }
}

document.getElementById("btn-search").addEventListener("click", () => {
  removeActive();
  const input = document.getElementById("input-search");
  const searchValue = input.value.trim().toLowerCase();
  console.log(searchValue);

  fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((data) => {
      const allWords = data.data;
      console.log(allWords);
      const filterWords = allWords.filter((word) =>
        word.word.toLowerCase().includes(searchValue)
      );

      loadWordsDisplay(filterWords);
    });
});