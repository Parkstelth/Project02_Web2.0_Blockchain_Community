const { users, sequelize } = require('./models');
const{ Op } = require("sequelize");
require('dotenv').config();
const env = process.env;
var Web3 = require('web3');
const web3 = new Web3(env.WEB3_ADDRESS)
var erc20abi = require('./routes/erc20abi')

// Transactions 테이블 순서 초기화 : ALTER TABLE Transactions AUTO_INCREMENT=1;
// pm2 작동 명령어 : npx pm2 start demon.js --cron "* * * * *";
let arr =[]
const updateData = async() => await users.findAll({
    where: {
        [Op.not]:[
            {
                tokenbalance:0
            }
        ]
    }
}).then(async(result)=>{
    await web3.eth.accounts.wallet.add(env.SERVER_PRIVATEKEY);
let contract = await new web3.eth.Contract(erc20abi, env.ERC20_CONTRACT_ADDRESS, {
  from: env.SERVER_ADDRESS,
});

    	for(let i=0 ; i<result.length ; i++){

            await contract.methods
              .allowance(env.SERVER_ADDRESS, result[i].dataValues.address)
              .call()
              .then((e) => {
                  return e;
              }).then(async (balance)=>{
                const changeBalance = parseInt(balance)+parseInt(result[i].dataValues.tokenbalance)
                await contract.methods.approve(result[i].dataValues.address, String(changeBalance))
                .send({ from: env.SERVER_ADDRESS, gas: 2000000, gasPrice: "100000000000"})
                .on("receive", (receive) => {
                    return receive;
                })
                .then((tx) => {
                    return tx.transactionHash;
                })
                .then((tx) => {
                    contract.methods
                        .allowance(env.SERVER_ADDRESS,result[i].dataValues.address)
                        .call()
                        .then((e) => {
                            return e;
                        })
                        .then(() => {
                            console.log('transfer success!')
                        });
                });
              })

              await users.update({
                tokenbalance : 0
              }, {
                where: {
                  userName: result[i].dataValues.userName,
                }
              }) 
        }
   
})




// const startTask = async () => {
// 	let arr = [];
// 	getLastestTransactions().then((result) => {
// 		for (let data of result) {
// 			arr.push(storeData(data));
// 		}
// 		if (arr.length > 0) {
// 			Promise.all(arr)
// 				.then(async () => {
// 					console.log('Done.');
// 					await sequelize.close();
// 				})
// 				.then(() => {
// 					arr = [];
// 				})
// 				.catch(async (err) => {
// 					console.log(err);
// 					await sequelize.close();
// 				});
// 		} else {
// 			console.log('No transactions');
// 		}
// 	});
// };

updateData();