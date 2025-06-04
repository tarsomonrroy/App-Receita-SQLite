import * as SQLite from 'expo-sqlite';

let banco;

export async function conectarBanco() {
  if (!banco) {
    banco = await SQLite.openDatabaseAsync('receitas.db');
    await banco.execAsync(`PRAGMA journal_mode = WAL`);
  }
  return banco;
}

export async function criarTabelaReceitas() {
  const db = await conectarBanco();
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS receitas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      ingredients TEXT,
      steps TEXT
    );
  `);
}

export async function adicionarReceita(name, description, ingredients, steps) {
  const db = await conectarBanco();
  const resultado = await db.runAsync(
    'INSERT INTO receitas (name, description, ingredients, steps) VALUES (?, ?, ?, ?);',
    name,
    description,
    ingredients,
    steps
  );
  return resultado.lastInsertRowId;
}

export async function listarReceitas() {
  const db = await conectarBanco();
  const receitas = await db.getAllAsync('SELECT * FROM receitas ORDER BY id DESC;');
  return receitas;
}

export async function buscarReceitaPorId(id) {
  const db = await conectarBanco();
  const receita = await db.getFirstAsync('SELECT * FROM receitas WHERE id = ?;', id);
  return receita;
}

export async function atualizarReceita(id, name, description, ingredients, steps) {
  const db = await conectarBanco();
  await db.runAsync(
    'UPDATE receitas SET name = ?, description = ?, ingredients = ?, steps = ? WHERE id = ?;',
    name,
    description,
    ingredients,
    steps,
    id
  );
}

export async function deletarReceita(id) {
  const db = await conectarBanco();
  await db.runAsync('DELETE FROM receitas WHERE id = ?;', id);
}
