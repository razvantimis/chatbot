import { dialogue, say, ask, expect, location, onText, goto } from "./dialogue-builder"
 
export default dialogue('Onboarding ', (fbid: string) => [
    say`Hi! My name is Alfred and I'm your BT consultant today.`,
 
    ask`What can I do for you?`,
    expect`I need`, {
        'I need some information': (text: string) => {console.log(`The user preffer ${text}`);return goto `info`},
        'I want to make a tranzaction': (text: string) => {console.log(`The user preffer ${text}`);return goto `first`} ,
    },
       
    `info`,
    ask`Choose one topic of your interest`,
    expect`I want to know`, {
        'Cards': (text: string) =>{ console.log(`The user choose ${text}`); return goto`cards` },
        'Loans': (text: string) => {console.log(`The user choose ${text}`);return goto`loans` },
        'Deposits ': (text: string) => {console.log(`The user choose ${text}`);return goto`deposit`},
    },
    `cards`,
    ask`Choose one topic of your interest`,
    expect`I want info about`, {
        'Shopping cards': (text: string) =>{ console.log(`The user choose ${text}`); return goto`shopping` },
        'Debit cards': (text: string) =>{ console.log(`The user choose ${text}`); return goto`debit` },
        'START Student': (text: string) => {console.log(`The user choose ${text}`); return goto`studentcards` },
       
    },
    `shopping`,
    ask`Choose one topic of your interest`,
    expect`I want to know about`, {
        'BT Flying Blue': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`flying` },
        'STAR Card': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`star` },  
    },
    `flying`,
    ask`Choose one topic of your interest`,
    expect`I want to know`, {
        'What is BT Flying Blue Card? ': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`def` },
        'Which are the requirements? ': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`req` },
        'How do I get it?': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`getit` },
        'How much does it cost?': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`cost` },
        'Why does it suit you? ': (text: string) => {console.log(`The user needs info about ${text}`); return goto`suit` },
        'Which are the benefits? ': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`benef` },
        'About Miles ': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`miles` },
        'How do you know how many Miles you have?': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`nummiles` },
    },
    `def`,
    say`Flying Blue is a joint AIR FRANCE, KLM and TAROM loyalty program to reward the most loyal individual travelers.It has been created for you to enjoy traveling and shopping.`, goto`more`,
    `req`,
    say`To get the card you need to have a monthly income of at least 800 lei and at least 3 months on the current job,between 18 and 65 years old and to be Romanian citizen.`, goto`more`,
    `getit`,
    say`You can get the card by telephone:0264 594 337 – from any network, including from abroad, 0800 80 2273 – from any national network or send SMS at 1838 with the text FLY.`, goto`more`,
    `cost`,
    say`The BT Flying Blue Classic Card issue fee is 50 lei/card and the annual maintenance fee is 50 lei/card/year.`,goto`more`,
    `suit`,
    say`Because you are alike: you like to travel, to shop and earn Miles for new destinations.`,goto`more`,
    `benef`,
    say`You will get 1.000 Award Mile at first purchase,interest free instalments,free travel insurance for trips abroad. The credit period is 5 years and the interest rate is 24% per year`,goto`more`,
    `miles`,
    say`Whenever you pay with your BT Flying Blue Classic Card, you accumulate Award Miles in the Flying Blue Program. For every 4 lei spent you receive:award mile for purchases in Romania and award Miles for payments at AIR FRANCE, KLM and TAROM and abroad. More details:www.flyingblue.com`, goto`more`,
    `nummiles`,
    say`Award Miles are being credited into your Flying Blue account monthly- by the 15th of the next month after the payments have been made.You can check your Miles balance here : www.flyingblue.com`,goto`more`,
 
    `more`,
    ask`Do you want to know more?`,
    expect`I want to know`, {
        'Yes': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`flying` },
        'No,Thank you': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`finish` },
        'I want to choose another topic': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`info` },  
    },
   
 
   `finish`,
   say`You're welcome.I hope it was helpful! If you need any further information, please do not hesitate to contact me.`,
 
   `star`,
   ask `This credit card can be Star Forte, Star Gold, or Star Platinum. Choose one to tell you more about it.`,
   expect`I want to know more about`, {
       'Star Forte': (text: string) => { console.log(`The user wants to know more about ${text}`); return goto`starForte` },
       'Star Gold': (text: string) => { console.log(`The user wants to know more about ${text}`); return goto`starGold`},
       'Star Platinum': (text: string) =>{ console.log(`The user wants to know more about ${text}`); return goto`starPlatinum`},
   },
 
   'starForte',
   ask `What do you want to know about Star Forte`,
   expect `I want to know`, {
       'What is Star Forte?': (text: string) => { console.log(`The user wants to know more about ${text}`); return goto`defStarForte` },
       'Which are the requirements? ': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`reqStarForte` },
       'How do I get it?': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`getitStarForte` },
       'How much does it cost?': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`costStarForte` },
       'Why does it suit you? ': (text: string) => {console.log(`The user needs info about ${text}`); return goto`suitStarForte` },
       'Which are the benefits? ': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`benefStarForte` },
       },
   
       `defStarForte`,
       say`Designed for online and city shopping, the Star Forte card can be used for transactions at the retailers and the ATMs in the country and abroad, when you are on vacation or visiting friends.`, goto`moreStarForte`,
       `reqStarForte`,
       say`To get the card you need to have a monthly income of at least 800 lei and at least 3 months on the current job,between 18 and 65 years old and to be Romanian citizen.`, goto`moreStarForte`,
       `getitStarForte`,
       say`ou can get the card from any subsidiary bank`, goto`moreStarForte`,
       `costStarForte`,
       say`The account management fee is 25 lei/year `,goto`moreStarForte`,
       `suitStarForte`,
       say`With Star Forte you win every time you go shopping in the country or abroad. `,goto`moreStarForte`,
       `benefStarForte`,
       say`There are zero costs for the use of the card at retailers in the country and abroad`,goto`moreStarForte`,
       
       'moreStarForte',
       ask`Do you want to know more about StarForte?`,
       expect`I want to know`, {
           'Yes': (text: string) =>{ console.log(`The user needs more info about ${text}`); return goto`starForte` },
           'No,Thank you': (text: string) =>{ console.log(`The user needs more info about ${text}`); return goto`finish` },
           'I want to know more about Star Gold': (text: string) =>{ console.log(`The user needs more info about ${text}`); return goto`starGold` },
           'I want to know more about Star Platinum': (text: string) =>{ console.log(`The user needs more info about ${text}`); return goto`starPlatinum` },
           'I want to choose another topic': (text: string) =>{ console.log(`The user needs more info about ${text}`); return goto`info` },  
       },
 
 
       `starGold`,
   ask `What do you want to know about Star Gold`,
   expect `I want to know`, {
       'What is Star Gold?': (text: string) => { console.log(`The user wants to know more about ${text}`); return goto`defStarGold` },
       'Which are the requirements? ': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`reqStarGold` },
       'How do I get it?': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`getitStarGold` },
       'How much does it cost?': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`costStarGold` },
       'Why does it suit you? ': (text: string) => {console.log(`The user needs info about ${text}`); return goto`suitStarGold` },
       },
   
       `defStarGold`,
       say`This is a VISA card that can be used for shopping or other transactions at retailers and ATMs in the country and abroad, irrespective of where you choose to spend your time or travel.`, goto`moreStarGold`,
       `reqStarGold`,
       say`To get the card you need to have a monthly income of at least 4000 lei and at least 3 months on the current job, between 18 and 65 years old and to be Romanian citizen.`, goto`moreStarGold`,
       `getitStarGold`,
       say`You can get the card from any subsidiary bank`, goto`moreStarGold`,
       `costStarGold`,
       say`The card issue fee is RON 100 and the annual account management fee is RON 200. The interest rate is 24%/ year`,goto`moreStarGold`,
       `suitStarGold`,
       say`With Star Gold you win every time you go shopping in the country or abroad. Any payment with Star Gold brings Star points depending on the shopping amount, points that turn into money that you can then use as you please.`,goto`moreStarGold`,
       
       'moreStarGold',
       ask`Do you want to know more about Star Gold?`,
       expect`I want to know`, {
           'Yes': (text: string) =>{ console.log(`The user needs more info about ${text}`); return goto`starGold` },
           'No,Thank you': (text: string) =>{ console.log(`The user needs more info about ${text}`); return goto`finish` },
           'I want to know more about Star Forte': (text: string) =>{ console.log(`The user needs more info about ${text}`); return goto`starForte` },
           'I want to know more about Star Platinum': (text: string) =>{ console.log(`The user needs more info about ${text}`); return goto`starPlatinum` },
           'I want to choose another topic': (text: string) =>{ console.log(`The user needs more info about ${text}`); return goto`info` },  
       },
 
 
       'starPlatinum',
   ask `What do you want to know about Star Platinum`,
   expect `I want to know`, {
       'What is Star Platinum?': (text: string) => { console.log(`The user wants to know more about ${text}`); return goto`defStarPlatinum` },
       'Which are the requirements? ': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`reqStarPlatinum` },
       'How do I get it?': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`getitStarPlatinum` },
       'How much does it cost?': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`costStarPlatinum` },
       'Why does it suit you? ': (text: string) => {console.log(`The user needs info about ${text}`); return goto`suitStarPlatinum` },
       },
   
       `defStarPlatinum`,
       say`Star Platinum from BT is the first Platinum card launched in Romania. This is one of the most exclusivist shopping cards in Romania, providing you with luxury services, exclusivities and privileges. This is a VISA card that can be used for shopping and online payments, at retailers or ATMs in the country and abroad.`, goto`moreStarPlatinum`,
       `reqStarPlatinum`,
       say`To get the card you need to have a monthly income of at least 12000 lei and at least 3 months on the current job, between 18 and 65 years old and to be Romanian citizen.`, goto`moreStarPlatinum`,
       `getitStarPlatinum`,
       say`You can get the card from any BT subsidiary bank, online by leaving your personal details here: https://www.bancatransilvania.ro/pentru-tine/carduri/carduri-de-cumparaturi/star-card/star-platinum/ or over the phone: 0264 594 337 – from any network, including from abroad, 0800 80 2273 – from any national network.`, goto`moreStarPlatinum`,
       `costStarPlatinum`,
       say`The card issue fee is RON 350 and the annual account management fee is RON 350. The interest rate is 24%/ year.`,goto`moreStarPlatinum`,
       `suitStarPlatinum`,
       say`With Star Platinum you acquire Star points every time you use the card for shopping, and such points are converted into money that you can use at your own discretion. The more you purchase, the more returns to you!`,goto`moreStarPlatinum`,
       
       'moreStarPlatinum',
       ask`Do you want to know more about Star Platinum?`,
       expect`I want to know`, {
           'Yes': (text: string) =>{ console.log(`The user needs more info about ${text}`); return goto`starGold` },
           'No,Thank you': (text: string) =>{ console.log(`The user needs more info about ${text}`); return goto`finish2` },
           'I want to know more about Star Forte': (text: string) =>{ console.log(`The user needs more info about ${text}`); return goto`starForte` },
           'I want to know more about Star Gold': (text: string) =>{ console.log(`The user needs more info about ${text}`); return goto`starGold` },
           'I want to choose another topic': (text: string) =>{ console.log(`The user needs more info about ${text}`); return goto`info` },  
       },
 
   `finish2`,
   say`You're welcome.I hope it was helpful! If you need any further information, please do not hesitate to contact me.`,
 
   'debitCards',
   ask`Choose one topic of your interest`,
   expect`I want to know about`, {
       'Visa Electron': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`visaElectron`},
       'MasterCard Mondo': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`masterCardMondo`},  
       'MasterCard Gold Debit': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`masterCardGoldDebit`},
       'MasterCard Direct': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`masterCardDirect`},
   },
 
       `visaElectron`,
       ask `What do you want to know about Visa Electron?`,
       expect `I want to know `, {
           'What is Visa Electron?': (text: string) => { console.log(`The user wants to know more about ${text}`); return goto`defVisaElectron` },
           'How do I get it?': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`getitVisaElectron` },
           'How much does it cost?': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`costVisaElectron` },
           'Why does it suit you? ': (text: string) => {console.log(`The user needs info about ${text}`); return goto`suitVisaElectron` },
           },
           
           `defVisaElectron`,
               say`Suitable for everyday use, Visa Electron issued by BT is a versatile and convenient card which considerably facilitates online and offline payments, both in Romania and abroad.`, goto`moreVisaElectron`,
            `getitVisaElectron`,
                say`You can get the card from any BT subsidiary bank.`, goto`moreVisaElectron`,
           `costVisaElectron`,
               say`The are no costs`,goto`moreVisaElectron`,
           `suitVisaElectron`,
               say`You can personalize your card with a selfie or any other photos`,goto`moreVisaElectron`,
   
               `moreVisaElectron`,
                   ask`Do you want to know more about Visa Electron?`,
                   expect`I want to know`, {
                   'Yes': (text: string) =>{ console.log(`The user needs more info about ${text}`); return goto`visaElectron` },
                   'No,Thank you': (text: string) =>{ console.log(`The user needs more info about ${text}`); return goto`finish` },
                   'I want to know more about MasterCard Mondo ': (text: string) =>{ console.log(`The user needs more info about ${text}`); return goto`masterCardMondo` },
                   'I want to know more about MasterCard Gold Debit': (text: string) =>{ console.log(`The user needs more info about ${text}`); return goto`masterCardGoldDebit` },
                   'I want to know more about MasterCard Direct': (text: string) =>{ console.log(`The user needs more info about ${text}`); return goto`masterCardDirect` },
                   'I want to choose another topic': (text: string) =>{ console.log(`The user needs more info about ${text}`); return goto`info` },
                   },
 
       `masterCardMondo`,
       ask `What do you want to know about MasterCard Mondo?`,
       expect `I want to know, `, {
           'What is MasterCard Mondo?': (text: string) => { console.log(`The user wants to know more about ${text}`); return goto`defMasterCardMondo` },
           'How do I get it?': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`getitMasterCardMondo` },
           'How much does it cost?': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`costMasterCardMondo` },
           'Why does it suit you? ': (text: string) => {console.log(`The user needs info about ${text}`); return goto`suitMasterCardMondo` },
           },
           
           `defMasterCardMondo`,
               say`The MasterCard Mondo debit card is attached to RON accounts and can be used with all POSs and ATMs present throughout the country and abroad, as well as online.`, goto`moreMasterCardMondo`,
            `getitMasterCardMondo`,
                say`You can get the card from any BT subsidiary bank.`, goto`moreMasterCardMondo`,
           `costMasterCardMondo`,
               say`The are no costs`, goto`moreMasterCardMondo`,
           `suitMasterCardMondo`,
               say`You can use it to get your salary`,goto`moreMasterCardMondo`,
   
               `moreMasterCardMondo`,
                   ask`Do you want to know more about MasterCard Mondo?`,
                   expect`I want to know`, {
                   'Yes': (text: string) =>{ console.log(`The user needs more info about ${text}`); return goto`masterCardMondo` },
                   'No,Thank you': (text: string) =>{ console.log(`The user needs more info about ${text}`); return goto`finish` },
                   'I want to know more about Visa Electron': (text: string) =>{ console.log(`The user needs more info about ${text}`); return goto`visaElectron` },
                   'I want to know more about MasterCard Gold Debit': (text: string) =>{ console.log(`The user needs more info about ${text}`); return goto`masterCardGoldDebit` },
                   'I want to know more about MasterCard Direct': (text: string) =>{ console.log(`The user needs more info about ${text}`); return goto`masterCardDirect` },
                   'I want to choose another topic': (text: string) =>{ console.log(`The user needs more info about ${text}`); return goto`info` },
                   },
 
       `masterCardGoldDebit`,
       ask `What do you want to know about MasterCard Gold Debit?`,
       expect `I want to know`, {
           'What is MasterCard Gold Debit?': (text: string) => { console.log(`The user wants to know more about ${text}`); return goto`defMasterCardGoldDebit` },
           'How do I get it?': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`getitMasterCardGoldDebit` },
           'How much does it cost?': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`costMasterCardGoldDebit` },
           'Why does it suit you? ': (text: string) => {console.log(`The user needs info about ${text}`); return goto`suitMasterCardGoldDebit` },
           },
           
           `defMasterCardGoldDebit`,
               say`MasterCard Gold Debit is linked to a RON account and you can take it on vacation. It is suitable for secure payments via any POS or ATM in Romania, around the world or online.`, goto`moreMasterCardMondo`,
            `getitMasterCardGoldDebit`,
                say`You can get the card from any BT subsidiary bank.`, goto`moreMasterCardMondo`,
           `costMasterCardGoldDebit`,
               say`The card issue fee is RON 50 and the annual account management fee is RON 80`,goto`moreMasterCardMondo`,
           `suitMasterCardGoldDebit`,
               say`You have travelling insurance, unlimited access to the associated current account, through Internet and Mobile Banking. You can pay your utility/service bills* (electricity, water, gas, sanitation, land line and mobile subscription, cable TV etc.) at the BT ATM`, goto`moreMasterCardMondo`,
   
               `moreMasterCardGoldDebit`,
                   ask`Do you want to know more about MasterCard Gold Debit?`,
                   expect`I want to know`, {
                   'Yes': (text: string) =>{ console.log(`The user needs more info about ${text}`); return goto`masterCardMondo` },
                   'No,Thank you': (text: string) =>{ console.log(`The user needs more info about ${text}`); return goto`finish` },
                   'I want to know more about Visa Electron': (text: string) =>{ console.log(`The user needs more info about ${text}`); return goto`visaElectron` },
                   'I want to know more about MasterCard Mondo': (text: string) =>{ console.log(`The user needs more info about ${text}`); return goto`masterCardMondo` },
                   'I want to know more about MasterCard Direct': (text: string) =>{ console.log(`The user needs more info about ${text}`); return goto`masterCardDirect` },
                   'I want to choose another topic': (text: string) =>{ console.log(`The user needs more info about ${text}`); return goto`info` },
                   },
 
       `masterCardDirect`,
       ask `What do you want to know about MasterCard Direct?`,
       expect `I want to know, `, {
           'What is MasterCard Direct?': (text: string) => { console.log(`The user wants to know more about ${text}`); return goto`defMasterCardDirect` },
           'How do I get it?': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`getitMasterCardDirect` },
           'How much does it cost?': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`costMasterCardDirect` },
           'Why does it suit you? ': (text: string) => {console.log(`The user needs info about ${text}`); return goto`suitMasterCardDirect` },
           },
           
           `defMasterCardDirect`,
               say`Because you enjoy traveling and wish to have the right amount of money available, we have prepared MasterCard Direct, a debit card in Euro. This card is linked to your Euro account held with BT.`, goto`moreMasterCardDirect`,
            `getitMasterCardDirect`,
                say`You can get the card from any BT subsidiary bank.`, goto`moreMasterCardDirect`,
           `costMasterCardDirect`,
               say`The card issue fee is 4 euro and the annual account management fee is 3 euro. There are no costs when you pay with the card, or when you pay your bills.`,goto`moreMasterCardDirect`,
           `suitMasterCardDirect`,
               say`You can make online Shopping from abroad and you can set your own online transaction limits.`, goto`moreMasterCardDirect`,
   
               `moreMasterCardDirect`,
                   ask`Do you want to know more about MasterCard Direct?`,
                   expect`I want to know, `, {
                   'Yes': (text: string) =>{ console.log(`The user needs more info about ${text}`); return goto`masterCardMondo` },
                   'No,Thank you': (text: string) =>{ console.log(`The user needs more info about ${text}`); return goto`finish` },
                   'I want to know more about Visa Electron': (text: string) =>{ console.log(`The user needs more info about ${text}`); return goto`visaElectron` },
                   'I want to know more about MasterCard Mondo': (text: string) =>{ console.log(`The user needs more info about ${text}`); return goto`masterCardMondo` },
                   'I want to know more about MasterCard Gold Debit': (text: string) =>{ console.log(`The user needs more info about ${text}`); return goto`masterCardGoldDebit` },
                   'I want to choose another topic': (text: string) =>{ console.log(`The user needs more info about ${text}`); return goto`info` },
                   },
   
   `studentCards`,
   ask`Are intrested in BT Sing up pack dedicated for students?`,
   expect`I want to know, `, {
       'Yes': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`BTSingUp` },
       'No, thank you! I want to choose another topic': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`info` },  
   },
       `BTSingUp`,
           ask `What do you want to know about BT Sing Up?`,
           expect `I want to know, `, {
           'What is BT Sing Up?': (text: string) => { console.log(`The user wants to know more about ${text}`); return goto`defBTSingUp` },
           'How do I get it?': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`getitBTSingUp` },
           'How much does it cost?': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`costBTSingUp` },
           'Why does it suit you? ': (text: string) => {console.log(`The user needs info about ${text}`); return goto`suitBTSingUp` },
           },
           
           `defBTSingUp`,
               say`BT – OmniPass is a debit card`, goto`moreBTSingUp`,
            `getitBTSingUp`,
                say`You can get the card from any BT subsidiary bank.`, goto`moreBTSingUp`,
           `costBTSingUp`,
               say`There are no costs, the package and all transactions made with the card are free;`,goto`moreBTSingUp`,
           `suitBTSingUp`,
           
           say`You will get free travel insurance for trips abroad.`, goto`moreBTSingUp`,
     
           `moreBTSingUp`,
               ask`Do you want to know more about BT Sing Up?`,
               expect`I want to know, `, {
               'Yes': (text: string) =>{ console.log(`The user needs more info about ${text}`); return goto`BTSingUp` },
               'No,Thank you': (text: string) =>{ console.log(`The user needs more info about ${text}`); return goto`finish` },
               },
 
  `deposit`,
  ask`Choose one deposit of your interest`,
  expect`I want to `, {
      'Savings Account': (text: string) => { console.log(`The user want to ${text}`); return goto`savings` },
      'Term deposit': (text: string) => { console.log(`The user want to ${text}`); return goto`term`},
      'KidCONT': (text: string) =>{ console.log(`The user want to ${text}`); return goto`kidcont`},
   
  },
  `savings`,
  ask `What do you want to know about Savings Account`,
   expect `I want to know`, {
       'Required documents': (text: string) => { console.log(`The user wants to know more about ${text}`); return goto`docm` },
       'How much is the interest for deposits in LEI?': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`interestLei` },
       'How much is the interest for deposits in EURO?': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`interestEuro` },
       'What benefits I have?': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`benefits2` },
       'How much does it cost to get my deposit back?': (text: string) => {console.log(`The user needs info about ${text}`); return goto`feecost` },
       },
 
    `docm`,
     say`It's simple! You just need your ID.`,goto `moresaving`,
    `interestLei`,
     say`For 1.000 - 9.999 lei the interest is 0.65% per year,for 10.000 - 99.999 lei the interest is 0.70% per year,for 100.000 - 499.999 lei the interest is 0.75% per year and for more than 500.000 the interest is 0.80%. `,goto `moresaving`,
    `interestEuro`,
     say`For 1.000 - 24.999 EURO the interest is 0.10% per year,for 25.000 - 99.999 EURO the interest is 0.15% per year,for mote than 100.000 EURO the interest is 0.20% per year.`,goto `moresaving`,
    `benefits2`,
    say`You will receive the interest every mounth directly in your savings account,you have access to your money anytime and there is no charge to manage the savings account.`,goto `moresaving`,
    `feecost`,
    say`The commission is 0.50% (minimum 5 lei or 3 euro)`,goto `moresaving`,
 
    `moresaving`,
    ask`Do you want to know more?`,
    expect`I want to know`, {
        'Yes': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`savings` },
        'No,Thank you': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`finish` },
        'I want to choose another topic': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`info` },  
    },
 
    `term`,
  ask `What do you want to know about Term Deposits?`,
   expect `I want to know`, {
       'How much is the minimum required amount?': (text: string) => { console.log(`The user wants to know more about ${text}`); return goto`minterm` },
       'Required documents': (text: string) => { console.log(`The user wants to know more about ${text}`); return goto`docm` },
       'How much is the interest for deposits in Lei or Euro?': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`interestboth` },
       'What benefits I have?': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`benefits3` },
       'How much does it cost to get my deposit back?': (text: string) => {console.log(`The user needs info about ${text}`); return goto`feecost` },
       },
    `minterm`,
    say`The minimum amount required to open a deposit is 100 lei or 250 euro / dollars`,
    `docm`,
     say`It's simple! You just need your ID.`,goto `moreterm`,
    `interestboth`,
    say`It depends based on the period and currency you choose.You will find more information here :https://www.bancatransilvania.ro/pentru-tine/economii-si-investitii/economii/depozite-la-termen/`,goto `moreterm`,
     `benefits3`,
    say`There is no account management or opening fee!`,goto `moreterm`,
    `feecost`,
    say`The commission is 0.50% (minimum 5 lei or 3 euro)`,goto `moreterm`,
    `moreterm`,
    ask`Do you want to know more?`,
    expect`I want to know`, {
        'Yes': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`term` },
        'No,Thank you': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`finish` },
        'I want to choose another topic': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`info` },  
    },
    `kidcont`,
 
    ask `What do you want to know about KidCont?`,
   expect `I want to know`, {
       'What is KidCont?': (text: string) => { console.log(`The user wants to know more about ${text}`); return goto`aboutkid` },
       'Required documents': (text: string) => { console.log(`The user wants to know more about ${text}`); return goto`docmkid` },
       'How much is the interest?': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`interestkid` },
       'How much does it cost to open the account?': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`costskid` },
       'How do I get it?': (text: string) => {console.log(`The user needs info about ${text}`); return goto`getkid` },
       },
    `aboutkid`,
    say`A new toy, a little money set aside. Take care of your child’s future from the very first step and save for a period of minimum 1 year and maximum 18 months, according to their age.`,goto `morekid`,
    `docmkid`,
     say`You need the ID of the parent and the birth certificate / identity card of the child (if he / she is over 14)`,goto `morekid`,
    `interestkid`,
    say`If you open a KidCONT in lei, interest is 2.00% per year, and if it is in euro, interest is 0.60% per year.The interest is calculated from the first day after opening the deposit and you receive it annually.`,goto `morekid`,
     `costskid`,
    say`For the beginning,the minimum amount for opening is 500lei/100 euro and the maximum amount is 450,000 lei/100,000 euros The cancellation fee is 20 lei / 5 euro if you give up the account in the first year.`,goto `morekid`,
    `getkid`,
    say`It's simple. Come to the nearest BT unit and start saving for the future of your child!`,goto `morekid`,
 
    `morekid`,
    ask`Do you want to know more?`,
    expect`I want to know`, {
        'Yes': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`kidcont` },
        'No,Thank you': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`finish` },
        'I want to choose another topic': (text: string) =>{ console.log(`The user needs info about ${text}`); return goto`info` },  
    },
 
 
 `first`,
    ask`Choose what tranzaction you want to make`,
    expect`I want to `, {
        'Make a deposit': (text: string) => { console.log(`The user want to ${text}`); return goto`deposit` },
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