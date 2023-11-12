import { IVocabulary } from "./abstractions";
import vocabulary from "./vocabulary.json"

export class StaticVocabulary implements IVocabulary {
   
    private invertedIndex: Map<string, string>;  

    constructor() {

        const typedVocabulary = vocabulary as unknown as Record<string, string[]>

        const data = Object.keys(typedVocabulary)
            .map(key => typedVocabulary[key]
                    .map<readonly [string, string]>(v => [v, key]))
            .flatMap(x => x).values()

        this.invertedIndex = new Map(data)
    }

   
   
    public analyse(words: string[]): Promise<Record<string, number>> {
        const result: Record<string, number> = {}

        for(const word of words){
            const type = this.invertedIndex.get(word)

            if(!type){
                continue
            }

            let counter = result[type] ?? 0

            result[type] = ++counter
        }

        return Promise.resolve(result);
    }
}
    