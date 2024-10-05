(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function a(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(n){if(n.ep)return;n.ep=!0;const i=a(n);fetch(n.href,i)}})();const M={a:[128,128,128],b:[0,0,255],c:[0,255,0],d:[255,0,0],e:[255,255,0],f:[255,192,203],g:[0,255,255],h:[128,0,128],i:[255,165,0],j:[0,0,0]},S=(e,t)=>Math.sqrt(Math.pow(e[0]-t[0],2)+Math.pow(e[1]-t[1],2)+Math.pow(e[2]-t[2],2)),L=(e,t,a)=>{if(e>=245&&t>=245&&a>=245)return"-";let o="a",n=1/0;for(const[i,s]of Object.entries(M)){const c=S([e,t,a],s);c<n&&(n=c,o=i)}return o},B=(e,t,a)=>{const o=.299*e+.587*t+.114*a,n=["j","i","h","g","f","e","d","c","b","a","-"],i=Math.floor(o/255*(n.length-1));return n[i]},O=(e,t,a)=>{const o=Math.max(e,t,a),n=Math.min(e,t,a);let i=0;o===n?i=0:o===e?i=(60*((t-a)/(o-n))+360)%360:o===t?i=60*((a-e)/(o-n))+120:i=60*((e-t)/(o-n))+240;const s=["c","g","b","h","f","d","e","i","j","a"],c=Math.floor(i/360*s.length);return s[c]};let d;const y=500;let u=100;function A(e){const t=e.width,a=e.height,o=Math.min(u/t,u/a),n=Math.floor(t*o),i=Math.floor(a*o),s=document.createElement("canvas");return s.width=n,s.height=i,s.getContext("2d").drawImage(e,0,0,n,i),s}function $(e,t){const a=t.getContext("2d");if(!a)return;a.imageSmoothingEnabled=!1;const o=7,n=3,i=100,s=o+n,c=e.split(`
`)[0].length,f=e.split(`
`).length,b={a:"#d2d5d580",b:"#2095f280",c:"#4bae4f80",d:"#f2020280",e:"#feea3a80",f:"#ff00f080",g:"#00FFFF80",h:"#80008080",i:"#FFA50080",j:"#00000080","-":"#FFFFFF80"};t.width=c*s+i,t.height=f*s+i;const I=e.split(`
`);for(let l=0;l<f;l++){const m=I[l];if(m)for(let r=0;r<c;r++){const p=m[r];if(!p)continue;const h=b[p]||"#FFFFFF",g=r*s+i/2,v=l*s+i/2,x=Math.random()*.8,E=g+x,F=v+x;a.fillStyle=h,a.fillRect(E,F,o,o)}}}async function w(){if(d)try{const e=A(d),t=e.getContext("2d"),a=e.width,o=e.height,i=document.getElementById("map-select").value,c=t.getImageData(0,0,a,o).data;let f="";for(let l=0;l<o;l++){let m="";for(let r=0;r<a;r++){const p=(l*a+r)*4,h=c[p],g=c[p+1],v=c[p+2];m+=i==="1"?L(h,g,v):i==="2"?B(h,g,v):O(h,g,v)}f+=m+`
`}document.getElementById("ascii-output").textContent=f;const b=document.getElementById("ascii-output"),I=document.getElementById("preview-canvas");$(b.value,I)}catch(e){console.error("Error processing the image:",e)}}const j=()=>{const e=document.getElementById("ascii-output").textContent;e&&navigator.clipboard.writeText(e).then(()=>{alert("ASCII art copied to clipboard!")})};function D(e,t){e&&(u=t,w())}const P=e=>{u=e;const t=document.getElementById("scale-slider");t.value=`${e}`;const a=document.getElementById("scale-value");a.textContent=`${e}px`},C=e=>{const t=new FileReader;t.onload=function(a){const o=new Image;o.onload=function(){d=o,P(d.width>d.height?d.width:d.height),w()},o.src=a.target.result},t.readAsDataURL(e)},U=e=>{var o;const t=(o=e.target)==null?void 0:o.files;if(!t)return;const a=t[0];a&&C(a)},V=e=>{var a;const t=(a=e.clipboardData)==null?void 0:a.items;if(t){for(const o of t)if(o.type.startsWith("image")){const n=o.getAsFile();if(!n)return;C(n)}}},R=()=>{var o,n,i;(o=document.getElementById("file-input"))==null||o.addEventListener("change",U),document.addEventListener("paste",V),(n=document.getElementById("copy-btn"))==null||n.addEventListener("click",j),(i=document.getElementById("map-select"))==null||i.addEventListener("change",w);const e=document.getElementById("preview-canvas"),t=document.getElementById("scale-slider"),a=document.getElementById("scale-value");t&&t.addEventListener("input",()=>{const s=parseFloat(t.value);s>=y?(t.value=`${y}`,a.textContent=`${y}px`):a.textContent=`${s}px`,D(e,s)})};document.querySelector("#app").innerHTML=`
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
    <input type="range" id="scale-slider" min="10" max="${y}" step="1" value="${u}">
    <span id="scale-value">${u}px</span>
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
