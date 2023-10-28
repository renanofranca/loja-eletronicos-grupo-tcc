import * as SQLite from 'expo-sqlite';

export function getDbConnection() {
    const db = SQLite.openDatabase('GCS.db');
    return db;
}

export async function createTable() {
    createCategoria();
};

export async function createCategoria() {
    return new Promise((resolve, reject) => {
        const query = `CREATE TABLE IF NOT EXISTS categoria
    (
        id integer not null primary key AUTOINCREMENT,
        nome text not null
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


export function getCategoria() {

    return new Promise((resolve, reject) => {

        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            query = 'SELECT * FROM categoria';
            tx.executeSql(query, [],
                (tx, product) => {

                    var retorno = []

                    for (let n = 0; n < product.rows.length; n++) {
                        let obj = {
                            id: product.rows.item(n).id,
                            nome: product.rows.item(n).nome,
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

export const deleteCategoria = (categoriaId) => {
    return new Promise((resolve, reject) => {
      const dbCx = getDbConnection();
      dbCx.transaction(
        (tx) => {
            console.log(categoriaId)
          const query = 'DELETE FROM categoria WHERE id = ?';
          tx.executeSql(
            query,
            [categoriaId],
            (tx, results) => {
              if (results.rowsAffected > 0) {
                resolve('Categoria deletada com sucesso');
              } else {
                resolve('Categoria não encontrada');
              }
            },
            (error) => {
              console.error('Erro ao deletar categoria:', error);
              reject('Erro ao deletar categoria');
            }
          );
        },
        (error) => {
          console.error('Erro na transação de deletar categoria:', error);
          reject('Erro na transação de deletar categoria');
        }
      );
    });
  };

export const updateCategoria = (categoriaId, novoNome) => {
    return new Promise((resolve, reject) => {
      const dbCx = getDbConnection();
      dbCx.transaction(
        (tx) => {
          const query = 'UPDATE categoria SET nome = ? WHERE id = ?';
          tx.executeSql(
            query,
            [novoNome, categoriaId],
            (tx, results) => {
              if (results.rowsAffected > 0) {
                resolve('Categoria atualizada com sucesso');
              } else {
                resolve('Categoria não encontrada');
              }
            },
            (error) => {
              console.error('Erro ao atualizar categoria:', error);
              reject('Erro ao atualizar categoria');
            }
          );
        },
        (error) => {
          console.error('Erro na transação de atualizar categoria:', error);
          reject('Erro na transação de atualizar categoria');
        }
      );
    }); 
};

export function addCategoria(categoria) {

    return new Promise((resolve, reject) => {
        let query = 'insert into categoria (nome) values (?)';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [categoria.nome],
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