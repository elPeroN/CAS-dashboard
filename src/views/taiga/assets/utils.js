export function createPieStats(stories){
    // console.debug('createPieStats ', stories)
    return stories
}

/* In input un array di story vanno create le entry con giorno e numero
    di story chiuse
*/
export function createBarStats(stories) {
    let labels = []
    let numbers = []
    // Filtrare per avere solo stories finite
    let completed = [];
    stories.map(s => {
        if (s.is_closed === true)
            completed.push(s)
    })

    const dates = new Map(Array.from(completed, obj => [obj.finished_date.split('T')[0], []]))
    completed.forEach( obj => dates.get(obj.finished_date.split('T')[0]).push(obj))

    dates.forEach( obj => {
        numbers.push(obj.length)
    })

    return {
        labels: [...dates.keys()],
        numbers: numbers
    }
}

export function sortUserStories(stories){
    return (
        stories.sort( (a,b) => (a.finished_date > b.finished_date) ? 1 : -1)
    )
}

export function completedStories(stories) {
    let tot = 0
    stories.map( el => {
        if (isClosed(el))
            tot++
    })
    return tot
}

export function isClosed(task) {
    return (task.is_closed === true)
}
