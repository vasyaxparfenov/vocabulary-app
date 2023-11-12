export interface IVocabulary{
    analyse(words: string[]): Promise<Record<string, number>>
}

export interface IEventHandler<TEvent, TResult>{
    handle(event: TEvent): Promise<TResult>
}