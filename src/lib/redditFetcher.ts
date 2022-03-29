import request from './request'

export interface IRedditResponse {
    postLink: string
    subreddit: string
    title: string
    url: string
    nsfw: boolean
    spoiler: boolean
    author: string
    ups: number
    preview: string[]
}

export default async (subreddit: string): Promise<IRedditResponse | { error: string }> => {
    try {
        const response = await request.json<IRedditResponse>(`https://meme-api.herokuapp.com/gimme/${subreddit}`)
        if (!response.url) return { error: '𝗜𝗻𝘃𝗮𝗹𝗶𝗱 𝗦𝘂𝗯𝗿𝗲𝗱𝗱𝗶𝘁𝘀' }
        return response
    } catch (err) {
        return { error: '𝗜𝗻𝘃𝗮𝗹𝗶𝗱 𝗦𝘂𝗯𝗿𝗲𝗱𝗱𝗶𝘁𝘀' }
    }
}
