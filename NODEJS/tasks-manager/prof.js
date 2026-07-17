const fs = require('fs').promises;
const path = require('path');

// =====================================
// GESTOR DE TAREFAS - APP.JS
// =====================================

const PASTA_BASE = path.join(__dirname, 'tarefas');
const CATEGORIAS = ['pessoal', 'trabalho', 'estudos'];

// =====================================
// FUNÇÕES PRINCIPAIS
// =====================================

async function inicializarPastas() {
  try {
    // Criar pasta base
    await fs.mkdir(PASTA_BASE, { recursive: true });

    // Criar subpastas de categorias
    for (const categoria of CATEGORIAS) {
      const pastaCategoria = path.join(PASTA_BASE, categoria);
      await fs.mkdir(pastaCategoria, { recursive: true });
    }
  } catch (erro) {
    console.error('❌ Erro ao inicializar pastas:', erro.message);
  }
}

async function criarTarefa(categoria, nome, descricao) {
  try {
    // Validar entrada
    if (!categoria || !nome || !descricao) {
      console.log('❌ Uso: node app.js criar <categoria> <nome> "<descrição>"');
      console.log(`   Categorias: ${CATEGORIAS.join(', ')}`);
      return;
    }

    // Validar categoria
    if (!CATEGORIAS.includes(categoria)) {
      console.log(`❌ Categoria inválida! Use: ${CATEGORIAS.join(', ')}`);
      return;
    }

    const pastaCategoria = path.join(PASTA_BASE, categoria);
    const caminhoFicheiro = path.join(pastaCategoria, `${nome}.txt`);

    // Verificar se tarefa já existe
    try {
      await fs.access(caminhoFicheiro);
      console.log(`⚠️ Tarefa "${nome}" já existe em "${categoria}"!`);
      return;
    } catch {
      // Ficheiro não existe, podemos criar
    }

    // Criar conteúdo
    const data = new Date().toLocaleString('pt-PT');
    const conteudo = `[CRIADA: ${data}]\n━━━━━━━━━━━━━━━━━━\n${descricao}`;

    // Escrever ficheiro
    await fs.writeFile(caminhoFicheiro, conteudo);
    console.log(`✅ Tarefa criada com sucesso!`);
    console.log(`   📂 ${categoria}/${nome}.txt`);

  } catch (erro) {
    console.error('❌ Erro ao criar tarefa:', erro.message);
  }
}

async function verTarefa(categoria, nome) {
  try {
    // Validar entrada
    if (!categoria || !nome) {
      console.log('❌ Uso: node app.js ver <categoria> <nome>');
      return;
    }

    const caminhoFicheiro = path.join(PASTA_BASE, categoria, `${nome}.txt`);

    // Verificar se existe
    try {
      await fs.access(caminhoFicheiro);
    } catch {
      console.log(`❌ Tarefa "${nome}" não encontrada em "${categoria}"`);
      return;
    }

    // Ler conteúdo
    const conteudo = await fs.readFile(caminhoFicheiro, 'utf-8');

    console.log(`\n📄 TAREFA: ${nome}`);
    console.log(`   Categoria: ${categoria}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(conteudo);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  } catch (erro) {
    console.error('❌ Erro ao ler tarefa:', erro.message);
  }
}

async function listarTarefas(categoria) {
  try {
    if (categoria) {
      // Validar categoria
      if (!CATEGORIAS.includes(categoria)) {
        console.log(`❌ Categoria inválida! Use: ${CATEGORIAS.join(', ')}`);
        return;
      }

      // Listar categoria específica
      const pastaCategoria = path.join(PASTA_BASE, categoria);
      const ficheiros = await fs.readdir(pastaCategoria);

      if (ficheiros.length === 0) {
        console.log(`\n📂 ${categoria}/ (vazio)\n`);
        return;
      }

      console.log(`\n📂 ${categoria}/`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      ficheiros.forEach((f, idx) => {
        const nome = f.replace('.txt', '');
        console.log(`  ${idx + 1}. ${nome}`);
      });
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    } else {
      // Listar tudo
      console.log('\n🎯 TODAS AS TAREFAS\n');

      for (const cat of CATEGORIAS) {
        const pastaCategoria = path.join(PASTA_BASE, cat);
        const ficheiros = await fs.readdir(pastaCategoria);

        console.log(`📂 ${cat.toUpperCase()}`);
        if (ficheiros.length === 0) {
          console.log('   (vazio)');
        } else {
          ficheiros.forEach((f, idx) => {
            const nome = f.replace('.txt', '');
            console.log(`  ${idx + 1}. ${nome}`);
          });
        }
        console.log('');
      }
    }

  } catch (erro) {
    console.error('❌ Erro ao listar tarefas:', erro.message);
  }
}

async function completarTarefa(categoria, nome) {
  try {
    // Validar entrada
    if (!categoria || !nome) {
      console.log('❌ Uso: node app.js completar <categoria> <nome>');
      return;
    }

    const pastaCategoria = path.join(PASTA_BASE, categoria);
    const caminhoAntigo = path.join(pastaCategoria, `${nome}.txt`);
    const caminhoNovo = path.join(pastaCategoria, `[✓] ${nome}.txt`);

    // Verificar se existe
    try {
      await fs.access(caminhoAntigo);
    } catch {
      console.log(`❌ Tarefa "${nome}" não encontrada em "${categoria}"`);
      return;
    }

    // Verificar se já está concluída
    try {
      await fs.access(caminhoNovo);
      console.log(`⚠️ Tarefa "${nome}" já está marcada como concluída!`);
      return;
    } catch {
      // Não está concluída, podemos marcar
    }

    // Renomear ficheiro
    await fs.rename(caminhoAntigo, caminhoNovo);
    console.log(`✅ Tarefa marcada como concluída!`);
    console.log(`   ${nome} → [✓] ${nome}`);

  } catch (erro) {
    console.error('❌ Erro ao completar tarefa:', erro.message);
  }
}

async function deletarTarefa(categoria, nome) {
  try {
    // Validar entrada
    if (!categoria || !nome) {
      console.log('❌ Uso: node app.js deletar <categoria> <nome>');
      return;
    }

    const caminhoFicheiro = path.join(PASTA_BASE, categoria, `${nome}.txt`);

    // Verificar se existe
    try {
      await fs.access(caminhoFicheiro);
    } catch {
      console.log(`❌ Tarefa "${nome}" não encontrada em "${categoria}"`);
      return;
    }

    // Ler conteúdo para mostrar antes de deletar
    const conteudo = await fs.readFile(caminhoFicheiro, 'utf-8');

    // IMPORTANTE: Pedir confirmação
    console.log(`\n⚠️ ATENÇÃO: Vai eliminar a tarefa "${nome}"`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(conteudo);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n❌ MÉTODO SIMPLIFICADO:');
    console.log('Para confirmar eliminação, execute:');
    console.log(`node app.js deletar-confirmar ${categoria} ${nome}`);
    console.log('');

  } catch (erro) {
    console.error('❌ Erro ao deletar tarefa:', erro.message);
  }
}

async function deletarConfirmar(categoria, nome) {
  try {
    const caminhoFicheiro = path.join(PASTA_BASE, categoria, `${nome}.txt`);

    // Deletar ficheiro
    await fs.unlink(caminhoFicheiro);
    console.log(`✅ Tarefa "${nome}" eliminada com sucesso!`);

  } catch (erro) {
    console.error('❌ Erro ao eliminar tarefa:', erro.message);
  }
}

function mostrarAjuda() {
  console.log(`
╔════════════════════════════════════════════════════════════════╗
║        GESTOR DE TAREFAS - Ajuda                               ║
╚════════════════════════════════════════════════════════════════╝

📝 COMANDOS DISPONÍVEIS:

1. CRIAR TAREFA
   node app.js criar <categoria> <nome> "<descrição>"
   Exemplo: node app.js criar pessoal compras "Comprar leite"

2. LISTAR TAREFAS
   node app.js listar [categoria]
   Exemplos: 
     node app.js listar          (todas as tarefas)
     node app.js listar pessoal  (apenas pessoal)

3. VER TAREFA
   node app.js ver <categoria> <nome>
   Exemplo: node app.js ver pessoal compras

4. COMPLETAR TAREFA
   node app.js completar <categoria> <nome>
   Exemplo: node app.js completar pessoal compras

5. DELETAR TAREFA
   node app.js deletar <categoria> <nome>
   Exemplo: node app.js deletar pessoal compras

6. AJUDA
   node app.js ajuda

📂 CATEGORIAS DISPONÍVEIS: pessoal, trabalho, estudos

💡 DICA: Use aspas para descrições com espaços!
   node app.js criar trabalho "dev" "Corrigir bugs do sistema"

  `);
}

// =====================================
// PROGRAMA PRINCIPAL
// =====================================

async function main() {
  // Obter argumentos (remover os 2 primeiros: node + ficheiro)
  const args = process.argv.slice(2);

  // Se não houver argumentos, mostrar ajuda
  if (args.length === 0) {
    mostrarAjuda();
    return;
  }

  // Inicializar pastas
  await inicializarPastas();

  // Obter comando
  const comando = args[0];

  // Executar comando apropriado
  switch (comando) {
    case 'criar':
      await criarTarefa(args[1], args[2], args[3]);
      break;

    case 'listar':
      await listarTarefas(args[1]);
      break;

    case 'ver':
      await verTarefa(args[1], args[2]);
      break;

    case 'completar':
      await completarTarefa(args[1], args[2]);
      break;

    case 'deletar':
      await deletarTarefa(args[1], args[2]);
      break;

    case 'deletar-confirmar':
      await deletarConfirmar(args[1], args[2]);
      break;

    case 'ajuda':
    case 'help':
    case '--help':
    case '-h':
      mostrarAjuda();
      break;

    default:
      console.log(`❌ Comando desconhecido: "${comando}"`);
      console.log('Execute "node app.js ajuda" para ver os comandos disponíveis');
  }
}

// Executar programa
main().catch(console.error);