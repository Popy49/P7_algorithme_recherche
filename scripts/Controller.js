
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
        this.focusIngredientWidth()
        this.focusUstensilWidth()
        this.focusApplianceWidth()
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

        //Display Recipes
        recipes.map(recipe => this.vue.RecipiesList(recipe))
        //Display select lists
        nameList.map( (item, index) => this.vue.tagIngredients(item, index, nameList.length))
        appliances.map( (item, index) => this.vue.tagAppliance(item, index, appliances.length))
        ustensils.map( (item, index) => this.vue.tagUstensils(item, index, ustensils.length))


    }

    //User search input in general search bar //Attention si tag et qu'on recherche, NE MARCHE PAS
    searchInput() {
        const searchBar = document.getElementById('search')
        searchBar.addEventListener('input', (e) => {
            //3 cars in general input    
            if (e.target.value.length > 2) {
                //Check if there is tag
                this.recipeList.length === 0 ? this.recipeList = this.model.getRecipies(e.target.value) : this.recipeList = this.model.getShortRecipies(e.target.value, this.recipeList);
                //Recipes update
                if (this.recipeList.length === 0) {
                    return this.vue.noRecipe()
                } else {
                    this.vue.clearDom('.results')
                    this.recipeList.map( recipe => this.vue.RecipiesList(recipe))
                }
                //List of select update
                this.ingredientListInput(this.recipeList)
                //List of appliance update
                this.applianceListInput(this.recipeList)
                //List of ustensil update
                this.ustensilListInput(this.recipeList)
                
            }
            //User clean the input
            if (e.target.value.length === 0) {
                this.vue.clearDom('.results')
                this.recipeList = this.model.getAllRecipes()
                //No tag
                if(this.tagAppliance.length === 0 && this.tag.length === 0 && this.tagUstensil.length === 0){
                    this.init()
                }
                //Tag
                if(this.tagAppliance.length !== 0){
                    this.tagAppliance.forEach( tag => {
                        this.recipeList = this.model.getSomeApplianceByNewRecipies(tag, this.recipeList)
                    })
                    this.vue.clearDom('.results')
                    this.recipeList.map( recipe => this.vue.RecipiesList(recipe))
                }
                if (this.tagUstensil.length !== 0) {
                    this.tagUstensil.forEach( tag => {
                        this.recipeList = this.model.getSomeUstensilByNewRecipies(tag, this.recipeList)
                    })
                    this.vue.clearDom('.results')
                    this.recipeList.map( recipe => this.vue.RecipiesList(recipe))
                }
                if (this.tag.length !== 0) {
                    this.tag.forEach( tag => {
                        this.recipeList = this.model.getSomeIngredientByNewRecipies(tag, this.recipeList)
                    })
                    this.vue.clearDom('.results')
                    this.recipeList.map( recipe => this.vue.RecipiesList(recipe))
                }
                
            }
        });
    }

    //User search input in ingredient search bar
    searchinputIngredient() {
        const searchBar = document.getElementById('searchIngredient')
        searchBar.addEventListener('input', (e) => {
            let newRecipes = []
            this.ingredientList.length === 0 ? newRecipes = this.model.getListIngredient(e.target.value) : newRecipes = this.model.getShortlistByList(e.target.value, this.ingredientList);
            this.vue.clearDom('#filterByIngredients')
            newRecipes.map( (item, index) => this.vue.tagIngredients(item, index, newRecipes.length))
        })
    }

    //User search input in appliance search bar
    searchinputAppliance() {
        const searchBar = document.getElementById('searchDevice')
        searchBar.addEventListener('input', (e) => {
            let newRecipes = []
            this.applianceList.length === 0 ? newRecipes = this.model.getListAppliance(e.target.value) : newRecipes = this.model.getShortlistByList(e.target.value, this.applianceList);
            this.vue.clearDom('#filterByDevice')
            newRecipes.map( (item, index) => this.vue.tagAppliance(item, index, newRecipes.length))
        })
    }

    //User search input in ustensil search bar
    searchinputUstensil() {
        const searchBar = document.getElementById('searchUstensil')
        searchBar.addEventListener('input', (e) => {
            if (this.ustensilList.length === 0) {
            let newRecipes = []
            this.ustensilList.length === 0 ? newRecipes = this.model.getListUstensil(e.target.value) : newRecipes = this.model.getShortlistByList(e.target.value, this.ustensilList);
            this.vue.clearDom('#filterByUtensil')
            newRecipes.map( (item, index) => this.vue.tagUstensils(item, index, newRecipes.length))
        }})
    }

    //Display search bar according to the number of items
    focusIngredientWidth(){
        const searchBar = document.getElementById('searchIngredient')
        const selectList = document.getElementById('filterByIngredients')
        searchBar.addEventListener('focus', (e) => {
            let width = selectList.offsetWidth;
            searchBar.style.width = width + 'px'
        })
        searchBar.addEventListener('blur', (e) => {
            searchBar.style.width = '200px'
        })
    }
    focusUstensilWidth(){
        const searchBar = document.getElementById('searchUstensil')
        const selectList = document.getElementById('filterByUtensil')
        searchBar.addEventListener('focus', (e) => {
            let width = selectList.offsetWidth;
            searchBar.style.width = width + 'px'
        })
        searchBar.addEventListener('blur', (e) => {
            searchBar.style.width = '200px'
        })
    }
    focusApplianceWidth(){
        const searchBar = document.getElementById('searchDevice')
        const selectList = document.getElementById('filterByDevice')
        searchBar.addEventListener('focus', (e) => {
            let width = selectList.offsetWidth;
            searchBar.style.width = width + 'px'
        })
        searchBar.addEventListener('blur', (e) => {
            searchBar.style.width = '200px'
        })
    }

    // hoverinputUstensil() {
    //     const searchBar = document.getElementById('searchUstensil')
    //     const selectList = document.getElementById('filterByUtensil')
    //     searchBar.addEventListener('mouseenter', (e) => {
    //         let width = selectList.offsetWidth;
    //         let Actualwidth = searchBar.offsetWidth;
    //         if(Actualwidth < width){
    //             searchBar.style.width = width + 'px'
    //         } else {
    //             selectList.style.width = Actualwidth + 'px'
    //         }
    //     })
    //     selectList.addEventListener('mouseenter', (e) => {
    //         let width = selectList.offsetWidth;
    //         let Actualwidth = searchBar.offsetWidth;
    //         if(Actualwidth < width){
    //             searchBar.style.width = width + 'px'
    //         } else {
    //             selectList.style.width = Actualwidth + 'px'
    //         }
    //     })
    //     searchBar.addEventListener('mouseleave', (e) => {
    //         searchBar.style.width = '90%'
    //     })
    //     selectList.addEventListener('mouseleave', (e) => {
    //         searchBar.style.width = '90%'
    //     })
    // }


    //Diplay select bar
    ingredientListInput(newRecipes) {
        let nameList = this.model.getListIngredientByNewRecipies(newRecipes)
        this.ingredientList = nameList
        //Delete tag of the list
        if (this.tag.length !== 0) {
            this.tag.forEach( tag => {
                nameList = nameList.filter(item => tag.toLowerCase()!==item.toLowerCase())
            })}
        this.vue.clearDom('#filterByIngredients')
        nameList.map( (item, index) => this.vue.tagIngredients(item, index, nameList.length))
    }

    applianceListInput(newRecipes) {
        let nameList = this.model.getListApplianceByNewRecipies(newRecipes)
        this.applianceList = nameList
        this.vue.clearDom('#filterByDevice')
        nameList.map( (item, index) => this.vue.tagAppliance(item, index, nameList.length))
    }

    ustensilListInput(newRecipes) {
        let nameList = this.model.getListUstensilByNewRecipies(newRecipes)
        this.ustensilList = nameList
        //Delete tag of the list 
        if (this.tagUstensil.length !== 0) {
            this.tagUstensil.forEach( tag => {
                    nameList = nameList.filter(item => tag.toLowerCase()!==item.toLowerCase())
                })
        }
        this.vue.clearDom('#filterByUtensil')
        nameList.map( (item, index) => this.vue.tagUstensils(item, index, nameList.length))
    }

    //display select bar according to a new list
    ingredientListInputShort(e, newRecipes) {
        //Get items list
        let recipe = this.model.getSomeIngredientByNewRecipies(e, newRecipes)
        let ingredients = this.model.getListIngredientByNewRecipies(recipe)
        this.ingredientList = ingredients
        //Delete tag of the list 
        if (this.tag.length !== 0) {
            this.tag.forEach( tag => {
                ingredients = ingredients.filter(item => tag.toLowerCase()!==item.toLowerCase())
            })}
        this.vue.clearDom('#filterByIngredients')
        ingredients.map( (item, index) => this.vue.tagIngredients(item, index, ingredients.length))
    }

    applianceListWhithoutTag(){
        this.vue.clearDom('#filterByDevice')
    }

    ustensilListWhithoutTag(e, newRecipes){
        //Get items list
        let recipe = this.model.getSomeUstensilByNewRecipies(e, newRecipes)
        let ustensils = this.model.getListUstensilByNewRecipies(recipe)
        this.ustensilList = ustensils
        //Delete tag of the list 
        if (this.tagUstensil.length !== 0) {
            this.tagUstensil.forEach( tag => {
                    ustensils = ustensils.filter(item => tag.toLowerCase()!==item.toLowerCase())
                })
        }
        this.vue.clearDom('#filterByUtensil')
        ustensils.map( (item, index) => this.vue.tagUstensils(item, index, ustensils.length))
    }


    //User select an ingredient
    ingredientbutton() {
        const filter = document.getElementById('filterByIngredients')
        filter.addEventListener("click", e => {
            if (e.target && e.target.matches("button")) {
                //Save ingredient
                this.tag.push(e.target.innerHTML)
                //clear input
                document.getElementById('searchIngredient').value = ''
                //Put ingredient tag in DOM
                this.vue.tagDOM(e.target.innerHTML, "blue")
                //Reload recipes list with the new tag
                let ingredientList = this.model.getSomeIngredientByNewRecipies(e.target.innerHTML, this.recipeList)
                this.recipeList = ingredientList
                this.vue.clearDom('.results')
                ingredientList.map( ingredient => this.vue.RecipiesList(ingredient))
            }
            //Add close function to the tag
            this.deleteTagButton()
            //Update ingredient list
            this.ingredientListInputShort(e.target.innerHTML, this.recipeList)
            //Update appliance list
            this.applianceListInput(this.recipeList)
            //Update ustensil list
            this.ustensilListInput(this.recipeList)
        });
    }

    //User select an appliance
    applianceButton() {
        const filter = document.getElementById('filterByDevice')
        filter.addEventListener("click", e => {
            if (e.target && e.target.matches("button")) {
                //Save appliance
                this.tagAppliance.push(e.target.innerHTML)
                //clear input
                document.getElementById('searchDevice').value = ''
                //Put ingredient tag in DOM
                this.vue.tagDOM(e.target.innerHTML, "green")
                //Reload recipes list with the new tag
                let applianceList = this.model.getSomeApplianceByNewRecipies(e.target.innerHTML, this.recipeList)
                this.recipeList = applianceList
                this.vue.clearDom('.results')
                applianceList.map( appliance => this.vue.RecipiesList(appliance))
            }
            //Add close function to the tag
            this.deleteTagButton()
            //Update ingredient list
            this.ingredientListInput(this.recipeList)
            //Update appliance list
            this.applianceListWhithoutTag()
            //Update ustensil list
            this.ustensilListInput(this.recipeList)
            
        });
    }

    ustensilButton() {
        const filter = document.getElementById('filterByUtensil')
        filter.addEventListener("click", e => {
            if (e.target && e.target.matches("button")) {
                //Save ustensil
                this.tagUstensil.push(e.target.innerHTML)
                //clear input
                document.getElementById('searchUstensil').value = ''
                //Put ingredient tag in DOM
                this.vue.tagDOM(e.target.innerHTML, "red")
                //Reload recipes list with the new tag
                let ustensilList = this.model.getSomeUstensilByNewRecipies(e.target.innerHTML, this.recipeList)
                this.recipeList = ustensilList
                this.vue.clearDom('.results')
                ustensilList.map( ustensil => this.vue.RecipiesList(ustensil))
            }
            //Add close function to the tag
            this.deleteTagButton()
            //Update ingredient list
            this.ingredientListInput(this.recipeList)
            //Update appliance list
            this.applianceListInput(this.recipeList)
            //Update ustensil list
            this.ustensilListWhithoutTag(e.target.innerHTML, this.recipeList)
            
        });
    }

    deleteTagButton() {
        const tags = document.querySelectorAll(".closeButton")
        tags.forEach( tag => {
            tag.addEventListener('click', e => {
                //delete tag from the array
                this.tag = this.tag.filter(item => e.target.dataset.label!==item)
                this.tagAppliance= this.tagAppliance.filter(item => e.target.dataset.label!==item)
                this.tagUstensil = this.tagUstensil.filter(item => e.target.dataset.label!==item)

                tag.parentElement.remove();

                //Update recipe list according to search bar
                const searchBar = document.getElementById('search').value;
                if (searchBar.length > 2) {
                    this.recipeList = this.model.getRecipies(searchBar)
                } else {
                    this.recipeList = this.model.getAllRecipes()
                }

                //Update recipe list according to tag ingredient
                if (this.tag.length !== 0) {
                    let ingredientList = []
                    this.tag.forEach( tag => {
                        ingredientList = this.model.getSomeIngredientByNewRecipies(tag, this.recipeList)
                        this.recipeList = this.model.getSomeIngredientByNewRecipies(tag, this.recipeList)
                    })
                    this.recipeList = [...new Set(ingredientList)]
                }

                //Update recipe list according to tag appliance
                if (this.tagAppliance.length !== 0) {
                    let applianceList = []
                    this.tagAppliance.forEach( tag => {
                        applianceList = this.model.getSomeApplianceByNewRecipies(tag, this.recipeList)
                        this.recipeList = this.model.getSomeApplianceByNewRecipies(tag, this.recipeList)
                    })
                    this.recipeList = [...new Set(applianceList)]
                }

                //Update recipe list according to tag ustensil
                if (this.tagUstensil.length !== 0) {
                    let ustensilList = []
                    this.tagUstensil.forEach( tag => {
                        ustensilList = this.model.getSomeUstensilByNewRecipies(tag, this.recipeList)
                        this.recipeList = this.model.getSomeUstensilByNewRecipies(tag, this.recipeList)
                    })
                    this.recipeList = [...new Set(ustensilList)]
                }


                //Update ingredient list
                let nameList = this.model.getListIngredientByNewRecipies(this.recipeList)
                //Update appliance list
                let applianceList = this.model.getListApplianceByNewRecipies(this.recipeList)
                //Update ustensil list
                let ustensilList = this.model.getListUstensilByNewRecipies(this.recipeList)
                
                //Update and display ingredient list
                let selectIngredients = nameList
                if (this.tag.length !== 0) {
                    this.tag.forEach( tag => {
                        selectIngredients = selectIngredients.filter(item => tag.toLowerCase()!==item.toLowerCase())
                    })
                }
                this.vue.clearDom('#filterByIngredients')
                selectIngredients.map( (item, index) => this.vue.tagIngredients(item, index, selectIngredients.length))

                //Update and display appliance list
                let selectAppliances = applianceList
                if (this.tagAppliance.length !== 0) {
                    this.tagAppliance.forEach( tag => {
                        selectAppliances = selectAppliances.filter(item => tag.toLowerCase()!==item.toLowerCase())
                    })
                }
                this.vue.clearDom('#filterByDevice')
                selectAppliances.map( (item, index) => this.vue.tagAppliance(item, index, selectAppliances.length))

                //Update and display ustensil list
                let selectUstensil = ustensilList
                if (this.tagUstensil.length !== 0) {
                    this.tagUstensil.forEach( tag => {
                        selectUstensil = selectUstensil.filter(item => tag.toLowerCase()!==item.toLowerCase())
                    })
                }
                this.vue.clearDom('#filterByUtensil')
                selectUstensil.map( (item, index) => this.vue.tagUstensils(item, index, selectUstensil.length))

                //Update DOM recipe
                if (this.recipeList.length === 0) {
                    return this.vue.noRecipe()
                } else {
                    this.vue.clearDom('.results')
                    this.recipeList.map( recipe => this.vue.RecipiesList(recipe))
                }
                this.searchInput()
            })

        })
    }
    }

export { Controller }