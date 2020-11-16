# simple-validator.js

This library validates content from strings and throws validation problems, is ment to be used to validate input fields on forms. Returns autocorrected version and specific position of the problem to implement a visual underline (this is a unique feature from this package).
You pass a string and the library returns an object with the information about the problems and the autocorrected version.
Implemented in Typescript with no dependencies, can be used also in Node.js.

## Features:
   * Simple: only needs a string (the text of the input field).
   * Returns a specific description of the validation problem.
   * Returns the position of the validation problem in the string (to implement a red underline).
   * Returns an autocorrected version of the string (to implement autocorrect while typing).
   * You build the rules of the validation by chaining functions (see below).
   * Created in Typescript
   * Tested in production
   * Fully documented with jsdoc and TypeScript, you should see documentation with autocomplete.


Supported localizations: English and Spanish.

## Getting Started

To install run:
```
npm i simple-validator-js
```

Everything is inside the "Validation" class, you need to chain functions, example:

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

The object returned has errors descriptions, the error texts are sent in all the languages avaiable in this tool, to return an error object with only one language call this (before any other call):

```javascript
Validation.languageFilter = LanguageFilter.english;
```

With the language you want. 
This is useful to implement your own translation logic based on the english language.

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
