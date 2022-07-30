import {loadStdlib} from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';
const stdlib = loadStdlib(process.env);


const startingBalance = stdlib.parseCurrency(6000);

const [ accAlice, accBob ] =
  await stdlib.newTestAccounts(2, startingBalance);
console.log('Hello, Alice and Bob!');

console.log('Launching...');
const ctcAlice = accAlice.contract(backend);
const ctcBob = accBob.contract(backend, ctcAlice.getInfo());
const getBalance = async ()=> await stdlib.formatCurrency(await stdlib.balanceOf(accBob))

const choiceArray= ["I am not here", "I am still here"]

const SharedParticipants= ()=>({
  showTimer:(time)=>{
    console.log(parseInt(time))
  }
})

console.log('Starting backends...');
await Promise.all([
  backend.Alice(ctcAlice, {
     ...SharedParticipants(),
     vaultMoney: stdlib.parseCurrency(5000),
     getChoice: ()=>{
      const choice=Math.floor(Math.random()*2)
      console.log(`Alice's choice is ${choiceArray[choice]}`)
      return (choice==0? false: true)
     }
    
    // implement Alice's interact object here
  }),
 

  
  backend.Bob(ctcBob, {
    ...SharedParticipants(),
    acceptVault: (amt)=>{
      console.log(`accepted ${stdlib.formatCurrency(amt)}`)
    },
  
 
    // implement Bob's interact object here
  }),
]);
const after= await getBalance()
console.log(`this is ${after}`)

console.log('Goodbye, Alice and Bob!');
