/** @format */

import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";
import pTable from "ptable";
import npt from "node-periodic-table";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "element",
			aliases: ["e"],
			description: "Gives you the info of the given element. ",
			category: "educative",
			usage: `${client.config.prefix}element [name/number/symbol]`,
			baseXp: 30,
		});
	}

	run = async (
		M: ISimplifiedMessage,
		{ joined }: IParsedArgs
	): Promise<void> => {
		if (!joined)
			return void M.reply("Give me an element name/number/symbol, 𝗖𝗵𝗼𝗺𝗶𝗲💙!");
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const chitoge: any = joined.trim();
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const search = await pTable(chitoge);
		console.log(search);
		if (search === undefined) {
			return void (await M.reply(
				`*https://en.m.wikipedia.org/wiki/Periodic_table*\n\nI think this might help you.\n`
			));
		}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const response = await npt.getByNumber(search.number);
		let text = "";
		text += `💙 *𝗘𝗹𝗲𝗺𝗲𝗻𝘁: ${response.name}*\n`;
		text += `🔷 *𝗔𝘁𝗼𝗺𝗶𝗰 𝗡𝘂𝗺𝗯𝗲𝗿: ${response.number}*\n`;
		text += `🔵 *𝗔𝘁𝗼𝗺𝗶𝗰 𝗠𝗮𝘀𝘀: ${response.atomic_mass}*\n`;
		text += `🔵 *𝗦𝘆𝗺𝗯𝗼𝗹: ${response.symbol}*\n`;
		text += `🔵 *𝗔𝗽𝗽𝗲𝗮𝗿𝗮𝗻𝗰𝗲: ${response.apearance}*\n`;
		text += `🔵 *𝗣𝗵𝗮𝘀𝗲: ${response.phase}*\n`;
		text += `🔵 *𝗕𝗼𝗶𝗹𝗶𝗻𝗴 𝗣𝗼𝗶𝗻𝘁: ${response.boil} K*\n️`;
		text += `🔵 *𝗠𝗲𝗹𝘁𝗶𝗻𝗴 𝗣𝗼𝗶𝗻𝘁: ${response.melt} K*\n`;
		text += `🔵 *𝗗𝗲𝗻𝘀𝗶𝘁𝘆: ${response.density} g/mL*\n`;
		text += `🔵 *𝗦𝗵𝗲𝗹𝗹𝘀: ${response.shells.join(", ")}*\n`;
		text += `🔵 *𝗨𝗥𝗟: ${response.source}*\n\n`;
		text += `🔵 *𝗦𝘂𝗺𝗺𝗮𝗿𝘆: ${response.summary}*`;
		await M.reply(text);
	};
}
