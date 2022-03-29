/** @format */

import AnimeQuotes from "animequotes";

export interface IQuotes {
	quote: string;
	anime: string;
	id: number;
	name: string;
	success: boolean;
}

export default async (
	character: string
): Promise<IQuotes | { error: string }> => {
	try {
		const result = await AnimeQuotes.getRandomQuoteByCharacter(character);
		if (!result.success)
			return { error: "𝘾𝙤𝙪𝙡𝙙𝙣'𝙩 𝙛𝙞𝙣𝙙 𝙖𝙣𝙮 𝙦𝙪𝙤𝙩𝙚 𝙛𝙤𝙧 𝙩𝙝𝙚 𝙜𝙞𝙫𝙚𝙣 𝙘𝙝𝙖𝙧𝙖𝙘𝙩𝙚𝙧." };
		return result;
	} catch (err) {
		return { error: "𝘾𝙤𝙪𝙡𝙙𝙣'𝙩 𝙛𝙞𝙣𝙙 𝙖𝙣𝙮 𝙦𝙪𝙤𝙩𝙚 𝙛𝙤𝙧 𝙩𝙝𝙚 𝙜𝙞𝙫𝙚𝙣 𝙘𝙝𝙖𝙧𝙖𝙘𝙩𝙚𝙧." };
	}
};
