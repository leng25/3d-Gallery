// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract first_contract {

    string world = "hello";

    function get() public view returns (string memory){
       return world;
    }

    struct User{
        string[5] urls;
        uint256 counter;
        address[] friends;
    }

    mapping(address => User) public accounts;
    address public owner;

    function addPicture(string memory url_name) public{
        uint256 count = accounts[msg.sender].counter;    
        if(count==5){
            count = 0;
        }
        accounts[msg.sender].urls[count] = url_name;
        count++;
        accounts[msg.sender].counter = count;
    }

    function getpicture(uint256 n) public view returns (string memory){
       return accounts[msg.sender].urls[n];
    }

//   function getallStrings() public view returns (string[] memory){
//        uint number_of_friends = accounts[msg.sender].friends.length;
//        string[] memory all_friends_picture;
//        for(uint i =0; i< number_of_friends; i++){
//                address friend_address = accounts[msg.sender].friends[i];
//                uint256 number_of_picture_of_friend = accounts[friend_address].counter;
//                
//                for(uint j =0; j<number_of_picture_of_friend; j++){
//                    string memory url = accounts[friend_address].urls[j];
//                    all_friends_picture.push(url);
//                }
//        }
//
//       return all_friends_picture;
//    }

    function addFrind(address friend_request_address) public {
        accounts[msg.sender].friends.push(friend_request_address);
    }
    function getFriendsAddress() public view returns (address[] memory){
        return accounts[msg.sender].friends;
    }
}