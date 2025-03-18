import React from "react";
import { useContext } from "react";
import { ApiContext } from "../context/apiContext";



const Table = () => {
    const { pib, pibPerCapita, anos } = useContext(ApiContext);
    return (
        <div className=" p-4">
            <h2 className="m-4">Tela 2: Tabela de PIB por Ano</h2>
            <table className="min-w-full border border-gray-300 bg-gray shadow-md rounded-lg">
                <thead className="bg-blue-100 text-black text-center">
                    <tr>
                        <th className="px-6 py-3 border-b text-center">Ano</th>
                        <th className="px-6 py-3 border-b text-center">PIB</th>
                        <th className="px-6 py-3 border-b text-center">PIB Per Capita</th>
                    </tr>
                </thead>
                <tbody>
                    {anos.map((ano, index) => (
                        <tr key={index} className= {`text-center font-semibold border ${index % 2 === 0 ? "bg-sky-500/50" : ""}`}>
                            <td className="px-6 py-4 border">{ano}</td>
                            <td className="px-6 py-4 border">{formatToDollarTrillion(pib[index])}</td>
                            <td
                                className= "px-6 py-4 border" 
                            >
                                {formatToDollar(pibPerCapita[index])}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const formatToDollar = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  const formatToDollarTrillion = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      compactDisplay: 'long'
    }).format(value * 1e12);
  };

export default Table;
