// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PropertyRental {
    // Struct to store property details
    struct Property {
        uint id;
        address owner;
        string name;
        string description;
        uint256 priceInWei;
        bool isAvailable;
    }

    // Enum for user roles
    enum UserRole { Unregistered, Owner, Buyer }

    // Mappings
    mapping(address => UserRole) public userRoles; // User roles
    mapping(uint => Property) public properties;  // Property details by ID
    mapping(address => uint[]) public userOwnedProperties; // Properties owned by a user

    // Events
    event PropertyAdded(uint propertyId, address owner, string name, uint256 priceInWei);
    event PropertyPurchased(uint propertyId, address buyer);

    uint public nextPropertyId; // Auto-incrementing property ID

    // Modifiers
    modifier onlyOwner() {
        require(userRoles[msg.sender] == UserRole.Owner, "Only property owners allowed");
        _;
    }

    modifier onlyBuyer() {
        require(userRoles[msg.sender] == UserRole.Buyer, "Only buyers allowed");
        _;
    }

    modifier propertyExists(uint propertyId) {
        require(propertyId < nextPropertyId, "Property does not exist");
        _;
    }

    modifier isPropertyOwner(uint propertyId) {
        require(properties[propertyId].owner == msg.sender, "Caller is not the owner of this property");
        _;
    }

    modifier isAvailable(uint propertyId) {
        require(properties[propertyId].isAvailable, "Property is not available");
        _;
    }

    // Function to register as a property owner
    function registerAsOwner() public {
        userRoles[msg.sender] = UserRole.Owner;
    }

    // Function to register as a buyer
    function registerAsBuyer() public {
        userRoles[msg.sender] = UserRole.Buyer;
    }

    // Function to add a property (only for owners)
    function addProperty(string memory name, string memory description, uint256 priceInWei) public onlyOwner {
        properties[nextPropertyId] = Property({
            id: nextPropertyId,
            owner: msg.sender,
            name: name,
            description: description,
            priceInWei: priceInWei,
            isAvailable: true
        });

        userOwnedProperties[msg.sender].push(nextPropertyId);

        emit PropertyAdded(nextPropertyId, msg.sender, name, priceInWei);
        nextPropertyId++;
    }

    // Function to buy a property (only for buyers)
    function buyProperty(uint propertyId) public payable onlyBuyer propertyExists(propertyId) isAvailable(propertyId) {
        Property storage property = properties[propertyId];

        require(msg.value == property.priceInWei, "Incorrect payment amount");
        require(msg.sender != property.owner, "Cannot buy your own property");

        // Transfer funds to the property owner
        payable(property.owner).transfer(msg.value);

        // Mark property as unavailable
        property.isAvailable = false;

        emit PropertyPurchased(propertyId, msg.sender);
    }

    // Function to get properties owned by a specific owner
    function getOwnedProperties(address owner) public view returns (uint[] memory) {
        return userOwnedProperties[owner];
    }

    // Function to return property details by ID
    function getPropertyDetails(uint propertyId) public view propertyExists(propertyId) returns (
        uint id,
        address owner,
        string memory name,
        string memory description,
        uint256 priceInWei,
        bool isAvailable
    ) {
        Property memory property = properties[propertyId];
        return (
            property.id,
            property.owner,
            property.name,
            property.description,
            property.priceInWei,
            property.isAvailable
        );
    }

    // Function for an owner to mark a property as available again
    function makePropertyAvailable(uint propertyId) public isPropertyOwner(propertyId) {
        properties[propertyId].isAvailable = true;
    }
}
