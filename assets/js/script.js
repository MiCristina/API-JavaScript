//Identificação dos dois campos dinamicos (not find e results)
const noResults = document.getElementById("noResults");
const contentResults = document.getElementById("contentResults");

//Identificação de onde vem a API
window.onload = fetchData("https://front-br-challenges.web.app/api/v2/green-thumb/?sun=high&water=regularly&pets=false");

//variaveis globais
var array = [];
var selectedItems = [];
var sun = document.getElementById("sun");
var water = document.getElementById("water");   
var pet = document.getElementById("pet");   
var elementNoResults = document.getElementById("results");
var TRUTHY_VALUES_BOOLEAN = [true, 'true', 1];

//identificação de informações da API 
function fetchData(url) {
    var data = "";
    fetch(url)
        .then((resp) => resp.json())
        .then(function(data) {
            data = displayData(data);
            return data;
        })
        .catch(function(error) {
            return data;
        });
}

//chamada de campos API
function displayData(authors) {
    return authors.map(function(author, index) {
        array.push(author);
    });
}

//lista dinamica dos dados a serem exibidos
function prepareList(author) {
    var results = "";   
    results = `<div class="fav-${author.staff_favorite} bg-${author.id}">
                <article>
                <span class="${author.staff_favorite}">✨ Staff favorite</span>\n
                <img src=${author.url} alt=${author.name + '| Greenthumb'} />\n
                <div class="flexDesk">
                    <h3>${author.name}</h3>\n
                    <div class="flex">
                        <span class="price">${'$' + author.price}</span>\n
                        <div class="icons">
                            <i class="${author.toxicity + ' toxicity'}"></i>\n
                            <i class="${author.sun + ' sun'}"></i>\n
                            <i class="${author.water + ' water'}"></i>\n
                        </div>   
                    </div>
                </div>
                \n
                </article>
                </div>`;
    return results;
}

//atualização do conteudo a cada click
window.addEventListener('click', function() {
    const contentResults = document.getElementById("noResults");
    var selectSun = sun.options[sun.selectedIndex].value;
    var selectWater = water.options[water.selectedIndex].value;
    var selectPet = pet.options[pet.selectedIndex].value;
    var showresults = prepareFilterData(array, selectSun, selectWater, selectPet, selectedItems);
    showresults ? counterResults(showresults) : null;
});
   
//load do conteudo para identificar qual informação irá aparecer na tela no primeiro momento e não so apos o click
window.onload = function() {
    selectSun = sun.options[sun.selectedIndex].value;
    selectWater = water.options[water.selectedIndex].value;
    selectPet = pet.options[pet.selectedIndex].value;
    showresults = prepareFilterData(array, selectSun, selectWater, selectPet, selectedItems);
    showresults ? counterResults(showresults) : null;
};

//condição para identificar quantos itens foram listados da api, se não retornar nenhum aparece a tela de not find no else
function counterResults(showresults) {
    if (showresults["count"] > 0) {
        contentResults.innerHTML = showresults["results"];
        noResults.innerHTML = '';
        elementNoResults.classList.add("display-block");
    } else {
        var element = document.getElementById("results");
        element.classList.remove("display-block");
    }
}

//função para transformar string em boolean
function getBoolean(a) {
    return TRUTHY_VALUES_BOOLEAN.some(function(t) {
        return t === a;
    });
}

//um array que pega as informações e verifica se todos os campos foram preenchidos
function prepareFilterData(array, selectSun, selectWater, selectPet, selectedItems) {
    var results = "";
    var count = 0;
    array.map(function(author) {
        if(selectPet != "null"){
            var selectPetBoolean = getBoolean(selectPet);
            if (selectSun === author.sun && selectWater === author.water && selectPetBoolean === author.toxicity) {
                count++;
                results += prepareList(author);
            }
        }   
    });

    return { count: count, results: results };
}


//Scroll to the top
var scrollToTopBtn = document.getElementById("scrollToTop")
var rootElement = document.documentElement

function scrollToTop() {
  // Scroll to top logic
  rootElement.scrollTo({
    top: 0,
    behavior: "smooth"
  })
}
scrollToTopBtn.addEventListener("click", scrollToTop)