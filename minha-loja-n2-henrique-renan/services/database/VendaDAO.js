import * as SQLite from 'expo-sqlite';

export function getDbConnection() {
    const db = SQLite.openDatabase('GCS.db');
    return db;
}

export async function createTable() {
    createVenda();
};

export async function createVenda() {
    return new Promise((resolve, reject) => {
        const query = `CREATE TABLE IF NOT EXISTS venda
    (
        id integer not null primary key AUTOINCREMENT,
        produto text not null,
        data text not null,
        precoTotal text not null
    )`;

        let db = getDbConnection();

        db.transaction(tx => {
            tx.executeSql(query);
            resolve(true);
        },
            error => {
                console.log(error);
                resolve(false);
            }
        );
    });
};

export function getVendas(filtro) {

    return new Promise((resolve, reject) => {

        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            query = `SELECT * FROM venda`;
            tx.executeSql(query, [],
                (tx, product) => {
                    var retorno = []
                    for (let n = 0; n < product.rows.length; n++) {
                        let obj = {
                            id: product.rows.item(n).id,
                            produto: product.rows.item(n).produto,
                            data: product.rows.item(n).data,
                            precoTotal: product.rows.item(n).precoTotal,
                        }
                        retorno.push(obj);
                    }
                    resolve(retorno);
                })
        },
            error => {
                console.log(error);
                resolve([]);
            }
        )
    }
    );
}

export function addVenda(venda) {

    return new Promise((resolve, reject) => {
        let query = 'insert into venda (produto, data, precoTotal) values (?,?,?)';
        let dbCx = getDbConnection();
        
        dbCx.transaction(tx => {
            tx.executeSql(query, [venda.produto, venda.data, venda.valorFinal],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}