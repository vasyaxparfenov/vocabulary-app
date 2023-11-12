export interface Result{
    error?: string
    value: string[]
}

interface AnalyseResult {
    stats: Record<string, number>
}

interface AnalyseError {
    message: string
}


function errorResult(text: string): Result { return ({error: text, value: []})}

export async function analyse(words: string[]): Promise<Result> {

    try {
        const response = await fetch(`/api/analyse`, {
                body: JSON.stringify({words: words}),
                method: "POST"
            })

        if(response.status >= 500){
            return errorResult("Service failed to handle request.")
        }

        const body = await response.json()

        if(response.status >= 400){
            var error = body as AnalyseError
            return errorResult(error.message)
        }

        const analyseResult = body as AnalyseResult
        
        const result = Object.keys(analyseResult.stats)
            .map(key => `${key}: ${analyseResult.stats[key]}`)

        return {value: result};

    } catch (error) {
        return errorResult("Service is unavailable.")
    }
}  