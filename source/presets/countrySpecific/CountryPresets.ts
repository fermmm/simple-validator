import { Validation } from "../..";
import { Ar } from "./ar/Ar";

export class CountryPresets {
    public ar: Ar;

    constructor(validation: Validation) {
        this.ar = new Ar(validation);
    }
}
