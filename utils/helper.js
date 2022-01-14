function filterDropdown(list, input) {
    if (input) {
        var filtered = list.filter(data => data.value === input)
        if (filtered && filtered.length > 0) {
            return filtered[0]
        }
        filtered = list.filter(data => data.value === 0)
        if (filtered && filtered.length > 0) {
            return filtered[0]
        }
    } else {
        const filtered = list.filter(data => data.value === 0)
        if (filtered && filtered.length > 0) {
            return filtered[0]
        }
    }
}

export{
    filterDropdown
}