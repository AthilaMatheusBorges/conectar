import { createContext, useState, useEffect } from "react";

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
    const [pib, setPib] = useState([]);
    const [pibPerCapita, setPibPerCapita] = useState([]);

    const cotacoesDolar = {
        2010: 1.6988,
        2011: 1.8609,
        2012: 2.0840,
        2013: 2.3354,
        2014: 2.6717,
        2015: 3.8703,
        2016: 3.3830,
        2017: 3.2834,
        2018: 3.7924,
        2019: 4.1831,
        2020: 5.4854,
        2021: 	5.4199,
        2022: 	5.3013,
    };
    const anos = [
        2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021,
        2022,
    ];

    // Função para buscar posts da API
    async function fetchPib(anos) {
        try {
            // Fazendo as requisições simultaneamente
            const response = await fetch(
                "https://servicodados.ibge.gov.br/api/v3/agregados/6784/periodos/2010-2024/variaveis/9808|9812?localidades=N1[all]"
            );

            // Convertendo as respostas para JSON
            const dados = await response.json();

            // Extraindo as séries de PIB e população
            const seriePIB = dados[0]?.resultados[0]?.series[0]?.serie || {};
            const seriePIBPerCapita =
                dados[1]?.resultados[0]?.series[0]?.serie || {};

            // Montando o resultado para todos os anos
            const pib = [];
            const pibPerCapita = [];
            for (let ano of anos) {
                const cotacao = cotacoesDolar[ano];
                pib.push((((seriePIB[ano] * 1000000) / cotacao) / 1e12).toFixed(2));
                pibPerCapita.push((seriePIBPerCapita[ano] / cotacao).toFixed(2));
            }

            setPib(pib);
            setPibPerCapita(pibPerCapita);
        } catch (error) {
            console.error("Erro ao obter os dados:", error);
        }
    }

    // Buscar os posts ao montar o componente
    useEffect(() => {
        fetchPib(anos);
    }, []);

    return (
        <ApiContext.Provider value={{ pib, anos, pibPerCapita }}>
            {children}
        </ApiContext.Provider>
    );
};
