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

        if (data.step.find((s) => {
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
            if (typeof s.ingredients != 'array') {
                return found_invalid;
            }
            return !found_invalid;
        })) {
            return null;
        }

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

    json() {
        let ingredient_ids = [];
        this.#steps.forEach((s) => {
            s.getIngredientIDs().forEach((iid) => {
                if (!ingredients.includes(iid)) {
                    ingredients.push(iid);
                }
            });
        });

        return {
            id: this.#id,
            name: this.#name,
            ingredients: ingredient_ids.map((iid) => Ingredient.findByID(iid).json()),
            steps: this.#steps.map((s) => s.json())
        }
    }

    getID() {
        return this.#id;
    }

    setName(new_name) {
        this.#name = new_name;
    }
}