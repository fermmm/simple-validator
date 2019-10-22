import { Validation } from "../../source";

export function drawSpecialInput(testValidation: (text: string) => Validation, autoCorrect: boolean): void {
    document.addEventListener("DOMContentLoaded", () => {
        document.body.innerHTML = `
            <h1>VALIDATOR SANDBOX</h1>
            <div id="container" style="position: relative;display: inline-block;">
                <textarea id="input"></textarea>
                <div id="underline-overlay"></div>
                <div id="error-text" style="color:red"></div>
            </div>
        `;

        init(testValidation, autoCorrect);
    });
}

function init(testValidation: (text: string) => Validation, autoCorrect: boolean): void {
    const container: HTMLElement = document.getElementById("container");
    const input: HTMLInputElement = document.getElementById("input") as HTMLInputElement;
    const underlineOverlay: HTMLElement = document.getElementById("underline-overlay");
    const errorText: HTMLElement = document.getElementById("error-text");

    input.spellcheck = false;

    underlineOverlay.style.position = "absolute";
    underlineOverlay.style.color = "rgba(0, 0, 0, 0)";
    underlineOverlay.style.pointerEvents = "none";

    const zync: () => void = () => zyncOverlay(container, input, underlineOverlay);
    zync();

    input.addEventListener("input", (e: Event) => {
        const validation: Validation = testValidation(input.value);
        console.log(validation.result);
        // console.log(JSON.stringify(validation.result));

        if (autoCorrect) {
            input.value = validation.result.text;
        }
        updateErrorText(errorText, validation);
        updateOverlayText(input, underlineOverlay, validation);
        zync();
    });

    input.onscroll = zync;

    input.addEventListener("mousedown", () => {
        input.addEventListener("mousemove", zync);
    });

    input.addEventListener("mouseup", () => {
        input.removeEventListener("mousemove", zync);
    });
}

function updateErrorText(errorText: HTMLElement, validation: Validation): void {
    if (validation.result.isValid) {
        errorText.innerHTML = "";
        return;
    }

    if (validation.result.errors.length === 0) {
        return;
    }

    errorText.innerHTML = validation.result.errors[0].description.en;
}


function updateOverlayText(input: HTMLInputElement, underlineOverlay: HTMLElement, validation: Validation): void {
    let closeTag: boolean = false;
    let underlineCharacter: boolean = false;
    let textToShow: string = "";

    for (let i: number = 0; i <  input.value.length; i++) {
        underlineCharacter = false;
        if (validation.result.errors.length > 0 && validation.result.errors[0].locations.length > 0) {
            underlineCharacter = validation.result.errors[0].locations.indexOf(i) !== -1;
        }
        if (underlineCharacter && !closeTag) {
            closeTag = true;
            textToShow += "<span style=\"text-decoration:underline; text-decoration-color:red; text-underline-position: under;\">";
        } else if (!underlineCharacter && closeTag) {
            closeTag = false;
            textToShow += "</span>";
        }
        textToShow += input.value[i];
    }
    underlineOverlay.innerHTML = textToShow;
}


function zyncOverlay(container: HTMLElement, input: HTMLInputElement, underlineOverlay: HTMLElement): void {
    const inputStyles: CSSStyleDeclaration = window.getComputedStyle(input);

    underlineOverlay.style.width = inputStyles.width;
    underlineOverlay.style.height = inputStyles.height;
    underlineOverlay.style.right = inputStyles.right;
    underlineOverlay.style.left = inputStyles.left;
    underlineOverlay.style.top = "0";
    underlineOverlay.style.overflow = "hidden";

    underlineOverlay.style.fontSize = inputStyles.fontSize;
    underlineOverlay.style.fontFamily = inputStyles.fontFamily;
    underlineOverlay.style.lineHeight = inputStyles.lineHeight;
    underlineOverlay.style.wordWrap = inputStyles.wordWrap;
    underlineOverlay.style.padding = inputStyles.padding;
    underlineOverlay.style.margin = inputStyles.margin;
    underlineOverlay.style.textAlign = inputStyles.textAlign;
    underlineOverlay.style.textIndent = inputStyles.textIndent;
    underlineOverlay.style.textTransform = inputStyles.textTransform;
    underlineOverlay.style.whiteSpace = inputStyles.whiteSpace;
    underlineOverlay.style.letterSpacing = inputStyles.letterSpacing;
    underlineOverlay.style.wordSpacing = inputStyles.wordSpacing;
    underlineOverlay.scrollTop = input.scrollTop;
}
