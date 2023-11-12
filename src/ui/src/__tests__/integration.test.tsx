import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { PathParams, ResponseComposition, rest, RestContext, RestRequest } from 'msw'
import {setupServer} from 'msw/node'
import App from '../App';

let requestHandler: (
    request: RestRequest<any, PathParams<string>>, 
    res: ResponseComposition<any>, 
    ctx: RestContext
) => Promise<any>;

const server = setupServer(
    rest.post("/api/analyse", (req, res, ctx) => {
        return requestHandler(req, res, ctx)
    }),
  )

describe("integration tests",()=>{

    describe("api is responding", () => {
        beforeAll(() => {
            server.listen()
        })
        afterAll(() => {
            server.close()
        })

        it("should display formatted result after valid form is submited", async () => {

            requestHandler = async (request, response, context) => {
                const payload = await request.json()

                const words = payload.words as string[]

                const stats: Record<string, number> = {}

                words.forEach(x => stats[x] = 1)

                return response(context.json({stats:stats}))
            }

            render(<App/>)

            const input = screen.getByRole("textbox", {name: "input"})
            
            const text = "one two three"

            fireEvent.change(input, {target: {value: text}})

            const button = screen.getByRole("button")

            fireEvent.click(button)
            
            await waitFor(()=> {
                const output = screen.getByRole("textbox", {name: "output"})
                expect(output).toHaveTextContent("one: 1<br/>two: 1<br/>three: 1")
            })
        })

        it("should display error message when invalud form is submited", async () => {
            const errorMessage = "error message"
            
            requestHandler = async (_, response, context) => {
               return response(context.json({message:errorMessage}), context.status(400))
            }

            render(<App/>)

            const input = screen.getByRole("textbox", {name: "input"})
            
            const text = "whatever"

            fireEvent.change(input, {target: {value: text}})

            const button = screen.getByRole("button")

            fireEvent.click(button)
            
            await waitFor(()=> {
                const output = screen.getByRole("textbox", {name: "output"})
                expect(output).toHaveTextContent(errorMessage)
            })
        })

        it("should display generic message when api responds with error", async () => {
            requestHandler = async (_, response, context) => {
               return response(context.status(500))
            }

            render(<App/>)

            const input = screen.getByRole("textbox", {name: "input"})
            
            const text = "whatever"

            fireEvent.change(input, {target: {value: text}})

            const button = screen.getByRole("button")

            fireEvent.click(button)
            
            await waitFor(()=> {
                const output = screen.getByRole("textbox", {name: "output"})
                expect(output).toHaveTextContent("Service failed to handle request.")
            })
        })
    })

    it("should display generic message when api is down", async () => {
        render(<App/>)

        const input = screen.getByRole("textbox", {name: "input"})
        
        const text = "whatever"

        fireEvent.change(input, {target: {value: text}})

        const button = screen.getByRole("button")

        fireEvent.click(button)
        
        await waitFor(()=> {
            const output = screen.getByRole("textbox", {name: "output"})
            expect(output).toHaveTextContent("Service is unavailable.")
        })
    })
})