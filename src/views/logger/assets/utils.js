function getTime(activity){
  var diff = Math.abs(new Date(activity.end_time) - new Date(activity.start_time));
  var seconds = (diff/1000);
  return Math.trunc(seconds);
}
//function get filename from path
function arrangeStats(activity){
  return activity.executable_name.replace(/^.*(\\|\/)/, '');
}

function arrangePieStats(activity){
  return activity.activity_type.replace('eclipse_','').replace('atom_','').replace('deleted','delete');
}

export function createLineStats(activities){
  let stats = {};
  const map = activities.reduce((acc, e) => acc.set(e.end_time.slice(0,10), (acc.get(e.end_time.slice(0,10)) || 0) + 1), new Map());
  const sortedMap = new Map([...map].sort((a, b) => a[0] > b[0] ? 1 : -1));
  stats.labels = [...sortedMap.keys()];
  stats.numbers = [ ...sortedMap.values()];
  return stats;
}

export function createFileStats(activities){
  let stats = {
    labels: [],
    numbers: [],
    time: []
  }
  let filtered = activities.filter(name => name.executable_name.includes('.'));

  const map = filtered.reduce((acc, item) => {
      if( acc[arrangeStats(item)]) {
        acc[arrangeStats(item)].items = acc[arrangeStats(item)].items + 1 ;
        acc[arrangeStats(item)].time = acc[arrangeStats(item)].time + getTime(item);
      }
      else acc[arrangeStats(item)] = {items:1, time:getTime(item)};
      return acc;
  },{});

  for (const prop in map) {
    //show only files with metrics > 50 
    if(map[prop].items > 50){
      stats.labels.push(prop);
      stats.time.push(map[prop].time);
      stats.numbers.push(map[prop].items);
    }
  }
  return stats;
};

export function createPieStats(activities){
  let stats = {};
  let filtered = activities.filter(name => name.activity_type.includes('lines'));
  const map = filtered.reduce((acc, item) => acc.set(arrangePieStats(item),(acc.get(arrangePieStats(item)) || 0) + 1), new Map());
  const sortedMap = new Map([...map].sort((a, b) => a[0] < b[0] ? 1 : -1));
  stats.labels = [...sortedMap.keys()];
  stats.numbers = [...sortedMap.values()];
  stats.total = stats.numbers.reduce((a,b)=> a + b, 0)
  stats.addPercentage = Math.round(stats.numbers[0]/stats.total*100);
  stats.delPercentage = Math.round(stats.numbers[1]/stats.total*100);
  stats.changePercentage = Math.round(stats.numbers[2]/stats.total*100);
  return stats;
}
