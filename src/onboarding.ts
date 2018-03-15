import {dialogue, say, ask, expect, location, onText, goto} from "./dialogue-builder"

export default dialogue('Onboarding ', (fbid: string) => [
    say`Hi! My name is Alfred and I'm your banking consultant today.`,
    ask`Which bank do you prefer?`,
    expect`I prefer`, {
        'Banca Transilvania': (text: string) => console.log(`The user preffer ${text}`),
        'BCR': (text: string) => console.log(`The user preffer ${text}`),
        'BRD': (text: string) => console.log(`The user preffer ${text}`)
    },
    // ask`How can I help you?`,
    // expect`I want to `, {
    //     'Make a deposit': (text: string) => {console.log(`The user want to ${text}`); return goto`deposit`},
    //     'Open an account': (text: string) => {console.log(`The user want to ${text}`); return goto`openacc`},
    //     'Make an investment': (text: string) => {console.log(`The user want to ${text}`); return goto`invest`},
    // },
    // `deposit`,
    // ask`How much money you want to deposit?`,
    // expect`I want to deposit `, {
    //     '1000-5000 lei': (text: string) => console.log(`The user want to deposit ${text}`),
    //     '5000-10000 lei': (text: string) => console.log(`The user want to deposit${text}`),
    //     'more than 10000 lei': (text: string) => console.log(`The user want to deposit${text}`),
    // },
    // ask`Where you what to deposit them?`,
    // expect`I want to deposit the money in `, {
    //     'my checking account': (text: string) => console.log(`The user want to deposit ${text}`),
    //     'a new account': (text: string) => {console.log(`The user want to deposit${text}`); return goto`openacc`},
    //     'my savings account': (text: string) => console.log(`The user want to deposit${text}`),
    // },

    // `openacc`,
    // ask`What kind of account you want to open?`,
    // expect`I want to open `, {
    //     'a saving account': (text: string) => console.log(`The user want to open ${text}`),
    //     'a checking account': (text: string) => console.log(`The user want to open${text}`),
    //     'a money market account': (text: string) => console.log(`The user want to open${text}`),
    // },
    // ask`How much money you want to put into your account?`,
    // expect`I want to put `, {
    //     'less than 50 lei': (text: string) => console.log(`The user want to open ${text}`),
    //     '50-500': (text: string) => console.log(`The user want to open${text}`),
    //     'more than 500': (text: string) => console.log(`The user want to open${text}`),
    // },

    // `invest`,
    // ask`Where you want to invest?`,
    // expect`I want to invest in `, {
    //     'Stock funds': (text: string) => console.log(`The user want to open ${text}`),
    //     'Bond funds': (text: string) => console.log(`The user want to open${text}`),
    // },
    // ask`How much money you want to invest?`,
    // expect`I want to invest `, {
    //     '1000-5000 lei': (text: string) => console.log(`The user want to invest ${text}`),
    //     '5000-10000 lei': (text: string) => console.log(`The user want to invest${text}`),
    //     'more than 10000 lei': (text: string) => console.log(`The user want to invest${text}`),
    // },
    // ask`Where do you want to get notifications when you make a purchase or send money?`,
    // expect`I want to get notifications on `, {
    //     'email': (text: string) => console.log(`The user want to invest ${text}`),
    //     'SMS': (text: string) => console.log(`The user want to invest${text}`),
    //     'I don`t want it': (text: string) => console.log(`The user want to invest${text}`),
    // },

    // ask`Where do you live?`,
    // expect`I live at`, {
    //     [location]: (lat, long, title, url) => console.log(`User located at ${lat}, ${long}`)
    // },
    say`Thanks ${fbid}, have a nice day`,
]);