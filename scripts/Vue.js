import {Model} from './Model.js';

class Vue {
    constructor(){
        // const dom = document.getElementById('tag');
        // dom.innerHTML=``;
        const select = document.getElementById("filterByIngredient");
        // select.options.length=1
    }

    tagIngredients(ingredient){
        const select = document.getElementById("filterByIngredients");
        const newOptions = document.createElement('li')
        newOptions.innerHTML = `${ingredient}`
        select.appendChild(newOptions)
        return select;
    }

    tagDOM(e){
        var select = document.getElementById("tag");
        let tag = document.createElement("div");
        tag.className = "tagName selector--blue";
        tag.innerHTML = `${e} <button class="closeButton" aria-label="Supprimer le tag"><i class="fas fa-times-circle"></i></button>`
        select.appendChild(tag)
    }

    clearDom(classe){
        const dom = document.querySelector(classe);
        dom.innerHTML = ''
    }

    clearOption(classe){
        var select = document.getElementById(classe);
        select.options.length=1

    }

    noRecipe(){
        let dom = document.getElementById('results')
        dom.innerHTML = `Aucune recette ne correspond à votre critère… vous pouvez
        chercher « tarte aux pommes », « poisson », etc.` 
    }

    RecipiesList(recipies){
        const { name, description, ingredients, servings, time} = recipies;
        let ingredientsDom = ""
        let liste = ''
        for (let i in ingredients){
            let unity = ingredients[i].unit ? ingredients[i].unit : ''
            let quantity = ingredients[i].quantity ? ': '+ingredients[i].quantity : ''
            liste += `<li><strong>${ingredients[i].ingredient}</strong> ${quantity} ${unity}</li>`
        }
        const select = document.querySelector('.results');
        let newCard = document.createElement("article")
        newCard.className = "card w-30"
        newCard.innerHTML = `
                            <img src="" class="card-img-top" alt="photo presentation">
                            <div class="card-body">
                                <div class="d-flex justify-content-between">
                                    <h4 class="card-title">${name}</h4>
                                    <p class="card-text"><i class="far fa-clock" aria-hidden="true"></i><strong> ${time} min</strong></p>
                                </div>
                                <div class="d-flex flex-row justify-content-between legend">
                                <ul>`
                                    + liste +
                                    `</ul>
                                    <p class="card-text w-50">${description}</p>
                                    
                                </div>
                            </div>
                            `
        select.appendChild(newCard)
    }



}

export {Vue}