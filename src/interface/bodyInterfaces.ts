export interface MangaDataInfo{
    id:string,
    attributes: AttributeManga
    relationships:any[]
    type:string
    nombreScan?:string
    data:any[]
    url?:string
    chapter?: string
    genre?:string
    name?:string
    altTitle?:string


}

export interface AttributeManga{
    title:Name
    latestUploadedChapter:string
    tags:Tag[]
    arrayGenre?:any[]
    description?:Name
    altTitles?:any[]
}

export interface AttributeTag{
    name:Name
}


export interface Tag{
    id:string
    type:string
    attributes:AttributeTag

}

export interface Response{
    result:string,
    response:string,
    data:MangaDataInfo

}

export interface Name{
    en:string
    ja:string
    ko:string

}

export interface Relationships{
    id: string
    type:string

}