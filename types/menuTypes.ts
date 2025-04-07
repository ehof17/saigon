export type menuItemGroup ={
    id: number;
    name: string;
    description: string | null;
    created_at: Date | null;
    updated_at: Date | null;
}

export type menuItem = {
    item_id: number;
    item_group_id: number;
    name: string;
    description: string | null;
    availability: boolean | null;
}

export type menuItemAvailableToOrder = {
    item_id: number;
    name: string;
    description: string | null;
    availability: boolean | null;
    variationGroups: variationGroups[];
}  
export type variationGroups = {
    variation_group_id: number,
    name: string,
    description: string | null,
    min_selection: number,
    max_selection: number,
    options: variation[]
}
export type variation= {
    variation_id: number,
    variation_group_id: number,
    name: string,
    description: string | null,
    price_adjustment: string,
    item_id : number

}
// // modifications
// const results: {
//     variationGroups: {
//         options: {
//             variation_id: number;
//             variation_group_id: number;
//             name: string;
//             description: string | null;
//             price_adjustment: string;
//             item_id: number;
//         }[];
//         variation_group_id: number;
//         name: string;
//         description: string | null;
//         min_selection: number;
//         max_selection: number;
//     }[];
//     item_id: number;
//     name: string;
//     description: string | null;
//     availability: boolean | null;
// }[]