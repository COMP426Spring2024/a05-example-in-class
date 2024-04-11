import { Ingredient} from "./ingredient.mjs";
import {Step} from "./step.mjs";
export class Recipe {

    #id
    #name
    #steps

    static #next_id = 1;
    static #all_recipes = [];

    constructor (id, name, steps) {
        this.#id = id;
        this.#name = name;
        this.#steps = steps;
    }

    static create(data) {
        if ((data == undefined) || (!data instanceof Object) 
        || (data.name == undefined) 
        || (typeof data.name != 'string')) {
            return null;
        }

        if ((data.steps == undefined) || (! Array.isArray(data.steps))) {
            return null;
        }

        if (data.steps.find((s) => {
            let found_invalid = true;
            if (!s instanceof Object) {
                return found_invalid;
            }
            if (!s.seq_no) {
                return found_invalid;
            }
            if (typeof s.seq_no != 'number') {
                return found_invalid;
            }
            if (!s.instruction) {
                return found_invalid;
            }
            if (typeof s.instruction != 'string') {
                return found_invalid;
            }
            if (!s.ingredients) {
                return found_invalid;
            }
            if (!Array.isArray(s.ingredients)) {
                return found_invalid;
            }
            // Check to see if all of the ingredients
            // referenced by this step exist.
            if (s.ingredients.find((i) => !Ingredient.findByID(i))) {
                return found_invalid``
            }

            // All looks good with this step.
            return !found_invalid;
        })) {
            // Found an invalid step, return null for failure.
            return null;
        }

        // Make the steps. Data already validated.
        let steps = data.steps.map((s) => Step.create(s));

        let id = Recipe.#next_id++;
        let recipe = new Recipe(id, data.name, steps);
        Recipe.#all_recipes.push(recipe);
        return recipe;
    }

    static getAllIDs() {
        return Recipe.#all_recipes.map((r) => r.getID());
    }

    static findByID(id) {
        return Recipe.#all_recipes.find((r) => {
            return r.getID() == id;
        });
    }

    static deleteRecipeByID(id) {
        Recipe.#all_recipes = Recipe.#all_recipes.filter((r) => r.getID() !== id);
    }

    static isIngredientInUse(iid) {
        return Recipe.#all_recipes.find((r) => {
            return r.getIngredientIDs.find((i) => i == iid);
        });
    }

    json(expanded) {
        let ingredient_ids = [];
        this.#steps.forEach((s) => {
            s.getIngredientIDs().forEach((iid) => {
                if (!ingredient_ids.includes(iid)) {
                    ingredient_ids.push(iid);
                }
            });
        });

        let recipe_json = {
            id: this.#id,
            name: this.#name,
        }

        if (expanded) {
            recipe_json.ingredients = ingredient_ids.map((iid) => Ingredient.findByID(iid).json());
            recipe_json.steps = this.#steps.map((s) => s.json());
        } else {
            recipe_json.ingredient_count = ingredient_ids.length;
            recipe_json.step_count = this.#steps.length;
        }
        return recipe_json;
    }

    getID() {
        return this.#id;
    }

    setName(new_name) {
        this.#name = new_name;
    }
}