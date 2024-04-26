import { Alert } from 'react-native';
import {db} from '../reuseable/BackendDBConn';

export const getSalesData = (setSalesList,navigation) => {
  db.transaction(txn => {
    txn.executeSql('SELECT * FROM sales_tbl', [], (tx, res) => {
      let temp = [];
      for (let i = 0; i < res.rows.length; i++) {
        console.log(res.rows.item(i));
        temp.push(res.rows.item(i));
      }
      if(temp.length===0){
        navigation.goBack()
      }else{
        setSalesList(temp);
      }
    });
  });
};

export const editSales = (salesId,productName,price,sellingDate,navigation)=>{
  db.transaction(txt=>{
    txt.executeSql(
      'UPDATE sales_tbl set sales_productname=?, sales_sellingprice=?, sales_sellingdate=? where sales_id=?',
      [productName,price,sellingDate,salesId],
      navigation.goBack()
    )
  })
}

export const deleteSalesData = (id)=>{
  db.transaction(txt=>{
    txt.executeSql(
      'DELETE FROM sales_tbl where sales_id=?',
      [id],
      (tx, res)=>{}
    )
  })
}
