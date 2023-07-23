export namespace Book {
    export interface IBook {
        "id": number,
        "title": string,
        "author": string,
        "publicationYear": number
    }

    export interface IRequast extends Express.Request {
        body:IBook,
        query: {
            page: string,
            pageSize: string,
            title: string,
            publicationYear: string
        }
        params: {
            id: string
        }
    }

}