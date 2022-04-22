import {recipes} from '../datas/recipes.js';


class Model {

    constructor(recipes) {
        this.recipes = recipes
    }

    getAllRecipes(){
        return recipes;
    }

    //Attention mettre premiere lettre en maj
    getAllIngredient(){
        let ingredientsList = []
        for (let i in recipes){
            for (let j in recipes[i].ingredients){
                ingredientsList.push(recipes[i].ingredients[j].ingredient.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
            }
        } ingredientsList = [...new Set(ingredientsList)]
        ingredientsList.sort()
        return ingredientsList;
    }

    //Attention a casserole
    getAllAppliance(){
        let applianceList = []
        for (let i in recipes){
                applianceList.push(recipes[i].appliance.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
        } applianceList = [...new Set(applianceList)]
        applianceList.sort()
        return applianceList;
    }

    getAllUstensils(){
        let ustensilsList = []
        for (let i in recipes){
            for (let j in recipes[i].ustensils)
                ustensilsList.push(recipes[i].ustensils[j].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
        } ustensilsList = [...new Set(ustensilsList)]
        ustensilsList.sort()
        console.log(ustensilsList)
        return ustensilsList;
    }

    
    getRecipieByName(e){
        let newRecipes = []
        let unicodeEvent = e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        for (let i in recipes) {
            let unicodeData = recipes[i].name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            let res = unicodeData.search(unicodeEvent);
            if(res!==-1){
                newRecipes.push(recipes[i])
            }
         }
         return newRecipes
    } 
    
    getRecipieByDescription(e){
        let newRecipes = [];
        let unicodeEvent = e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        for (let i in recipes) {
            let unicodeData = recipes[i].description.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            let res = unicodeData.search(unicodeEvent);
            if(res!==-1){
                newRecipes.push(recipes[i])
            }
         } return newRecipes
    }

    getRecipieByIngredient(e){
        let newRecipes = [];
        let unicodeEvent = e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        for (let i in recipes) {
            const data = recipes[i].ingredients;
            for (let j in data) {
                let unicodeData = data[j].ingredient.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                let res = unicodeData.search(unicodeEvent);
                if(res!==-1){
                    newRecipes.push(recipes[i])
                }
            }
         }
         return newRecipes
    }

    getRecipies(e){
        const ingredient = this.getRecipieByIngredient(e)
        const description = this.getRecipieByDescription(e)
        const name = this.getRecipieByName(e)
        let newRecipes = ingredient.concat(description).concat(name)
        newRecipes = [...new Set(newRecipes)]
        console.log(newRecipes.sort())
        return newRecipes
    }

    getShortlistByList(e, array){
        let newRecipes = []
        let unicodeEvent = e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        for (let i in array) {
            let unicodeData = array[i].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            let res = unicodeData.search(unicodeEvent);
            if(res!==-1){
                newRecipes.push(array[i])
            }
         }
         return newRecipes
    } 

    getShortListIngredients(e, array){
        let arr = [];
        let newRecipes = [];
        let unicodeEvent = e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        for (let i in array) {
            const data = array[i].ingredients;
            for (let j in data) {
                let ingredient = data[j].ingredient
                let unicodeData = ingredient.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                let res = unicodeData.search(unicodeEvent);
                if(res!==-1){
                    arr.push(array[i].ingredients)
                }
            }
         }
         for (let i in arr){
             for (let j in arr[i]){
                newRecipes.push(arr[i][j].ingredient)
             }
         }
         newRecipes = [...new Set(newRecipes)]
         return newRecipes
    }


    //Retourne la liste des ingredients suivant une nouvelle liste de recipie
    getListIngredientByNewRecipies(newRecipes){
        let arr = [];
        for (let i in newRecipes) {
            for (let ingredient of newRecipes[i].ingredients){
                arr.push(ingredient.ingredient.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
            }
        }
        arr = [...new Set(arr)]
        arr.sort()
        return arr
    }

    //Retourne la liste des appliance suivant une nouvelle liste de recipie
    getListApplianceByNewRecipies(newRecipes){
        let arr = [];
        for (let i in newRecipes) {
            arr.push(newRecipes[i].appliance.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
        }
        arr = [...new Set(arr)]
        arr.sort()
        return arr
    }

    //Retourne la liste des ustensil suivant une nouvelle liste de recipie
    getListUstensilByNewRecipies(newRecipes){
        let arr = [];
        for (let i in newRecipes) {
            for (let ustensil of newRecipes[i].ustensils){
                arr.push(ustensil.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
            }
        }
        arr = [...new Set(arr)]
        arr.sort()
        return arr
    }

    //Ne marche pas avec les accents circonflexe type creme fraiche
    getListIngredient(e){
        let arr = [];
        let unicodeEvent = e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        console.log(unicodeEvent)
        for (let i in recipes) {
            const data = recipes[i].ingredients;
            for (let i in data) {
                let ingredient = data[i].ingredient
                let unicodeData = ingredient.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                console.log(unicodeData)
                let res = unicodeData.search(unicodeEvent);
                if(res!==-1){
                    arr.push(ingredient[0].toUpperCase()+ingredient.substr(1).toLowerCase())
                    arr = [...new Set(arr)]
                    arr.sort()
                }
            }
            }
            return arr
    }

    //Retourne la liste des appliance suivant un input
    getListAppliance(e){
        let arr = [];
        let unicodeEvent = e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        for (let i in recipes) {
            let unicodeData = recipes[i].appliance.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            let res = unicodeData.search(unicodeEvent);
                if(res!==-1){
                    arr.push(recipes[i].appliance)
                    console.log(recipes[i].appliance)
                }
        }
        arr = [...new Set(arr)]
        arr.sort()
        return arr
    }

    //Retourne la liste des ustensils suivant un input
    getListUstensil(e){
        let arr = [];
        let unicodeEvent = e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        for (let i in recipes) {
            for (const ustensil of recipes[i].ustensils){
                let unicodeData = ustensil.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                let res = unicodeData.search(unicodeEvent);
                if(res!==-1){
                    arr.push(ustensil.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
                }
            } 
        }
        arr = [...new Set(arr)]
        arr.sort()
        return arr
    }

    //Retourne une les recipe suivant un input et un nouveau tableau de recipe
    getSomeIngredientByNewRecipies(e, array){
        let newRecipes = [];
        let unicodeEvent = e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        for (let i in array) {
            const data = array[i].ingredients;
            for (let j in data) {
                let unicodeData = data[j].ingredient.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                if(unicodeData === unicodeEvent){
                    newRecipes.push(array[i])
                }
            }
         }
         return newRecipes
    }

    //Retourne une les recipe suivant un input et un nouveau tableau de recipe
    getSomeApplianceByNewRecipies(e, array){
        let newRecipes = [];
        let unicodeEvent = e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        for (let i in array) {
            let unicodeData = array[i].appliance.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            if(unicodeData === unicodeEvent){
                newRecipes.push(array[i])
            } 
         }
         return newRecipes
    }

    //Retourne une les recipe suivant un input et un nouveau tableau de recipe
    getSomeUstensilByNewRecipies(e, array){
        let newRecipes = [];
        let unicodeEvent = e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        for (let i in array) {
            for (const ustensil of array[i].ustensils){
                let unicodeData = ustensil.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                if(unicodeData === unicodeEvent){
                    newRecipes.push(array[i])
                } 
            }
         }
         return newRecipes
    }
}


export {Model}