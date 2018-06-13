import { Validation } from "..";
import { CountryPresets } from "./countrySpecific/CountryPresets";
import { WorldPresets } from "./world/WorldPresets";

export class Presets {
    public world: WorldPresets;
    public countrySpecific: CountryPresets;

    constructor(validation: Validation) {
        this.world = new WorldPresets(validation);
        this.countrySpecific = new CountryPresets(validation);
    }
}
