import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { IParsedArgs, ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'disable',
            description: 'Disables the given command from being used globally',
            category: 'dev',
            dm: true,
            usage: `${client.config.prefix}config [command] | (reason)`,
            modsOnly: true,
            baseXp: 0
        })
    }

    run = async (M: ISimplifiedMessage, { joined }: IParsedArgs): Promise<void> => {
        const split = joined.split('|')
        const key = split[0].toLowerCase().trim()
        if (!key) return void (await M.reply(`𝗣𝗿𝗼𝘃𝗶𝗱𝗲 𝘁𝗵𝗲 𝗰𝗼𝗺𝗺𝗮𝗻𝗱 𝘆𝗼𝘂 𝘄𝗮𝗻𝘁 𝘁𝗼 𝗱𝗶𝘀𝗮𝗯𝗹𝗲`))
        const command = this.handler.commands.get(key) || this.handler.aliases.get(key)
        if (!command) return void (await M.reply(`𝗡𝗼 𝗰𝗼𝗺𝗺𝗮𝗻𝗱 𝗳𝗼𝘂𝗻𝗱`))
        if (await this.client.DB.disabledcommands.findOne({ command: command.config.command }))
            return void M.reply(`${command.config.command} 𝗶𝘀 𝗮𝗹𝗿𝗲𝗮𝗱𝘆 𝗱𝗶𝘀𝗮𝗯𝗹𝗲𝗱`)
        await new this.client.DB.disabledcommands({
            command: command.config.command,
            reason: (split[1] || '').trim() || ''
        }).save()
        await M.reply(
            `*${this.client.util.capitalize(command.config.command)}* 𝗶𝘀 𝗻𝗼𝘄 𝗗𝗶𝘀𝗮𝗯𝗹𝗲𝗱${
                split[1] ? ` for ${split[1]}` : ''
            }`
        )
    }
}
