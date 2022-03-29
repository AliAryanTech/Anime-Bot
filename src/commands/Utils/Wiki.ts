/** @format */

import wikiScraper, { IWiki } from "../../lib/wikiScraper";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "wikipedia",
			aliases: ["wiki"],
			description: "Will fetch the result of the given query from wikipedia. ",
			category: "utils",
			usage: `${client.config.prefix}wiki [query]`,
			baseXp: 20,
		});
	}

	run = async (
		M: ISimplifiedMessage,
		{ joined }: IParsedArgs
	): Promise<void> => {
		if (!joined) return void M.reply("Provide a query, 𝗖𝗵𝗼𝗺𝗶𝗲!");
		const result = await wikiScraper(joined.toLowerCase().trim());
		if ((result as { error: string }).error)
			return void (await M.reply("Invalid wikipedia page, 𝗖𝗵𝗼𝗺𝗶𝗲!"));
		const wiki = result as IWiki;
		let text = "";
		text += `*🔵 Title: ${wiki.title}*\n\n`;
		text += `*🔵 Description: ${wiki.description}*\n\n`;
		text += `*🔵 URL: ${wiki.content_urls.desktop.page}*\n\n`;
		text += `*🔵 Summary:* ${wiki.extract}`;
		await M.reply(text);
	};
}
