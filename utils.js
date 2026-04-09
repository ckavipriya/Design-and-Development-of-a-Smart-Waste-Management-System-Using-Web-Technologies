<script>
const Utils = {
  timeAgo(ts) { const d=Date.now()-ts,m=Math.floor(d/60000); if(m<1)return'Just now'; if(m<60)return`${m}m ago`; const h=Math.floor(m/60); if(h<24)return`${h}h ago`; return`${Math.floor(h/24)}d ago`; },
  formatTime(d) { return d.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'}); },
  formatDate(d) { return d.toLocaleDateString('en-US',{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}); },
  fillBarColor(l) { if(l>=Database.thresholds.critical)return'var(--danger)'; if(l>=Database.thresholds.warning)return'var(--warning)'; if(l<10)return'var(--info)'; return'var(--accent)'; },
  statusClass(s) { return{normal:'normal',warning:'warning',critical:'critical',empty:'empty'}[s]||'normal'; },
  toast(msg,type='info') {
    const c=document.getElementById('toastContainer');
    const co={info:'var(--info)',success:'var(--success)',warning:'var(--warning)',danger:'var(--danger)'};
    const ic={info:'fa-info-circle',success:'fa-check-circle',warning:'fa-exclamation-circle',danger:'fa-exclamation-triangle'};
    const el=document.createElement('div'); el.className='toast';
    el.innerHTML=`<i class="fas ${ic[type]}" style="color:${co[type]};font-size:16px"></i><span>${msg}</span>`;
    c.appendChild(el);
    setTimeout(()=>{el.classList.add('leaving');setTimeout(()=>el.remove(),300);},4000);
  },
  showModal(title,content,actions) {
    document.getElementById('modalContainer').innerHTML=`<div class="modal-overlay" onclick="if(event.target===this)Utils.closeModal()"><div class="modal-box"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px"><h3 style="font-size:17px;font-weight:700">${title}</h3><button style="background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:18px" onclick="Utils.closeModal()" aria-label="Close"><i class="fas fa-times"></i></button></div><div id="modalBody">${content}</div>${actions?`<div style="display:flex;gap:10px;justify-content:flex-end;margin-top:20px">${actions}</div>`:''}</div></div>`;
  },
  closeModal() { document.getElementById('modalContainer').innerHTML=''; },
};
</script>
