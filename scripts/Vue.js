import {Model} from './Model.js';

class Vue {
    constructor(){
        // const dom = document.getElementById('tag');
        // dom.innerHTML=``;
        const select = document.getElementById("filterByIngredient");
        // select.options.length=1
    }

    tagIngredients(ingredient, index, total){
        // const listStyle = document.querySelector(".liste")
        // const listStyle = document.getElementById("filterByIngredients")
        const select = document.getElementById("filterByIngredients");
        //Affichage en colonne initialisation
        if(parseInt(index)===0){
            select.style.columnCount="1"
        }
        //Ajout de l'ingredient dans la liste de selection
        
        const newOptions = document.createElement('li')
        newOptions.innerHTML = `<button class="selector__li">${ingredient}</button>`
        select.appendChild(newOptions)
        //Affichage en colonne pour grand nombre
        if(total>50){
            if(parseInt(index)%30===0 && parseInt(index)!==0){
                select.style.columnCount++
                select.style.fontSize = '13px'
            }
        } else {
        //Affichage en colonne pour petit nombre
            if(parseInt(index)%15===0 && parseInt(index)!==0){
                select.style.columnCount++
                select.style.fontSize = '17px'
            }
        }
        return select;
    }

    tagAppliance(appliance, index, total){
        const select = document.getElementById("filterByDevice");
        //Affichage en colonne initialisation
        if(parseInt(index)===0){
            select.style.columnCount="1"
        }
        //Ajout de l'ingredient dans la liste de selection
        
        const newOptions = document.createElement('li')
        newOptions.innerHTML = `<button class="selector__li">${appliance}</button>`
        select.appendChild(newOptions)
        //Affichage en colonne pour grand nombre
        if(total>50){
            if(parseInt(index)%30===0 && parseInt(index)!==0){
                select.style.columnCount++
                select.style.fontSize = '13px'
            }
        } else {
        //Affichage en colonne pour petit nombre
            if(parseInt(index)%10===0 && parseInt(index)!==0){
                select.style.columnCount++
                select.style.fontSize = '17px'
            }
        }
        return select;
    }

    tagUstensils(ustensil, index, total){
        const select = document.getElementById("filterByUtensil");
        //Affichage en colonne initialisation
        console.log(index)
        console.log(total)
        if(parseInt(index)===0){
            select.style.columnCount="1"
        }
        //Ajout de l'ingredient dans la liste de selection
        
        const newOptions = document.createElement('li')
        newOptions.innerHTML = `<button class="selector__li">${ustensil}</button>`
        select.appendChild(newOptions)
        //Affichage en colonne pour grand nombre
        if(total>50){
            if(parseInt(index)%30===0 && parseInt(index)!==0){
                select.style.columnCount++
                select.style.fontSize = '13px'
            }
        } else {
        //Affichage en colonne pour petit nombre
            if(parseInt(index)%10===0 && parseInt(index)!==0){
                select.style.columnCount++
                select.style.fontSize = '17px'
            }
        }
        return select;
    }




    tagDOM(e, color){
        var select = document.getElementById("tag");
        let tag = document.createElement("div");
        tag.className = `tagName selector--${color}`;
        tag.innerHTML = `<button data-label="${e}" class="closeButton" aria-label="Supprimer le tag"> ${e} <i class="fas fa-times-circle"></i></button>`
        // `<input class="closeButton" aria-label="Supprimer le tag" type="text" value="${e}">`
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