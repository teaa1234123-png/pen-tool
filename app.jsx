import { useState, useRef, useEffect } from “react”;

var BRAND_PRESETS = [
{jp:“モンブラン”,    en:“MONTBLANC”,           name:“MONTBLANC（モンブラン）”},
{jp:“ペリカン”,      en:“Pelikan”,              name:“Pelikan（ペリカン）”},
{jp:“パーカー”,      en:“PARKER”,               name:“PARKER（パーカー）”},
{jp:“ティファニー”,  en:“Tiffany & Co.”,        name:“Tiffany & Co.（ティファニー）”},
{jp:“クロス”,        en:“CROSS”,                name:“CROSS（クロス）”},
{jp:“ラミー”,        en:“LAMY”,                 name:“LAMY（ラミー）”},
{jp:“パイロット”,    en:“Pilot”,                name:“Pilot（パイロット）”},
{jp:“セーラー”,      en:“Sailor”,               name:“Sailor（セーラー）”},
{jp:“ウォーターマン”,en:“Waterman”,             name:“Waterman（ウォーターマン）”},
{jp:“ビスコンティ”,  en:“Visconti”,             name:“Visconti（ビスコンティ）”},
{jp:“アウロラ”,      en:“AURORA”,               name:“AURORA（アウロラ）”},
{jp:“ダンヒル”,      en:“DUNHILL”,              name:“DUNHILL（ダンヒル）”},
{jp:“プラチナ”,      en:“Platinum”,             name:“プラチナ万年筆”},
{jp:“カランダッシュ”,en:“Caran d’Ache”,         name:“Caran d’Ache（カランダッシュ）”},
{jp:“その他”,        en:””,                     name:“その他（任意入力）”},
];
var LAST_BRAND = BRAND_PRESETS.length - 1;
var PEN_TYPES   = [“ボールペン”,“万年筆”,“ローラーボール”,“シャープペンシル”,“多機能ペン”];
var COUNTRIES   = [“ドイツ製”,“日本製”,“フランス製”,“スイス製”,“イタリア製”,“イギリス製”,“アメリカ製”,“その他（任意入力）”];
var ERAS        = [””,“1940s”,“1950s”,“1960s”,“1970s”,“1970～1980s”,“1980s”,“1990s”,“2000s”,“2010s”,“2020s”];
var MATERIALS   = [“ステンレス”,“メタル”,“20K金張り”,“14K金張り”,“シルバー（銀張り）”,“シルバー925（スターリングシルバー）”,“高級レジン”,“ラッカー仕上げ”,“マット樹脂”,“カーボン”,“セルロイド”,“その他”];
var COLORS_LIST = [“ステンレスシルバー”,“シルバー”,“ブラック”,“ゴールド”,“シルバー×ゴールド”,“マットブラック”,“ブルー”,“レッド”,“グリーン”,“その他”];
var BP_SPECS    = [“ツイスト式”,“ノック式”];
var FP_SPECS    = [“カートリッジ式”,“コンバーター式”,“吸引式”];
var ACCESSORIES = [“ケース”,“袋”,“ギャランティ”,“説明書”];
var TYPE2_OPTS  = [“高級ボールペン”,“高級万年筆”,“高級ローラーボール”,“高級シャープペンシル”,“高級多機能ペン”,“純銀ボールペン”,“純銀万年筆”,“純銀ローラーボール”,“純銀シャープペン”];
var CONDITIONS  = [
{key:“未使用”,    label:“未使用”,              fn:function(y){return “未使用品のデッドストック品。”+(y?“約”+y+“年前の品とは思えない”:””)+“コレクティブルなコンディションに保たれています。”;}},
{key:“未使用A”,   label:“未使用に近い A”,       fn:function(y){return “使用感のほとんどない美品で、”+(y?“約”+y+“年前の品とは思えない”:””)+“コレクティブルなコンディションに保たれています。”;}},
{key:“未使用B”,   label:“未使用に近い B”,       fn:function(y){return “使用感の少ない美品で、”+(y?“約”+y+“年前の品とは思えない”:””)+“コレクティブルなコンディションに保たれています。”;}},
{key:“キズなしA”, label:“目立ったキズ等なし A”, fn:function(y){return “目立ったキズ等のない美品で、”+(y?“約”+y+“年前の品とは思えない”:””)+“コレクティブルなコンディションに保たれています。”;}},
{key:“キズなしB”, label:“目立ったキズ等なし B”, fn:function(y){return “小キズ等ありますが、”+(y?“約”+y+“年前の品とは思えない”:””)+“コレクティブルなコンディションに保たれています。”;}},
{key:“ややA”,     label:“ややキズや汚れあり A”, fn:function(y){return “小キズ等ありますが、”+(y?“約”+y+“年前の品と考えると”:””)+“充分なコンディションに保たれています。”;}},
{key:“ややB”,     label:“ややキズや汚れあり B”, fn:function(y){return “小キズ等ありますが、使用には問題のないコンディションです。”;}},
{key:“凹みあり”,  label:“キズや汚れ・凹みあり”, fn:function(y){return “キズや凹み等ありますが、使用には問題のないコンディションです。”;}},
{key:“汚れあり”,  label:“キズや汚れ等あり”,     fn:function(y){return “キズや汚れ等ありますが、使用には問題のないコンディションです。”;}},
];

function calcYears(era){
if(!era)return null;
if(era.indexOf(“～”)!==-1){var p=era.replace(/s/g,””).split(“～”);var d1=parseInt(p[0]),d2=parseInt(p[1]);if(!isNaN(d1)&&!isNaN(d2))return Math.floor((new Date().getFullYear()-((d1+d2)/2+5))/10)*10;}
var d=parseInt(era);if(isNaN(d))return null;
return Math.floor((new Date().getFullYear()-(d+5))/10)*10;
}
function eraToText(era){
if(!era)return””;
if(era.indexOf(“～”)!==-1)return era.replace(“～”,”〜”).replace(/s/g,””)+“年代頃”;
return era.replace(/s$/,””)+“年代頃”;
}
function buildTitle(bName,bEN,model,penType,era,country){
return (era?era+“◆”:””)+bName+” 高級”+penType+” “+model+” “+bEN+(country?” “+country:””);
}
function buildBody(bName,bEN,bJP,model,modelEN,penType,material,colorVal,era,country,cond,accList,dParts,dNote,bpS,fpS,ink,canWrite,refill,extra,mgmt,refillAdapter,listPrice){
var yr=calcYears(era);
var co=CONDITIONS.find(function(c){return c.key===cond;});
var condTxt=co?co.fn(yr):””;
var isFP=penType===“万年筆”,isBP=penType===“ボールペン”||penType===“ローラーボール”;
var eraText=eraToText(era);
var dt=””;if(dParts.length>0)dt=”※”+dParts.join(”、”)+“には多少の汚れ等あります。”;if(dNote)dt+=(dt?”\n”:””)+dNote;
var condB=condTxt+(dt?”\n”+dt:””);
var hdr=modelEN?bName+“の高級”+penType+”、\n”+model+”\n(”+modelEN+”)。”:bName+“の高級”+penType+”、\n”+model+”。”;
var eraB=era?”\n絶版希少品、\n”+eraText+“のヴィンテージモデル。\n”:””;
var spec=””;if(isBP&&bpS.length>0)spec=”【仕様】”+bpS.join(”・”)+”\n”;if(isFP&&fpS.length>0)spec=”【仕様】”+fpS.join(”・”)+”\n”;
var inkL=(isFP&&ink&&ink!==“なし”)?”【インク】”+ink+”\n”:””;
var refL=refill?”【備考】”+refill+”\n”:””;
var adapterL=refillAdapter?“一個数千円するリフィルアダプター付き。\n現行のリフィルが使用できます。\n”:””;
var accB=accList.length>0?”【付属品】”+accList.join(”、”)+”\n”:””;
var mfg=era?”【製造】”+eraText+” “+country:”【製造】”+country;
var wL=(isBP&&!canWrite)?”\nご使用の際には替芯の交換をお願いします。”:””;
var cS=country===“ドイツ製”?“GERMANYの刻印があります。”:country===“日本製”?“JAPANの刻印があります。”:“製造国の刻印があります。”;
var ex=extra?extra+”\n”:””;
var priceTag=listPrice?”【定価】”+listPrice+“円\n”:””;
var priceL=listPrice?“定価”+listPrice+“円の高級モデル。\n”:””;
return (hdr+”\n”+priceL+eraB+”\n”
+”【ブランド】”+bName+”\n【モデル】”+model+”\n”+priceTag+”【素材】”+material+”\n”
+mfg+”\n【カラー】”+colorVal+”\n【タイプ】”+penType+”\n”
+spec+inkL+refL+adapterL+accB+”\n”
+“貴重な”+country+”、\n”+cS+”\n\n”
+(era?eraText+“のヴィンテージモデル。\n”:””)
+“カラーは”+colorVal+”。\n”+ex+”\n”
+condB+wL+”\n\n”
+”※他にも高級ボールペン、高級万年筆などを多数出品しております。\n”
+“おまとめ割引も可能ですので是非ご覧ください。\n\n”
+”#ペンpen出品の”+bJP+“製品はこちら\n\n”
+”#ペンpen出品の高級”+penType+“はこちら\n\n\n\n”
+“検索\nヴィンテージ\nビンテージ\n”+bName+”\n”+bEN+”\n万年筆\nボールペン\nシャープペンシル\nメカニカルペンシル\n\n”
+(mgmt||””)).replace(/\n{3,}/g,”\n\n”).trim();
}

var DEF_TURQ = “#38f9dd”;

function rrect(ctx,x,y,w,h,r){
ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.arcTo(x+w,y,x+w,y+r,r);
ctx.lineTo(x+w,y+h-r);ctx.arcTo(x+w,y+h,x+w-r,y+h,r);
ctx.lineTo(x+r,y+h);ctx.arcTo(x,y+h,x,y+h-r,r);
ctx.lineTo(x,y+r);ctx.arcTo(x,y,x+r,y,r);ctx.closePath();
}

function drawElem(ctx,e){
if(!e.text)return null;
var fs=e.fontSize||26, ff=e.fontFamily||”‘Hiragino Kaku Gothic ProN’,sans-serif”;
ctx.font=“bold “+fs+“px “+ff;
var lines=e.text.split(”\n”), mw=0;
for(var i=0;i<lines.length;i++){var tw=ctx.measureText(lines[i]).width;if(tw>mw)mw=tw;}
if(e.type===“band”){
var px=8,py=5;
var lh=e.lhOverride||fs;
var bw=mw+px*2, bh=lines.length*lh+py*2;
var bx=e.rightEdge!=null ? e.rightEdge-bw : e.x;
ctx.fillStyle=e.bg||”#111111”;
rrect(ctx,bx,e.y,bw,bh,5);ctx.fill();
ctx.fillStyle=e.color||”#ffffff”;
for(var j=0;j<lines.length;j++){
var lw=ctx.measureText(lines[j]).width;
ctx.fillText(lines[j], bx+(bw-lw)/2, e.y+py+(j+0.5)*lh+fs*0.37);
}
return {x:bx,y:e.y,w:bw,h:bh};
} else {
ctx.fillStyle=e.color||”#000000”;
var lh2=fs*1.2;
if(e.align===“center”){
ctx.textAlign=“center”;
for(var k=0;k<lines.length;k++) ctx.fillText(lines[k],e.x,e.y+k*lh2);
ctx.textAlign=“left”;
return {x:e.x-mw/2,y:e.y-fs,w:mw,h:lines.length*lh2};
}
if(e.align===“right”){
ctx.textAlign=“right”;
for(var k=0;k<lines.length;k++) ctx.fillText(lines[k],e.x,e.y+k*lh2);
ctx.textAlign=“left”;
return {x:e.x-mw,y:e.y-fs,w:mw,h:lines.length*lh2};
}
for(var m=0;m<lines.length;m++) ctx.fillText(lines[m],e.x,e.y+m*lh2);
return {x:e.x,y:e.y-fs,w:mw,h:lines.length*lh2};
}
}

function buildElements(bJP,bEN,penType,country,model,p2label,p6,p7,p8,p9,turq){
var defaultP2=penType===“シャープペンシル”?“高級シャープペン”:“高級”+penType;
var p2t=p2label||defaultP2;
var TC=turq||DEF_TURQ;
var el=[];
el.push({id:“brand_jp”, type:“band”, text:bJP, x:66, y:56, fontSize:42, lhOverride:50, bg:TC, color:”#000000”, fontFamily:”‘Hiragino Kaku Gothic ProN’,sans-serif”});
if(country) el.push({id:“country”, type:“text”, text:country, x:311, y:98, fontSize:36, color:”#ee1111”, fontFamily:”‘Hiragino Kaku Gothic ProN’,sans-serif”});
el.push({id:“brand_en”, type:“text”, text:bEN, x:0, y:150, fontSize:34, color:”#1133cc”, align:“center”, centerOf:“brand_jp”, fontFamily:“Arial,sans-serif”});
if(p6) el.push({id:“p6”, type:“band”, text:p6, x:66, y:240, fontSize:34, lhOverride:34, bg:”#111111”, color:”#ffffff”, fontFamily:”‘Hiragino Kaku Gothic ProN’,sans-serif”});
if(p8) el.push({id:“p8”, type:“text”, text:p8, x:0, y:318, fontSize:34, color:”#ee1111”, align:“center”, centerOf:“p6”, fontFamily:”‘Hiragino Kaku Gothic ProN’,sans-serif”});
if(p9) el.push({id:“p9”, type:“text”, text:p9, x:0, y:315, fontSize:34, color:”#ee1111”, align:“center”, centerOf:“p7”, fontFamily:”‘Hiragino Kaku Gothic ProN’,sans-serif”});
if(p7) el.push({id:“p7”, type:“band”, text:p7, x:394, y:323, fontSize:34, lhOverride:34, rightEdge:530, bg:”#111111”, color:”#ffffff”, fontFamily:”‘Hiragino Kaku Gothic ProN’,sans-serif”});
var mLines=model?model.split(”\n”).length:1;
var mBaseY=465-(mLines-1)*Math.round(38*1.2);
if(model) el.push({id:“model”, type:“text”, text:model, x:530, y:mBaseY, fontSize:38, color:”#1133cc”, align:“right”, fontFamily:“Arial,sans-serif”});
el.push({id:“p2”, type:“band”, text:p2t, x:215, y:482, fontSize:43, lhOverride:50, rightEdge:530, bg:TC, color:”#000000”, fontFamily:”‘Hiragino Kaku Gothic ProN’,sans-serif”});
return el;
}

function renderFull(canvas,baseImg,elems){
var W=600,H=600,dpr=window.devicePixelRatio||1;
canvas.width=W*dpr;canvas.height=H*dpr;
var ctx=canvas.getContext(“2d”);
ctx.scale(dpr,dpr);
ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality=“high”;
ctx.fillStyle=”#ffffff”;ctx.fillRect(0,0,W,H);
if(baseImg){
var sc=Math.min(W/baseImg.naturalWidth,H/baseImg.naturalHeight);
ctx.drawImage(baseImg,(W-baseImg.naturalWidth*sc)/2,(H-baseImg.naturalHeight*sc)/2,baseImg.naturalWidth*sc,baseImg.naturalHeight*sc);
}
var bboxMap={};
elems.forEach(function(e){
if(e.centerOf) return;
var bb=drawElem(ctx,e);
if(bb) bboxMap[e.id]=bb;
});
elems.forEach(function(e){
if(!e.centerOf) return;
var ref=bboxMap[e.centerOf];
if(ref){ drawElem(ctx,Object.assign({},e,{x:ref.x+ref.w/2+e.x})); }
else { drawElem(ctx,e); }
});
}

// ── UI部品 ──
var GOLD=”#c8a84b”,CYAN=”#00bcd4”,RED=”#e53935”,TX=”#333”,MT=”#888”,BD=“rgba(0,0,0,0.12)”,CARD=”#f9f9f9”;
function Lbl(p){return <span style={{display:“block”,fontSize:11,color:”#b8860b”,marginBottom:4,marginTop:12,letterSpacing:“0.08em”,fontFamily:“monospace”,fontWeight:“bold”}}>{p.children}</span>;}
function FI(p){return <input style={{width:“100%”,padding:“9px 12px”,background:”#fff”,border:“1px solid #ccc”,borderRadius:4,color:TX,fontSize:14,fontFamily:“inherit”,outline:“none”,boxSizing:“border-box”}} value={p.value} onChange={p.onChange} placeholder={p.placeholder||””}/>;}
function SI(p){return <select style={{width:“100%”,padding:“9px 12px”,background:”#fff”,border:“1px solid #ccc”,borderRadius:4,color:TX,fontSize:14,fontFamily:“inherit”,outline:“none”,boxSizing:“border-box”,WebkitAppearance:“none”}} value={p.value} onChange={p.onChange}>{p.children}</select>;}
function TA(p){return <textarea style={{width:“100%”,padding:“9px 12px”,background:”#fff”,border:“1px solid #ccc”,borderRadius:4,color:TX,fontSize:13,fontFamily:“inherit”,outline:“none”,lineHeight:1.7,boxSizing:“border-box”,resize:“vertical”,minHeight:p.minH||60}} value={p.value} onChange={p.onChange} placeholder={p.placeholder||””}/>;}
function Btn(p){var c=p.col||GOLD;return <button onClick={p.onClick} style={{width:“100%”,padding:12,border:“2px solid “+c,borderRadius:6,background:“transparent”,color:c,fontSize:14,fontFamily:“inherit”,cursor:“pointer”,marginTop:10,fontWeight:“bold”}}>{p.children}</button>;}
function Chip(p){var on=p.on;return <div onClick={p.onToggle} style={{display:“inline-flex”,alignItems:“center”,gap:6,padding:“7px 13px”,border:“1px solid “+(on?GOLD:BD),borderRadius:20,background:on?“rgba(184,134,11,0.1)”:”#fff”,cursor:“pointer”,fontSize:13,color:on?”#b8860b”:MT,marginRight:6,marginBottom:6,userSelect:“none”}}><span style={{width:14,height:14,border:“1.5px solid “+(on?GOLD:”#aaa”),borderRadius:3,background:on?GOLD:“transparent”,display:“flex”,alignItems:“center”,justifyContent:“center”,flexShrink:0}}>{on&&<span style={{color:”#fff”,fontSize:10,fontWeight:“bold”}}>✓</span>}</span>{p.label}</div>;}
function Sec(p){return <div style={{background:CARD,border:“1px solid #e0e0e0”,borderRadius:8,padding:16,marginBottom:12,boxShadow:“0 1px 4px rgba(0,0,0,0.05)”}}><div style={{fontSize:10,letterSpacing:“0.2em”,color:”#b8860b”,marginBottom:12,fontFamily:“monospace”,fontWeight:“bold”,borderBottom:“1px solid #e8e0d0”,paddingBottom:8}}>{p.title}</div>{p.children}</div>;}
function tog(arr,set,v){if(arr.includes(v)){set(arr.filter(function(x){return x!==v;}));}else{set(arr.concat([v]));}}
function NB(p){return <span style={{display:“inline-flex”,alignItems:“center”,justifyContent:“center”,width:22,height:22,borderRadius:“50%”,background:p.auto?”#00bcd4”:”#666”,color:”#fff”,fontSize:12,fontWeight:“bold”,marginRight:6,flexShrink:0,fontFamily:“monospace”}}>{p.n}</span>;}

function CtrlPanel(props){
var sids=props.selectedIds||[];
var setElems=props.setElems;
var elems=props.elems;
var sidsRef=useRef(sids);
useEffect(function(){sidsRef.current=sids;},[sids]);
var sel=null;
for(var i=0;i<elems.length;i++){if(elems[i].id===sids[0]){sel=elems[i];break;}}
function applyToSelected(updater){
setElems(function(prev){
var ids=sidsRef.current;
return prev.map(function(e){if(ids.indexOf(e.id)<0) return e; return updater(Object.assign({},e));});
});
}
function applyFontToSelected(d){
setElems(function(prev){
var ids=sidsRef.current;
var selectedBandIds={};
prev.forEach(function(e){if(ids.indexOf(e.id)>=0 && e.type===“band”) selectedBandIds[e.id]=true;});
return prev.map(function(e){
if(ids.indexOf(e.id)<0) return e;
if(e.centerOf && selectedBandIds[e.centerOf]) return e;
var ne=Object.assign({},e);
ne.fontSize=Math.max(8,Math.min(120,(ne.fontSize||26)+d));
if(ne.type===“band” && ne.lhOverride!=null){ne.lhOverride=Math.max(8,Math.min(200,ne.lhOverride+d));}
return ne;
});
});
}
function mv(dx,dy){applyToSelected(function(e){e.x=(e.x||0)+dx;e.y=(e.y||0)+dy;if(e.rightEdge!=null) e.rightEdge=e.rightEdge+dx;return e;});}
function setCol(key,val){applyToSelected(function(e){e[key]=val;return e;});}
var cb={border:“1px solid #aac”,borderRadius:4,background:”#fff”,cursor:“pointer”,fontFamily:“inherit”,color:”#334”,textAlign:“center”};
var LABELS={brand_jp:“①JP帯”,country:“④国”,brand_en:“③EN”,p6:“⑥左帯”,p8:“⑧左文”,p9:“⑨右文”,p7:“⑦右帯”,model:“⑤モデル”,p2:“②下帯”};
return (
<div style={{background:”#eef2ff”,border:“1px solid #aabbdd”,borderRadius:6,padding:“8px 10px”,marginTop:6}}>
<div style={{display:“flex”,justifyContent:“space-between”,alignItems:“center”,marginBottom:6}}>
<span style={{fontSize:11,color:”#335”,fontWeight:“bold”}}>
{sids.length===0?“↑ 画像をタップして選択”:sids.length>1?“✦ “+sids.length+“個選択中”:“✦ “+(LABELS[sids[0]]||sids[0])}
</span>
{sids.length>0&&<button onClick={function(){
setElems(function(prev){var ids=sidsRef.current;return prev.map(function(e){if(ids.indexOf(e.id)<0) return e;return Object.assign({},e,{text:””});});});
props.setSelectedIds([]);
}} style={{padding:“3px 10px”,border:“1px solid #e55”,borderRadius:4,background:”#fff0f0”,color:”#c33”,fontSize:11,cursor:“pointer”,fontFamily:“inherit”}}>🗑 消す</button>}
</div>
{sids.length>0&&<div>
<div style={{display:“flex”,gap:8,marginBottom:6}}>
<div style={{flex:1}}>
<div style={{display:“grid”,gridTemplateColumns:“1fr 1fr 1fr”,gap:3,marginBottom:3}}>
<div/><button style={Object.assign({},cb,{fontSize:20,padding:“5px 0”})} onClick={function(){mv(0,-30);}}>↑</button><div/>
<button style={Object.assign({},cb,{fontSize:20,padding:“5px 0”})} onClick={function(){mv(-30,0);}}>←</button>
<button style={Object.assign({},cb,{fontSize:20,padding:“5px 0”})} onClick={function(){mv(0,30);}}>↓</button>
<button style={Object.assign({},cb,{fontSize:20,padding:“5px 0”})} onClick={function(){mv(30,0);}}>→</button>
</div>
<div style={{display:“grid”,gridTemplateColumns:“1fr 1fr 1fr”,gap:3}}>
<div/><button style={Object.assign({},cb,{fontSize:11,padding:“3px 0”})} onClick={function(){mv(0,-5);}}>↑5</button><div/>
<button style={Object.assign({},cb,{fontSize:11,padding:“3px 0”})} onClick={function(){mv(-5,0);}}>←5</button>
<button style={Object.assign({},cb,{fontSize:11,padding:“3px 0”})} onClick={function(){mv(0,5);}}>↓5</button>
<button style={Object.assign({},cb,{fontSize:11,padding:“3px 0”})} onClick={function(){mv(5,0);}}>→5</button>
</div>
</div>
<div style={{display:“flex”,flexDirection:“column”,gap:3,minWidth:56}}>
<div style={{fontSize:9,color:”#668”,textAlign:“center”}}>文字サイズ</div>
<button style={Object.assign({},cb,{padding:“4px 0”,fontSize:12})} onClick={function(){applyFontToSelected(5);}}>A＋大</button>
<button style={Object.assign({},cb,{padding:“4px 0”,fontSize:12})} onClick={function(){applyFontToSelected(1);}}>A＋1</button>
{sel&&<div style={{textAlign:“center”,fontSize:11,fontWeight:“bold”,color:”#335”}}>{sel.fontSize||26}px</div>}
<button style={Object.assign({},cb,{padding:“4px 0”,fontSize:12})} onClick={function(){applyFontToSelected(-1);}}>A－1</button>
<button style={Object.assign({},cb,{padding:“4px 0”,fontSize:12})} onClick={function(){applyFontToSelected(-5);}}>A－大</button>
</div>
</div>
{sel&&<div style={{borderTop:“1px solid #ccd”,paddingTop:6}}>
<div style={{fontSize:9,color:”#668”,marginBottom:4}}>文字色</div>
<div style={{display:“flex”,gap:4,marginBottom:6}}>
{[[“黒”,”#000000”],[“白”,”#ffffff”],[“赤”,”#ee1111”],[“青”,”#1133cc”],[“緑”,”#1a7a1a”]].map(function(pair){
var active=sel.color===pair[1];
return <button key={pair[0]} onClick={function(){setCol(“color”,pair[1]);}}
style={{flex:1,padding:“5px 0”,border:“2px solid “+(active?”#ff6600”:”#aac”),borderRadius:4,background:pair[1],color:pair[0]===“黒”||pair[0]===“青”||pair[0]===“緑”?”#fff”:”#000”,fontSize:11,cursor:“pointer”}}>
{pair[0]}</button>;
})}
<input type=“color” value={sel.color||”#000000”} onChange={function(e){setCol(“color”,e.target.value);}}
style={{width:36,height:34,padding:2,border:“1px solid #aac”,borderRadius:4,cursor:“pointer”}}/>
</div>
{sel.type===“band”&&<div>
<div style={{fontSize:9,color:”#668”,marginBottom:4}}>帯色</div>
<div style={{display:“flex”,gap:4,flexWrap:“wrap”}}>
{[[“黒”,”#111111”],[“ターコイズ”,DEF_TURQ],[“白”,”#ffffff”],[“赤”,”#cc1111”],[“青”,”#1133cc”],[“緑”,”#1a7a1a”],[“ピンク”,”#ff69b4”]].map(function(pair){
var active=sel.bg===pair[1];
return <button key={pair[0]} onClick={function(){setCol(“bg”,pair[1]);}}
style={{flex:1,padding:“5px 0”,border:“2px solid “+(active?”#ff6600”:”#aac”),borderRadius:4,background:pair[1],color:pair[0]===“黒”||pair[0]===“青”||pair[0]===“緑”?”#fff”:”#000”,fontSize:11,cursor:“pointer”}}>
{pair[0]}</button>;
})}
<input type=“color” value={sel.bg||”#111111”} onChange={function(e){setCol(“bg”,e.target.value);}}
style={{width:36,height:34,padding:2,border:“1px solid #aac”,borderRadius:4,cursor:“pointer”}}/>
</div>
</div>}
</div>}
</div>}
</div>
);
}

function TapCanvas(props){
var cvRef=useRef(null);
var elRef=useRef(props.elems);
var touchPosRef=useRef(null);
var sidsRef=useRef(props.selectedIds||[]);
var bboxMapRef=useRef({});
useEffect(function(){elRef.current=props.elems;},[props.elems]);
useEffect(function(){sidsRef.current=props.selectedIds||[];},[props.selectedIds]);
var sids=props.selectedIds||[];
useEffect(function(){
var cv=cvRef.current;if(!cv)return;
var W=600,H=600,dpr=window.devicePixelRatio||1;
cv.width=W*dpr;cv.height=H*dpr;
cv.style.width=“100%”;
var ctx=cv.getContext(“2d”);
ctx.scale(dpr,dpr);
ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality=“high”;
ctx.fillStyle=”#ffffff”;ctx.fillRect(0,0,W,H);
if(props.baseImg){
var sc=Math.min(W/props.baseImg.naturalWidth,H/props.baseImg.naturalHeight);
ctx.drawImage(props.baseImg,(W-props.baseImg.naturalWidth*sc)/2,(H-props.baseImg.naturalHeight*sc)/2,props.baseImg.naturalWidth*sc,props.baseImg.naturalHeight*sc);
}
function drawHighlight(bb,multi){
if(!bb)return;
ctx.save();
ctx.strokeStyle=multi?”#9933ff”:”#ff6600”;ctx.lineWidth=3;ctx.setLineDash([6,3]);
ctx.strokeRect(bb.x-5,bb.y-5,bb.w+10,bb.h+10);
ctx.fillStyle=multi?”#9933ff”:”#ff6600”;ctx.setLineDash([]);
[[bb.x-5,bb.y-5],[bb.x+bb.w+5,bb.y-5],[bb.x-5,bb.y+bb.h+5],[bb.x+bb.w+5,bb.y+bb.h+5]].forEach(function(pt){ctx.beginPath();ctx.arc(pt[0],pt[1],5,0,Math.PI*2);ctx.fill();});
ctx.restore();
}
var bboxMap2={};
for(var i=0;i<props.elems.length;i++){
var e2=props.elems[i];if(e2.centerOf) continue;
var bb=drawElem(ctx,e2);if(bb){bboxMap2[e2.id]=bb;}
if(bb&&sids.includes(e2.id)) drawHighlight(bb,sids.length>1);
}
for(var j=0;j<props.elems.length;j++){
var e3=props.elems[j];if(!e3.centerOf) continue;
var ref3=bboxMap2[e3.centerOf];
var ee3=ref3?Object.assign({},e3,{x:ref3.x+ref3.w/2+e3.x}):e3;
var bb3=drawElem(ctx,ee3);if(bb3){bboxMap2[e3.id]=bb3;}
if(bb3&&sids.includes(e3.id)) drawHighlight(bb3,sids.length>1);
}
bboxMapRef.current=bboxMap2;
},[props.elems,props.baseImg,props.selectedIds]);
function getCanvasPos(clientX,clientY){
var cv=cvRef.current;if(!cv)return null;
var r=cv.getBoundingClientRect();
var sx=600/r.width,sy=600/r.height;
return {x:(clientX-r.left)*sx,y:(clientY-r.top)*sy};
}
function hitTest(px,py){
var map=bboxMapRef.current;
var els=elRef.current;
for(var i=els.length-1;i>=0;i–){
var el=els[i];if(!el.text) continue;
var bb=map[el.id];if(!bb) continue;
if(px>=bb.x-10&&px<=bb.x+bb.w+10&&py>=bb.y-10&&py<=bb.y+bb.h+10) return el.id;
}
return null;
}
function onTouchStart(e){if(e.touches&&e.touches[0]){touchPosRef.current={x:e.touches[0].clientX,y:e.touches[0].clientY};}}
function onTouchEnd(e){
e.preventDefault();
if(!touchPosRef.current)return;
var saved={x:touchPosRef.current.x,y:touchPosRef.current.y};
touchPosRef.current=null;
var pos=getCanvasPos(saved.x,saved.y);if(!pos)return;
var hit=hitTest(pos.x,pos.y);
if(!hit){props.setSelectedIds([]);return;}
var cur=sidsRef.current;
var already=cur.indexOf(hit)>=0;
props.setSelectedIds(already?cur.filter(function(x){return x!==hit;}):cur.concat([hit]));
}
function onClick(e){
var pos=getCanvasPos(e.clientX,e.clientY);if(!pos)return;
var hit=hitTest(pos.x,pos.y);
if(!hit){props.setSelectedIds([]);return;}
var cur=sidsRef.current;
var already=cur.indexOf(hit)>=0;
props.setSelectedIds(already?cur.filter(function(x){return x!==hit;}):cur.concat([hit]));
}
return (
<canvas ref={cvRef}
style={{width:“100%”,borderRadius:6,border:“2px solid “+GOLD,display:“block”,touchAction:“none”}}
onClick={onClick} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
/>
);
}

// ── 品目の初期状態ファクトリ ──
function makeItem(idx){
var b=BRAND_PRESETS[0];
return {
brandIdx:0, bJP:b.jp, bEN:b.en, bName:b.name,
model:””, modelEN:””, penType:PEN_TYPES[0],
material:MATERIALS[0], colorVal:COLORS_LIST[0],
era:””, country:COUNTRIES[0],
cond:CONDITIONS[0].key,
accList:[], dParts:[], dNote:””,
bpS:[], fpS:[], ink:“なし”,
canWrite:true, refill:””, extra:””, mgmt:””,
refillAdapter:false, listPrice:””,
p2L:””, p2Custom:false,
p6:””, p7:””, p8:””, p9:””,
turq:DEF_TURQ,
imgB64:null, imgEl:null,
elems:buildElements(b.jp,b.en,PEN_TYPES[0],COUNTRIES[0],””,””,””,””,””,””,DEF_TURQ),
selIds:[],
titleOut:””, bodyOut:””, imgOut:””,
};
}

// ── 単品フォーム ──
function ItemForm({item, setItem, cvRef, penIdx}){
var isCustom=item.brandIdx===LAST_BRAND;
var isFP=item.penType===“万年筆”;
var isBP=item.penType===“ボールペン”||item.penType===“ローラーボール”;
var yr=calcYears(item.era);
var co=CONDITIONS.find(function(c){return c.key===item.cond;});

function upd(key,val){setItem(function(prev){return Object.assign({},prev,{[key]:val});});}

function handleBrand(v){
var idx=parseInt(v);
if(idx!==LAST_BRAND){
var b=BRAND_PRESETS[idx];
setItem(function(prev){return Object.assign({},prev,{brandIdx:idx,bJP:b.jp,bEN:b.en,bName:b.name});});
} else {
setItem(function(prev){return Object.assign({},prev,{brandIdx:idx});});
}
}

function handleFile(e){
var f=e.target.files[0];if(!f)return;
var rd=new FileReader();
rd.onload=function(ev){
var b64=ev.target.result;
var img=new Image();
img.onload=function(){setItem(function(prev){return Object.assign({},prev,{imgB64:b64,imgEl:img});});};
img.src=b64;
};
rd.readAsDataURL(f);
}

// elemsをbJP等の変化に同期
useEffect(function(){
setItem(function(prev){
var fresh=buildElements(prev.bJP,prev.bEN,prev.penType,prev.country,prev.model,prev.p2L,prev.p6,prev.p7,prev.p8,prev.p9,prev.turq);
var merged=fresh.map(function(f){
var old=null;for(var i=0;i<prev.elems.length;i++){if(prev.elems[i].id===f.id){old=prev.elems[i];break;}}
if(!old) return f;
var kept={x:old.x,y:old.y,fontSize:old.fontSize};
if(old.bg!==undefined) kept.bg=old.bg;
if(old.color!==undefined) kept.color=old.color;
if(old.rightEdge!==undefined) kept.rightEdge=old.rightEdge;
if(old.lhOverride!==undefined) kept.lhOverride=old.lhOverride;
return Object.assign({},f,kept);
});
return Object.assign({},prev,{elems:merged});
});
},[item.bJP,item.bEN,item.penType,item.country,item.model,item.p2L,item.p6,item.p7,item.p8,item.p9,item.turq]);

var labelNum=[“①”,“②”,“③”][penIdx]||””;

return (
<div>
<Sec title={“── “+labelNum+” ブランド”}>
<Lbl>ブランド選択</Lbl>
<SI value={item.brandIdx} onChange={function(e){handleBrand(e.target.value);}}>
{BRAND_PRESETS.map(function(b,i){return <option key={i} value={i}>{b.name}</option>;})}
</SI>
{isCustom&&<div>
<Lbl>ブランドJP</Lbl><FI value={item.bJP} onChange={function(e){upd(“bJP”,e.target.value);}} placeholder=“例: モンブラン”/>
<Lbl>ブランドEN</Lbl><FI value={item.bEN} onChange={function(e){upd(“bEN”,e.target.value);}} placeholder=“例: MONTBLANC”/>
<Lbl>ブランド表示名</Lbl><FI value={item.bName} onChange={function(e){upd(“bName”,e.target.value);}} placeholder=“例: MONTBLANC（モンブラン）”/>
</div>}
<div style={{marginTop:8,padding:“6px 10px”,background:”#fffde7”,borderRadius:3,fontSize:11,color:MT}}>
ハッシュタグ → <strong>#ペンpen出品の{item.bJP}製品はこちら</strong>
</div>
</Sec>

```
  <Sec title="── 商品基本情報">
    <Lbl>⑤ モデル名（改行で複数行）</Lbl>
    <TA value={item.model} onChange={function(e){upd("model",e.target.value);}} placeholder={"例: ノブレス ゴールド"} minH={56}/>
    <Lbl>モデル名（英語・任意）</Lbl>
    <FI value={item.modelEN} onChange={function(e){upd("modelEN",e.target.value);}} placeholder="例: Nobless Gold"/>
    <Lbl>ペンの種類</Lbl>
    <SI value={item.penType} onChange={function(e){upd("penType",e.target.value);}}>{PEN_TYPES.map(function(p){return <option key={p} value={p}>{p}</option>;})}</SI>
    <Lbl>製造年代</Lbl>
    <SI value={item.era} onChange={function(e){upd("era",e.target.value);}}><option value="">不明 / 記載なし</option>{ERAS.filter(function(x){return x!=="";}).map(function(er){return <option key={er} value={er}>{er}</option>;})}</SI>
    <Lbl>製造国</Lbl>
    <SI value={COUNTRIES.includes(item.country)?item.country:"その他（任意入力）"} onChange={function(e){if(e.target.value==="その他（任意入力）")upd("country","");else upd("country",e.target.value);}}>
      {COUNTRIES.map(function(c){return <option key={c} value={c}>{c}</option>;})}
    </SI>
    {(!COUNTRIES.includes(item.country)||item.country===""||item.country==="その他（任意入力）")&&
      <FI value={item.country} onChange={function(e){upd("country",e.target.value);}} placeholder="例: スウェーデン製"/>}
    <Lbl>素材</Lbl>
    <SI value={item.material} onChange={function(e){upd("material",e.target.value);}}>{MATERIALS.map(function(m){return <option key={m} value={m}>{m}</option>;})}</SI>
    <Lbl>カラー</Lbl>
    <SI value={item.colorVal} onChange={function(e){upd("colorVal",e.target.value);}}>{COLORS_LIST.map(function(c){return <option key={c} value={c}>{c}</option>;})}</SI>
  </Sec>

  <Sec title="── 仕様">
    {isBP&&<div>
      <Lbl>ボールペン仕様</Lbl>
      <div style={{display:"flex",flexWrap:"wrap",marginTop:4}}>{BP_SPECS.map(function(s){return <Chip key={s} label={s} on={item.bpS.includes(s)} onToggle={function(){upd("bpS",item.bpS.includes(s)?item.bpS.filter(function(x){return x!==s;}):item.bpS.concat([s]));}}/>;})}
      </div>
      <Lbl>書き込み状態</Lbl>
      <div style={{display:"flex",gap:8,marginTop:4}}>
        <div onClick={function(){upd("canWrite",true);}} style={{flex:1,padding:10,border:"1px solid "+(item.canWrite?GOLD:"#ccc"),borderRadius:4,background:item.canWrite?"rgba(184,134,11,0.08)":"#fff",cursor:"pointer",textAlign:"center",color:item.canWrite?"#b8860b":MT,fontSize:14}}>✏️ 書ける</div>
        <div onClick={function(){upd("canWrite",false);}} style={{flex:1,padding:10,border:"1px solid "+(!item.canWrite?GOLD:"#ccc"),borderRadius:4,background:!item.canWrite?"rgba(184,134,11,0.08)":"#fff",cursor:"pointer",textAlign:"center",color:!item.canWrite?"#b8860b":MT,fontSize:14}}>🚫 書けない</div>
      </div>
      <Lbl>リフィルアダプター</Lbl>
      <div style={{display:"flex",gap:8,marginTop:4}}>
        <div onClick={function(){upd("refillAdapter",false);}} style={{flex:1,padding:10,border:"1px solid "+(!item.refillAdapter?GOLD:"#ccc"),borderRadius:4,background:!item.refillAdapter?"rgba(184,134,11,0.08)":"#fff",cursor:"pointer",textAlign:"center",color:!item.refillAdapter?"#b8860b":MT,fontSize:14}}>なし</div>
        <div onClick={function(){upd("refillAdapter",true);}} style={{flex:1,padding:10,border:"1px solid "+(item.refillAdapter?GOLD:"#ccc"),borderRadius:4,background:item.refillAdapter?"rgba(184,134,11,0.08)":"#fff",cursor:"pointer",textAlign:"center",color:item.refillAdapter?"#b8860b":MT,fontSize:14}}>あり</div>
      </div>
      <Lbl>リフィル補足</Lbl><FI value={item.refill} onChange={function(e){upd("refill",e.target.value);}} placeholder="例: 新品ローラーボールリフィル付（互換品）"/>
    </div>}
    {isFP&&<div>
      <Lbl>万年筆仕様</Lbl>
      <div style={{display:"flex",flexWrap:"wrap",marginTop:4}}>{FP_SPECS.map(function(s){return <Chip key={s} label={s} on={item.fpS.includes(s)} onToggle={function(){upd("fpS",item.fpS.includes(s)?item.fpS.filter(function(x){return x!==s;}):item.fpS.concat([s]));}}/>;})}
      </div>
      <Lbl>インクの有無</Lbl>
      <SI value={item.ink} onChange={function(e){upd("ink",e.target.value);}}>{["なし","あり（純正）","あり（互換品）"].map(function(o){return <option key={o} value={o}>{o}</option>;})}</SI>
    </div>}
    {!isBP&&!isFP&&<p style={{color:MT,fontSize:12,marginTop:8}}>仕様選択なし</p>}
  </Sec>

  <Sec title="── 状態・付属品">
    <Lbl>状態</Lbl>
    <SI value={item.cond} onChange={function(e){upd("cond",e.target.value);}}>{CONDITIONS.map(function(c){return <option key={c.key} value={c.key}>{c.label}</option>;})}</SI>
    <div style={{fontSize:12,color:"#0097a7",marginTop:6,padding:"6px 10px",background:"#e0f7fa",borderRadius:3,lineHeight:1.6}}>{co?co.fn(yr):""}</div>
    <Lbl>付属品</Lbl>
    <div style={{display:"flex",flexWrap:"wrap",marginTop:4}}>{ACCESSORIES.map(function(a){return <Chip key={a} label={a} on={item.accList.includes(a)} onToggle={function(){upd("accList",item.accList.includes(a)?item.accList.filter(function(x){return x!==a;}):item.accList.concat([a]));}}/>;})}
    </div>
    {item.accList.length>0&&<div>
      <Lbl>多少の汚れあり</Lbl>
      <div style={{display:"flex",flexWrap:"wrap",marginTop:4}}>{item.accList.map(function(a){return <Chip key={a} label={a} on={item.dParts.includes(a)} onToggle={function(){upd("dParts",item.dParts.includes(a)?item.dParts.filter(function(x){return x!==a;}):item.dParts.concat([a]));}}/>;})}
      </div>
      <Lbl>汚れ補足</Lbl><FI value={item.dNote} onChange={function(e){upd("dNote",e.target.value);}} placeholder="例: ケース内側に経年によるシミあり"/>
    </div>}
  </Sec>

  <Sec title="── 補足・管理番号">
    <Lbl>【定価】</Lbl>
    <FI value={item.listPrice} onChange={function(e){upd("listPrice",e.target.value);}} placeholder="例: 15000"/>
    <Lbl>説明文への追記</Lbl>
    <TA value={item.extra} onChange={function(e){upd("extra",e.target.value);}} placeholder="例: スリムなボディが特長です。" minH={70}/>
    <Lbl>管理番号</Lbl>
    <FI value={item.mgmt} onChange={function(e){upd("mgmt",e.target.value);}} placeholder="例: 26022801"/>
  </Sec>

  <Sec title="── トップ画像">
    <Lbl>商品写真をアップロード</Lbl>
    <label style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",border:"2px dashed "+(item.imgB64?GOLD:"#ccc"),borderRadius:6,padding:"16px 12px",cursor:"pointer",background:"#fafafa",marginTop:4,overflow:"hidden"}}>
      {item.imgB64?<img src={item.imgB64} alt="up" style={{width:"100%",maxHeight:120,objectFit:"contain",borderRadius:4}}/>:<div style={{textAlign:"center"}}><div style={{fontSize:32,marginBottom:4}}>📷</div><div style={{fontSize:13,color:MT}}>タップして写真を選択</div></div>}
      <input type="file" accept="image/*" style={{display:"none"}} onChange={handleFile}/>
    </label>
    {item.imgB64&&<Btn col="#999" onClick={function(){upd("imgB64",null);upd("imgEl",null);upd("imgOut","");}}>✕ 写真を削除</Btn>}

    <div style={{marginTop:12,padding:"8px 10px",background:"#fffde7",border:"1px solid #f9a825",borderRadius:6,fontSize:11,color:"#5d4037",lineHeight:1.7}}>
      <strong>①②③④⑤は自動。⑥〜⑨は任意。</strong>プレビューをタップ→調整📱
    </div>

    <div style={{marginTop:10,display:"flex",alignItems:"center",gap:8}}>
      <span style={{fontSize:11,color:"#b8860b",fontFamily:"monospace",fontWeight:"bold"}}>帯色:</span>
      <input type="color" value={item.turq} onChange={function(e){upd("turq",e.target.value);}} style={{width:36,height:28,padding:2,border:"1px solid #ccc",borderRadius:3,cursor:"pointer"}}/>
      <button onClick={function(){upd("turq",DEF_TURQ);}} style={{fontSize:11,padding:"2px 8px",border:"1px solid #ccc",borderRadius:3,background:"#f0f0f0",cursor:"pointer",fontFamily:"inherit"}}>リセット</button>
      <div style={{width:22,height:22,borderRadius:3,background:item.turq,border:"1px solid #ccc"}}/>
    </div>

    <div style={{marginTop:10}}>
      <div style={{display:"flex",alignItems:"center",marginBottom:4}}><NB n="②" auto={true}/><span style={{fontSize:11,color:"#b8860b",fontFamily:"monospace",fontWeight:"bold"}}>右下帯</span></div>
      <SI value={item.p2Custom?"__custom__":item.p2L} onChange={function(e){
        if(e.target.value==="__custom__"){upd("p2Custom",true);upd("p2L","");}
        else{upd("p2Custom",false);upd("p2L",e.target.value);}
      }}>
        <option value="">自動（高級{item.penType==="シャープペンシル"?"シャープペン":item.penType}）</option>
        {item.penType==="シャープペンシル"
          ?[["高級シャープペン","高級シャープペン"],["純銀シャープペン","純銀シャープペン"]].map(function(o){return <option key={o[0]} value={o[0]}>{o[1]}</option>;})
          :TYPE2_OPTS.map(function(o){return <option key={o} value={o}>{o}</option>;})}
        <option value="__custom__">任意入力...</option>
      </SI>
      {item.p2Custom&&<FI value={item.p2L} onChange={function(e){upd("p2L",e.target.value);}} placeholder="例: 高級鉛筆"/>}
    </div>

    {[["⑥","左・黒帯","p6","例: 初期型"],["⑦","右・黒帯","p7","例: 20金張り"],["⑧","左・赤テキスト","p8","例: レア！"],["⑨","右・青テキスト","p9","例: 美品"]].map(function(row){
      var isTA=row[2]==="p6"||row[2]==="p7";
      return <div key={row[2]} style={{marginTop:10}}>
        <div style={{display:"flex",alignItems:"center",marginBottom:4}}><NB n={row[0]} auto={false}/><span style={{fontSize:11,color:"#b8860b",fontFamily:"monospace",fontWeight:"bold"}}>{row[1]}</span></div>
        {isTA
          ?<TA value={item[row[2]]} onChange={function(e){upd(row[2],e.target.value);}} placeholder={row[3]} minH={48}/>
          :<FI value={item[row[2]]} onChange={function(e){upd(row[2],e.target.value);}} placeholder={row[3]}/>
        }
      </div>;
    })}

    <div style={{marginTop:14}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
        <div style={{fontSize:11,color:"#b8860b",fontFamily:"monospace",fontWeight:"bold"}}>── プレビュー</div>
        <button onClick={function(){
          setItem(function(prev){
            return Object.assign({},prev,{
              elems:buildElements(prev.bJP,prev.bEN,prev.penType,prev.country,prev.model,prev.p2L,prev.p6,prev.p7,prev.p8,prev.p9,prev.turq),
              selIds:[]
            });
          });
        }} style={{fontSize:11,padding:"4px 10px",border:"1px solid #ccc",borderRadius:4,background:"#f5f5f5",cursor:"pointer",color:"#666",fontFamily:"inherit"}}>位置リセット</button>
      </div>
      <TapCanvas baseImg={item.imgEl} elems={item.elems} selectedIds={item.selIds}
        setSelectedIds={function(ids){setItem(function(prev){return Object.assign({},prev,{selIds:ids});});}}
      />
      <CtrlPanel selectedIds={item.selIds}
        setSelectedIds={function(ids){setItem(function(prev){return Object.assign({},prev,{selIds:ids});});}}
        elems={item.elems}
        setElems={function(fn){setItem(function(prev){return Object.assign({},prev,{elems:typeof fn==="function"?fn(prev.elems):fn});});}}
      />
    </div>
  </Sec>
</div>
```

);
}

// ── 画像保存モーダル ──
// ── 結果カード（3列） ──
function ResultCard({item, penIdx, showToast}){
if(!item.titleOut&&!item.bodyOut&&!item.imgOut) return null;
var label=[“①”,“②”,“③”][penIdx]||””;
function copyT(t,l){navigator.clipboard.writeText(t);showToast(“✓ “+label+” “+l+“をコピー”);}

// 別タブで画像を直接開く→Safariが画像として認識→長押し保存
// window.openで別タブなのでアプリの状態が消えない
function saveImg(){
var w = window.open(””, “_blank”);
if(w){
w.document.open();
w.document.write(
‘<!DOCTYPE html><html><head>’
+’<meta charset="utf-8">’
+’<meta name="viewport" content="width=device-width,initial-scale=1">’
+’<style>html,body{margin:0;padding:0;background:#000;}’
+‘img{width:100vw;height:100vh;object-fit:contain;display:block;}’
+’</style></head><body>’
+’<img src="' + item.imgOut + '">’
+’</body></html>’
);
w.document.close();
}
}

return (
<div style={{background:”#fff”,border:“2px solid “+GOLD,borderRadius:8,overflow:“hidden”}}>
<div style={{background:“linear-gradient(135deg,#1a1200,#3a2800)”,padding:“8px 12px”,textAlign:“center”}}>
<span style={{color:GOLD,fontWeight:“bold”,fontSize:14,letterSpacing:“0.1em”}}>{label} {item.bName||”　“}</span>
{item.model&&<div style={{color:“rgba(200,168,75,0.7)”,fontSize:11,marginTop:2}}>{item.model.split(”\n”)[0]}</div>}
</div>
{item.imgOut&&<div style={{padding:“8px 8px 0”}}>
<img src={item.imgOut} alt=“result” style={{width:“100%”,borderRadius:4,border:“1px solid #ddd”}}/>
<button onClick={saveImg} style={{width:“100%”,padding:“12px 0”,border:“none”,borderRadius:4,background:RED,color:”#fff”,fontSize:15,cursor:“pointer”,marginTop:8,fontWeight:“bold”,fontFamily:“inherit”,letterSpacing:“0.04em”}}>
📷 写真を保存する（タップ）
</button>
<div style={{marginTop:6,padding:“8px 10px”,background:”#fff8e1”,border:“1px solid #ffe082”,borderRadius:4,fontSize:11,color:”#5d4037”,lineHeight:1.8}}>
ボタンを押すと<strong>別タブで画像が開きます</strong><br/>
そこで<strong>長押し→「写真に追加」</strong>で保存<br/>
保存後はタブを閉じてアプリに戻れます
</div>
</div>}
{item.titleOut&&<div style={{padding:“0 8px”}}>
<div style={{fontSize:10,color:”#b8860b”,fontFamily:“monospace”,marginTop:10,marginBottom:4,fontWeight:“bold”}}>── タイトル</div>
<div style={{background:”#fffde7”,borderLeft:“3px solid “+GOLD,padding:“6px 10px”,fontSize:11,lineHeight:1.6,wordBreak:“break-all”,color:TX,maxHeight:80,overflowY:“auto”}}>{item.titleOut}</div>
<button onClick={function(){copyT(item.titleOut,“タイトル”);}} style={{width:“100%”,padding:“5px 0”,border:“2px solid “+CYAN,borderRadius:4,background:“transparent”,color:CYAN,fontSize:12,cursor:“pointer”,marginTop:6,fontWeight:“bold”,fontFamily:“inherit”}}>📋 タイトルコピー</button>
</div>}
{item.bodyOut&&<div style={{padding:“0 8px 12px”}}>
<div style={{fontSize:10,color:”#b8860b”,fontFamily:“monospace”,marginTop:10,marginBottom:4,fontWeight:“bold”}}>── 説明文</div>
<div style={{background:”#fafafa”,borderLeft:“3px solid “+GOLD,padding:“6px 10px”,fontSize:11,lineHeight:1.7,whiteSpace:“pre-wrap”,wordBreak:“break-all”,maxHeight:120,overflowY:“auto”,color:TX}}>{item.bodyOut}</div>
<button onClick={function(){copyT(item.bodyOut,“説明文”);}} style={{width:“100%”,padding:“5px 0”,border:“2px solid “+CYAN,borderRadius:4,background:“transparent”,color:CYAN,fontSize:12,cursor:“pointer”,marginTop:6,fontWeight:“bold”,fontFamily:“inherit”}}>📋 説明文コピー</button>
</div>}
</div>
);
}

// ── メインApp ──
export default function App(){
var [items,setItems]=useState(function(){return [makeItem(0),makeItem(1),makeItem(2)];});
var [activeTab,setActiveTab]=useState(0);
var [toast,setToast]=useState(””);
var [toastOn,setToastOn]=useState(false);
var cvRefs=[useRef(null),useRef(null),useRef(null)];
var hasAnyResult=items.some(function(it){return it.titleOut||it.bodyOut||it.imgOut;});

function showToast(msg){setToast(msg);setToastOn(true);setTimeout(function(){setToastOn(false);},2500);}

function setItem(idx,fn){
setItems(function(prev){
var next=prev.slice();
next[idx]=typeof fn===“function”?fn(prev[idx]):fn;
return next;
});
}

function handleGen(idx){
var it=items[idx];
if(!it.model){showToast(“⚠ “+[“①”,“②”,“③”][idx]+” モデル名を入力してください”);return;}
var cv=cvRefs[idx].current;
renderFull(cv,it.imgEl,it.elems);
var imgOut=cv.toDataURL(“image/jpeg”,0.96);
var titleOut=buildTitle(it.bName,it.bEN,it.model,it.penType,it.era,it.country);
var bodyOut=buildBody(it.bName,it.bEN,it.bJP,it.model,it.modelEN,it.penType,it.material,it.colorVal,it.era,it.country,it.cond,it.accList,it.dParts,it.dNote,it.bpS,it.fpS,it.ink,it.canWrite,it.refill,it.extra,it.mgmt,it.refillAdapter,it.listPrice);
setItem(idx,function(prev){return Object.assign({},prev,{titleOut:titleOut,bodyOut:bodyOut,imgOut:imgOut});});
showToast(“✓ “+[“①”,“②”,“③”][idx]+” 生成しました”);
setTimeout(function(){var el=document.getElementById(“results”);if(el)el.scrollIntoView({behavior:“smooth”});},200);
}

function handleGenAll(){
var ok=items.some(function(it){return !!it.model;});
if(!ok){showToast(“⚠ 少なくとも1品のモデル名を入力してください”);return;}
items.forEach(function(it,idx){
if(!it.model) return;
var cv=cvRefs[idx].current;
renderFull(cv,it.imgEl,it.elems);
var imgOut=cv.toDataURL(“image/jpeg”,0.96);
var titleOut=buildTitle(it.bName,it.bEN,it.model,it.penType,it.era,it.country);
var bodyOut=buildBody(it.bName,it.bEN,it.bJP,it.model,it.modelEN,it.penType,it.material,it.colorVal,it.era,it.country,it.cond,it.accList,it.dParts,it.dNote,it.bpS,it.fpS,it.ink,it.canWrite,it.refill,it.extra,it.mgmt,it.refillAdapter,it.listPrice);
setItem(idx,function(prev){return Object.assign({},prev,{titleOut:titleOut,bodyOut:bodyOut,imgOut:imgOut});});
});
showToast(“✓ まとめて生成しました！”);
setTimeout(function(){var el=document.getElementById(“results”);if(el)el.scrollIntoView({behavior:“smooth”});},300);
}

var TABS=[
{label:“① 1品目”, hasModel:!!items[0].model, hasDone:!!items[0].titleOut},
{label:“② 2品目”, hasModel:!!items[1].model, hasDone:!!items[1].titleOut},
{label:“③ 3品目”, hasModel:!!items[2].model, hasDone:!!items[2].titleOut},
];

return (
<div style={{background:”#fff”,color:TX,fontFamily:”‘Hiragino Kaku Gothic ProN’,sans-serif”,minHeight:“100vh”,paddingBottom:100}}>
<style>{`* { box-sizing: border-box; } select option { background: #fff; color: #333; }`}</style>

```
  {/* ヘッダー */}
  <div style={{background:"linear-gradient(135deg,#1a1200,#3a2800)",padding:"18px 16px 14px",textAlign:"center"}}>
    <div style={{fontSize:24,marginBottom:3}}>✒️✒️✒️</div>
    <div style={{fontSize:9,letterSpacing:"0.35em",color:GOLD,opacity:0.8,marginBottom:3,fontFamily:"monospace"}}>MERCARI LISTING TOOL</div>
    <h1 style={{fontSize:16,margin:0,color:GOLD,letterSpacing:"0.08em"}}>3品まとめ出品ツール</h1>
  </div>

  {/* タブ */}
  <div style={{display:"flex",borderBottom:"2px solid "+GOLD,background:"#1a1200",position:"sticky",top:0,zIndex:50}}>
    {TABS.map(function(tab,idx){
      var active=activeTab===idx;
      return <button key={idx} onClick={function(){setActiveTab(idx);}} style={{
        flex:1,padding:"10px 4px",border:"none",
        background:active?"rgba(200,168,75,0.15)":"transparent",
        color:active?GOLD:"rgba(200,168,75,0.5)",
        fontSize:13,fontFamily:"inherit",cursor:"pointer",
        borderBottom:active?"3px solid "+GOLD:"3px solid transparent",
        fontWeight:active?"bold":"normal",
        position:"relative",
      }}>
        {tab.label}
        {tab.hasDone&&<span style={{position:"absolute",top:5,right:6,width:7,height:7,borderRadius:"50%",background:"#4caf50"}}/>}
        {!tab.hasDone&&tab.hasModel&&<span style={{position:"absolute",top:5,right:6,width:7,height:7,borderRadius:"50%",background:"#ff9800"}}/>}
      </button>;
    })}
  </div>

  {/* フォーム本体 */}
  <div style={{padding:14,maxWidth:640,margin:"0 auto"}}>
    {items.map(function(item,idx){
      return <div key={idx} style={{display:activeTab===idx?"block":"none"}}>
        <ItemForm item={item} setItem={function(fn){setItem(idx,fn);}} cvRef={cvRefs[idx]} penIdx={idx}/>
        <Btn col={GOLD} onClick={function(){handleGen(idx);}}>
          ✦ {"①②③"[idx]} タイトル・説明文・画像を生成
        </Btn>
      </div>;
    })}

    {/* まとめて生成ボタン */}
    <div style={{marginTop:8,padding:14,background:"linear-gradient(135deg,#1a1200,#2a1e00)",borderRadius:8,border:"2px solid "+GOLD}}>
      <div style={{textAlign:"center",color:GOLD,fontSize:12,marginBottom:10,letterSpacing:"0.1em",fontFamily:"monospace"}}>── ３品まとめて生成 ──</div>
      <div style={{display:"flex",gap:6,marginBottom:8}}>
        {items.map(function(it,i){
          return <div key={i} style={{flex:1,padding:"6px 4px",background:it.model?"rgba(76,175,80,0.15)":"rgba(255,255,255,0.05)",border:"1px solid "+(it.model?"#4caf50":"#444"),borderRadius:4,textAlign:"center",fontSize:11,color:it.model?"#81c784":"#666"}}>
            {"①②③"[i]}<br/><span style={{fontSize:10}}>{it.model?it.model.split("\n")[0].slice(0,8)||"入力済":"-"}</span>
          </div>;
        })}
      </div>
      <button onClick={handleGenAll} style={{width:"100%",padding:14,border:"2px solid "+GOLD,borderRadius:6,background:"rgba(200,168,75,0.1)",color:GOLD,fontSize:15,fontFamily:"inherit",cursor:"pointer",fontWeight:"bold",letterSpacing:"0.05em"}}>
        🚀 ① ② ③ 全品まとめて生成する
      </button>
    </div>

    {/* 結果エリア */}
    {hasAnyResult&&<div id="results" style={{marginTop:20}}>
      <div style={{textAlign:"center",color:GOLD,fontSize:12,letterSpacing:"0.15em",fontFamily:"monospace",marginBottom:12,padding:"8px 0",borderTop:"1px solid #e8e0d0",borderBottom:"1px solid #e8e0d0"}}>── 生成結果 ──</div>
      {/* スマホ：縦1列 / 広い画面：3列 */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:12}}>
        {items.map(function(item,idx){
          return <ResultCard key={idx} item={item} penIdx={idx} showToast={showToast} cvRef={cvRefs[idx]}/>;
        })}
      </div>
    </div>}
  </div>

  {/* 隠しcanvas x3 */}
  {cvRefs.map(function(ref,i){return <canvas key={i} ref={ref} style={{display:"none"}}/>;} )}

  {/* トースト */}
  <div style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",background:"#4a6741",color:"white",padding:"10px 22px",borderRadius:20,fontSize:13,opacity:toastOn?1:0,transition:"opacity 0.3s",pointerEvents:"none",zIndex:100,whiteSpace:"nowrap"}}>{toast}</div>
</div>
```

);
}
