(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function a(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=a(t);fetch(t.href,o)}})();const w={a:[128,128,128],b:[0,0,255],c:[0,255,0],d:[255,0,0],e:[255,255,0],f:[255,192,203],g:[0,255,255],h:[128,0,128],i:[255,165,0],j:[0,0,0]},F=(n,e)=>Math.sqrt(Math.pow(n[0]-e[0],2)+Math.pow(n[1]-e[1],2)+Math.pow(n[2]-e[2],2)),x=(n,e,a)=>{if(n>=245&&e>=245&&a>=245)return"-";let i="a",t=1/0;for(const[o,c]of Object.entries(w)){const r=F([n,e,a],c);r<t&&(t=r,i=o)}return i};function I(n){const a=n.width,i=n.height;if(a<=250&&i<=250){const s=document.createElement("canvas");return s.width=a,s.height=i,s.getContext("2d").drawImage(n,0,0,a,i),s}const t=Math.min(250/a,250/i),o=Math.floor(a*t),c=Math.floor(i*t),r=document.createElement("canvas");return r.width=o,r.height=c,r.getContext("2d").drawImage(n,0,0,o,c),r}const b=n=>{var t;const e=(t=n.target)==null?void 0:t.files;if(!e)return;const a=e[0];if(!a)return;const i=new FileReader;i.onload=function(o){const c=new Image;c.onload=function(){v(c)},c.src=o.target.result},i.readAsDataURL(a)};function C(n,e){const a=e.getContext("2d");if(!a)return;const i=7,t=3,o=100,c=i+t,r=n.split(`
`)[0].length,p=n.split(`
`).length,s={a:"#d2d5d580",b:"#2095f280",c:"#4bae4f80",d:"#f2020280",e:"#feea3a80",f:"#ff00f080",g:"#00FFFF80",h:"#80008080",i:"#FFA50080",j:"#00000080","-":"#FFFFFF80"};e.width=r*c+o,e.height=p*c+o;const u=n.split(`
`);for(let l=0;l<p;l++){const f=u[l];if(f)for(let d=0;d<r;d++){const m=f[d];if(!m)continue;const g=s[m]||"#FFFFFF",h=d*c+o/2,y=l*c+o/2;a.fillStyle=g,a.fillRect(h,y,i,i)}}}async function v(n){try{const e=I(n),a=e.getContext("2d"),i=e.width,t=e.height,c=a.getImageData(0,0,i,t).data;let r="";for(let u=0;u<t;u++){let l="";for(let f=0;f<i;f++){const d=(u*i+f)*4,m=c[d],g=c[d+1],h=c[d+2];l+=x(m,g,h)}r+=l+`
`}document.getElementById("ascii-output").textContent=r;const p=document.getElementById("ascii-output"),s=document.getElementById("preview-canvas");C(p.value,s)}catch(e){console.error("Error processing the image:",e)}}const E=()=>{const n=document.getElementById("ascii-output").textContent;n&&navigator.clipboard.writeText(n).then(()=>{alert("ASCII art copied to clipboard!")})},S=n=>{var a;const e=(a=n.clipboardData)==null?void 0:a.items;if(e){for(const i of e)if(i.type.startsWith("image")){const t=i.getAsFile();if(t){const o=new FileReader;o.onload=function(c){const r=new Image;r.onload=function(){v(r)},r.src=c.target.result},o.readAsDataURL(t)}}}},L=()=>{var n,e;(n=document.getElementById("file-input"))==null||n.addEventListener("change",b),document.addEventListener("paste",S),(e=document.getElementById("copy-btn"))==null||e.addEventListener("click",E)};document.querySelector("#app").innerHTML=`
<h1>ASCII Image Converter</h1>
<h3>Upload an image or paste an image from the clipboard to convert it to a blueprint importable in the mod toolbar.</h3>
<input type="file" id="file-input" accept="image/*">
<canvas id="image-canvas" style="display:none;"></canvas>
<div id="container">
  <div id="text-side">
    <textarea id="ascii-output" rows="30" cols="30"></textarea>
    <button id="copy-btn">Copy to Clipboard</button>
  </div>
  <div id="preview-side">
    <canvas id="preview-canvas"></canvas>
  </div>
</div>

`;L();
