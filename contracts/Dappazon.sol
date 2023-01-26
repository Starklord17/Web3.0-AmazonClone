// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Dappazon {
    // string public name;
    address public owner;

    struct Item {
        uint256 id;
        string name;
        string category;
        string image;
        uint256 cost;
        uint256 rating;
        uint256 stock;
    }

    struct Order {
        uint256 time;
        Item item;
    }

    // Treat the blockchain as a database
    mapping(uint256 => Item) public items;
    mapping(address => uint256) public orderCount;
    mapping(address => mapping(uint256 => Order)) public orders;

    // Define event
    event List(string name, uint256 cost, uint256 quantity);

    // Modifier with Solidity special function called require that evaluates boolean values
    modifier onlyOwner() {
        require(msg.sender == owner);
        _; // This represents the function body.
    }

    constructor() {
        // name = "Dappazon";
        owner = msg.sender;
    }

    // List products
    function list(
        uint256 _id,
        string memory _name,
        string memory _category,
        string memory _image,
        uint256 _cost,
        uint256 _rating,
        uint256 _stock
    ) public onlyOwner {

        // Create Item struct
        Item memory item = Item(
            _id,
            _name,
            _category,
            _image,
            _cost,
            _rating,
            _stock
        );

        // Save Item Struct to blockchain
        items[_id] = item;

        // Emit an event
        emit List(_name, _cost, _stock);
    }

        // Buy products
        function buy(uint256 _id) public payable {
            // Receive Crypto
            // Fetch item
            Item memory item = items[_id];

            // Create an order
            Order memory order = Order(block.timestamp, item);

            // Add order for user
            orderCount[msg.sender]++; // <-- Order ID
            orders[msg.sender][orderCount[msg.sender]] = order;

            // Substrack stock
            items[_id].stock = item.stock - 1;

            // Emit event
        }

        // Withdraw funds

}

