import * as SQLite from 'expo-sqlite';
let banco;
export async function conectarBanco() {
  if (!banco) {
    banco = await SQLite.openDatabaseAsync('tarefas.db');
    await banco.execAsync(`PRAGMA journal_mode = WAL`);
  }
  return banco;
}

export async function criarTabela() {
  const db = await conectarBanco();
  await db.execAsync(`
 CREATE TABLE IF NOT EXISTS tarefas (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 titulo TEXT NOT NULL
 );
 `);
}

export async function adicionarTarefa(titulo) {
  const db = await conectarBanco();
  const resultado = await db.runAsync(
    'INSERT INTO tarefas (titulo) VALUES (?);',
    titulo
  );
  return resultado.lastInsertRowId;
}

export async function listarTarefas() {
  const db = await conectarBanco();
  const tarefas = await db.getAllAsync('SELECT * FROM tarefas;');
  return tarefas;
}

export async function atualizarTarefa(id, novoTitulo) {
  const db = await conectarBanco();
  await db.runAsync(
    'UPDATE tarefas SET titulo = ? WHERE id = ?;',
    novoTitulo,
    id
  );
}

export async function deletarTarefa(id) {
  const db = await conectarBanco();
  await db.runAsync(
    'DELETE FROM tarefas WHERE id = ?;',
    id
  );
}

export async function criarTabelaReceitas() {
  const db = await conectarBanco();
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS receitas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      ingredients TEXT NOT NULL,
      steps TEXT NOT NULL
    );
  `);
}

export async function adicionarReceita(name, ingredients, steps) {
  const db = await conectarBanco();
  const resultado = await db.runAsync(
    'INSERT INTO receitas (name, ingredients, steps) VALUES (?, ?, ?);',
    name, ingredients, steps
  );
  return resultado.lastInsertRowId;
}

export async function listarReceitas(nomeBusca = '') {
  const db = await conectarBanco();
  if (nomeBusca.trim() !== '') {
    return await db.getAllAsync(
      'SELECT * FROM receitas WHERE name LIKE ?;',
      `%${nomeBusca}%`
    );
  }
  return await db.getAllAsync('SELECT * FROM receitas;');
}

export async function atualizarReceita(id, name, ingredients, steps) {
  const db = await conectarBanco();
  await db.runAsync(
    'UPDATE receitas SET name = ?, ingredients = ?, steps = ? WHERE id = ?;',
    name, ingredients, steps, id
  );
}

export async function deletarReceita(id) {
  const db = await conectarBanco();
  await db.runAsync(
    'DELETE FROM receitas WHERE id = ?;',
    id
  );
}

export async function buscarReceitaPorId(id) {
    const db = await conectarBanco();
    const resultado = await db.getFirstAsync('SELECT * FROM receitas WHERE id = ?;', id);
    return resultado;
}
