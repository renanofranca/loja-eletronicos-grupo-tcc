import * as SQLite from 'expo-sqlite';

export function getDbConnection() {
    const db = SQLite.openDatabase('GCS.db');
    return db;
}

export async function createTable() {
    createProduto();
};

export async function createProduto() {
    return new Promise((resolve, reject) => {
        const query = `CREATE TABLE IF NOT EXISTS products
    (
        id integer primary key AUTOINCREMENT,
        nome text not null,
        preco integer not null,
        categoria text not null          
    )`;

        let db = getDbConnection();

        db.transaction(tx => {
            tx.executeSql(query);
            tx.executeSql('COMMIT');
            resolve(true);
        },
            error => {
                console.log(error);
                resolve(false);
            }
        );
    });
};

export function getProduct(filtro) {

    return new Promise((resolve, reject) => {

        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            if (filtro === 'todos') {
                query = 'SELECT * FROM products';
            } else {
                query = `SELECT * FROM products WHERE categoria = '${filtro}'`;
            } tx.executeSql(query, [],
                (tx, product) => {

                    var retorno = []

                    for (let n = 0; n < product.rows.length; n++) {
                        let obj = {
                            id: product.rows.item(n).id,
                            nome: product.rows.item(n).nome,
                            preco: product.rows.item(n).preco,
                            categoria: product.rows.item(n).categoria
                        }
                        retorno.push(obj);
                    }
                    tx.executeSql('COMMIT');
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

export function addProduct(produto) {

    return new Promise((resolve, reject) => {
        let query = 'insert into products (nome, preco, categoria) values (?,?,?)';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [produto.nome, produto.preco, produto.categoria],
                (tx, resultado) => {
                    tx.executeSql('COMMIT');
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

export function editProduct(produto) {

    return new Promise((resolve, reject) => {
        let query = 'UPDATE products SET nome=?, preco=?, categoria=? WHERE id=?';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [produto.nome, produto.preco, produto.categoria, produto.id],
                (tx, resultado) => {
                    tx.executeSql('COMMIT');
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

export function deleteProduct(produto) {

    return new Promise((resolve, reject) => {
        let query = 'delete from products WHERE id=?';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [produto.id],
                (tx, resultado) => {
                    tx.executeSql('COMMIT');
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

