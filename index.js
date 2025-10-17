console.log("Connected")

const loadData = () =>{
    const url = 'https://openapi.programming-hero.com/api/levels/all#'
    fetch(url)
    .then(res => res.json())
    .then(json => disPlayLevel(json.data))
}
loadData()

const disPlayLevel = levels => {
    const btnContainer = document.getElementById('learning-container')
    btnContainer.innerHTML = ''

    for( const level of levels){
                const levelDiv = document.createElement('div')

        levelDiv.innerHTML = `
            <button class="btn btn-outline btn-primary"><i class="fa-solid fa-lines-leaning"></i>Lesson - ${level.level_no}</button>
        `
        btnContainer.appendChild(levelDiv)
    }
}