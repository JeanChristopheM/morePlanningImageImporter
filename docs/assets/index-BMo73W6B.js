(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function a(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=a(t);fetch(t.href,o)}})();const F={a:[128,128,128],b:[0,0,255],c:[0,255,0],d:[255,0,0],e:[255,255,0],f:[255,192,203],g:[0,255,255],h:[128,0,128],i:[255,165,0],j:[0,0,0]},C=(n,e)=>Math.sqrt(Math.pow(n[0]-e[0],2)+Math.pow(n[1]-e[1],2)+Math.pow(n[2]-e[2],2)),I=(n,e,a)=>{if(n>=245&&e>=245&&a>=245)return"-";let i="a",t=1/0;for(const[o,s]of Object.entries(F)){const c=C([n,e,a],s);c<t&&(t=c,i=o)}return i};function M(n){const a=n.width,i=n.height;if(a<=250&&i<=250){const r=document.createElement("canvas");return r.width=a,r.height=i,r.getContext("2d").drawImage(n,0,0,a,i),r}const t=Math.min(250/a,250/i),o=Math.floor(a*t),s=Math.floor(i*t),c=document.createElement("canvas");return c.width=o,c.height=s,c.getContext("2d").drawImage(n,0,0,o,s),c}const S=n=>{var t;const e=(t=n.target)==null?void 0:t.files;if(!e)return;const a=e[0];if(!a)return;const i=new FileReader;i.onload=function(o){const s=new Image;s.onload=function(){b(s)},s.src=o.target.result},i.readAsDataURL(a)},E=(n,e,a)=>{const i=.299*n+.587*e+.114*a,t=["j","i","h","g","f","e","d","c","b","a","-"],o=Math.floor(i/255*(t.length-1));return t[o]},L=(n,e,a)=>{const i=Math.max(n,e,a),t=Math.min(n,e,a);let o=0;i===t?o=0:i===n?o=(60*((e-a)/(i-t))+360)%360:i===e?o=60*((a-n)/(i-t))+120:o=60*((n-e)/(i-t))+240;const s=["c","g","b","h","f","d","e","i","j","a"],c=Math.floor(o/360*s.length);return s[c]};function O(n,e){const a=e.getContext("2d");if(!a)return;a.imageSmoothingEnabled=!1;const i=7,t=3,o=100,s=i+t,c=n.split(`
`)[0].length,l=n.split(`
`).length,r={a:"#d2d5d580",b:"#2095f280",c:"#4bae4f80",d:"#f2020280",e:"#feea3a80",f:"#ff00f080",g:"#00FFFF80",h:"#80008080",i:"#FFA50080",j:"#00000080","-":"#FFFFFF80"};e.width=c*s+o,e.height=l*s+o;const y=n.split(`
`);for(let p=0;p<l;p++){const u=y[p];if(u)for(let d=0;d<c;d++){const f=u[d];if(!f)continue;const h=r[f]||"#FFFFFF",g=d*s+o/2,v=p*s+o/2,m=Math.random()*.8,w=g+m,x=v+m;a.fillStyle=h,a.fillRect(w,x,i,i)}}}async function b(n){try{const e=M(n),a=e.getContext("2d"),i=e.width,t=e.height,s=document.getElementById("map-select").value,l=a.getImageData(0,0,i,t).data;let r="";for(let u=0;u<t;u++){let d="";for(let f=0;f<i;f++){const h=(u*i+f)*4,g=l[h],v=l[h+1],m=l[h+2];d+=s==="1"?I(g,v,m):s==="2"?E(g,v,m):L(g,v,m)}r+=d+`
`}document.getElementById("ascii-output").textContent=r;const y=document.getElementById("ascii-output"),p=document.getElementById("preview-canvas");O(y.value,p)}catch(e){console.error("Error processing the image:",e)}}const z=()=>{const n=document.getElementById("ascii-output").textContent;n&&navigator.clipboard.writeText(n).then(()=>{alert("ASCII art copied to clipboard!")})},B=n=>{var a;const e=(a=n.clipboardData)==null?void 0:a.items;if(e){for(const i of e)if(i.type.startsWith("image")){const t=i.getAsFile();if(t){const o=new FileReader;o.onload=function(s){const c=new Image;c.onload=function(){b(c)},c.src=s.target.result},o.readAsDataURL(t)}}}},D=()=>{var n,e;(n=document.getElementById("file-input"))==null||n.addEventListener("change",S),document.addEventListener("paste",B),(e=document.getElementById("copy-btn"))==null||e.addEventListener("click",z)};document.querySelector("#app").innerHTML=`
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

`;D();
