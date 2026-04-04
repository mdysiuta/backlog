export type Category = {
    id: number,
    name: string
}

export type Item = {
    id: string,
    name: string,
    year: number,
    genre: string,
    category: Category,
}