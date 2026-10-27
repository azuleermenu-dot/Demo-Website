const toast=document.getElementById('toast');
const showToast=(message)=>{toast.textContent=message;toast.classList.add('show');window.setTimeout(()=>toast.classList.remove('show'),2600)};
document.querySelectorAll('[data-scroll]').forEach(button=>button.addEventListener('click',()=>document.querySelector(button.dataset.scroll)?.scrollIntoView({behavior:'smooth'})));
document.getElementById('menuButton').addEventListener('click',()=>showToast('Sample menu preview — fictional demo only'));
document.getElementById('directions').addEventListener('click',()=>showToast('Directions preview — fictional location only'));
document.getElementById('reserveForm').addEventListener('submit',(event)=>{event.preventDefault();showToast('Reservation preview created — no real booking was submitted');event.target.reset()});
const toggle=document.getElementById('menuToggle');
toggle.addEventListener('click',()=>{const nav=document.querySelector('nav');nav.classList.toggle('mobile-open')});
document.querySelectorAll('nav a').forEach(link=>link.addEventListener('click',()=>document.querySelector('nav').classList.remove('mobile-open')));
