
import { recipes } from '../datas/recipes.js';
// import {Model} from './Model.js';
// import {Vue} from './Vue.js';


class Controller {
    constructor(model, vue) {
        this.model = model
        this.vue = vue
        this.searchInput()
        this.ingredientbutton()
        this.applianceButton()
        this.ustensilButton()
        this.init()
        this.searchinputIngredient()
        this.searchinputAppliance()
        this.searchinputUstensil()
        this.hoverinputIngredient()
        this.hoverinputAppliance()
        this.hoverinputUstensil()
    }

    init() {
        this.ingredientList = []
        this.applianceList = []
        this.ustensilList = []
        this.recipeList = this.model.getAllRecipes()
        this.tag = []
        this.tagAppliance = []
        this.tagUstensil = []
        let recipes = this.model.getAllRecipes()
        let nameList = this.model.getAllIngredient()
        let appliances = this.model.getAllAppliance()
        let ustensils = this.model.getAllUstensils()
        for (const recipe of recipes) {
            this.vue.RecipiesList(recipe)
        }
        for (let i in nameList) {
            this.vue.tagIngredients(nameList[i], i, nameList.length)
            
        }
        for (let i in appliances){
            this.vue.tagAppliance(appliances[i], i, appliances.length)
        }
        for (let i in ustensils){
            this.vue.tagUstensils(ustensils[i], i, ustensils.length)
        }
    }

    searchInput() {
        //ATTENTION MARCHE PAS SI ON ENLEVE ET QUIL Y A DES TAGS
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
                //Liste of select update
                this.ingredientListInput(newRecipes)
                //List of appliance update
                this.applianceListInput(newRecipes)
                //List of ustensil update
                this.ustensilListInput(newRecipes)
                
            }
            //User clean the input
            if (e.target.value.length === 0) {
                //Si tags = 0
                if(this.tagAppliance.length !== 0){

                }
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
        })
    }

    searchinputUstensil() {
        const searchBar = document.getElementById('searchUstensil')
        searchBar.addEventListener('input', (e) => {
            if (this.ustensilList.length === 0) {
                
                let newRecipes = this.model.getListUstensil(e.target.value)
                console.log(newRecipes)
                this.vue.clearDom('#filterByUtensil')
                for (let i in newRecipes) {
                    this.vue.tagUstensils(newRecipes[i], i, newRecipes.length)
                }
            } else {
                this.vue.clearDom('#filterByUtensil')
                //il faut recommparer les chaines de caractere e target value avec l'ingredient liste
                const newList = this.model.getShortlistByList(e.target.value, this.ustensilList)
                for (let i in newList) {
                    console.log(newList)
                    this.vue.tagUstensils(newList[i], i, newList.length)
                }
            }
        })
    }

    //Affichage de la barre suivant le nombre de resultat
    hoverinputIngredient() {
        const searchBar = document.getElementById('searchIngredient')
        const selectBar = document.querySelector('.searchBy')
        const selectList = document.getElementById('filterByIngredients')
        searchBar.addEventListener('mouseenter', (e) => {
            let width = selectList.offsetWidth;
            let Actualwidth = searchBar.offsetWidth;
            if(Actualwidth < width){
                searchBar.style.width = width + 'px'
            } else {
                selectList.style.width = Actualwidth + 'px'
            }
        })
        selectList.addEventListener('mouseenter', (e) => {
            let width = selectList.offsetWidth;
            let Actualwidth = searchBar.offsetWidth;
            if(Actualwidth < width){
                searchBar.style.width = width + 'px'
            } else {
                selectList.style.width = Actualwidth + 'px'
            }
        })
        searchBar.addEventListener('mouseleave', (e) => {
            searchBar.style.width = '90%'
        })
        selectList.addEventListener('mouseleave', (e) => {
            searchBar.style.width = '90%'
        })
    }

    hoverinputAppliance() {
        const searchBar = document.getElementById('searchDevice')
        const selectList = document.getElementById('filterByDevice')
        searchBar.addEventListener('mouseenter', (e) => {
            let width = selectList.offsetWidth;
            let Actualwidth = searchBar.offsetWidth;
            if(Actualwidth < width){
                searchBar.style.width = width + 'px'
            } else {
                selectList.style.width = Actualwidth + 'px'
            }
        })
        selectList.addEventListener('mouseenter', (e) => {
            let width = selectList.offsetWidth;
            let Actualwidth = searchBar.offsetWidth;
            if(Actualwidth < width){
                searchBar.style.width = width + 'px'
            } else {
                selectList.style.width = Actualwidth + 'px'
            }
        })
        searchBar.addEventListener('mouseleave', (e) => {
            searchBar.style.width = '90%'
        })
        selectList.addEventListener('mouseleave', (e) => {
            searchBar.style.width = '90%'
        })
    }

    hoverinputUstensil() {
        const searchBar = document.getElementById('searchUstensil')
        const selectList = document.getElementById('filterByUtensil')
        searchBar.addEventListener('mouseenter', (e) => {
            let width = selectList.offsetWidth;
            let Actualwidth = searchBar.offsetWidth;
            if(Actualwidth < width){
                searchBar.style.width = width + 'px'
            } else {
                selectList.style.width = Actualwidth + 'px'
            }
        })
        selectList.addEventListener('mouseenter', (e) => {
            let width = selectList.offsetWidth;
            let Actualwidth = searchBar.offsetWidth;
            if(Actualwidth < width){
                searchBar.style.width = width + 'px'
            } else {
                selectList.style.width = Actualwidth + 'px'
            }
        })
        searchBar.addEventListener('mouseleave', (e) => {
            searchBar.style.width = '90%'
        })
        selectList.addEventListener('mouseleave', (e) => {
            searchBar.style.width = '90%'
        })
    }

    ingredientListInput(newRecipes) {
        let nameList = this.model.getListIngredientByNewRecipies(newRecipes)
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

    ustensilListInput(newRecipes) {
        let nameList = this.model.getListUstensilByNewRecipies(newRecipes)
        this.ustensilList = nameList
        this.vue.clearDom('#filterByUtensil')
        for (let i in nameList) {
            this.vue.tagUstensils(nameList[i], i, nameList.length)
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

    applianceListWhithoutTag(){
        this.vue.clearDom('#filterByDevice')
    }

    ustensilListWhithoutTag(e, newRecipes){
        //on recupere la liste d'ingredient
        let recipe = this.model.getSomeUstensilByNewRecipies(e, newRecipes)
        let ustensils = this.model.getListUstensilByNewRecipies(recipe)
        console.log(ustensils)
        //on supprime les tags deja present
        if (this.tagUstensil.length !== 0) {
            for (const tag of this.tagUstensil) {
                console.log(this.tagUstensil)
                let myIndex = ustensils.indexOf(tag);
                if (myIndex !== -1) {
                    ustensils.splice(myIndex, 1);
                }
            }
        }
        this.vue.clearDom('#filterByUtensil')
        for (let i in ustensils) {
            this.vue.tagUstensils(ustensils[i], i, ustensils.length)
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
                this.vue.tagDOM(e.target.innerHTML, "blue")
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
            //On met à jour la liste de selection ATTENTION PAS INNER HTML
            this.ingredientListInputShort(e.target.innerHTML, this.recipeList)
            // On met à jour la liste des machines
            this.applianceListInput(this.recipeList)
            //List of ustensil update
            this.ustensilListInput(this.recipeList)
        });
    }

    applianceButton() {
        const filter = document.getElementById('filterByDevice')
        filter.addEventListener("click", e => {
            if (e.target && e.target.matches("button")) {
                //on enregistre la selection
                this.tagAppliance.push(e.target.innerHTML)
                //on efface la barre de recherche
                document.getElementById('searchDevice').value = ''
                //on positionne le tag
                this.vue.tagDOM(e.target.innerHTML, "green")
                //on récupère la liste des recipes correspondante au tag dans les recipes restantes changer pour appliance
                let applianceList = this.model.getSomeApplianceByNewRecipies(e.target.innerHTML, this.recipeList)
                this.recipeList = applianceList
                this.vue.clearDom('.results')
                for (let i in applianceList) {
                    this.vue.RecipiesList((applianceList[i]))
                }
            }
            // On ajoute lévènement fermer au tag
            this.deleteTagButton()
            // On met à jour la liste des ingredients
            this.ingredientListInput(this.recipeList)
            // On met à jour la liste des machines ATTENTION IL FAUT ENLEVER CELUI CLIQUééééé
            // this.applianceListInput(this.recipeList)
            this.applianceListWhithoutTag()
            //List of ustensil update ATTENTION IL FAUT ENLEVER CELUI CLIQUééééé
            this.ustensilListInput(this.recipeList)
            
        });
    }

    ustensilButton() {
        const filter = document.getElementById('filterByUtensil')
        filter.addEventListener("click", e => {
            if (e.target && e.target.matches("button")) {
                //on enregistre la selection
                this.tagUstensil.push(e.target.innerHTML)
                //on efface la barre de recherche
                document.getElementById('searchUstensil').value = ''
                //on positionne le tag
                this.vue.tagDOM(e.target.innerHTML, "red")
                //on récupère la liste des recipes correspondante au tag dans les recipes restantes changer pour appliance
                let ustensilList = this.model.getSomeUstensilByNewRecipies(e.target.innerHTML, this.recipeList)
                this.recipeList = ustensilList
                this.vue.clearDom('.results')
                for (let i in ustensilList) {
                    this.vue.RecipiesList((ustensilList[i]))
                }
            }
            // On ajoute lévènement fermer au tag
            this.deleteTagButton()
            // On met à jour la liste des ingredients
            this.ingredientListInput(this.recipeList)
            // On met à jour la liste des machines
            this.applianceListInput(this.recipeList)
            //List of ustensil update ATTENTION IL FAUT ENLEVER CELUI CLIQUééééé et changer le INNER HTML
            // this.ustensilListInput(this.recipeList)
            this.ustensilListWhithoutTag(e.target.innerHTML, this.recipeList)
            
        });
    }

    deleteTagButton() {
        const tags = document.querySelectorAll(".closeButton")
        //ne marche pas pour 2 tags, il faut renvoyer par a la searchbar mais a autre chose
        for (const tag of tags) {
            tag.addEventListener('click', e => {
                //delete tag from the array ingredient
                const ingredientTag = this.tag.indexOf(e.target.dataset.label);
                if (ingredientTag !== -1) {
                    this.tag.splice(ingredientTag , 1);
                }
                //delete tag from the array appliance
                const applianceTag = this.tagAppliance.indexOf(e.target.dataset.label);
                if (applianceTag !== -1) {
                    this.tagAppliance.splice(applianceTag, 1);
                }
                //delete tag from the array ustensil
                 const ustensilTag = this.tagUstensil.indexOf(e.target.dataset.label);
                 if (ustensilTag !== -1) {
                     this.tagUstensil.splice(ustensilTag, 1);
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

                //on récupère la liste des recipes correspondante au tag ingredient dans les recipes restantes
                //liste select pas bonne
                if (this.tag.length !== 0) {
                    let ingredientList = []
                    for (const tag of this.tag) {
                        ingredientList = this.model.getShortRecipieList(tag, this.recipeList)
                        this.recipeList = this.model.getShortRecipieList(tag, this.recipeList)
                    }
                    this.recipeList = [...new Set(ingredientList)]
                }

                //on récupère la liste des recipes correspondante au tag appliance dans les recipes restantes
                if (this.tagAppliance.length !== 0) {
                    let applianceList = []
                    for (const tag of this.tagAppliance) {
                        applianceList = this.model.getSomeApplianceByNewRecipies(tag, this.recipeList)
                        this.recipeList = this.model.getSomeApplianceByNewRecipies(tag, this.recipeList)
                    }
                    this.recipeList = [...new Set(applianceList)]
                }

                //on récupère la liste des recipes correspondante au tag ustensil dans les recipes restantes
                //ATTENTION NE MARCHE PASSSS
                if (this.tagUstensil.length !== 0) {
                    let ustensilList = []
                    for (const tag of this.tagUstensil) {
                        ustensilList = this.model.getSomeUstensilByNewRecipies(tag, this.recipeList)
                        this.recipeList = this.model.getSomeUstensilByNewRecipies(tag, this.recipeList)
                    }
                    this.recipeList = [...new Set(ustensilList)]
                }


                //On edite la barre de selection ingredient
                let nameList = this.model.getAllIngredientInArray(this.recipeList)
                //On edite la barre de selection appliance
                let applianceList = this.model.getListApplianceByNewRecipies(this.recipeList)
                //On edite la barre de selection appliance
                let ustensilList = this.model.getListUstensilByNewRecipies(this.recipeList)
                
                // METTRE A JOUR LE SELECT
                //on supprime les tags deja present il faut la liste d'ingredient pas recipie
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

                //on supprime les tags deja present il faut la liste d'appliance pas recipie
                let selectAppliances = applianceList
                if (this.tagAppliance.length !== 0) {
                    for (const tag of this.tagAppliance) {
                        let myIndex = selectAppliances.indexOf(tag);
                        if (myIndex !== -1) {
                            selectAppliances.splice(myIndex, 1);
                        }
                    }
                }
                this.vue.clearDom('#filterByDevice')
                for (let i in selectAppliances) {
                    this.vue.tagAppliance(selectAppliances[i], i, selectAppliances.length)
                }

                //on supprime les tags deja present il faut la liste d'ustensil pas recipie
                let selectUstensil = ustensilList
                if (this.tagUstensil.length !== 0) {
                    for (const tag of this.tagUstensil) {
                        let myIndex = selectUstensil.indexOf(tag);
                        if (myIndex !== -1) {
                            selectUstensil.splice(myIndex, 1);
                        }
                    }
                }
                this.vue.clearDom('#filterByUtensil')
                for (let i in selectUstensil) {
                    this.vue.tagUstensils(selectUstensil[i], i, selectUstensil.length)
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