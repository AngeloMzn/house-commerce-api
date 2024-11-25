  
- Para rodar o projeto basta configurar o arquivo .env com a variavel DEV_MODE true caso *NÃO ESTEJA EM PRODUÇÃO* e colocando as informações do link do provedor do banco de dados na variavel DATABASE_URL
- O proximo passo é rodar o comando npm i  
- Por fim rodar o comando npx prisma db push
- é necessário configurar o driver de acordo com seu banco de dados no arquivo .env seguindo o modelo do .env.example   
- Caso seu banco de dados não seja mysql acessar a documentação em: https://www.prisma.io/ para verificar o driver especifico  
  
