import { expect } from "chai";
import { ethers } from "hardhat";
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Ani Quotes Contract Tests", function () {
	async function deployTokenFixture() {
		const [owner, addr1, addr2] = await ethers.getSigners();

		const AniQuotes = await ethers.getContractFactory("AniQuotes");

		const aniQuotesContract = await AniQuotes.deploy();

		return { AniQuotes, aniQuotesContract, owner, addr1, addr2 };
	}

	it("Add a Quote", async function () {
		const { aniQuotesContract } = await loadFixture(deployTokenFixture);

		let initialList = await aniQuotesContract.getAllQuotes();
		expect(initialList.length).to.equal(0);

		//the first quote
		let show = "Mushishi";
		let character = "Amane";
		let quote = "If you could see everything but couldn\'t change any of it, or if you could live in freedom in darkness... Which do you think is more fortunate? I think it might not be that bad living in the dark, remembering the light.";
		await aniQuotesContract.addQuote(quote, show, character);

		//add a second quote
		quote = "Even in moments of the deepest despair... I guess we can still find hope, huh?";
		show = "Shingeki no Kyojin";
		character = "Hange Zoe";
		await aniQuotesContract.addQuote(quote, show, character);

		let quotesList = await aniQuotesContract.getAllQuotes()
		expect(quotesList.length).to.equal(2);
	});

	it("can get specified quote", async function () {
		const { aniQuotesContract } = await loadFixture(deployTokenFixture);

		let quote = "Even in moments of the deepest despair... I guess we can still find hope, huh?";
		let show = "Shingeki no Kyojin";
		let character = "Hange Zoe";

		await aniQuotesContract.addQuote(quote, show, character);

		let addedQuote = await aniQuotesContract.getQuoteByIndex(0);
		expect(addedQuote.character).to.equal("Hange Zoe");
	});

	it("returning a random quote", async function () {
		const { aniQuotesContract } = await loadFixture(deployTokenFixture);

		let quote = "Even in moments of the deepest despair... I guess we can still find hope, huh?";
		let show = "Shingeki no Kyojin";
		let character = "Hange Zoe";
		await aniQuotesContract.addQuote(quote, show, character);

		quote = "I think there are many things in this world we are better off not knowing. Sometimes the truth is the cruelest thing of all. Not everyone can bear it.";
		show = "Shinsekai Yori";
		character = "Maria Akitsuki";
		await aniQuotesContract.addQuote(quote, show, character);

		let quotesList = await aniQuotesContract.getAllQuotes();
		let randIndex = Math.floor(Math.random() * quotesList.length);
		let randQuote = quotesList[randIndex];
		// console.log("random", randQuote);
	});

	it("adding a quote without show and character params", async () => {
		const { aniQuotesContract } = await loadFixture(deployTokenFixture);

		let quote = "I think there are many things in this world we are better off not knowing. Sometimes the truth is the cruelest thing of all. Not everyone can bear it.";
		await aniQuotesContract.addQuote(quote, "", "");
		let allQuotes = await aniQuotesContract.getAllQuotes();
		expect(allQuotes[0].show && allQuotes[0].character).to.equal("");
	});

	it("Filters quotes by shows and characters", async () => {
		const { aniQuotesContract } = await loadFixture(deployTokenFixture);

		let quote = "I think there are many things in this world we are better off not knowing. Sometimes the truth is the cruelest thing of all. Not everyone can bear it.";
		let show = "Shinsekai Yori";
		let character = "Maria Akitsuki";
		await aniQuotesContract.addQuote(quote, show, character);

		//second quote
		quote = "Whatever happens, happens.";
		show = "Cowboy Bebop";
		character = "Spike Spiegel";
		await aniQuotesContract.addQuote(quote, show, character);

		//third quote
		quote = "We ultimately fear what spawn from within us";
		show = "Shinsekai Yori";
		character = "Shun Aonuma";
		await aniQuotesContract.addQuote(quote, show, character);

		//get the quotes from the show Shinsekai
		let allQuotes = await aniQuotesContract.getAllQuotes();
		let searchTerm = "Shinsekai";
		let searchResult = [];
		for (let index in allQuotes) {
			if (allQuotes[index].show.includes(searchTerm)) {
				searchResult.push(allQuotes[index]);
			}
		}
		// console.log(searchResult);
		expect(searchResult.length).to.equal(2);
	});


	// it("Checking for duplicates", async function () {
	// 	const { aniQuotesContract } = await loadFixture(deployTokenFixture);

	// 	//store hashed of all quotes
	// 	let hashedQuotes: string[] = [];

	// 	let quote = "Even in moments of the deepest despair... I guess we can still find hope, huh?";
	// 	let show = "Shingeki no Kyojin";
	// 	let character = "Hange Zoe";
	// 	await aniQuotesContract.addQuote(quote, show, character);

	// 	quote = "I think there are many things in this world we are better off not knowing. Sometimes the truth is the cruelest thing of all. Not everyone can bear it.";
	// 	show = "Shinsekai Yori";
	// 	character = "Maria Akitsuki";
	// 	await aniQuotesContract.addQuote(quote, show, character);

	// 	//hash our quotes on the client 
	// 	let quotesList = await aniQuotesContract.getAllQuotes();
	// 	for (let index = 0; index < quotesList.length; index++) {
	// 		// console.log("val", quotesList[index]);
	// 		//
	// 	}

	// 	//trying to add a duplicate quote

	// 	//you can hash them and store vals in an array 
	// 	//and when user is adding you can check if a duplicate hash exists
	// 	console.log("hashedQuotes", hashedQuotes)
	// });
});