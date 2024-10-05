(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function o(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(n){if(n.ep)return;n.ep=!0;const i=o(n);fetch(n.href,i)}})();const M={a:[128,128,128],b:[0,0,255],c:[0,255,0],d:[255,0,0],e:[255,255,0],f:[255,192,203],g:[0,255,255],h:[128,0,128],i:[255,165,0],j:[0,0,0]},S=(e,t)=>Math.sqrt(Math.pow(e[0]-t[0],2)+Math.pow(e[1]-t[1],2)+Math.pow(e[2]-t[2],2)),L=(e,t,o)=>{if(e>=245&&t>=245&&o>=245)return"-";let a="a",n=1/0;for(const[i,s]of Object.entries(M)){const c=S([e,t,o],s);c<n&&(n=c,a=i)}return a},B=(e,t,o)=>{const a=.299*e+.587*t+.114*o,n=["j","i","h","g","f","e","d","c","b","a","-"],i=Math.floor(a/255*(n.length-1));return n[i]},O=(e,t,o)=>{const a=Math.max(e,t,o),n=Math.min(e,t,o);let i=0;a===n?i=0:a===e?i=(60*((t-o)/(a-n))+360)%360:a===t?i=60*((o-e)/(a-n))+120:i=60*((e-t)/(a-n))+240;const s=["c","g","b","h","f","d","e","i","j","a"],c=Math.floor(i/360*s.length);return s[c]};let p;const d=500;let f=100;function $(e){const t=e.width,o=e.height,a=Math.min(f/t,f/o),n=Math.floor(t*a),i=Math.floor(o*a),s=document.createElement("canvas");return s.width=n,s.height=i,s.getContext("2d").drawImage(e,0,0,n,i),s}function A(e,t){const o=t.getContext("2d");if(!o)return;o.imageSmoothingEnabled=!1;const a=7,n=3,i=100,s=a+n,c=e.split(`
`)[0].length,m=e.split(`
`).length,b={a:"#d2d5d580",b:"#2095f280",c:"#4bae4f80",d:"#f2020280",e:"#feea3a80",f:"#ff00f080",g:"#00FFFF80",h:"#80008080",i:"#FFA50080",j:"#00000080","-":"#FFFFFF80"};t.width=c*s+i,t.height=m*s+i;const x=e.split(`
`);for(let l=0;l<m;l++){const h=x[l];if(h)for(let r=0;r<c;r++){const u=h[r];if(!u)continue;const g=b[u]||"#FFFFFF",v=r*s+i/2,y=l*s+i/2,w=Math.random()*.8,E=v+w,F=y+w;o.fillStyle=g,o.fillRect(E,F,a,a)}}}async function I(){if(p)try{const e=$(p),t=e.getContext("2d"),o=e.width,a=e.height,i=document.getElementById("map-select").value,c=t.getImageData(0,0,o,a).data;let m="";for(let l=0;l<a;l++){let h="";for(let r=0;r<o;r++){const u=(l*o+r)*4,g=c[u],v=c[u+1],y=c[u+2];h+=i==="1"?L(g,v,y):i==="2"?B(g,v,y):O(g,v,y)}m+=h+`
`}document.getElementById("ascii-output").textContent=m;const b=document.getElementById("ascii-output"),x=document.getElementById("preview-canvas");A(b.value,x)}catch(e){console.error("Error processing the image:",e)}}const j=()=>{const e=document.getElementById("ascii-output").textContent;e&&navigator.clipboard.writeText(e).then(()=>{alert("ASCII art copied to clipboard!")})};function D(e,t){e&&(f=t,I())}const P=e=>{f=e;const t=document.getElementById("scale-slider");t.value=`${e}`;const o=document.getElementById("scale-value");o.textContent=`${e}px`},C=e=>{const t=new FileReader;t.onload=function(o){const a=new Image;a.onload=function(){p=a,P(p.width>p.height?p.width:p.height),I()},a.src=o.target.result},t.readAsDataURL(e)},U=e=>{var a;const t=(a=e.target)==null?void 0:a.files;if(!t)return;const o=t[0];o&&C(o)},V=e=>{var o;const t=(o=e.clipboardData)==null?void 0:o.items;if(t){for(const a of t)if(a.type.startsWith("image")){const n=a.getAsFile();if(!n)return;C(n)}}},R=()=>{var a,n,i;(a=document.getElementById("file-input"))==null||a.addEventListener("change",U),document.addEventListener("paste",V),(n=document.getElementById("copy-btn"))==null||n.addEventListener("click",j),(i=document.getElementById("map-select"))==null||i.addEventListener("change",I);const e=document.getElementById("preview-canvas"),t=document.getElementById("scale-slider"),o=document.getElementById("scale-value");t&&t.addEventListener("input",()=>{const s=parseFloat(t.value);s>=d?(t.value=`${d}`,o.textContent=`${d}px`):s>=d?(t.value=`${d}`,o.textContent=`${d}px`):o.textContent=`${s}px`,D(e,s)})};document.querySelector("#app").innerHTML=`
<h1>ASCII Image Converter</h1>
<h3>Upload an image or paste an image from the clipboard to convert it to a blueprint importable in the mod toolbar.</h3>
<canvas id="image-canvas" style="display:none;"></canvas>
<section id="inputs">
  <label for="file-input" class="button">
    <span class="inputLabel">Upload an image</span>
    <input type="file" id="file-input" accept="image/*">
  </label>
  <label for="map-select">
    <span class="inputLabel">Color mapping:</span>
    <select id="map-select">
      <option value="1">Color distance</option>
      <option value="2">Brightness</option>
      <option value="3">HSL</option>
    </select>
  </label>
  <label for="scale-slider">
    <span class="inputLabel">Image Scale:</span>
    <input type="range" id="scale-slider" min="10" max="${d}" step="1" value="${f}">
    <span id="scale-value">${f}px</span>
  </label>
</section>
<div id="container">
  <div id="text-side">
    <textarea id="ascii-output" rows="30" cols="30"></textarea>
    <button id="copy-btn">Copy to Clipboard</button>
  </div>
  <div id="preview-side">
    <canvas id="preview-canvas"></canvas>
  </div>
</div>

`;R();
