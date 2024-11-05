const express = require('express');
const sequelize = require('./config/database');
const produtoRoutes = require('./routes/produto');
const categoriaRoutes = require('./routes/categoria');
const pedidoRoutes = require('./routes/pedido');
const usuarioRoutes = require('./routes/usuario');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/produtos', produtoRoutes);
app.use('/categoria', categoriaRoutes);
app.use('/pedidos', pedidoRoutes);
app.use('/usuario', usuarioRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
    console.log("Banco de dados conectado");
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}).catch((error) => console.log("Erro ao conectar ao banco de dados:", error));
