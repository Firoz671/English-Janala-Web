console.log("Connected")

const loadData = () =>{
    const url = 'https://openapi.programming-hero.com/api/levels/all#'
    fetch(url)
    .then(res => res.json())
    .then(json => disPlayLevel(json.data))
}
loadData()
const loadWord = (id)=>{
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => loadWordsDisplay(data.data))
}

const loadWordsDisplay = words =>{

    const wordContainer = document.getElementById('word-container')
    wordContainer.innerHTML = ''

    for(const word of words) {
        const wordDiv = document.createElement('div')
        wordDiv.innerHTML = `
        <div
        class="bg-sky-100 rounded-xl shadow-sm text-center py-10 px-5 space-y-4"
      >
        <h2 class="font-bold text-2xl">${
          word.word
        }</h2>
        <p class="font-semibold">Meaning /Pronounciation</p>
        <div class="text-2xl font-medium font-bangla">"${
          word.meaning
        } / ${
      word.pronunciation
    }"</div> 
        <div class="flex justify-between items-center">
          <button onclick="loadWordDetail(${
            word.id
          })" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
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
}
const disPlayLevel = levels => {
    const btnContainer = document.getElementById('learning-container')
    btnContainer.innerHTML = ''

    for( const level of levels){
                const levelDiv = document.createElement('div')

        levelDiv.innerHTML = `
            <button onclick="loadWord(${level.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-lines-leaning"></i>Lesson - ${level.level_no}</button>
        `
        btnContainer.appendChild(levelDiv)
    }
}