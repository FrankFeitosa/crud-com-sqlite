# crud-com-sqlite
Projeto BackEnd com Banco de Dados
# package.json -> script -> dev
"dev": "node --watch src/server.js"
npm run dev
# executando o prisma
npx prisma init
# executando o migrate 
npx prisma migrate dev --name init nome do bd - 'database'
# Abrindo a porta do prisma studio para ver as tabelas
npx prisma studio
