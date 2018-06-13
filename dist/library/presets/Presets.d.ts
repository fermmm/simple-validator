import { Validation } from "..";
import { CountryPresets } from "./countrySpecific/CountryPresets";
import { WorldPresets } from "./world/WorldPresets";
export declare class Presets {
    world: WorldPresets;
    countrySpecific: CountryPresets;
    constructor(validation: Validation);
}
