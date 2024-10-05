(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function i(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(n){if(n.ep)return;n.ep=!0;const o=i(n);fetch(n.href,o)}})();const E={a:[128,128,128],b:[0,0,255],c:[0,255,0],d:[255,0,0],e:[255,255,0],f:[255,192,203],g:[0,255,255],h:[128,0,128],i:[255,165,0],j:[0,0,0]},M=(t,e)=>Math.sqrt(Math.pow(t[0]-e[0],2)+Math.pow(t[1]-e[1],2)+Math.pow(t[2]-e[2],2)),L=(t,e,i)=>{if(t>=245&&e>=245&&i>=245)return"-";let a="a",n=1/0;for(const[o,s]of Object.entries(E)){const r=M([t,e,i],s);r<n&&(n=r,a=o)}return a},S=(t,e,i)=>{const a=.299*t+.587*e+.114*i,n=["j","i","h","g","f","e","d","c","b","a","-"],o=Math.floor(a/255*(n.length-1));return n[o]},B=(t,e,i)=>{const a=Math.max(t,e,i),n=Math.min(t,e,i);let o=0;a===n?o=0:a===t?o=(60*((e-i)/(a-n))+360)%360:a===e?o=60*((i-t)/(a-n))+120:o=60*((t-e)/(a-n))+240;const s=["c","g","b","h","f","d","e","i","j","a"],r=Math.floor(o/360*s.length);return s[r]};let c;const u=500;let f=100;function O(t){const e=t.width,i=t.height;if(e<=f&&i<=f){const l=document.createElement("canvas");return l.width=e,l.height=i,l.getContext("2d").drawImage(t,0,0,e,i),l}const a=Math.min(f/e,f/i),n=Math.floor(e*a),o=Math.floor(i*a),s=document.createElement("canvas");return s.width=n,s.height=o,s.getContext("2d").drawImage(t,0,0,n,o),s}function A(t,e){const i=e.getContext("2d");if(!i)return;i.imageSmoothingEnabled=!1;const a=7,n=3,o=100,s=a+n,r=t.split(`
`)[0].length,l=t.split(`
`).length,w={a:"#d2d5d580",b:"#2095f280",c:"#4bae4f80",d:"#f2020280",e:"#feea3a80",f:"#ff00f080",g:"#00FFFF80",h:"#80008080",i:"#FFA50080",j:"#00000080","-":"#FFFFFF80"};e.width=r*s+o,e.height=l*s+o;const x=t.split(`
`);for(let d=0;d<l;d++){const m=x[d];if(m)for(let p=0;p<r;p++){const h=m[p];if(!h)continue;const g=w[h]||"#FFFFFF",v=p*s+o/2,y=d*s+o/2,I=Math.random()*.8,C=v+I,F=y+I;i.fillStyle=g,i.fillRect(C,F,a,a)}}}async function b(){if(c)try{const t=O(c),e=t.getContext("2d"),i=t.width,a=t.height,o=document.getElementById("map-select").value,r=e.getImageData(0,0,i,a).data;let l="";for(let d=0;d<a;d++){let m="";for(let p=0;p<i;p++){const h=(d*i+p)*4,g=r[h],v=r[h+1],y=r[h+2];m+=o==="1"?L(g,v,y):o==="2"?S(g,v,y):B(g,v,y)}l+=m+`
`}document.getElementById("ascii-output").textContent=l;const w=document.getElementById("ascii-output"),x=document.getElementById("preview-canvas");A(w.value,x)}catch(t){console.error("Error processing the image:",t)}}const D=()=>{const t=document.getElementById("ascii-output").textContent;t&&navigator.clipboard.writeText(t).then(()=>{alert("ASCII art copied to clipboard!")})};function $(t,e){t&&(f=e,b())}const j=t=>{var n;const e=(n=t.target)==null?void 0:n.files;if(!e)return;const i=e[0];if(!i)return;const a=new FileReader;a.onload=function(o){const s=new Image;s.onload=function(){c=s,b()},s.src=o.target.result},a.readAsDataURL(i)},P=t=>{var i;const e=(i=t.clipboardData)==null?void 0:i.items;if(e){for(const a of e)if(a.type.startsWith("image")){const n=a.getAsFile();if(n){const o=new FileReader;o.onload=function(s){const r=new Image;r.onload=function(){c=r,b()},r.src=s.target.result},o.readAsDataURL(n)}}}},R=()=>{var a,n,o;(a=document.getElementById("file-input"))==null||a.addEventListener("change",j),document.addEventListener("paste",P),(n=document.getElementById("copy-btn"))==null||n.addEventListener("click",D),(o=document.getElementById("map-select"))==null||o.addEventListener("change",b);const t=document.getElementById("scale-slider"),e=document.getElementById("scale-value"),i=document.getElementById("preview-canvas");t&&t.addEventListener("input",()=>{const s=parseFloat(t.value);s>=((c==null?void 0:c.width)||u)?(t.value=`${(c==null?void 0:c.width)||u}`,e.textContent=`${(c==null?void 0:c.width)||u}px`):s>=((c==null?void 0:c.height)||u)?(t.value=`${(c==null?void 0:c.height)||u}`,e.textContent=`${(c==null?void 0:c.height)||u}px`):e.textContent=`${s}px`,$(i,s)})};document.querySelector("#app").innerHTML=`
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
    <input type="range" id="scale-slider" min="10" max="${u}" step="1" value="${f}">
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
