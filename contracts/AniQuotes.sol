// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "hardhat/console.sol";

contract AniQuotes {
    //struct stores actual and meta information about the quote
    struct Quote {
        string quote;
        string show;
        string character;
        address submitor; //preson who submitted the quote
    }

    // store our struct in an array
    // mapping (uint => Quote) internal QuotesMap;
    Quote[] quotesArr;

    //function to write quotes to our arra
    function addQuote(
        string memory _quote,
        string memory _show,
        string memory _character
    ) public {
        address submitor = msg.sender;
        quotesArr.push(Quote(_quote, _show, _character, submitor));
    }

    //return all quotes
    function getAllQuotes() external view returns (Quote[] memory) {
        return quotesArr;
    }

    function getQuoteByIndex(uint256 _index)
        public
        view
        returns (Quote memory)
    {
        return quotesArr[_index];
    }
}
