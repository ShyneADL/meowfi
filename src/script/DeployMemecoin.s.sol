
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../contracts/Memecoin.sol";

contract DeployMemecoin is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        vm.startBroadcast(deployerPrivateKey);
        
        Memecoin memecoin = new Memecoin();
        
        console.log("Memecoin deployed at:", address(memecoin));
        
        vm.stopBroadcast();
    }
}
