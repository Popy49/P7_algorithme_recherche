
import { recipes } from '../datas/recipes.js';
// import {Model} from './Model.js';
// import {Vue} from './Vue.js';


class Controller {
    constructor(model, vue) {
        this.model = model
        this.vue = vue
        this.searchInput()
        this.ingredientbutton()
        this.init()
        this.searchinputIngredient()
        // this.hoverinputIngredient()
        // this.hoverinputAppliance()
    }

    init() {
        this.ingredientList = []
        this.applianceList = []
        this.recipeList = this.model.getAllRecipes()
        this.tag = []
        let recipes = this.model.getAllRecipes()
        let nameList = this.model.getAllIngredient()
        let appliances = this.model.getAllAppliance()
        console.log(appliances)
        for (const recipe of recipes) {
            this.vue.RecipiesList(recipe)
        }
        for (let i in nameList) {
            this.vue.tagIngredients(nameList[i], i, nameList.length)
            
        }
        for (let i in appliances){
            this.vue.tagAppliance(appliances[i])
        }
    }

    searchInput() {
        const searchBar = document.getElementById('search')
        searchBar.addEventListener('input', (e) => {
            //3 cars in general input    
            if (e.target.value.length > 2) {
                //Recipes update
                let newRecipes = this.model.getRecipies(e.target.value)
                this.recipeList = this.model.getRecipies(e.target.value)
                if (newRecipes.length === 0) {
                    return this.vue.noRecipe()
                } else {
                    this.vue.clearDom('.results')
                    for (let i in newRecipes) {
                        this.vue.RecipiesList((newRecipes[i]))
                    }
                }
                //Liste of select update attention bizarre
                this.ingredientListInput(e.target.value)
                //List of appliance update
                this.applianceListInput(newRecipes)
                
            }
            //User clean the input
            if (e.target.value.length === 0) {
                this.init()
            }
        });
    }

    //2eme tag ne marche pas cherche dans toutes le recipes
    searchinputIngredient() {
        const searchBar = document.getElementById('searchIngredient')
        searchBar.addEventListener('input', (e) => {
            if (this.ingredientList.length === 0) {
                let newRecipes = this.model.getListIngredient(e.target.value)
                this.vue.clearDom('#filterByIngredients')
                for (let i in newRecipes) {
                    this.vue.tagIngredients(newRecipes[i], i, newRecipes.length)
                }
            } else {
                this.vue.clearDom('#filterByIngredients')
                //il faut recommparer les chaines de caractere e target value avec l'ingredient liste
                const newList = this.model.getShortlistByList(e.target.value, this.ingredientList)
                for (let i in newList) {
                    this.vue.tagIngredients(newList[i], i, newList.length)
                }
            }
        }
        )
    }

    searchinputAppliance() {
        const searchBar = document.getElementById('searchDevice')
        searchBar.addEventListener('input', (e) => {
            if (this.applianceList.length === 0) {
                let newRecipes = this.model.getListAppliance(e.target.value)
                this.vue.clearDom('#filterByDevice')
                for (let i in newRecipes) {
                    this.vue.tagAppliance(newRecipes[i], i, newRecipes.length)
                }
            } else {
                this.vue.clearDom('#filterByDevice')
                //il faut recommparer les chaines de caractere e target value avec l'ingredient liste
                const newList = this.model.getShortlistByList(e.target.value, this.applianceList)
                for (let i in newList) {
                    this.vue.tagAppliance(newList[i], i, newList.length)
                }
            }
        }
        )
    }

    //Affichage de la barre suivant le nombre de resultat
    hoverinputIngredient() {
        const searchBar = document.getElementById('searchIngredient')
        const selectBar = document.querySelector('.searchBy')
        const selectList = document.getElementById('filterByIngredients')
        searchBar.addEventListener('mouseenter', (e) => {
            let width = selectList.offsetWidth;
            selectBar.style.width = width + 'px'
        })
        selectList.addEventListener('mouseenter', (e) => {
            let width = selectList.offsetWidth;
            selectBar.style.width = width + 'px'
        })
        searchBar.addEventListener('mouseleave', (e) => {
            selectBar.style.width = '90%'
        })
        selectList.addEventListener('mouseleave', (e) => {
            selectBar.style.width = '90%'
        })
    }

    // hoverinputAppliance() {
    //     const searchBar = document.getElementById('searchDevice')
    //     const selectBar = document.querySelector('.searchBy')
    //     console.log(selectBar)
    //     const selectList = document.getElementById('filterByDevice')
    //     searchBar.addEventListener('mouseenter', (e) => {
    //         let width = selectList.offsetWidth;
    //         selectBar.style.width = width + 'px'
    //     })
    //     selectList.addEventListener('mouseenter', (e) => {
    //         let width = selectList.offsetWidth;
    //         selectBar.style.width = width + 'px'
    //     })
    //     searchBar.addEventListener('mouseleave', (e) => {
    //         selectBar.style.width = '90%'
    //     })
    //     selectList.addEventListener('mouseleave', (e) => {
    //         selectBar.style.width = '90%'
    //     })
    // }

    ingredientListInput(e) {
        let nameList = this.model.getListIngredients(e)
        this.ingredientList = nameList
        this.vue.clearDom('#filterByIngredients')
        for (let i in nameList) {
            this.vue.tagIngredients(nameList[i], i, nameList.length)
        }
    }

    applianceListInput(newRecipes) {
        let nameList = this.model.getListApplianceByNewRecipies(newRecipes)
        this.applianceList = nameList
        this.vue.clearDom('#filterByDevice')
        for (let i in nameList) {
            this.vue.tagAppliance(nameList[i], i, nameList.length)
        }
    }

    ingredientListInputShort(e, array) {
        //on recupere la liste d'ingredient
        let nameList = this.model.getShortListIngredients(e, array)
        //on supprime les tags deja present
        if (this.tag.length !== 0) {
            for (const tag of this.tag) {
                let myIndex = nameList.indexOf(tag);
                if (myIndex !== -1) {
                    nameList.splice(myIndex, 1);
                }
            }
        }
        this.vue.clearDom('#filterByIngredients')
        for (let i in nameList) {

            this.vue.tagIngredients(nameList[i], i, nameList.length)
            // if ((i-col)===20){
            //     const select = document.getElementById("filterByIngredients");
            //     select.style.color="red"
            //     console.log
            // }
        }
    }


    ingredientbutton() {

        const filter = document.getElementById('filterByIngredients')
        filter.addEventListener("click", e => {
            if (e.target && e.target.matches("button")) {
                //on enregistre la selection
                this.tag.push(e.target.innerHTML)
                //on efface la barre de recherche
                document.getElementById('searchIngredient').value = ''
                //on positionne le tag
                this.vue.tagDOM(e.target.innerHTML)
                //on récupère la liste des recipes correspondante au tag dans les recipes restantes
                let ingredientList = this.model.getShortRecipieList(e.target.innerHTML, this.recipeList)
                this.recipeList = ingredientList
                this.vue.clearDom('.results')
                for (let i in ingredientList) {
                    this.vue.RecipiesList((ingredientList[i]))
                }
            }
            //On ajoute lévènement fermer au tag
            this.deleteTagButton()
            //On met à jour la liste de selection
            this.ingredientListInputShort(e.target.innerHTML, this.recipeList)

            // const liste = document.querySelectorAll(".selector__li")
            // this.vue.clearDom('#filterByIngredients')
            // for (let i=0; i<liste.length; i++){
            //     if(liste[i].textContent !== e.target.innerHTML){
            //         console.log(liste[i])
            //         this.vue.tagIngredients(liste[i].textContent)
            //     }
            // } 

        });
    }

    deleteTagButton() {
        const tags = document.querySelectorAll(".closeButton")

        //ne marche pas pour 2 tags, il faut renvoyer par a la searchbar mais a autre chose
        for (const tag of tags) {
            tag.addEventListener('click', e => {
                //delete tag from the array
                var myIndex = this.tag.indexOf(e.target.dataset.label);
                if (myIndex !== -1) {
                    this.tag.splice(myIndex, 1);
                }
                tag.parentElement.remove();
                //On cherche les recipes à partir de la barre de recherche
                const searchBar = document.getElementById('search').value;
                if (searchBar.length > 2) {
                    //Recipes update
                    this.recipeList = this.model.getRecipies(searchBar)
                } else {
                    this.recipeList = this.model.getAllRecipes()
                }

                //on récupère la liste des recipes correspondante au tag dans les recipes restantes
                //liste select pas bonne
                if (this.tag.length !== 0) {
                    console.log(this.tag)
                    let ingredientList = []
                    for (const tag of this.tag) {
                        ingredientList = this.model.getShortRecipieList(tag, this.recipeList)
                        this.recipeList = this.model.getShortRecipieList(tag, this.recipeList)
                    }
                    this.recipeList = [...new Set(ingredientList)]
                    console.log(ingredientList)
                }



                //On edite la barre de selection
                // this.ingredientListInputShort()
                let nameList = this.model.getAllIngredientInArray(this.recipeList)
                // METTRE A JOUR LE SELECT
                //on supprime les tags deja present il faut la liste d'ingredient pas recipie
                console.log(nameList)
                let selectIngredients = nameList
                if (this.tag.length !== 0) {
                    for (const tag of this.tag) {
                        let myIndex = selectIngredients.indexOf(tag);
                        if (myIndex !== -1) {
                            selectIngredients.splice(myIndex, 1);
                        }
                    }
                }
                this.vue.clearDom('#filterByIngredients')
                for (let i in selectIngredients) {
                    this.vue.tagIngredients(selectIngredients[i], i, selectIngredients.length)
                }


                //On edite le DOM
                if (this.recipeList.length === 0) {
                    return this.vue.noRecipe()
                } else {
                    this.vue.clearDom('.results')
                    for (let i in this.recipeList) {
                        this.vue.RecipiesList((this.recipeList[i]))
                    }
                }


                this.searchInput()
            })
        }
    }
}

export { Controller }