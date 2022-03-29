/** @format */

import { summary } from "wikipedia";

export interface IWiki {
	type: string;
	title: string;
	displaytitle: string;
	namespace: {
		id: number;
		text: string;
	};
	wikibase_item: string;
	titles: {
		canonical: string;
		normalized: string;
		display: string;
	};
	pageid: number;
	thumbnail: {
		source: string;
		width: number;
		height: number;
	};
	originalimage: {
		source: string;
		width: number;
		height: number;
	};
	lang: string;
	dir: string;
	revision: string;
	tid: string;
	timestamp: string;
	description: string;
	description_source: string;
	content_urls: {
		desktop: {
			page: string;
			revisions: string;
			edit: string;
			talk: string;
		};
		mobile: {
			page: string;
			revisions: string;
			edit: string;
			talk: string;
		};
	};
	extract: string;
	extract_html: string;
}

export default async (query: string): Promise<IWiki | { error: string }> => {
	try {
		const result = await summary(query);
		if (!result.description) return { error: "𝗜𝗻𝘃𝗮𝗹𝗶𝗱 𝘄𝗶𝗸𝗶𝗽𝗲𝗱𝗶𝗮 𝗽𝗮𝗴𝗲." };
		return result;
	} catch (err) {
		return { error: "𝗜𝗻𝘃𝗮𝗹𝗶𝗱 𝘄𝗶𝗸𝗶𝗽𝗲𝗱𝗶𝗮 𝗽𝗮𝗴𝗲." };
	}
};
