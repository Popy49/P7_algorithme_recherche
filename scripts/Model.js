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

    getShortlistByList(e, array){
        let newRecipes = []
        array.forEach( (item) => {
            item = item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            let test = item.includes(e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
            test ? newRecipes.push(item) : newRecipes;
        })
         return newRecipes
    } 

    //Retourne la liste des ingredients suivant une nouvelle liste de recipie
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

    //Retourne la liste des appliance suivant une nouvelle liste de recipie
    getListApplianceByNewRecipies(newRecipes){
        let appliance = newRecipes.map( recipe => recipe.appliance.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
        appliance = [...new Set(appliance)]
        appliance.sort()
        return appliance
    }

    //Retourne la liste des ustensil suivant une nouvelle liste de recipie
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

    //Ne marche pas avec les accents circonflexe type creme fraiche
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

    //Retourne la liste des appliance suivant un input
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

    //Retourne la liste des ustensils suivant un input
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

    //Retourne une les recipe suivant un input et un nouveau tableau de recipe
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

    //Retourne une les recipe suivant un input et un nouveau tableau de recipe
    getSomeApplianceByNewRecipies(input, array){
        let newRecipes = [];
        array.forEach( item => {
            let appliance = item.appliance.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            input = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            appliance === input ? newRecipes.push(item) : newRecipes;
        })
         return newRecipes
    }

    //Retourne une les recipe suivant un input et un nouveau tableau de recipe // ATTENTION NE SUPPRIME PAS CELUI CLIQUE
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