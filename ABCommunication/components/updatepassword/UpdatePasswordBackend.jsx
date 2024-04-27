import { db } from "../reuseable/BackendDBConn"

export const SetNewPassword = (loginId, NewPassword, navigation) => {
  db.transaction(txt => {
    txt.executeSql(
      'UPDATE login_tbl SET login_password=? WHERE login_id=?',
      [NewPassword, loginId],
      (_, { rowsAffected }) => {
        if (rowsAffected > 0) {
          console.log('Password updated successfully');
          navigation.goBack(); // Navigate back upon successful update
        } else {
          console.log('No rows were updated');
          // Handle case where no rows were updated, if needed
        }
      },
      (_, error) => {
        console.error('Error updating password:', error);
        // Handle SQL execution error, if any
      }
    )
  });
};
