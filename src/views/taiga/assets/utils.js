export function createPieStats(stories){
    console.debug('createPieStats ', stories)
    return stories
}

export function sortUserStories(stories){
    return (
        stories.sort( (a,b) => (a.finished_date > b.finished_date) ? 1 : -1)
    )
}

export function completedStories(stories) {
    let tot = 0
    stories.map( el => {
        if (el.is_closed === true)
            tot++
    })
    return tot
}
