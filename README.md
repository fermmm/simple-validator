# SIMPLE VALIDATOR

This library validates content from input fields like: e-mail, name, ID, or anything. 
There is no visual implementation so it's not tied to any other library, could be used on front-end or back-end. To use it in front-end a visual representation of the results must be implemented by you.

```
Features:
    * Simple: only needs a string (the text of the input field), no complex setup required.
    * Returns a specific description of the validation problem.
    * Returns the position of the validation problem in the string (to implement underline).
    * Returns an autocorrected version of the text (to implement autocorrect).
    * You build the rules of the validation to cover any validation logic needed (see below).
    * Created in Typescript
    * Tested in production
    * Fully documented with jsdoc and TypeScript, you should see documentation with autocomplete.
```

Supported languages for error messages: English and Spanish.

## Library core concept

Since the validation requirements are very different with each project and country, in my opinion there is no possible "1 line of code" magic solution to validate a form, this is what other tools try to offer.
With this tool you can write your validator rules in the simplest syntax possible to cover any validation logic needed, requires more than 1 line of code but not much and solves an infinite validation requirements.

## Getting Started

To install run:
```
npm i simple-validator-js
```

Everything is inside the "Validation" class, you need to chain methods creating like a query with the validation requirements, example:

```javascript
const name = "roberto666";
cost validationInfo = new Validation(name)
                        .noNumbersAllowed(false)    // We set autocorrect to false for this rule to see how errors are returned.
                        .noSpacesAllowed()
                        .noSpecialCharactersAllowed(true, null)
                        .maxChars(100)
                        .minWords(1)
                        .maxWords(1)
                        .wordsShouldStartWithUpperCase();

console.log(validationInfo.result);
```

Prints the following object:

```javascript
{
    text: "Roberto666",             // Notice the uppercase first letter was auto-corrected and this is the correct version.
    textOriginal: "roberto666",
    isValid: false,                 // If isValid is false it means there are errors even after auto-correcting.
    errors: [
                {
                    description: {en: "numbers are not allowed.", es: "no se permite escribir números."},
                    locations: [7, 8, 9]
                }
            ]
}
```

Also there is a "presets" property to use already made common validation querys like for e-mal or phone validation, example:

```javascript
const phone = "1536850018"
const validation = new Validation(phone).presets.countrySpecific.ar.phone();
// This library is made by someone in argentina, sorry, only ar phones are supported, but you can build your own.
```
## Library configuration

By default error messages are objects that contains the error in all the languages, to return an error object with only one language call this before other library calls:

```javascript
Validation.languageFilter = LanguageFilter.english;
```

With the language you want.
This is useful server side, to improve performance when creating a JSON with the validation results.

## Usage example with React

```javascript
// Create the validators (Warning: in arrow functions if you write the {} you must also write return):
class MyComponent extends React.Component {
    validators = {
        password: (t) =>
            new Validation(t)
                .minChars(6)
                .maxChars(70),
        phone: (t) =>
            new Validation(t)
                .presets
                .countrySpecific
                .ar
                .phone()
    };

    // Apply validators to text fields (Just an example of a possible implementation):
    render() {
        return (
            <MyInputComponent validator={this.validators.password} onChange=this.setState/>
            <MyInputComponent validator={this.validators.phone} onChange=this.setState/>
        )
    }
    
    // This function checks if the fields are valid to enable the send button in the form:
    formIsValid() {
        const { password, phoneNumber } = this.state;

        return (
            this.validators.password(password).result.isValid &&
            this.validators.phone(phoneNumber).result.isValid
        );
    }
}
```

MyInputComponent renders the validation results, that component is not provided here, is only an example of how a possible implementation can be written.

## Donate

If you like this library and want it to become something even better, please donate [here.](https://www.paypal.me/fermmm)
