var Auction = artifacts.require('auction');
contract('auction', accounts => {
	const owner = accounts[0];
	describe('constructor', () => {
		describe('success case', () => {
			it('should deploy this contract', async () => {
				try {
				const instance = await Auction.new(19,[1,2,3],5, { from: owner });
				} catch (err) {
				assert.isUndefined(err.message,'revert with valid arguments');
				}
			});
		});
		describe('success case', () => {
			it('should deploy this contract', async () => {
				try {
				const instance = await Auction.new(19,[1,2,3],5, { from: owner });
				} catch (err) {
				assert.isUndefined(err.message,'revert with valid arguments');
				}
			});
		});
		describe('Fail case', () => {
			it('should revert on invalid arguments', async () => {
				try {
				const instance = await Auction.new(19,[10],5, { from: accounts[1] });
				assert.isUndefined(instance, 'contract should be created from owner');
				} 
				catch (err) {
				assert.isUndefined(err.message,'revert with valid arguments');
				}
			});
		});
		describe('Fail case', () => {
			const val=9;
			var flag=0;
			it('should revert on invalid arguments', async () => {
				try 
				{
				const instance = await Auction.new(val,[10],1000, { from: owner });				
				}
				catch (err) {
				assert.isUndefined(err.message,'revert with valid arguments');
				}
			});
		});
		
	
	});
	describe('Register Notary', () => {
		let instance;	
		beforeEach(async () => {
			instance = await Auction.new(19,[10],4, { from: owner });
		});
		describe('Fail case', () => {
			it('notary should register with valid address', async () => {
				try {
				await instance.registerNotary({ from: accounts[0] });
				} catch (err) {
				assert.isUndefined(err.message,'revert from valid address');
				}
			});
		});
		describe('success case', () => {
			it('successfully register with this addresses', async () => {
				try {
				await instance.registerNotary({ from: accounts[1] });
				await instance.registerNotary({ from: accounts[2] });
				await instance.registerNotary({ from: accounts[3] });
				await instance.registerNotary({ from: accounts[4] });
				} 
				catch (err) {
				assert.isUndefined(err.message,'revert from valid address');
				}
			});
		});
		
		describe('fail case', () => {
			it('should return notary number', async () => {
				try {
				await instance.registerNotary({ from: accounts[1] });
				await instance.registerNotary({ from: accounts[2] });
				await instance.registerNotary({ from: accounts[3] });
				await instance.registerNotary({ from: accounts[4] });
				await instance.registerNotary({ from: accounts[5] });
				} catch (err) {
				assert.isUndefined(err.message,'wrong number of notaries');
				}
			});
		});
		describe('fail case', () => {
			it('should ask the address stop registering again', async () => {
				try {
				await instance.registerNotary({ from: accounts[1] });
				await instance.registerNotary({ from: accounts[1] });
				} catch (err) {
				assert.isUndefined(err.message,'An address can register once only');
				}
			});
		});
	});
	describe('Bidder Register', () => {
		let instance;	
		beforeEach(async () => {
			instance = await Auction.new(19,[10],4, { from: owner });
			await instance.registerNotary({ from: accounts[1] });
			await instance.registerNotary({ from: accounts[2] });
			await instance.registerNotary({ from: accounts[3] });
		});
		
		describe('Fail case', () => {
			it('bidder should register with valid address', async () => {
				try {
				await instance.registerBidder(5,6,[12],[8],{ from: accounts[2],value:web3.toWei(12,'wei') });
				} catch (err) {
				assert.isUndefined(err.message,'revert from valid address');
				}
			});
		});

		describe('Success case', () => {
			it('bidder should register with valid address', async () => {
				try {
				await instance.registerBidder(5,6,[12],[8],{ from: accounts[5],value:web3.toWei(100,'wei') });
				} catch (err) {
				assert.isUndefined(err.message,'revert from valid address');
				}
			});
		});
		describe('Fail case', () => {
			it('bidder should register with valid address', async () => {
				try {
				await instance.registerBidder(5,6,[12],[8],{ from: accounts[5],value:web3.toWei(100,'wei') });
				await instance.registerBidder(5,6,[12],[8],{ from: accounts[5],value:web3.toWei(100,'wei') });
				} catch (err) {
				assert.isUndefined(err.message,'revert from valid address');
				}
			});
		});

		describe('Fail case', () => {
			it('bidder should register with valid address', async () => {
				try {
				await instance.registerBidder(5,6,[12],[8],{ from: owner,value:web3.toWei(100,'wei') });
				} catch (err) {
				assert.isUndefined(err.message,'revert from valid address');
				}
			});
		});
		describe('Success case', () => {
			it('bidder should register with valid address', async () => {
				try {
				await instance.registerBidder(5,6,[12],[8],{ from: accounts[5],value:web3.toWei(100,'wei') });
				await instance.registerBidder(5,6,[12],[8],{ from: accounts[6],value:web3.toWei(100,'wei') });
				await instance.registerBidder(5,6,[12],[8],{ from: accounts[7],value:web3.toWei(100,'wei') });
				} catch (err) {
				assert.isUndefined(err.message,'revert from valid address');
				}
			});
		});
		describe('Fail case', () => {
			it('Bidder count exceeding than valid', async () => {
				try {
				await instance.registerNotary({ from: accounts[3] });
				await instance.registerBidder(5,6,[12],[8],{ from: accounts[5],value:web3.toWei(100,'wei') });
				await instance.registerBidder(5,6,[12],[8],{ from: accounts[6],value:web3.toWei(100,'wei') });
				await instance.registerBidder(5,6,[12],[8],{ from: accounts[7],value:web3.toWei(100,'wei') });
				await instance.registerBidder(5,6,[12],[8],{ from: accounts[8],value:web3.toWei(100,'wei') });
				await instance.registerBidder(5,6,[12],[8],{ from: accounts[9],value:web3.toWei(100,'wei') });
				} catch (err) {
				assert.isUndefined(err.message,'Bidder Count is exceeding');
				}
			});
		});
		describe('Fail case', () => {
			it('bidder should register with valid address', async () => {
				try {
				await instance.registerBidder(5,6,[12,10],[8,10],{ from: accounts[5],value:web3.toWei(100,'wei') });
				} catch (err) {
				assert.isUndefined(err.message,'Bid for right number of items');
				}
			});
		});
		describe('Fail case', () => {
			it('bidder should deposit min value of w*sqrt(num_items) wei', async () => {
				try {
				await instance.registerBidder(5,6,[12],[8],{ from: accounts[5],value:web3.toWei(1,'wei')});
				} catch (err) {
				assert.isUndefined(err.message,'revert with valid deposit value');
				}
			});
		});
		describe('Success case', () => {
			it('bidder should deposit min value of w*sqrt(num_items) wei', async () => {
				try {
				await instance.registerBidder(5,6,[12],[8],{ from: accounts[5],value:web3.toWei(12,'wei')});
				} catch (err) {
				assert.isUndefined(err.message,'revert with valid deposit value');
				}
			});
		});
		
	});
	describe('Sorting Function', () => {
		let instance;	
		beforeEach(async () => {
			instance = await Auction.new(19,[10],3, { from: owner });
			await instance.registerNotary({ from: accounts[1] });
			await instance.registerNotary({ from: accounts[2] });
			await instance.registerNotary({ from: accounts[3] });
			await instance.registerBidder(3,4,[12],[8],{ from: accounts[5],value:web3.toWei(100,'wei')});
			await instance.registerBidder(4,6,[12],[8],{ from: accounts[6],value:web3.toWei(100,'wei')});
			await instance.registerBidder(5,6,[12],[8],{ from: accounts[7],value:web3.toWei(100,'wei')});
		});
		describe('Success case', () => {
			it('Checking Sorting', async () => {
				try {
				var x = await instance.notary_address.call(0);
				var x1 = await instance.notary_map.call(x);
				var y= await instance.notary_address.call(1);
				var y1 = await instance.notary_map.call(y);
				var z = await instance.notary_address.call(2);
				var z1 = await instance.notary_map.call(z);
				console.log(x,y,z);
				console.log(x1,y1,z1);
				await instance.sortfunction({ from: owner });
				var x = await instance.notary_address.call(0);
				var x1 = await instance.notary_map.call(x);
				var y= await instance.notary_address.call(1);
				var y1 = await instance.notary_map.call(y);
				var z = await instance.notary_address.call(2);
				var z1 = await instance.notary_map.call(z);
				console.log(x,y,z);
				console.log(x1,y1,z1);
				} catch (err) {
				assert.isUndefined(err.message,'Sorting isnt working');
				}
			});
		});

/*	
	describe('Winner Determination', () => {
		let instance;	
		beforeEach(async () => {
			instance = await Auction.new(19,10,1000, { from: owner });
			await instance.notaryRegister({ from: accounts[1] });
			await instance.notaryRegister({ from: accounts[2] });
			await instance.notaryRegister({ from: accounts[3] });
			await instance.notaryRegister({ from: accounts[4] });
			await instance.bidderRegister([[12,8],[12,9]],[5,6],2,{ from: accounts[5],value:web3.toWei(1,'ether')});
			await instance.bidderRegister([[7,1],[12,9],[11,11]],[4,6],3,{ from: accounts[6],value:web3.toWei(1,'ether')});
			await instance.bidderRegister([[13,10],[12,8]],[3,4],2,{ from: accounts[7],value:web3.toWei(1,'ether')});

		});
		describe('success case', () => {
			it('check sorted list', async () => {
				try {
			 	await instance.winnerDetermine({ from: accounts[0]});
				assert.equal(await instance.notaries_size.call(),4,'num of notaries should be 4');
				} catch (err) {
				assert.isUndefined(err.message,'revert from valid address');
				}
			});
		});
	*/
	});

});