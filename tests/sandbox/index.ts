import { Validation } from "../../source";
import { drawSpecialInput } from "./SpecialInput";

const autoCorrect: boolean = false;

function testValidation(text: string): Validation {
    return new Validation(text).noSpacesAllowed(autoCorrect);
}

drawSpecialInput(testValidation, autoCorrect);
