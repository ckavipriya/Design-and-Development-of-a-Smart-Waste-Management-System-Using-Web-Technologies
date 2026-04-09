<script>
const Database = {
  thresholds: { critical: 90, warning: 75, offlineTimeout: 30 },
  zones: [
    { id:'Z1', name:'Downtown Core', color:'#10b981', bins:42, activeRoutes:3 },
    { id:'Z2', name:'Riverside District', color:'#06b6d4', bins:35, activeRoutes:2 },
    { id:'Z3', name:'Industrial Park', color:'#f59e0b', bins:28, activeRoutes:2 },
    { id:'Z4', name:'Suburban North', color:'#8b5cf6', bins:56, activeRoutes:4 },
    { id:'Z5', name:'Harbor Area', color:'#ec4899', bins:31, activeRoutes:2 },
    { id:'Z6', name:'University Campus', color:'#f97316', bins:24, activeRoutes:1 },
  ],
  bins: [], alerts: [], routes: [], schedules: [], drivers: [],
  currentUser: null,

  init() {
    this.generateBins(); this.generateAlerts(); this.generateRoutes();
    this.generateSchedules(); this.generateDrivers();
  },

  generateBins() {
    const types = ['General','Recyclable','Organic','Hazardous'];
    const tc = { General:'#6b7280', Recyclable:'#10b981', Organic:'#f59e0b', Hazardous:'#ef4444' };
    const streets = ['Main St','Oak Ave','Elm Blvd','Pine Rd','Cedar Ln','Maple Dr','Birch Way','Willow Ct','Spruce Pl','Ash St','Cherry Ave','Walnut Blvd','Hickory Rd','Poplar Ln','Sycamore Dr','Magnolia Way','Juniper Ct','Cypress Pl','Redwood St','Sequoia Ave','Aspen Blvd','Cottonwood Rd','Dogwood Ln','Hemlock Dr','Laurel Way','Mulberry Ct','Peach Pl','Pecan St','Sweetgum Ave','Tupelo Blvd','Ironwood Rd','Locust Ln','Beech Dr'];
    for (let i=1;i<=48;i++) {
      const fl = Math.random()*100;
      let st='normal';
      if(fl>=this.thresholds.critical)st='critical';
      else if(fl>=this.thresholds.warning)st='warning';
      else if(fl<10)st='empty';
      const z=this.zones[Math.floor(Math.random()*this.zones.length)];
      this.bins.push({
        id:`BIN-${String(i).padStart(3,'0')}`, type:types[Math.floor(Math.random()*types.length)],
        typeColor:tc[types[Math.floor(Math.random()*types.length)]],
        fillLevel:Math.round(fl*10)/10, status:st, zone:z.name, zoneId:z.id,
        location:`${streets[Math.floor(Math.random()*streets.length)]} & ${streets[Math.floor(Math.random()*streets.length)]}`,
        lat:40.71+(Math.random()-0.5)*0.08, lng:-74.01+(Math.random()-0.5)*0.08,
        battery:Math.round(20+Math.random()*80), lastReading:Date.now()-Math.floor(Math.random()*3600000),
        temperature:Math.round((15+Math.random()*20)*10)/10, collections:Math.floor(Math.random()*120),
      });
    }
    this.bins.forEach(b=>{b.typeColor=tc[b.type];});
  },

  generateAlerts() {
    const at=[{type:'critical',icon:'fa-exclamation-triangle',msgs:['Bin BIN-{id} at {pct}% — immediate collection','Sensor malfunction at BIN-{id}','Overflow at BIN-{id} by citizen']},{type:'warning',icon:'fa-exclamation-circle',msgs:['BIN-{id} approaching full at {pct}%','Battery low on BIN-{id} ({bat}%)','Collection delayed for {zone}']},{type:'info',icon:'fa-info-circle',msgs:['Route R-{rid} completed','BIN-{id} serviced — 0%','New bin BIN-{id} in {zone}']}];
    for(let i=0;i<18;i++){
      const c=at[Math.floor(Math.random()*at.length)];
      const b=this.bins[Math.floor(Math.random()*this.bins.length)];
      let m=c.msgs[Math.floor(Math.random()*c.msgs.length)];
      m=m.replace('{id}',b.id.split('-')[1]).replace('{pct}',Math.round(b.fillLevel)).replace('{bat}',b.battery).replace('{zone}',b.zone).replace('{rid}',String(Math.floor(Math.random()*5)+1));
      this.alerts.push({id:`ALT-${String(i+1).padStart(3,'0')}`,type:c.type,icon:c.icon,message:m,binId:b.id,timestamp:Date.now()-Math.floor(Math.random()*86400000),resolved:Math.random()<0.3});
    }
    this.alerts.sort((a,b)=>b.timestamp-a.timestamp);
  },

  generateRoutes() {
    const dn=['Marcus Rivera','Sarah Chen','Jake Morrison','Aisha Patel','Liam O\'Brien'];
    for(let i=1;i<=5;i++){
      const zb=this.bins.filter(b=>b.zoneId===this.zones[i-1]?.id).slice(0,8);
      const stops=zb.map(b=>({binId:b.id,fillLevel:b.fillLevel,lat:b.lat,lng:b.lng}));
      if(!stops.length)continue;
      this.routes.push({id:`R-${i}`,name:`${this.zones[i-1]?.name||'Zone'} Collection`,driver:dn[i-1],stops,distance:Math.round(8+Math.random()*20),estimatedTime:Math.round(45+Math.random()*90),status:['active','pending','completed'][Math.floor(Math.random()*3)],efficiency:Math.round(75+Math.random()*25),fuelSaved:Math.round(2+Math.random()*8)});
    }
  },

  generateSchedules() {
    const freq=['Daily','Every 2 days','Every 3 days','Weekly','Bi-weekly'];
    const st=['Active','Active','Active','Paused','Active'];
    const dn=['Marcus Rivera','Sarah Chen','Jake Morrison','Aisha Patel','Liam O\'Brien'];
    for(let i=0;i<this.zones.length;i++){
      const nd=[0,1,0,2,1,3];
      this.schedules.push({id:`SCH-${String(i+1).padStart(3,'0')}`,zone:this.zones[i].name,route:`R-${i+1}`,frequency:freq[i%freq.length],nextPickup:new Date(Date.now()+nd[i]*86400000+Math.floor(Math.random()*36000000)),driver:dn[i%dn.length],status:st[i]});
    }
  },

  generateDrivers() {
    const st=['on-route','on-route','idle','on-route','off-duty'];
    const v=['Volvo FE Electric','Mack LR Electric','BYD 8TT','Peterbilt 220EV','ISEKI SV26'];
    const pl=['ECO-4821','ECO-7393','ECO-1156','ECO-9054','ECO-3367'];
    const nm=['Marcus Rivera','Sarah Chen','Jake Morrison','Aisha Patel','Liam O\'Brien'];
    const rt=[4.8,4.9,4.6,4.7,4.5],ct=[342,289,156,278,198];
    for(let i=0;i<5;i++){
      this.drivers.push({id:`DRV-${i+1}`,name:nm[i],vehicle:v[i],plate:pl[i],status:st[i],rating:rt[i],completedToday:Math.floor(Math.random()*12),completedTotal:ct[i],currentRoute:st[i]==='on-route'?`R-${i+1}`:null,lat:40.71+(Math.random()-0.5)*0.06,lng:-74.01+(Math.random()-0.5)*0.06});
    }
  },

  tick() {
    this.bins.forEach(bin=>{
      if(Math.random()<0.08){
        bin.fillLevel=Math.min(100,bin.fillLevel+Math.random()*2);
        bin.fillLevel=Math.round(bin.fillLevel*10)/10;
        bin.lastReading=Date.now();
        if(bin.fillLevel>=this.thresholds.critical)bin.status='critical';
        else if(bin.fillLevel>=this.thresholds.warning)bin.status='warning';
        else if(bin.fillLevel<10)bin.status='empty';
        else bin.status='normal';
        if(bin.status==='critical'&&Math.random()<0.3){
          if(!this.alerts.find(a=>a.binId===bin.id&&!a.resolved&&a.type==='critical')){
            this.alerts.unshift({id:`ALT-${String(this.alerts.length+1).padStart(3,'0')}`,type:'critical',icon:'fa-exclamation-triangle',message:`Bin ${bin.id} at ${Math.round(bin.fillLevel)}% — immediate collection required`,binId:bin.id,timestamp:Date.now(),resolved:false});
          }
        }
      }
    });
  }
};
</script>
