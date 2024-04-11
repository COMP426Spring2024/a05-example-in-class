export class Step {

    #id
    #seq_no
    #instruction
    #ingredients

    static #next_id = 1;

    constructor (id, seq_no, instruction, ingredients) {
        this.#id = id;
        this.#seq_no = seq_no;
        this.#instruction = instruction;
        this.#ingredients = [...ingredients];
    }

    static create(data) {
        // Only used by Recipe which prevalidates the data.

        let id = Step.#next_id++;
        let step = new Step(id, data.seq_no, data.instruction, data.ingredients);
        return step;
    }

    json() {
        return {
            id: this.#id,
            seq_no: this.#seq_no,
            instruction: this.#instruction,
            ingredients: this.getIngredientIDs()
        }
    }

    getIngredientIDs() {
        return [...this.#ingredients];
    }
}