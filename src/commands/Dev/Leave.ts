import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'leave',
            description: 'Bot Leaves the group',
            category: 'dev',
            dm: true,
            usage: `${client.config.prefix}leave`,
            modsOnly: true,
            baseXp: 0
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        await M.reply(`*𝙂𝙤𝙤𝙙𝘽𝙮𝙚 𝙕𝙞𝙢 𝙗𝙤𝙩 𝙜𝙤𝙣𝙚* 👋`)
        await this.client.groupLeave(M.from).catch(() => M.reply('𝙁𝙖𝙞𝙡𝙚𝙙 𝙩𝙤 𝙡𝙚𝙖𝙫𝙚 𝙩𝙝𝙚 𝙂𝙧𝙤𝙪𝙥'))
    }
}
