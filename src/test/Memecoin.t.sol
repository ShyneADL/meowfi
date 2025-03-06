
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../contracts/Memecoin.sol";

contract MemecoinTest is Test {
    Memecoin public memecoin;
    address public owner;
    address public user1;
    address public user2;

    function setUp() public {
        owner = address(this);
        user1 = makeAddr("user1");
        user2 = makeAddr("user2");
        
        // Deploy the Memecoin contract
        memecoin = new Memecoin();
        
        // Fund user accounts for testing
        vm.deal(user1, 10 ether);
        vm.deal(user2, 10 ether);
    }

    function testInitialState() public {
        assertEq(memecoin.name(), "Memecoin");
        assertEq(memecoin.symbol(), "MEME");
        assertEq(memecoin.decimals(), 18);
        assertEq(memecoin.totalSupply(), 1_000_000_000 * 10**18);
        assertEq(memecoin.balanceOf(owner), 1_000_000_000 * 10**18);
        assertEq(memecoin.buyTaxPercentage(), 2);
        assertEq(memecoin.sellTaxPercentage(), 2);
        assertEq(memecoin.tradingEnabled(), false);
    }

    function testEnableTrading() public {
        memecoin.enableTrading();
        assertTrue(memecoin.tradingEnabled());
        assertGt(memecoin.launchTime(), 0);
    }

    function testSetTaxPercentages() public {
        memecoin.setTaxPercentages(5, 7);
        assertEq(memecoin.buyTaxPercentage(), 5);
        assertEq(memecoin.sellTaxPercentage(), 7);
    }

    function testExcludeFromTax() public {
        assertEq(memecoin.isExcludedFromTax(user1), false);
        memecoin.excludeFromTax(user1, true);
        assertEq(memecoin.isExcludedFromTax(user1), true);
    }

    function testAllowToTradeEarly() public {
        assertEq(memecoin.isAllowedToTradeEarly(user1), false);
        memecoin.allowToTradeEarly(user1, true);
        assertEq(memecoin.isAllowedToTradeEarly(user1), true);
    }

    function testTransferBeforeTradingEnabled() public {
        // Owner transfers to user1 (should work as owner is excluded from restrictions)
        memecoin.transfer(user1, 1000 * 10**18);
        assertEq(memecoin.balanceOf(user1), 1000 * 10**18);
        
        // User1 tries to transfer to user2 (should fail as trading not enabled)
        vm.startPrank(user1);
        vm.expectRevert("Trading not enabled yet");
        memecoin.transfer(user2, 100 * 10**18);
        vm.stopPrank();
        
        // Allow user1 to trade early
        memecoin.allowToTradeEarly(user1, true);
        
        // Now user1 should be able to transfer
        vm.startPrank(user1);
        memecoin.transfer(user2, 100 * 10**18);
        vm.stopPrank();
        
        assertEq(memecoin.balanceOf(user2), 98 * 10**18); // 2% tax applied
    }

    function testTaxCalculation() public {
        // First enable trading
        memecoin.enableTrading();
        
        // Allow user2 to trade early (to bypass 24h restriction)
        memecoin.allowToTradeEarly(user2, true);
        
        // Transfer from owner to user1 (owner is excluded from tax)
        memecoin.transfer(user1, 1000 * 10**18);
        assertEq(memecoin.balanceOf(user1), 1000 * 10**18);
        
        // Allow user1 to trade early
        memecoin.allowToTradeEarly(user1, true);
        
        // User1 transfers to user2 (should have 2% tax)
        vm.startPrank(user1);
        memecoin.transfer(user2, 100 * 10**18);
        vm.stopPrank();
        
        // Check balances (100 - 2% = 98)
        assertEq(memecoin.balanceOf(user2), 98 * 10**18);
        assertEq(memecoin.balanceOf(address(memecoin)), 2 * 10**18); // Tax collected by contract
    }
}
