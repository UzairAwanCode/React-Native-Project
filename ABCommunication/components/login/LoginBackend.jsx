import {db} from '../reuseable/BackendDBConn';

export const getLoginData = (setLogin) => {
  db.transaction(txn => {
    txn.executeSql('SELECT * FROM login_tbl', [], (tx, res) => {
      let temp = [];
      for (let i = 0; i < res.rows.length; i++) {
        console.log(res.rows.item(i));
        temp.push(res.rows.item(i));
      }
      setLogin(temp);
    });
  });
};
