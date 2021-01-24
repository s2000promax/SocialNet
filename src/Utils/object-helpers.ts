export const updateObjectInArray = (items: any, ItemId: any, objPropName: any, newObjProps: any) => {
    return items.map( (u: any) => {
        if (u[objPropName] === ItemId) {
            return {...u, ...newObjProps}
        }
        return u;
    })
}