export type DeskType = {
    _id: string
    user_id: string
    name: string
    path: string
    cardsCount: number
    grade: number
    shots: number
    rating: number
    type: "pack" | "folder"
    created: string
    updated: string
    __v: number
}

export type ParamsType = {
    packName: string | null,
    min: number | null,
    max: number | null,
    userId: string | null,
    page: number | null,
    pageCount: null | number,
}

export type DecksStateType = {
    listOfDecks: DeskType[]
    params: ParamsType
}