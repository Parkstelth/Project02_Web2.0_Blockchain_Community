const { getLastestTransactions } = require('./utils/main');
const { Transactions, sequelize } = require('./models');

// Transactions 테이블 순서 초기화 : ALTER TABLE Transactions AUTO_INCREMENT=1;
// pm2 작동 명령어 : npx pm2 start demon.js --cron "* * * * *";

const storeData = async (data) => await Transactions.create(data);

const startTask = async () => {
	let arr = [];
	getLastestTransactions().then((result) => {
		for (let data of result) {
			arr.push(storeData(data));
		}
		if (arr.length > 0) {
			Promise.all(arr)
				.then(async () => {
					console.log('Done.');
					await sequelize.close();
				})
				.then(() => {
					arr = [];
				})
				.catch(async (err) => {
					console.log(err);
					await sequelize.close();
				});
		} else {
			console.log('No transactions');
		}
	});
};

startTask();