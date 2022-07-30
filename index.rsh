'reach 0.1';

const countTimer= 10;

const SharedParticipants= {
 showTimer: Fun([UInt], Null)
}

export const main = Reach.App(() => {
  //Alice is the owner of the fund (5000 native token)
  const A = Participant('Alice', {
    ...SharedParticipants,
    vaultMoney: UInt,
    getChoice: Fun([],Bool)
    
  });
  //Bob is the attacher
  const B = Participant('Bob', {
    ...SharedParticipants,
    acceptVault: Fun([UInt], Null),
    countTimer: Fun([],Null),
    
  });
  init();
  A.only(()=>{
    const fund= declassify(interact.vaultMoney);
    
  });
  A.publish(fund)
   .pay(fund);
  commit();
  B.only(()=>{
    interact.acceptVault(fund);
    
  });
  B.publish()
 
  commit();
  each([A,B],()=>{
    interact.showTimer(countTimer);
  })
  A.only(()=>{
    const choice=declassify(interact.getChoice());
  })
  A.publish(choice)
  if(choice){
    transfer(fund).to(A);
  } else{
    transfer(fund).to(B);
  }
  commit();
  // write your program here
  exit();
});
