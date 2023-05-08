export enum orderByEnum {
    asc = 'asc',
    desc = 'desc',
}

export default (
    columnId: string,
    orderByIds: string[],
    orderByDirections: orderByEnum[]
): [string[], orderByEnum[]] => {
    const newOrderByIds = [...orderByIds];
    const newOrderByDirections = [...orderByDirections];
    const index = newOrderByIds.findIndex((id) => id === columnId);

    if (index !== -1) {
        if (newOrderByDirections[index] === orderByEnum.asc) {
            newOrderByDirections[index] = orderByEnum.desc;
        } else {
            newOrderByIds.splice(index, 1);
            newOrderByDirections.splice(index, 1);
        }
    } else {
        newOrderByIds.push(columnId);
        newOrderByDirections.push(orderByEnum.asc);
    }

    return [newOrderByIds, newOrderByDirections];
};
