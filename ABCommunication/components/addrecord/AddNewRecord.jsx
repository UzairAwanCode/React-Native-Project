import { Alert } from 'react-native';
import { db } from '../reuseable/BackendDBConn';
import { useNavigation } from '@react-navigation/native';


function date(){
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
// Save Installment Data
export const saveInstallmentData = (
  productName,
  newInstDate,
  userName,
  downPayment,
  nextIsntDate,
  isntEndDate,
  totalPayment,
  advancePayment,
  pendingPayments,
  monthlyInsts,
  navigation
) => {
  const currentDate = date();
  db.transaction(txt => {
    txt.executeSql(
      'INSERT INTO installments_tbl(inst_newinstdate, inst_username, inst_downpayment, inst_nextisntdate, inst_isntenddate, product_name, total_payment, advance_payment, pending_payment, monthly_instalments) VALUES (?,?,?,?,?,?,?,?,?,?)',
      [currentDate, userName, downPayment, nextIsntDate, isntEndDate, productName, totalPayment, advancePayment, pendingPayments, monthlyInsts],
      (tex, res) => {
        if (res.rowsAffected == 1) {
          Alert.alert(
            'Success',
            'Installment Data Saved Successfully',
            [
              {
                text: 'Go To Main Menu',
                onPress: () => navigation.navigate('MainMenu'), // Assuming 'MainMenu' is the screen name
              },

              {
                text: 'Add New Record',
                onPress: () => navigation.navigate('AddRecord', {check:false}),
              }
            ],
          );
        } else {
          console.log(res);
        }
      },
      error => {
        console.log(error);
      },
    );
  });
};

// Save Sales Data
export const saveSalesData = (
  productName,
  sellingPrice,
  sellingDate,
  navigation
) => {
  const currentDate = date();
  db.transaction(txt => {
    txt.executeSql(
      'INSERT INTO sales_tbl(sales_newinstdate, sales_productname, sales_sellingprice, sales_sellingdate) VALUES (?,?,?,?)',
      [currentDate, productName, sellingPrice, sellingDate],
      (tex, res) => {
        if (res.rowsAffected == 1) {
          Alert.alert(
            'Success',
            'Sales Data Saved Successfully',
            [
              {
                text: 'Go To Main Menu',
                onPress: () => navigation.navigate('MainMenu'), // Assuming 'MainMenu' is the screen name
              },

              {
                text: 'Add New Record',
                onPress: () => navigation.navigate('AddRecord', {check:true}),
              }
            ],
          );
        } else {
          console.log(res);
        }
      },
      error => {
        console.log(error);
      },
    );
  });
};
