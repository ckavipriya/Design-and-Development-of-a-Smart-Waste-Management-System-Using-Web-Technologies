<script>
const API = {
  getStats(range) {
    const m={today:1,week:7,month:30}[range]||1;
    const bins=Database.bins;
    return new Promise(r=>setTimeout(()=>r({totalBins:bins.length,activeSensors:bins.filter(b=>b.battery>15).length,criticalBins:bins.filter(b=>b.status==='critical').length,warningBins:bins.filter(b=>b.status==='warning').length,totalCollected:Math.round(1240*m*(0.9+Math.random()*0.2)),collections:Math.round(18*m*(0.85+Math.random()*0.3)),recyclingRate:Math.round((62+Math.random()*10)*10)/10,fuelSaved:Math.round(34*m*(0.8+Math.random()*0.4))}),150));
  },
  getBins(f='all') { return new Promise(r=>setTimeout(()=>r(f==='all'?[...Database.bins]:Database.bins.filter(b=>b.status===f)),100)); },
  getAlerts(f='all') { return new Promise(r=>setTimeout(()=>{if(f==='all')r([...Database.alerts]);else if(f==='resolved')r(Database.alerts.filter(a=>a.resolved));else r(Database.alerts.filter(a=>a.type===f&&!a.resolved));},100)); },
  resolveAlert(id) { return new Promise(r=>{setTimeout(()=>{const a=Database.alerts.find(x=>x.id===id);if(a)a.resolved=true;r(a);},80);}); },
  addBin(d) { return new Promise(r=>{setTimeout(()=>{const b={id:`BIN-${String(Database.bins.length+1).padStart(3,'0')}`,...d,fillLevel:0,status:'empty',battery:100,lastReading:Date.now(),temperature:Math.round((15+Math.random()*20)*10)/10,collections:0};Database.bins.push(b);r(b);},200);}); },
  addSchedule(d) { return new Promise(r=>{setTimeout(()=>{const s={id:`SCH-${String(Database.schedules.length+1).padStart(3,'0')}`,...d,status:'Active'};Database.schedules.push(s);r(s);},200);}); },
  deleteSchedule(id) { return new Promise(r=>{setTimeout(()=>{Database.schedules=Database.schedules.filter(s=>s.id!==id);r();},100);}); },
};
</script>
