import {dungeonMeta,newDungeon,dungeonAction,dungeonScene,restoreDungeon} from './dungeon.js';
const main=document.querySelector('#main');
document.querySelector('.skip').addEventListener('click',event=>{event.preventDefault();main.focus();main.scrollIntoView({block:'start'});});
const IDS=['castle','forest','island','house','escape','march'];
const SAVE_KEY='text-adventure-dungeon-v1';
let games=[],game=null,nodeId=null,score=0,history=[],dungeon=null,step=0;
const h=(tag,attrs={},children=[])=>{const el=document.createElement(tag);for(const [k,v] of Object.entries(attrs)){if(k==='class')el.className=v;else if(k==='text')el.textContent=v;else if(k.startsWith('on'))el.addEventListener(k.slice(2),v);else if(v!==false&&v!==null&&v!==undefined)el.setAttribute(k,String(v));}for(const child of [].concat(children))if(child)el.append(typeof child==='string'?document.createTextNode(child):child);return el;};
const button=(text,fn,attrs={})=>h('button',{type:'button',text,onclick:fn,...attrs});
function loadSave(){try{return restoreDungeon(localStorage.getItem(SAVE_KEY));}catch{return null;}}
function focusScene(){requestAnimationFrame(()=>{const heading=main.querySelector('.scene-title');if(heading){heading.focus({preventScroll:true});const box=heading.getBoundingClientRect();if(box.top<0||box.top>window.innerHeight-130)heading.scrollIntoView({block:'start',behavior:'instant'});}});}
function art(image,title,classes='scene-image'){return h('img',{src:`assets/scenes/${image}.webp`,alt:title,class:classes,width:1280,height:960,decoding:'async',loading:classes==='game-thumb'?'lazy':'eager',onerror:(event)=>{const img=event.currentTarget;img.replaceWith(h('div',{class:'empty-art',lang:'de',text:'Das Szenenbild konnte nicht geladen werden. Die Geschichte kannst du weiter spielen.'}));}});}
function home(){game=null;dungeon=null;history=[];step=0;document.title='Text Adventure · Die Spielesammlung';
 const list=h('ul',{class:'game-list'});
 for(const g of games){const link=h('a',{href:`#/spiel/${g.id}`,class:'game-link','aria-label':`${g.author}: ${g.title}`},[art(`${g.id}-start`,'','game-thumb'),h('span',{},[h('span',{class:'author',text:g.author}),h('span',{class:'game-name',text:g.title})])]);
 const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 14 14');svg.setAttribute('class','play-icon');svg.setAttribute('aria-hidden','true');const path=document.createElementNS(svg.namespaceURI,'path');path.setAttribute('d','M2 1h3v2h3v2h3v4H8v2H5v2H2z');svg.append(path);link.append(svg);list.append(h('li',{},link));}
 const feature=h('figure',{class:'library-art'},[art('castle-start','Ein verlassenes Schloss im warmen Abendlicht'),h('figcaption',{},['Jeder Name öffnet eine andere Welt.',h('span',{text:'Wähle eine Geschichte. Entscheide selbst, welchen Weg du gehst.'})])]);
 main.replaceChildren(h('section',{class:'intro'},[h('h1',{text:'Dein nächstes Abenteuer?'}),h('p',{text:'Sieben Geschichten. Verborgene Schätze, verschlossene Türen und Wege ins Unbekannte. Du entscheidest.'})]),h('div',{class:'library'},[list,feature]));}
function start(g){game=g;nodeId=g.start;score=0;history=[];dungeon=null;step=0;render();}
function remember(){history.push({nodeId,score,dungeon:dungeon?structuredClone(dungeon):null,step});}
function choose(choice){remember();score+=choice.score||0;nodeId=choice.to;step++;render();focusScene();}
function undo(){const old=history.pop();if(!old)return;({nodeId,score,dungeon,step}=old);render();focusScene();}
function act(action){
 if(action==='home'){location.hash='#/';return;}
 if(action==='save'){try{localStorage.setItem(SAVE_KEY,JSON.stringify(dungeon));dungeon.message='Saved on this device. Use “Load saved game” when you return.';}catch{dungeon.message='Saving is unavailable in this browser. You can continue playing.';}render();focusScene();return;}
 remember();dungeon=dungeonAction(dungeon,action);step++;render();focusScene();
}
function choiceButton(choice,index){const action=()=>choice.action?act(choice.action):choose(choice);return h('button',{type:'button',class:'choice',disabled:choice.disabled,onclick:action,'data-choice':index+1},[h('span',{class:'key','aria-hidden':'true',text:String(index+1)}),h('span',{text:choice.label})]);}
function render(){
 const isDungeon=game.id==='dungeon';const current=isDungeon?(dungeon?dungeonScene(dungeon):{title:'Enter the dungeon',image:'dungeon-start',text:['A mysterious dungeon lies ahead. Monsters, a wandering trader and an ancient dragon await. What will you do?'],choices:[]}):game.nodes[nodeId];
 document.title=`${game.title} · Text Adventure`;
 const back=button('Ein Schritt zurück',undo,{class:'quiet',disabled:!history.length});
 const tools=h('div',{class:'toolbar'},[h('a',{class:'text-link',href:'#/',text:'Alle Abenteuer'}),h('div',{class:'toolbar-actions'},[back,button('Neu beginnen',()=>{start(game);focusScene();},{class:'quiet'})])]);
 const heading=h('div',{class:'game-heading'},[h('h1',{text:game.title}),h('span',{class:'byline',text:`von ${game.author}`})]);
 const scene=h('figure',{class:'visual',lang:isDungeon?'en':'de'},[art(current.image,current.title),h('figcaption',{class:'image-label',lang:'de'},[h('span',{lang:isDungeon&&!current.ending?'en':'de',text:current.ending?'Letzter Schauplatz':current.title}),h('span',{text:'KI-Pixelbild'})])]);
 const content=h('section',{class:'story-panel fade-in',lang:isDungeon?'en':'de','aria-label':isDungeon?'Story and decisions':'Geschichte und Entscheidungen'},[h('h2',{class:'scene-title',text:current.title,tabindex:'-1'})]);
 if(current.ending)content.append(h('p',{class:`ending ${current.ending}`,lang:'de',text:current.ending==='success'?'Geschafft!':current.ending==='failure'?'Game over':'Ende der Geschichte'}));
 if(game.id==='escape')content.append(h('div',{class:'score'},[h('span',{},['Punkte: ',h('strong',{text:score})])]));
 if(dungeon){content.append(h('div',{class:'stats'},[['HP',dungeon.health],['Gold',dungeon.gold],['Level',dungeon.level]].map(([label,value])=>h('span',{},[`${label} `,h('strong',{text:value})]))));if(current.enemy)content.append(h('p',{class:'inventory',text:current.enemy}));if(current.inventory)content.append(h('p',{class:'inventory',text:current.inventory}));if(dungeon.message)content.append(h('p',{class:'message',role:'status',text:dungeon.message}));}
 content.append(h('div',{class:'story-text'},current.text.map(p=>h('p',{text:p}))));
 if(isDungeon&&!dungeon){
  const name=h('input',{type:'text',name:'hero-name',maxlength:30,value:'Adventurer',autocomplete:'off'});
  const choices=h('div',{class:'choices'});
  choices.append(button('Start new game',()=>{remember();dungeon=newDungeon(name.value);step++;render();focusScene();},{class:'choice primary'}));
  const saved=loadSave();if(saved)choices.append(button('Load saved game',()=>{remember();dungeon=saved;render();focusScene();},{class:'choice'}));
  content.append(h('label',{class:'name-field'},['Your character’s name',name]),choices);
 }else if(current.code){
  const code=h('input',{id:'box-code',type:'text',inputmode:'numeric',pattern:'[0-9]+',required:true,autocomplete:'off',maxlength:12});
  const form=h('form',{class:'code-form',onsubmit:event=>{event.preventDefault();const correct=code.value.trim()===current.code.answer;remember();score+=correct?current.code.score:0;nodeId=correct?current.code.correct:current.code.incorrect;step++;render();focusScene();}},[h('label',{for:'box-code',text:'Dein Code'}),h('div',{class:'code-row'},[code,h('button',{type:'submit',class:'choice primary',text:'Box öffnen'})])]);content.append(form);
 }else if(current.ending){content.append(h('div',{class:'choices',lang:'de'},[button('Noch einmal spielen',()=>{start(game);focusScene();},{class:'choice primary'}),h('a',{href:'#/',class:'choice',text:'Ein anderes Abenteuer wählen'})]));
 }else content.append(h('div',{class:'choices'},current.choices.map(choiceButton)),h('p',{class:'hint',lang:'de',text:'Klicke auf eine Möglichkeit oder drücke ihre Zahl.'}));
 main.replaceChildren(tools,heading,h('div',{class:'game-stage'},[scene,content]));
}
function route(){const match=location.hash.match(/^#\/spiel\/([a-z]+)$/);if(!match){home();return;}const g=games.find(x=>x.id===match[1]);if(g){start(g);focusScene();}else{main.replaceChildren(h('div',{class:'error'},[h('h1',{text:'Dieses Abenteuer gibt es nicht.'}),h('a',{href:'#/',text:'Zur Spielesammlung'})]));}}
window.addEventListener('hashchange',route);
window.addEventListener('keydown',event=>{if(!game||!main.querySelector('.story-panel')?.contains(document.activeElement)||event.altKey||event.ctrlKey||event.metaKey||event.repeat||/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName))return;if(/^[1-9]$/.test(event.key)){const choice=main.querySelector(`[data-choice="${event.key}"]`);if(choice&&!choice.disabled){event.preventDefault();choice.click();}}});
try{games=await Promise.all(IDS.map(async id=>{const response=await fetch(`data/${id}.json`);if(!response.ok)throw new Error('Could not load story');return response.json();}));games.push(dungeonMeta);route();}catch{main.replaceChildren(h('div',{class:'error'},[h('h1',{text:'Die Geschichten konnten nicht geladen werden.'}),h('p',{text:'Prüfe deine Verbindung und lade die Seite erneut.'}),button('Erneut versuchen',()=>location.reload(),{class:'choice'})]));}
