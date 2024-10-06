(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function a(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(n){if(n.ep)return;n.ep=!0;const i=a(n);fetch(n.href,i)}})();const M={a:[114,109,108],b:[36,101,156],c:[57,112,53],d:[166,56,47],e:[155,140,32],f:[176,19,160],g:[8,158,154],h:[104,21,173],i:[165,105,6],j:[32,30,30]},S=(e,t)=>Math.sqrt(Math.pow(e[0]-t[0],2)+Math.pow(e[1]-t[1],2)+Math.pow(e[2]-t[2],2)),L=(e,t,a)=>{if(e>=220&&t>=220&&a>=220)return"-";let o="a",n=1/0;for(const[i,s]of Object.entries(M)){const c=S([e,t,a],s);c<n&&(n=c,o=i)}return o},B=(e,t,a)=>{const o=.299*e+.587*t+.114*a,n=["j","i","h","g","f","e","d","c","b","a","-"],i=Math.floor(o/255*(n.length-1));return n[i]},O=(e,t,a)=>{const o=Math.max(e,t,a),n=Math.min(e,t,a);let i=0;o===n?i=0:o===e?i=(60*((t-a)/(o-n))+360)%360:o===t?i=60*((a-e)/(o-n))+120:i=60*((e-t)/(o-n))+240;const s=["c","g","b","h","f","d","e","i","j","a"],c=Math.floor(i/360*s.length);return s[c]};let x;const v=300;let p=100;function D(e){const t=e.width,a=e.height,o=Math.min(p/t,p/a),n=Math.floor(t*o),i=Math.floor(a*o),s=document.createElement("canvas");return s.width=n,s.height=i,s.getContext("2d").drawImage(e,0,0,n,i),s}function P(e,t){const a=t.getContext("2d");if(!a)return;a.imageSmoothingEnabled=!1;const o=7,n=3,i=100,s=o+n,c=e.split(`
`)[0].length,u=e.split(`
`).length,y={a:"#d2d5d580",b:"#2095f280",c:"#4bae4f80",d:"#f2020280",e:"#feea3a80",f:"#ff00f080",g:"#00FFFF80",h:"#80008080",i:"#FFA50080",j:"#00000080","-":"#FFFFFF00"};t.width=c*s+i,t.height=u*s+i;const b=e.split(`
`);for(let l=0;l<u;l++){const m=b[l];if(m)for(let r=0;r<c;r++){const d=m[r];if(!d)continue;const f=y[d]||"#FFFFFF",h=r*s+i/2,g=l*s+i/2,I=Math.random()*.8,E=h+I,F=g+I;a.fillStyle=f,a.fillRect(E,F,o,o)}}}async function w(){if(x)try{const e=D(x),t=e.getContext("2d"),a=e.width,o=e.height,i=document.getElementById("map-select").value,c=t.getImageData(0,0,a,o).data;let u="";for(let l=0;l<o;l++){let m="";for(let r=0;r<a;r++){const d=(l*a+r)*4,f=c[d],h=c[d+1],g=c[d+2];m+=i==="1"?L(f,h,g):i==="2"?B(f,h,g):O(f,h,g)}u+=m+`
`}document.getElementById("ascii-output").textContent=u;const y=document.getElementById("ascii-output"),b=document.getElementById("preview-canvas");P(y.value,b)}catch(e){console.error("Error processing the image:",e)}}const $=()=>{const e=document.getElementById("ascii-output").textContent;e&&navigator.clipboard.writeText(e).then(()=>{alert("ASCII art copied to clipboard!")})};function j(e,t){e&&(p=t,w())}const A=e=>{p=e;const t=document.getElementById("scale-slider");t.value=`${e}`;const a=document.getElementById("scale-value");a.textContent=`${e}px`},C=e=>{const t=new FileReader;t.onload=function(a){const o=new Image;o.onload=function(){x=o;const n=Math.max(o.width,o.height),i=Math.min(n,v);A(i),w()},o.src=a.target.result},t.readAsDataURL(e)},R=e=>{var o;const t=(o=e.target)==null?void 0:o.files;if(!t)return;const a=t[0];a&&C(a)},U=e=>{var a;const t=(a=e.clipboardData)==null?void 0:a.items;if(t){for(const o of t)if(o.type.startsWith("image")){const n=o.getAsFile();if(!n)return;C(n)}}},V=()=>{var o,n,i;(o=document.getElementById("file-input"))==null||o.addEventListener("change",R),document.addEventListener("paste",U),(n=document.getElementById("copy-btn"))==null||n.addEventListener("click",$),(i=document.getElementById("map-select"))==null||i.addEventListener("change",w);const e=document.getElementById("preview-canvas"),t=document.getElementById("scale-slider"),a=document.getElementById("scale-value");t&&t.addEventListener("input",()=>{const s=parseFloat(t.value);s>=v?(t.value=`${v}`,a.textContent=`${v}px`):a.textContent=`${s}px`,j(e,s)})};document.querySelector("#app").innerHTML=`
<h1>RimWorld Image to Blueprint Converter</h1>
<h3>Upload or paste an image to convert it into a text-based blueprint, ready to use with the "More Planning" mod in RimWorld.</h3>
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
    <input type="range" id="scale-slider" min="10" max="${v}" step="1" value="${p}">
    <span id="scale-value">${p}px</span>
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

`;V();
