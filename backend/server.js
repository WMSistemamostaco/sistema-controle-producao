const express = require("express");
const cors = require("cors");

const sequelize = require("./config/database");
const productionRoutes =
    require("./routes/productionRoutes");

const app =
    express();

const PORT =
    process.env.PORT || 3000;


/* ==========================================
   MIDDLEWARES
========================================== */

app.use(
    cors()
);

app.use(
    express.json()
);

app.use(
    express.urlencoded({
        extended: true
    })
);


/* ==========================================
   ROTA DE TESTE
========================================== */

app.get(
    "/",
    (req, res) => {

        res.json({
            message:
                "API Controle de Produção",
            status:
                "online"
        });

    }
);


/* ==========================================
   ROTAS
========================================== */

app.use(
    "/api/production",
    productionRoutes
);


/* ==========================================
   INICIALIZAÇÃO
========================================== */

async function startServer() {

    try {

        await sequelize.authenticate();

        console.log(
            "✅ Banco de dados conectado."
        );


        await sequelize.sync();

        console.log(
            "✅ Tabelas sincronizadas."
        );


        app.listen(
            PORT,
            () => {

                console.log(
                    `🚀 API rodando em http://localhost:${PORT}`
                );

            }
        );

    } catch (error) {

        console.error(
            "❌ Erro ao iniciar servidor:",
            error
        );

        process.exit(1);

    }

}


startServer();
