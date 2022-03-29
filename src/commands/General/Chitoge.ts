/** @format */

import { MessageType, Mimetype } from "@adiwajshing/baileys";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "git",
			description: "Displays the info",
			category: "general",
			usage: `${client.config.prefix}chitoge`,
			baseXp: 200,
		});
	}

	run = async (M: ISimplifiedMessage): Promise<void> => {
		const chitoge =
			"https://media.tenor.com/videos/80f557139bc3a0857f6a705da6990fdc/mp4";
		return void this.client.sendMessage(
			M.from,
			{ url: chitoge },
			MessageType.video,
			{
				quoted: M.WAMessage,
				mimetype: Mimetype.gif,
				caption: `🔵 *𝗭𝗜𝗠 𝗕𝗢𝗧* 🔵\n\n💙 *𝗗𝗘𝗦𝗖𝗥𝗜𝗣𝗧𝗜𝗢𝗡: A WhatsApp Bot With Cool Features Corded By Drips Memes.*\n\n🌐 *𝗨𝗥𝗟: https://github.com/zim-bot/Anime-Bot* \n\n 💙 *𝗚𝗨𝗜𝗗𝗘: https://github.com/Zim-bot/Anime-Guides* \n`,
			}
		);
	};
}
