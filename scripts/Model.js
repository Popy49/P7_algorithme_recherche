import {recipes} from '../datas/recipes.js';


class Model {

    constructor(recipes) {
        this.recipes = recipes
    }

    getAllRecipes(){
        return recipes;
    }


    getAllIngredient(){
        let ingredientsList = []
        recipes.forEach( (recipe) => {
            recipe.ingredients.forEach ( (ingredient) => {
                ingredientsList.push(ingredient.ingredient.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
            })
        })
        ingredientsList = [...new Set(ingredientsList)]
        ingredientsList.sort()
        return ingredientsList
    }


    getAllAppliance(){
        let applianceList = []
        recipes.forEach( (recipe) => {
            applianceList.push(recipe.appliance.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
        })
        applianceList = [...new Set(applianceList)]
        applianceList.sort()
        return applianceList
    }

    getAllUstensils(){
        let ustensilsList = []
        recipes.forEach( (recipe) => {
            recipe.ustensils.forEach ( (ustensils) => {
                ustensilsList.push(ustensils.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
            })
        })
        ustensilsList = [...new Set(ustensilsList)]
        ustensilsList.sort()
        return ustensilsList
    }


    
    /**
        @param {string} input
        @returns {object} recipe
    */
    getRecipies(e){
        const newRecipe = []
        recipes.forEach( (recipe) => {
            let description = recipe.description.includes(e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
            let name = recipe.name.includes(e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
            let ingredient = recipe.ingredients.forEach( (ingredient) => {
                ingredient.ingredient.includes(e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
            });
            description || name || ingredient ? newRecipe.push(recipe) : newRecipe;
        })
            return newRecipe;
    }

    /**
        @param {string} input 
        @param {array} recipe
        @returns {object} recipe
    */
    getShortRecipies(e, array){
        const newRecipe = []
        array.forEach( (recipe) => {
            let description = recipe.description.includes(e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
            let name = recipe.name.includes(e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
            let ingredient = recipe.ingredients.forEach( (ingredient) => {
                ingredient.ingredient.includes(e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
            });
            description || name || ingredient ? newRecipe.push(recipe) : newRecipe;
        })
            return newRecipe;
    }

    /**
        @param {string} input 
        @param {array}
        @returns {array} 
    */
    getShortlistByList(e, array){
        let newRecipes = []
        array.forEach( (item) => {
            item = item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            let test = item.includes(e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
            test ? newRecipes.push(item) : newRecipes;
        })
         return newRecipes
    } 


    /**
        @param {object} recipe
        @returns {array} ingredient
    */
    getListIngredientByNewRecipies(newRecipes){
        let arr = [];
        newRecipes.forEach( recipe => {
            recipe.ingredients.forEach( ingredient => {
                arr.push(ingredient.ingredient.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
            })
        })
        arr = [...new Set(arr)]
        arr.sort()
        return arr
    }

    /**
        @param {object} recipe
        @returns {array} appliance
    */
    getListApplianceByNewRecipies(newRecipes){
        let appliance = newRecipes.map( recipe => recipe.appliance.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
        appliance = [...new Set(appliance)]
        appliance.sort()
        return appliance
    }

    /**
        @param {object} recipe
        @returns {array} ustensil
    */
    getListUstensilByNewRecipies(newRecipes){
        let arr = [];
        newRecipes.forEach( recipe => {
            recipe.ustensils.forEach( ustensil => {
                arr.push(ustensil.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
            })
        })
        arr = [...new Set(arr)]
        arr.sort()
        return arr
    }

    /**
        @param {string} input
        @returns {array} ingredient
    */
    getListIngredient(e){
        let arr = [];
        let input = e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        recipes.forEach( recipe => {
            recipe.ingredients.forEach( ingredient => {
                 let item = ingredient.ingredient.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(input)
                 item ? arr.push(ingredient.ingredient[0].toUpperCase()+ingredient.ingredient.substr(1).toLowerCase()) : arr;
            })
        })
        arr = [...new Set(arr)]
        arr.sort()
        return arr
    }

    /**
        @param {string} input
        @returns {array} appliance
    */
    getListAppliance(e){
        let arr = [];
        let input = e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        recipes.forEach( recipe => {
            let appliance = recipe.appliance.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(input)
            appliance ? arr.push(recipe.appliance[0].toUpperCase()+recipe.appliance.substr(1).toLowerCase()) : arr;
        })
        arr = [...new Set(arr)]
        arr.sort()
        return arr
    }

    /**
        @param {string} input
        @returns {array} ustensil
    */
    getListUstensil(e){
        let arr = [];
        let input = e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        recipes.forEach( recipe => {
            recipe.ustensils.forEach( ustensil => {
                 let item = ustensil.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(input)
                 item ? arr.push(ustensil[0].toUpperCase()+ustensil.substr(1).toLowerCase()) : arr;
            })
        })
        arr = [...new Set(arr)]
        arr.sort()
        return arr
    }

    /**
        @param {string} input
        @param {object} recipe
        @returns {object} recipe
    */
    getSomeIngredientByNewRecipies(input, array){
        let newRecipes = []
        array.forEach( (item) => {
            item.ingredients.forEach( (ingredient) => {
                ingredient = ingredient.ingredient.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                input = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                ingredient === input ? newRecipes.push(item) : newRecipes;
            })     
        })
         return newRecipes
    }

    /**
        @param {string} input
        @param {object} recipe
        @returns {object} recipe
    */
    getSomeApplianceByNewRecipies(input, array){
        let newRecipes = [];
        array.forEach( item => {
            let appliance = item.appliance.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            input = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            appliance === input ? newRecipes.push(item) : newRecipes;
        })
         return newRecipes
    }

    /**
        @param {string} input
        @param {object} recipe
        @returns {object} recipe
    */
    getSomeUstensilByNewRecipies(input, array){
        let newRecipes = []
        array.forEach( (item) => {
            item.ustensils.forEach( (ustensils) => {
                ustensils = ustensils.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                input = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                ustensils === input ? newRecipes.push(item) : newRecipes;
            })     
        })
         return newRecipes
    }
}


export {Model}