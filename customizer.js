(() => {
  const palettes = {
    "Warm neutral": ["#f3eee5","#fffaf2","#28231e","#b86b45","#d8bd91"],
    "Modern minimal": ["#f2f3f4","#ffffff","#20242a","#4776a8","#a9c4df"],
    "Bold contrast": ["#171717","#242424","#f8f5ef","#e0a526","#765b2b"],
    "Fresh & natural": ["#edf1e8","#fbfff7","#26352b","#64845b","#b6c89b"],
    "Soft pastel": ["#f5edf2","#fff9fc","#453541","#bd7f9f","#dfb9cc"],
    "Ocean": ["#e9f2f4","#f9feff","#17323c","#247f91","#9acbd1"]
  };
  const fontMap = {"Keep original":"","Modern sans":"'DM Sans',Arial,sans-serif","Editorial serif":"Georgia,'Times New Roman',serif","Clean geometric":"Arial,Helvetica,sans-serif"};
  const style = document.createElement("style"); style.textContent = ".design-launcher{position:fixed;z-index:80;right:22px;bottom:22px;display:flex;align-items:center;gap:9px;padding:13px 18px;border:1px solid #ffffff44;border-radius:999px;background:#171717;color:#fff;box-shadow:0 10px 35px #0003;font:600 12px Arial,sans-serif;cursor:pointer}.design-backdrop{position:fixed;z-index:1000;inset:0;background:#0008;display:flex;justify-content:flex-end;backdrop-filter:blur(4px)}.design-panel{width:min(430px,100%);height:100%;overflow:auto;background:#fbfaf7;color:#20201e;padding:30px;box-shadow:-15px 0 50px #0002;font:14px/1.5 Arial,sans-serif}.design-head{display:flex;justify-content:space-between;gap:20px;margin-bottom:28px}.design-kicker{font-size:10px;letter-spacing:.18em;font-weight:700;color:#987052}.design-head h2{font:600 32px/1.1 Georgia,serif;margin:8px 0}.design-head p{font-size:13px;color:#777;margin:0}.design-close{width:38px;height:38px;border:1px solid #ddd;border-radius:50%;background:transparent;cursor:pointer}.design-field{display:block;margin:23px 0;color:#343434;font-size:12px;font-weight:700}.design-field select{display:block;width:100%;margin-top:9px;padding:12px;border:1px solid #ddd;border-radius:9px;background:white;color:#222;font:13px Arial,sans-serif}.design-swatches{display:flex;gap:7px;margin-top:10px}.design-swatches i{width:25px;height:25px;border-radius:50%;border:1px solid #0001}.design-options{display:flex;gap:7px;margin-top:10px;flex-wrap:wrap}.design-options button{padding:9px 12px;border:1px solid #ddd;border-radius:8px;background:#fff;color:#333;font:12px Arial,sans-serif;cursor:pointer}.design-options button.selected{background:#222;color:#fff;border-color:#222}.design-field input[type=range]{width:100%;margin-top:12px;accent-color:#222}.design-field b{float:right}.design-preview-note{padding:13px;background:#f0eee9;border-radius:10px;color:#68645e;font-size:11px;line-height:1.6}.design-actions{display:flex;gap:10px;margin-top:22px}.design-reset,.design-send{display:flex;align-items:center;justify-content:center;gap:8px;padding:13px;border-radius:9px;font:600 12px Arial,sans-serif;cursor:pointer}.design-reset{background:#fff;border:1px solid #ddd;color:#333}.design-send{flex:1;background:#222;color:#fff;border:1px solid #222}.design-custom-preview section{padding-top:calc(clamp(60px,9vw,130px)*var(--custom-density,1))!important;padding-bottom:calc(clamp(60px,9vw,130px)*var(--custom-density,1))!important}.design-custom-preview .image-frame,.design-custom-preview .dish-image,.design-custom-preview .story-image{border-radius:var(--r,18px)}@media(max-width:800px){.design-launcher{right:12px;bottom:12px;padding:12px 14px}.design-panel{padding:23px 20px}.design-custom-preview section{padding-top:calc(clamp(55px,16vw,100px)*var(--custom-density,1))!important;padding-bottom:calc(clamp(55px,16vw,100px)*var(--custom-density,1))!important}}"; document.head.appendChild(style);
  const launcher = document.createElement("button"); launcher.className="design-launcher"; launcher.innerHTML="✳ &nbsp; Customize design"; launcher.setAttribute("aria-label","Customize this website");
  const backdrop = document.createElement("div"); backdrop.className="design-backdrop"; backdrop.hidden=true;
  backdrop.innerHTML = `<aside class="design-panel" aria-label="Live website design customizer">
    <div class="design-head"><div><span class="design-kicker">LIVE PREVIEW</span><h2>Make it yours.</h2><p>Try a look and tell us what you prefer.</p></div><button class="design-close" aria-label="Close">✕</button></div>
    <label class="design-field">Color direction<select id="dc-palette"><option>Original website</option>${Object.keys(palettes).map(x=>'<option>'+x+'</option>').join('')}</select><span class="design-swatches" id="dc-swatches"></span></label>
    <label class="design-field">Typography<select id="dc-font">${Object.keys(fontMap).map(x=>'<option>'+x+'</option>').join('')}</select></label>
    <div class="design-field">Corner style<div class="design-options" id="dc-shape"><button class="selected">Rounded</button><button>Sharp</button><button>Pill</button></div></div>
    <label class="design-field" id="dc-radius-label">Corner roundness <b id="dc-radius-value">18px</b><input id="dc-radius" type="range" min="4" max="32" value="18"></label>
    <div class="design-field">Section spacing<div class="design-options" id="dc-density"><button>Compact</button><button class="selected">Comfortable</button><button>Spacious</button></div></div>
    <div class="design-preview-note">● Changes are previewed on this page only. Your choices are not saved or published.</div>
    <div class="design-actions"><button class="design-reset">↺ Reset</button><button class="design-send">➤ Send my preferences</button></div>
  </aside>`;
  document.body.append(launcher,backdrop);
  const $=s=>backdrop.querySelector(s); let state={palette:"Original website",font:"Keep original",shape:"Rounded",radius:18,density:"Comfortable"};
  function apply(){
    const root=document.documentElement, keys=["--bg","--surface","--ink","--accent","--gold","--line","--r","--custom-density","--custom-font"];
    keys.forEach(k=>root.style.removeProperty(k)); document.body.classList.remove("design-custom-preview");
    if(state.palette!=="Original website"){
      const [bg,surface,ink,accent,gold]=palettes[state.palette];
      [["--bg",bg],["--surface",surface],["--ink",ink],["--accent",accent],["--gold",gold],["--line",ink+"22"]].forEach(([k,v])=>root.style.setProperty(k,v));
    }
    if(state.font!=="Keep original") root.style.setProperty("--custom-font",fontMap[state.font]);
    if(state.shape!=="Rounded" || state.radius!==18) root.style.setProperty("--r",state.shape==="Sharp"?"2px":state.shape==="Pill"?"28px":state.radius+"px");
    root.style.setProperty("--custom-density",state.density==="Compact"?".78":state.density==="Spacious"?"1.18":"1");
    document.body.classList.add("design-custom-preview");
    $("#dc-radius-label").hidden=state.shape!=="Rounded"; $("#dc-radius-value").textContent=state.radius+"px";
    $("#dc-swatches").innerHTML=state.palette==="Original website"?"":palettes[state.palette].map(c=>'<i style="background:'+c+'"></i>').join("");
  }
  function updateBrief(){return "Website design preferences\nColor palette: "+state.palette+"\nTypography: "+state.font+"\nCorner style: "+state.shape+" ("+state.radius+"px)\nSpacing: "+state.density+"\n\nPlease contact me to discuss this design."}
  launcher.addEventListener("click",()=>{backdrop.hidden=false;});
  $(".design-close").addEventListener("click",()=>backdrop.hidden=true);
  backdrop.addEventListener("click",e=>{if(e.target===backdrop)backdrop.hidden=true});
  $("#dc-palette").addEventListener("change",e=>{state.palette=e.target.value;apply()});
  $("#dc-font").addEventListener("change",e=>{state.font=e.target.value;apply()});
  $("#dc-radius").addEventListener("input",e=>{state.radius=Number(e.target.value);apply()});
  ["dc-shape","dc-density"].forEach(id=>$("#"+id).addEventListener("click",e=>{if(e.target.tagName!=="BUTTON")return; e.currentTarget.querySelectorAll("button").forEach(b=>b.classList.remove("selected"));e.target.classList.add("selected");if(id==="dc-shape")state.shape=e.target.textContent;else state.density=e.target.textContent;apply()}));
  $(".design-reset").addEventListener("click",()=>{state={palette:"Original website",font:"Keep original",shape:"Rounded",radius:18,density:"Comfortable"};$("#dc-palette").value=state.palette;$("#dc-font").value=state.font;$("#dc-radius").value=18;["dc-shape","dc-density"].forEach((id,i)=>{$("#"+id).querySelectorAll("button").forEach((b,j)=>b.classList.toggle("selected",j===(i?1:0)))});apply()});
  $(".design-send").addEventListener("click",()=>{location.href="mailto:asnorali.dev@gmail.com?subject="+encodeURIComponent("Website design preferences")+"&body="+encodeURIComponent("Hello! I would like to discuss a website design.\n\n"+updateBrief()+"\n\nPage: "+location.href)});
})();