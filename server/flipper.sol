// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract NameService {
    struct Name {
        bytes32 value;
        address owner;
    }

    Name[] public names;
    mapping(bytes32 => bool) public nameExists;
    uint256 public price = 10_000_000;

    event NameMinted(bytes32 indexed name, address indexed owner);
    event NameTransferred(bytes32 indexed name, address indexed oldOwner, address indexed newOwner);

    function mintName(bytes32 _name, address _owner) public {
        // Add a name validation check to ensure the name ends with ".eclipse"
        require(!nameExists[_name], "Name already exists");
        require(endsWith(_name, ".eclipse"), "Name must end with '.eclipse'");

        Name memory newName = Name({
            value: _name,
            owner: _owner
        });
        names.push(newName);
        nameExists[_name] = true;
        emit NameMinted(_name, _owner);
    }

    // Function to check if a string ends with a specific suffix
    function endsWith(bytes32 _str, string memory _suffix) pure internal returns (bool) {
        bytes32 suffix = bytes32(keccak256(abi.encodePacked(_suffix)));
        return _str == suffix;
    }    

    // Adjusted function to include explicit sender address
    function transferName(bytes32 _name, address _newOwner, address _sender) public {
        require(nameExists[_name], "Name does not exist");
        uint index = getIndex(_name);
        require(_sender == names[index].owner, "Only the owner can transfer the name");
        address oldOwner = names[index].owner;
        names[index].owner = _newOwner;
        emit NameTransferred(_name, oldOwner, _newOwner);
    }

    function getNamesCount() public view returns (uint) {
        return names.length;
    }

    function getName(uint _index) public view returns (bytes32, address) {
        require(_index < names.length, "Index out of bounds");
        return (names[_index].value, names[_index].owner);
    }

    function getIndex(bytes32 _name) internal view returns (uint) {
        for (uint i = 0; i < names.length; i++) {
            if (names[i].value == _name) {
                return i;
            }
        }
        revert("Name not found");
    }
}
