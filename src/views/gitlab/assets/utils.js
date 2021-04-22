function arrangeStats(item){
  return item.created_at.slice(0,10);
}

export function createDevelStats(data){

  let filtered = {
    author:data[0].author_name,
    labels:[],
    additions:[],
    deletions:[]
  }

  const map = data.reduce((acc, item) => {
      if( acc[arrangeStats(item)]) {
        acc[arrangeStats(item)].additions = acc[arrangeStats(item)].additions + item.stats.additions;
        acc[arrangeStats(item)].deletions = acc[arrangeStats(item)].deletions + item.stats.deletions;
      }
      else acc[arrangeStats(item)] = {additions:item.stats.additions, deletions:item.stats.deletions};
      return acc;
  },{});

  let sortedMap = Object.keys(map).sort().reduce( (acc,key) =>{
      map[key].label = key;
      acc.push(map[key]);
      return acc;
  },[]);

  sortedMap.forEach(item =>{
    filtered.labels.push(item.label);
    filtered.additions.push(item.additions);
    filtered.deletions.push(item.deletions);
  })

  return filtered;
}


export function createPieStats(developers){
  let filtered = {
    labels:[],
    numbers:[],
  }

  developers.forEach((item, i) => {
    filtered.labels.push(item.name);
    filtered.numbers.push(item.commits);
  });
  return filtered;
}
