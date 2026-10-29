(function(){
  var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};

  // mobile menu
  var menu=$('.menu'),links=$('#navlinks');
  if(menu&&links){
    menu.addEventListener('click',function(){var o=links.classList.toggle('open');menu.setAttribute('aria-expanded',String(o))});
    $$('a',links).forEach(function(a){a.addEventListener('click',function(){links.classList.remove('open');menu.setAttribute('aria-expanded','false')})});
  }

  // year + back to top
  var y=$('#year');if(y)y.textContent=new Date().getFullYear();
  var bt=$('#backtop');
  if(bt){
    window.addEventListener('scroll',function(){bt.style.display=window.scrollY>500?'block':'none'});
    bt.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'})});
  }

  // tabs
  $$('.tab').forEach(function(t){t.addEventListener('click',function(){
    var group=t.closest('[data-tabs]')||document;
    $$('.tab',group).forEach(function(b){var on=b===t;b.classList.toggle('active',on);b.setAttribute('aria-selected',String(on))});
    $$('.tab-panel',group).forEach(function(p){p.classList.toggle('active',p.id==='panel-'+t.dataset.tab)});
  })});

  // screenshots: placeholder when the image file is missing, lightbox when present
  $$('.shot img').forEach(function(img){
    function fallback(){
      var box=document.createElement('div');box.className='placeholder';
      box.innerHTML='<div><b>Screenshot coming soon</b>'+(img.getAttribute('data-name')||'')+'</div>';
      var btn=img.closest('button');(btn||img).replaceWith(box);
    }
    img.addEventListener('error',fallback);
    if(img.complete&&img.naturalWidth===0)fallback();
  });
  var lb=$('#lightbox'),lbi=$('#lightbox-image');
  if(lb&&lbi){
    $$('[data-full]').forEach(function(b){b.addEventListener('click',function(){
      lbi.src=b.getAttribute('data-full');lbi.alt=b.querySelector('img').alt;lb.classList.add('open');document.body.style.overflow='hidden';
    })});
    var close=function(){lb.classList.remove('open');lbi.src='';document.body.style.overflow=''};
    $('.lightbox-close',lb).addEventListener('click',close);
    lb.addEventListener('click',function(e){if(e.target===lb)close()});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
  }
})();
