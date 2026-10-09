export const dungeonMeta = {id:'dungeon',author:'Tamilo',title:'The Mysterious Dungeon',description:'Kämpfe gegen Monster, besuche den Händler und stelle dich dem alten roten Drachen.',genre:'Fantasy-Rollenspiel',start:'start'};
export function newDungeon(name='Adventurer',rng=Math.random){
 return {version:1,name:name.trim().slice(0,30)||'Adventurer',phase:'battle',health:100,gold:0,level:1,damage:20,enemy:['Zombies','Orcs','Skeletons'][Math.min(2,Math.floor(rng()*3))],enemyHealth:50,dragonHealth:120,inventory:{health:0,fire:0,sword:0},shield:0,message:''};
}
export function restoreDungeon(raw){
 try { const s=JSON.parse(raw);if(!s||s.version!==1||typeof s.name!=='string'||s.name.length>30||!['battle','rest','shop','dragon','won','lost'].includes(s.phase))return null;
 const ranges={health:[0,100],gold:[0,1000],level:[1,2],damage:[20,35],enemyHealth:[0,50],dragonHealth:[0,120],shield:[0,3]};
 for(const [k,[lo,hi]] of Object.entries(ranges))if(!Number.isInteger(s[k])||s[k]<lo||s[k]>hi)return null;
 if(!['Zombies','Orcs','Skeletons'].includes(s.enemy)||!s.inventory||!['health','fire','sword'].every(k=>Number.isInteger(s.inventory[k])&&s.inventory[k]>=0&&s.inventory[k]<=20))return null;
 if(s.phase==='won'&&s.dragonHealth!==0)return null;
 if(s.phase==='lost'&&s.health!==0)return null;
 if(!['won','lost'].includes(s.phase)&&s.health<=0)return null;
 return {...s,message:''};
 }catch{return null;}
}
export function dungeonAction(current,action,rng=Math.random){
 const s=structuredClone(current);s.message='';
 const hit=(damage)=>{s.health=Math.max(0,s.health-damage);if(!s.health){s.defeatedBy=s.phase;s.phase='lost';}};
 if(s.phase==='battle'){
  if(action==='attack'){
   s.enemyHealth=Math.max(0,s.enemyHealth-s.damage);
   if(!s.enemyHealth){const gold=15+Math.min(10,Math.floor(rng()*11));s.gold+=gold;s.level=2;s.phase='rest';s.message=`You defeat the ${s.enemy}, find ${gold} gold and reach level 2.`;}
   else{hit(10);s.message=`Your strike deals ${s.damage} damage. The ${s.enemy} strike back: −10 HP.`;}
  }else if(action==='flee'){
   if(rng()<.5){s.phase='rest';s.message='You manage to escape the room safely, but leave the gold behind.';}
   else{hit(10);s.message='The monster blocks the door. You lose 10 HP.';}
  }
 }else if(s.phase==='rest'){
  if(action==='shop')s.phase='shop';
 }else if(s.phase==='shop'){
  const items={health:{price:15,label:'Health Potion'},sword:{price:20,label:'Iron Sword'},fire:{price:21,label:'Fire Regen Potion'}};
  if(action==='continue'){s.phase='dragon';s.message='The ground shakes. An ancient red dragon blocks the corridor!';}
  else if(items[action]){const item=items[action];
   if(action==='sword'&&s.inventory.sword){s.message='You already have the stronger sword.';}
   else if(s.gold<item.price){s.message='Not enough gold. You can leave the shop whenever you are ready.';}
   else{s.gold-=item.price;s.inventory[action]++;if(action==='sword')s.damage=35;s.message=`You bought ${item.label}.`;}
  }
 }else if(s.phase==='dragon'){
  let turn=false;
  if(action==='attack'){s.dragonHealth=Math.max(0,s.dragonHealth-s.damage);s.message=`Your sword deals ${s.damage} damage.`;turn=true;}
  if(action==='health'){
   if(!s.inventory.health)s.message='You have no Health Potion left. Choose another action.';
   else if(s.health===100)s.message='Your health is already full. Keep the potion for later.';
   else{const gain=Math.min(40,100-s.health);s.inventory.health--;s.health+=gain;s.message=`The potion restores ${gain} HP.`;turn=true;}
  }
  if(action==='fire'){
   if(!s.inventory.fire)s.message='You have no Fire Regen Potion. Choose another action.';
   else{s.inventory.fire--;s.shield=3;s.message='The potion protects you from the next three fire attacks.';turn=true;}
  }
  if(!s.dragonHealth){s.phase='won';s.message='You defeated the Ancient Red Dragon and escaped the dungeon!';}
  else if(turn){const damage=s.shield>0?5:15;if(s.shield>0)s.shield--;hit(damage);s.message+=` Dragon fire: −${damage} HP.`;}
 }
 return s;
}
export function dungeonScene(s){
 const items=`Health Potions: ${s.inventory.health} · Fire Potions: ${s.inventory.fire} · Sword damage: ${s.damage}`;
 const battleImage=s.enemy==='Zombies'?'dungeon-battle-zombies':s.enemy==='Orcs'?'dungeon-battle-orcs':'dungeon-battle';
 const base={stats:true,inventory:items,text:[],choices:[]};
 if(s.phase==='battle')return {...base,title:`${s.enemy} in the dark`,image:battleImage,text:[`${s.name} enters a tall, spooky room. The door slams shut. ${s.enemy} block the way.`,`You draw your old iron sword. Do you fight or try to escape?`],enemy:`${s.enemy}: ${s.enemyHealth} HP`,choices:[{label:'Attack',action:'attack'},{label:'Run away',action:'flee'}]};
 if(s.phase==='rest')return {...base,title:'A moment to breathe',image:'dungeon-rest',text:['You reach a quiet room. Check your supplies before going deeper into the dungeon.'],choices:[{label:'Continue to the shop',action:'shop'},{label:'Save your game',action:'save'},{label:'Leave the dungeon',action:'home'}]};
 if(s.phase==='shop')return {...base,title:'The Wandering Trader',image:'dungeon-shop',text:['The shopkeeper shows you three items. Buy what you can afford, or continue down the corridor.'],choices:[{label:'Health Potion · 15 gold · restores 40 HP',action:'health',disabled:s.gold<15},{label:'Iron Sword · 20 gold · 35 damage',action:'sword',disabled:s.gold<20||!!s.inventory.sword},{label:'Fire Regen Potion · 21 gold · three protected turns',action:'fire',disabled:s.gold<21},{label:'Leave the shop',action:'continue'}]};
 if(s.phase==='dragon')return {...base,title:'The Ancient Red Dragon',image:'dungeon-dragon',text:['A roar echoes through the dungeon. The red dragon blocks your only way out. Steel your heart: this is the final battle.'],enemy:`Dragon: ${s.dragonHealth} HP${s.shield?` · Protected turns: ${s.shield}`:''}`,choices:[{label:'Attack',action:'attack'},{label:'Drink Health Potion',action:'health',disabled:!s.inventory.health||s.health===100},{label:'Drink Fire Regen Potion',action:'fire',disabled:!s.inventory.fire}]};
 if(s.phase==='won')return {...base,title:'You escaped!',image:'dungeon-dragon',ending:'success',text:['The mighty dragon is defeated. You leave the dungeon alive. You win the game!']};
 return {...base,title:'Your adventure ends here',image:s.defeatedBy==='battle'?battleImage:'dungeon-dragon',ending:'failure',text:['Your strength runs out. The dungeon has won this time. A different decision could change your next adventure.']};
}
