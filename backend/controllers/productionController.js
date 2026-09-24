const Production = require("../models/Production");


async function getAllProductions(req, res) {
    try {

        const productions =
            await Production.findAll({
                order: [
                    ["createdAt", "DESC"]
                ]
            });

        return res.status(200).json(
            productions
        );

    } catch (error) {

        console.error(
            "Erro ao buscar produções:",
            error
        );

        return res.status(500).json({
            message:
                "Erro interno ao buscar produções."
        });

    }
}


async function getProductionById(req, res) {

    try {

        const { id } =
            req.params;


        const production =
            await Production.findByPk(id);


        if (!production) {

            return res.status(404).json({
                message:
                    "Ordem de produção não encontrada."
            });

        }


        return res.status(200).json(
            production
        );

    } catch (error) {

        console.error(
            "Erro ao buscar ordem:",
            error
        );

        return res.status(500).json({
            message:
                "Erro interno ao buscar ordem."
        });

    }
}


async function createProduction(req, res) {

    try {

        const {
            ordem,
            produto,
            quantidade,
            status
        } = req.body;


        if (
            !ordem ||
            !produto ||
            quantidade === undefined
        ) {

            return res.status(400).json({
                message:
                    "ordem, produto e quantidade são obrigatórios."
            });

        }


        const existing =
            await Production.findOne({
                where: {
                    ordem
                }
            });


        if (existing) {

            return res.status(409).json({
                message:
                    "Já existe uma ordem com esse número."
            });

        }


        const production =
            await Production.create({

                ordem,

                produto,

                quantidade:

                    Number(
                        quantidade
                    ),

                status:
                    status ||
                    "Aguardando"

            });


        return res.status(201).json(
            production
        );

    } catch (error) {

        console.error(
            "Erro ao criar produção:",
            error
        );

        return res.status(500).json({
            message:
                "Erro interno ao criar ordem."
        });

    }
}


async function updateProduction(req, res) {

    try {

        const { id } =
            req.params;


        const production =
            await Production.findByPk(id);


        if (!production) {

            return res.status(404).json({
                message:
                    "Ordem de produção não encontrada."
            });

        }


        const {
            ordem,
            produto,
            quantidade,
            status
        } = req.body;


        await production.update({

            ordem:
                ordem ??
                production.ordem,

            produto:
                produto ??
                production.produto,

            quantidade:
                quantidade !== undefined
                    ? Number(quantidade)
                    : production.quantidade,

            status:
                status ??
                production.status

        });


        return res.status(200).json(
            production
        );

    } catch (error) {

        console.error(
            "Erro ao atualizar produção:",
            error
        );

        return res.status(500).json({
            message:
                "Erro interno ao atualizar ordem."
        });

    }
}


async function deleteProduction(req, res) {

    try {

        const { id } =
            req.params;


        const production =
            await Production.findByPk(id);


        if (!production) {

            return res.status(404).json({
                message:
                    "Ordem de produção não encontrada."
            });

        }


        await production.destroy();


        return res.status(200).json({
            message:
                "Ordem de produção excluída com sucesso."
        });

    } catch (error) {

        console.error(
            "Erro ao excluir produção:",
            error
        );

        return res.status(500).json({
            message:
                "Erro interno ao excluir ordem."
        });

    }
}


module.exports = {
    getAllProductions,
    getProductionById,
    createProduction,
    updateProduction,
    deleteProduction
};
