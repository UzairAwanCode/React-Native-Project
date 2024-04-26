import { db } from "../reuseable/BackendDBConn"

export const getInstLength = (setInstLenght, setSalesLength)=>{
    db.transaction(tnx =>{
        tnx.executeSql('SELECT COUNT(*) as count FROM installments_tbl',[],(tx, res)=>{
            const countInstLength = res.rows.item(0).count;
            setInstLenght(countInstLength)
        })
    })
}

export const getSalesLength = (setSalesLength)=>{
    db.transaction(tnx =>{
        tnx.executeSql('SELECT COUNT(*) as count FROM sales_tbl',[],(tx, res)=>{
            const countSalesLength = res.rows.item(0).count;
            setSalesLength(countSalesLength)
        })
    })
}