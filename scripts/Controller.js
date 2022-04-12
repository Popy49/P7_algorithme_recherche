
import {recipes} from '../datas/recipes.js';
// import {Model} from './Model.js';
// import {Vue} from './Vue.js';


class Controller {
    constructor(model, vue){
        this.model = model
        this.vue = vue
        this.setEvent()
        this.deleteTag()
        let count = 0
        this.newRecipeList = []
    }

    setEvent(){
        const searchBar = document.getElementById('search')
        // searchBar.addEventListener("input", e => this.event=e.target.value)
        searchBar.addEventListener("input", e => this.recipesCards(e.target.value))
        const searchIngredient = document.getElementById('searchIngredient')
        searchIngredient.addEventListener("input", e => this.model.getRecipieByIngredient((e.target.value)))
        document.getElementById('filterByIngredients').addEventListener("click", e => {
            if (e.target && e.target.matches("li")) {
                this.displayTag(e.target.innerHTML)
              }
          });
        searchBar.addEventListener("input", e => this.filterByIngredients(e.target.value))


        const listIngredient = document.getElementById('filterByIngredients')

        // searchIngredient.addEventListener('click', function() {
        //     if(this.count===0){       
        //     listIngredient.style.display='block';
        //     this.count=1
        //     } else {
        //         listIngredient.style.display='none';
        //         this.count=0
        //     }           
        // });

        // searchIngredient.addEventListener('blur', (event) => {
        //     if(this.count===0){       
        //     listIngredient.style.display='block';
        //     this.count=1
        //     } else {
        //         listIngredient.style.display='none';
        //         this.count=0
        //     }   
        //   });

    }

    filterByIngredients(e){
        console.log(e)
        let nameList = this.model.getListIngredients(e)
        this.vue.clearDom('#filterByIngredients')
        for (let i in nameList) {
            this.vue.tagIngredients(nameList[i])
        }
        console.log(nameList)
        return nameList
    }

    recipesCards(e){
        let newRecipes = this.model.getRecipies(e)
        console.log(newRecipes.length)
        if(newRecipes.length===0) {
            return this.vue.noRecipe()
        } else {
            this.vue.clearDom('.results')
            for (let i in newRecipes) {
                this.vue.RecipiesList((newRecipes[i]))
            }
            return newRecipes
        }
        
    }

    displayTag(e){
        this.vue.tagDOM(e)
        let ingredientList = this.model.getRecipieByIngredient(e)
        this.vue.clearDom('.results')
        for (let i in ingredientList) {
            // this.vue.tagIngredients(ingredient)
            this.vue.RecipiesList((ingredientList[i]))
        }
        this.deleteTag()
        console.log(e)
        this.filterByIngredients(e)
        // this.deleteTagSelect(e)
        return ingredientList
    }

    // deleteTagSelect(e){
    //     const liste = document.getElementById('filterByIngredients')
    //     for (let selectedTag in liste.childNodes){
    //         console.log(selectedTag.innerHTML)
    //     }
    // }

    // ingredientList(e){
    //     console.log(e)
    //     let ingredientList = this.model.getListIngredient(e)
    //     this.vue.clearDom('#filterByIngredients')
    //     for (let i in ingredientList) {
    //         this.vue.tagIngredients(ingredientList[i])
    //     }
        
    // }

    deleteTag(){
        const tags = document.querySelectorAll(".closeButton")
        console.log(tags)
        for (const tag of tags) {
            console.log(tag.parentElement)
            tag.addEventListener('click', e => {
                tag.parentElement.remove(),
                this.recipesCards()
                this.filterByIngredients(e)
            })
        }
    }
}

const searchBar = document.getElementById('search')
// searchBar.addEventListener("input", e => console.log(e.target.value))

// var coco = new Controller(new Model(),new Vue())

// // searchBar.addEventListener("input", e => console.log(coco.filterByIngredients(recipes)))
// searchBar.addEventListener("input", e => coco.recipesCards(recipes))

export {Controller}