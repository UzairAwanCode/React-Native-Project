import {Alert} from 'react-native';
import {db} from '../reuseable/BackendDBConn';

export const getData = (setInstList, navigation) => {
  db.transaction(txn => {
    txn.executeSql('SELECT * FROM installments_tbl', [], (tx, res) => {
      let temp = [];
      for (let i = 0; i < res.rows.length; i++) {
        temp.push(res.rows.item(i));
      }
      if (temp.length === 0) {
        navigation.goBack();
      }
      setInstList(temp);
    });
  });
};

export const getSingleData = (id, setInstSingleData) => {
  db.transaction(txn => {
    txn.executeSql(
      'SELECT * FROM installments_tbl where inst_id=?',
      [id],
      (tx, res) => {
        const item = res.rows.item(0);
        setInstSingleData(item);
      },
    );
  });
};

export const EditInstData = (
  id,
  productName,
  userName,
  downPayment,
  nextIsntDate,
  isntEndDate,
  totalPayment,
  advancePayment,
  pendingPayments,
  monthlyInsts,
  navigation,
) => {
  console.log(productName);
  db.transaction(txt => {
    txt.executeSql(
      'UPDATE installments_tbl set inst_username=?, inst_downpayment=?, inst_nextisntdate=?, inst_isntenddate=?, product_name=?, total_payment=?, advance_payment=?, pending_payment=?, monthly_instalments=? where inst_id=?',
      [
        userName,
        downPayment,
        nextIsntDate,
        isntEndDate,
        productName,
        totalPayment,
        advancePayment,
        pendingPayments,
        monthlyInsts,
        id,
      ],
      (tx, res) => {
        navigation.goBack();
      },
    );
  });
};

export const deleteData = (id, navigation) => {
  db.transaction(txn => {
    txn.executeSql(
      'DELETE FROM installments_tbl where inst_id=?',
      [id],
      (tx, res) => {
        navigation != null
          ? navigation.navigate('Installment', {title: 'Installments'})
          : '';
      },
    );
  });
};
