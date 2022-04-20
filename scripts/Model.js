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
        console.log(ingredientsList)
        return ingredientsList;
    }

    //Attention a casserole
    getAllAppliance(){
        let applianceList = []
        for (let i in recipes){
                applianceList.push(recipes[i].appliance.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
        } applianceList = [...new Set(applianceList)]
        applianceList.sort()
        console.log(applianceList)
        return applianceList;
    }

    getAllIngredientInArray(array){
        let ingredientsList = []
        for (let i in array){
            for (let j in array[i].ingredients){
                ingredientsList.push(array[i].ingredients[j].ingredient)
            }
        } ingredientsList = [...new Set(ingredientsList)]
        return ingredientsList;
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

    getShortRecipieList(e, array){
        let newRecipes = [];
        let unicodeEvent = e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        for (let i in array) {
            const data = array[i].ingredients;
            for (let j in data) {
                let unicodeData = data[j].ingredient.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                if(unicodeData === unicodeEvent){
                    newRecipes.push(array[i])
                    console.log(newRecipes)
                }
            }
         }
         return newRecipes
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
        return newRecipes
    }

    getListIngredient(e){
        let arr = [];
        let newRecipes = [];
        let unicodeEvent = e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        for (let i in recipes) {
            const data = recipes[i].ingredients;
            for (let i in data) {
                let ingredient = data[i].ingredient
                let unicodeData = ingredient.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                let res = unicodeData.search(unicodeEvent);
                if(res!==-1){
                    arr.push(ingredient[0].toUpperCase()+ingredient.substr(1).toLowerCase())
                    arr = [...new Set(arr)]
                }
            }
         }
         return arr
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
                    // arr.push(ingredient[0].toUpperCase()+ingredient.substr(1).toLowerCase())
                    arr.push(array[i].ingredients)
                    // arr = [...new Set(arr)]
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

    getListIngredients(e){
        let arr = [];
        let newRecipes = [];
        let unicodeEvent = e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        for (let i in recipes) {
            const data = recipes[i].ingredients;
            for (let j in data) {
                let ingredient = data[j].ingredient
                let unicodeData = ingredient.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                let res = unicodeData.search(unicodeEvent);
                if(res!==-1){
                    arr.push(recipes[i].ingredients)
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

    //Retourne la liste des appliance suivant une nouvelle liste de recipie
    getListApplianceByNewRecipies(newRecipes){
        let arr = [];
        for (let i in newRecipes) {
            arr.push(newRecipes[i].appliance.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
        }
        arr = [...new Set(arr)]
        return arr
    }

    //Retourne la liste des appliance suivant un input
    getListAppliance(e){
        let arr = [];
        let unicodeEvent = e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        for (let i in recipes) {
            let unicodeData = e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            let res = unicodeData.search(unicodeEvent);
                if(res!==-1){
                    arr.push(recipes[i].appliance)
                }
            // arr.push(recipes[i].appliance.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
        }
        arr = [...new Set(arr)]
        return arr
    }

    // getListUtenils(newRecipes){
    //     let arr = [];
    //     for (let i in newRecipes) {
    //         const data = newRecipes[i].ingredients;
    //         const e ="co";
    //         let sum ="";
    //         for (let i in data) {
    //             let res = data[i].ingredient.search(e);
    //             if(res!==-1){
    //                 arr.push(data[i].ingredient)
    //             }
    //         }
    //      }console.log(arr)
    //      console.log(this.newRecipes)
    // }

    // getRecipieByDescription(recipes){
    //     for (let i in recipes) {
    //         const data = recipes[i].description;
    //         const e ="cit";
    //         let res = data.search(e);
    //         if(res!==-1){
    //             this.newRecipes.push(recipes[i])
    //             this.newRecipes = [...new Set(this.newRecipes)]
    //         }
    //      }
        
    // }


    // searchListIngredient(recipes){
    //     let arr = [];
    //     for (let i in recipes) {
    //         const data = recipes[i].name;
    //         const e ="citron";
    //         console.log(e[0]);
    //         let sum ="";
            
    //         for (let i in data){
    //             sum += data[i];
    //             if(sum.length === e.length){
    //                 if(sum === e){
    //                     arr.push(data);
    //                 }
    //                 sum = sum.substring(1);
    //             } 
    //         } 
    //         }console.log(arr);
    // }

    // searchListIngredient2(recipes, e){
    //     let arr = [];
    //     for (let i in recipes) {
    //         const data = recipes[i].name;
    //         const e ="cit";
    //         let sum ="";
    //         for (let i in data){
    //             if(data[i] === e[0]){
    //                 sum = data.substr(i, e.length)
    //                 if(sum === e){
    //                     arr.push(data);
    //                 }
    //             } 
    //         } 
    //      }
    // }


    




}


export {Model}