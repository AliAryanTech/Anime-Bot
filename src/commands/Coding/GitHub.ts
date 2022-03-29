import axios from 'axios'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { IParsedArgs, ISimplifiedMessage } from '../../typings'

// https://docs.github.com/en/rest/reference/users
interface UserInfo {
    login: string
    avatar_url: string
    html_url: string
    name: string
    repos_url: string
    location: string | null
    email: string | null
    bio: string | null
    twitter_username: string | null
    public_repos: number
    public_gists: number
    followers: number
    following: number
    created_at: string
    updated_at: string
    hireable: boolean
    blog: string | null
    company: string | null
    gravatar_id: string | null
}

// https://docs.github.com/en/rest/reference/repos
interface RepoInfo {
    name: string
    full_name: string
    owner: UserInfo
    description: string | null
    language: string
    stargazers_count: number
    watchers_count: number
    forks_count: number
    open_issues_count: number
    license: {
        name: string
    }
    created_at: string
    updated_at: string
}

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'github',
            aliases: ['gh'],
            description: 'Get github information about a user/repo',
            category: 'coding',
            usage: `${client.config.prefix}github`
        })
    }

    run = async (M: ISimplifiedMessage, { joined }: IParsedArgs): Promise<void> => {
        const terms = joined.trim().split('/')
        if (terms[0] === '')
            return void M.reply(`Arguments not found : Use ${this.client.config.prefix}gh (username/repo | username)`)
        const username = terms[0]
        const repo = terms.length > 1 ? terms[1] : null
        let text = ''
        if (!repo) {
            const userInfo = await axios
                .get<UserInfo>(`https://api.github.com/users/${username}`)
                .then((res) => res.data)
                .catch((err) => {
                    console.log(err)
                    return void M.reply('📍 ERROR 🎭\n 𝗙𝗮𝗶𝗹𝗲𝗱 𝘁𝗼 𝗳𝗲𝘁𝗰𝗵 𝘁𝗵𝗲 𝗨𝘀𝗲𝗿')
                })

            if (userInfo === undefined) {
                return void M.reply('📍 ERROR 🎭\n 𝗙𝗮𝗶𝗹𝗲𝗱 𝘁𝗼 𝗳𝗲𝘁𝗰𝗵 𝘁𝗵𝗲 𝗨𝘀𝗲𝗿')
            }

            // prepare text information
            text += `🔷 *𝗨𝗥𝗟:* http://github.com/${username}\n`
            text += `🔵 *𝗨𝘀𝗲𝗿𝗻𝗮𝗺𝗲:* ${userInfo.name}\n`
            if (userInfo.email !== null) text += `🔘 *𝗘𝗺𝗮𝗶𝗹:* ${userInfo.email}\n`
            if (userInfo.location !== null) text += `📍 *𝗟𝗼𝗰𝗮𝘁𝗶𝗼𝗻:* ${userInfo.location}\n`
            if (userInfo.bio !== null) text += `🔷 *𝗕𝗶𝗼:* ${userInfo.bio}\n`
            text += `*👥 𝗙𝗼𝗹𝗹𝗼𝘄𝗲𝗿𝘀:* ${userInfo.followers}\n🔘 *𝗙𝗼𝗹𝗹𝗼𝘄𝗶𝗻𝗴:* ${userInfo.following}\n`
            text += `🔵 *𝗣𝘂𝗯𝗹𝗶𝗰 𝗥𝗲𝗽𝗼𝘀𝗶𝘁𝗼𝗿𝗶𝗲𝘀:* ${userInfo.public_repos}\n`
            return void M.reply(text)
        } else {
            const repoInfo = await axios
                .get<RepoInfo>(`https://api.github.com/repos/${username}/${repo}`)
                .then((res) => res.data)
                .catch((err) => {
                    console.log(err)
                    return void M.reply('📍 ERROR 🎭\n 𝗙𝗮𝗶𝗹𝗲𝗱 𝘁𝗼 𝗳𝗲𝘁𝗰𝗵 𝘁𝗵𝗲 𝗥𝗲𝗽𝗼')
                })

            if (repoInfo === undefined) {
                return void M.reply('📍 ERROR 🎭\n 𝗙𝗮𝗶𝗹𝗲𝗱 𝘁𝗼 𝗳𝗲𝘁𝗰𝗵 𝘁𝗵𝗲 𝗥𝗲𝗽𝗼')
            }

            // prepare text information
            text += `🔘 *𝗨𝗥𝗟 :* http://github.com/${username}/${repo}\n`
            text += `🔷 *𝗥𝗘𝗣𝗢 𝗡𝗔𝗠𝗘:* ${repoInfo.name}\n`
            text += `🔘 *𝗗𝗘𝗦𝗖𝗥𝗜𝗣𝗧𝗜𝗢𝗡:* ${repoInfo.description ?? '-'}\n`
            text += `🔷 *𝗟𝗜𝗖𝗘𝗡𝗦𝗘:* ${repoInfo.license.name}\n`
            text += `🔘 *𝗦𝗧𝗔𝗥𝗦:* ${repoInfo.stargazers_count}\n`
            text += `🔷 *𝗟𝗔𝗡𝗚𝗨𝗔𝗚𝗘:* ${repoInfo.language}\n`
            text += `🔘 *𝗙𝗢𝗥𝗞𝗦:* ${repoInfo.forks_count}\n`
            text += `🔷 *𝗜𝗦𝗦𝗨𝗘𝗦:* ${repoInfo.open_issues_count}\n`
            text += `🔘 *𝗖𝗥𝗘𝗔𝗧𝗘𝗗 𝗢𝗡:* ${repoInfo.created_at}\n`
            text += `🔷 *𝗨𝗣𝗗𝗔𝗧𝗘𝗗 𝗢𝗡:* ${repoInfo.updated_at.slice(0, 11)}\n`

            return void M.reply(text)
        }
    }
}
