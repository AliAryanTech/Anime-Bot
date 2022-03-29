import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { IParsedArgs, ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'setprefix',
            description: 'Will replace the old prefix with the given term',
            category: 'dev',
            dm: true,
            usage: `${client.config.prefix}setprefix [new_prefix]`,
            modsOnly: true,
            baseXp: 0
        })
    }

    run = async (M: ISimplifiedMessage, { joined }: IParsedArgs): Promise<void> => {
        const newprefix = joined.trim().split(' ')[0].toLowerCase()
        if (!newprefix) return void (await M.reply(`𝙋𝙡𝙚𝙖𝙨𝙚 𝙥𝙧𝙤𝙫𝙞𝙙𝙚 𝙩𝙝𝙚 𝙣𝙚𝙬 𝙥𝙧𝙚𝙛𝙞𝙭.\n\n*𝙀𝙭𝙖𝙢𝙥𝙡𝙚: ${this.client.config.prefix}setprefix $`))
        this.client.config.prefix = newprefix
        const text = `🔵 *𝙎𝙪𝙘𝙘𝙚𝙨𝙛𝙪𝙡𝙡𝙮 𝙘𝙝𝙖𝙣𝙜𝙚𝙙 𝙩𝙝𝙚 𝙥𝙧𝙚𝙛𝙞𝙭 𝙩𝙤 ${newprefix}.*`
        M.reply(text)
     }
}
