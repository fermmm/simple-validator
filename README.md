# SIMPLE VALIDATOR

This library validates content from input fields like: e-mail, name, ID, or anything.
There is no visual implementation, you configure the validation and pass a string (the text that the user typed in the input field), returns an object with the information about the problems and the autocorrected version. It's vanilla JS, can be used on front-end or in Node.js.

A visual implementation in React is available [in this repository.](https://github.com/fermmm/simple-validator-react) 

## Features:
   * Simple: only needs a string (the text of the input field).
   * Returns a specific description of the validation problem.
   * Returns the position of the validation problem in the string (to implement a red underline or something like that).
   * Returns an autocorrected version of the string (to implement autocorrect).
   * You build the rules of the validation to cover any validation logic needed (see below).
   * Created in Typescript
   * Tested in production
   * Fully documented with jsdoc and TypeScript, you should see documentation with autocomplete.


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
import {Validation} from 'simple-validator-js';

const name = "roberto666";
const validationInfo = new Validation(name)
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

## Library configuration

As you see in the object returned has errors descriptions, the error texts are sent in all the languages avaiable in this tool, to return an error object with only one language call this (before any other call):

```javascript
Validation.languageFilter = LanguageFilter.english;
```

With the language you want. 
This is useful to implement your own translation logic based on the english language.

## Usage example with React

```javascript
// Create the validators (Warning: in arrow functions if you write the {} you must also write return):
class MyComponent extends React.Component {
    validators = {
        email: (t) =>
            new Validation(t)
                .isEmail(),
        password: (t) =>
            new Validation(t)
                .minChars(6)
                .maxChars(70)
    };

    // Apply validators to text fields (Just an example of a possible implementation):
    render() {
        return (
            <MyInputComponent validator={this.validators.email} onChange={this.setState(...)}/>
            <MyInputComponent validator={this.validators.password} onChange={this.setState(...)}/>
        )
    }
    
    // This function checks if the fields are valid to enable the send button in the form:
    formIsValid() {
        const { password, phoneNumber } = this.state;

        return (
            this.validators.email(email).result.isValid &&
            this.validators.password(password).result.isValid
        );
    }
}
```

MyInputComponent renders the input with the validation results, that component is not provided here, there is an example component like this [here.](https://github.com/fermmm/simple-validator-react)

## Donate

If you like this library and want it to become something even better, please donate [here.](https://www.paypal.me/fermmm)

## Documentation:


## Methods

  

  

▸ **customRegex**(`regex`: RegExp, `invert`: boolean, `name`: string): *[Validation](_index_.validation.md)*

  

  

With this filter you apply a custom regex. Useful in complex validations. The drawback is that this does not return useful

  

information in the error text and does not support auto correct.

  

  

**Parameters:**

  

`regex` | RegExp | - | Regex expression. |

  

`invert` | boolean | false | To switch, so the regex allows or dissallows the validation. |

  

`name` | string | "" | This will be showed in the error as the first word before "is invalid", example: content is invalid. |

  

  
  

  

___

  

  

▸ **emailConfirmation**(`email`: string | function): *[Validation](_index_.validation.md)*

  

  

Checks if the text is the same than the text passed to this function, if the texts does not match creates a "email not matching" error.

  

  

**Parameters:**

  

  

`email` | string &#124; function | It can be a string with the email to check for matching, also can be a function that returns a string. |

  

  
  

  

___

  

  

▸ **isEmail**(): *[Validation](_index_.validation.md)*

  

  

Email validator rule. Does not report error details, only if it's valid or not.

  

  
  

  

___

  

  

▸ **maxChars**(`charsAmount`: number, `autocorrect`: boolean): *[Validation](_index_.validation.md)*

  

  

Maximum of characters that should be written.

  

  

**Parameters:**

  

  

`charsAmount` | number | - | - |

  

`autocorrect` | boolean | false | In this case autocorrect default value is false because when the user writes more than what is needed he/she needs to be aware of what is happening otherwise it looks like the input field is bugged. |

  

  
  

  

___

  

  

▸ **maxWords**(`wordsAmount`: number, `autocorrect`: boolean): *[Validation](_index_.validation.md)*

  

  

Max amount of words that should be written.

  

  

**Parameters:**

  

  
  
  

`wordsAmount` | number | - |

  

`autocorrect` | boolean | true |

  

  
  

  

___

  

  

▸ **minChars**(`charsAmount`: number): *[Validation](_index_.validation.md)*

  

  

A minimum of characters that should be written.

  

  

**Parameters:**

  

  

`charsAmount` | number | The amount of minimum characters allowed. |

  

  
  

  

___

  

  

▸ **minWords**(`wordsAmount`: number): *[Validation](_index_.validation.md)*

  

  

Minmum amount of words that should be written.

  

  

**Parameters:**

  

  
  
  

`wordsAmount` | number |

  

  
  

  

___

  

  

▸ **noInvalidSpacesAllowed**(`autocorrect`: boolean): *[Validation](_index_.validation.md)*

  

  

Invalid spaces means when the first character is a space or when there is one space after the other.

  

  

**Parameters:**

  

  

`autocorrect` | boolean | true | Autocorrect removing concatenated spaces and first space or the problem should be returned as an error. |

  

  
  

  

___

  

  

▸ **noLettersAllowed**(`autocorrect`: boolean): *[Validation](_index_.validation.md)*

  

  

**Parameters:**

  

  
  
  

`autocorrect` | boolean | true |

  

  
  

  

___

  

  

▸ **noNumbersAllowed**(`autocorrect`: boolean): *[Validation](_index_.validation.md)*

  

  

**Parameters:**

  

  
  
  

`autocorrect` | boolean | true |

  

  
  

  

___

  

  

▸ **noSpacesAllowed**(`autocorrect`: boolean): *[Validation](_index_.validation.md)*

  

  

**Parameters:**

  

  
  
  

`autocorrect` | boolean | true |

  

  
  

  

___

  

  

▸ **noSpecialCharactersAllowed**(`allowUnicode`: boolean, `exceptions`: string[], `autocorrect`: boolean): *[Validation](_index_.validation.md)*

  

  

This validator only allows alphanumeric characters by dafault (only letters and numbers), you can specify exceptions.

  

  

**Parameters:**

  

  

`allowUnicode` | boolean | true | If you have a string like "Âlvarö", it would reject it because of the letters Â and ö unless this is true (default). |

  

`exceptions` | string[] | null | A list of characters that are allowed. |

  

`autocorrect` | boolean | true | - |

  

  
  

  

___

  

  

▸ **passwordConfirmation**(`password`: string | function): *[Validation](_index_.validation.md)*

  

  

Checks if the text is the same than the text passed to this function, if the texts does not match creates a "password not matching" error.

  

  

**Parameters:**

  

  

`password` | string &#124; function | It can be a string with the password to check for matching, also can be a function that returns a string. |

  

  
  

  

___

  

  

▸ **shouldContain**(`characterOrText`: string, `maxAllowed`: number): *[Validation](_index_.validation.md)*

  

  

**Parameters:**

  

  
  
  

`characterOrText` | string | - |

  

`maxAllowed` | number | null |

  

  
  

  

___

  

  

▸ **shouldContainAfter**(`characterOrText`: string, `referenceCharacterOrText`: string, `minDistance`: number): *[Validation](_index_.validation.md)*

  

  

When a character or text inside string should be present after another one.

  

  

**Parameters:**

  

  

`characterOrText` | string | - | The character or text that should be present after another one. |

  

`referenceCharacterOrText` | string | - | The character or text that should be before. |

  

`minDistance` | number | 1 | The minimum index dinstance from one to the other. Shoud be a value higher than 1. |

  

  
  

  

___

  

  

▸ **shouldContainAt**(`textOrCharacter`: string, `positionIndex`: number, `fromTheBeginning`: boolean, `autocorrect`: boolean): *[Validation](_index_.validation.md)*

  

  

When a text or character should be in a specific position.

  

  

**Parameters:**

  

  

`textOrCharacter` | string | - | The text or character that should be in a specific position. |

  

`positionIndex` | number | - | The position index in the string in where the text or character should be at. |

  

`fromTheBeginning` | boolean | true | If the position index should be counted from the beggining or from the bottom of the string. Warning: Autocorrect does not work if this is false. |

  

`autocorrect` | boolean | true | Autocorrect adding the text or character or if it should be returned as an error. If fromTheBeginning is false this does not work. |

  

  
  

  

___

  

  

▸ **shouldContainBefore**(`characterOrText`: string, `referenceCharacterOrText`: string, `minDistance`: number): *[Validation](_index_.validation.md)*

  

  

When a character or text inside string should be present before another one.

  

  

**Parameters:**

  

  

`characterOrText` | string | - | The character or text that should be present before another one. |

  

`referenceCharacterOrText` | string | - | The character or text that should be after. |

  

`minDistance` | number | 1 | The minimum index dinstance from one to the other. Shoud be a value higher than 1. |

  

  
  

  

___

  

  

▸ **shouldEndWith**(`textToMatch`: string): *[Validation](_index_.validation.md)*

  

  

**Parameters:**

  

  
  
  

`textToMatch` | string |

  

  
  

  

___

  

  

▸ **shouldStartWith**(`textToMatch`: string, `autocorrect`: boolean): *[Validation](_index_.validation.md)*

  

  

**Parameters:**

  

  
  
  

`textToMatch` | string | - |

  

`autocorrect` | boolean | true |

  

  
  

  

___

  

  

▸ **wordsShouldStartWithUpperCase**(`autocorrect`: boolean): *[Validation](_index_.validation.md)*

  

  

This validator only evaluates the first character of each word: If it's a letter in upper case is valid, if

  

it's not a letter is valid, if it's a letter in lowercase is invalid.

  

  

**Parameters:**

  

  
  
  

`autocorrect` | boolean | true |

  

  

**Returns:**  *[Validation](_index_.validation.md)*
