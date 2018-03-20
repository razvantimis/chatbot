import { dialogue, say, ask, expect, location, onText, goto } from "./dialogue-builder"

export default dialogue('Onboarding ', (fbid: string) => [
    say`Hi! My name is Alfred and I'm your banking consultant today.`,

    ask`Which bank do you prefer?`,
    expect`I prefer`, {
        'BT': (text: string) => console.log(`The user preffer ${text}`),
        'BCR': (text: string) => console.log(`The user preffer ${text}`),
        'BRD': (text: string) => console.log(`The user preffer ${text}`)
    },
    `first`,
    ask`How can I help you?`,
    expect`I want to `, {
        'A deposit': (text: string) => { console.log(`The user want to ${text}`); return goto`deposit` },
        'Open an account': (text: string) => { console.log(`The user want to ${text}`); return goto`openacc`},
        'Make an investment': (text: string) =>{ console.log(`The user want to ${text}`); return goto`invest`},
    },
    `deposit`,
    ask`How much money you want to deposit?`,
    expect`I want to deposit `, {
        '1000-5000 lei': (text: string) => console.log(`The user want to deposit ${text}`),
        '5000-10000 lei': (text: string) => console.log(`The user want to deposit${text}`),
        'more than 10000 lei': (text: string) => console.log(`The user want to deposit${text}`),
    },
    ask`Where you what to deposit them?`,
    expect`I want to deposit the money in `, {
        'my checking account': (text: string) => {console.log(`The user want to deposit ${text}`); return goto`iban`},
        'a new account': (text: string) => {console.log(`The user want to deposit${text}`); return goto`openacc`},
        'my savings account': (text: string) => {console.log(`The user want to deposit${text}`); return goto`iban`},
    },

    `openacc`,
    ask`How old are you?`,
    expect`My age is`, {
        [onText]: (text: string) => console.log(`User's age is ${text}`)

    },
    ask`What kind of account you want to open?`,
    expect`I want to open `, {
        'a saving account': (text: string) => console.log(`The user want to open ${text}`),
        'a checking account': (text: string) => console.log(`The user want to open${text}`),
        'a money market account': (text: string) => console.log(`The user want to open${text}`),
    },
    ask`How much money you want to put into your account?`,
    expect`I want to put `, {
        'less than 50 lei': (text: string) => {console.log(`The user want to open ${text}`); return goto`last`},
        '50-500': (text: string) => {console.log(`The user want to open${text}`); return goto`last`},
        'more than 500': (text: string) => {console.log(`The user want to open${text}`); return goto`last`},
    },

    `invest`,
    ask`Where you want to invest?`,
    expect`I want to invest in `, {
        'Stock funds': (text: string) => console.log(`The user want to open ${text}`),
        'Bond funds': (text: string) => console.log(`The user want to open${text}`),
    },
    ask`How much money you want to invest?`,
    expect`I want to invest `, {
        '1000-5000 lei': (text: string) => {console.log(`The user want to invest ${text}`);return goto`end`},
        '5000-10000 lei': (text: string) => {console.log(`The user want to invest${text}`);return goto`end`},
        'more than 10000 lei': (text: string) => {console.log(`The user want to invest${text}`);return goto`end`},
    },
    `iban`,
    ask`Write your IBAN`,
    expect`The IBAN is`, {
        [onText]: (text: string) => console.log(`User's IBAN is ${text}`)
    },
    

    `last`,
    ask`Where do you want to get notifications when you make a purchase or send money?`,
    expect`I want to get notifications on `, {
        'email': (text: string) => {console.log (`The user want to invest ${text}`);return goto`end` },
        'SMS': (text: string) => {console.log(`The user want to invest${text}`);return goto`end` },
        'I don`t want it': (text: string) => {console.log(`The user want to invest${text}`);return goto`end` },
    },

    
    `end`,
    ask`Is there anything I can help you with? `,
    expect`Options `, {
        'No,Thank you': (text: string) => console.log(`Bye ${text}`),
        'Yes': (text: string) =>{ console.log(`Hello ${text}`);return goto`first` },
    },
    say`You're welcome.I hope it was helpful! If you need any further information, please do not hesitate to contact me.`,
]);