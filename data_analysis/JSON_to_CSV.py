# -*- coding: utf-8 -*-
"""
Created on Fri Dec 11 12:11:26 2020

@author: Thiago Russo
@coauthor: Thiago Luis Pinho
"""
import pandas as pd
from json import loads

# TRATAMENTO DE DADOS PARA O DATASET DE TREINAMENTO
# Faz a carga da lista de JSONS


def normaliza_dados_partida(dados_partida: dict) -> pd.DataFrame:
    """
        Função recebe um dicionário não normalizado contendo os dados de uma
        partida de uma única partida e retorna esses dados normalizados.
            Args:
                dados_partida: Dados de um partida como expelidos pelo
                    banco de dados da aplicação.
            Returns:
                Dados de uma única partida normalizados.
    """
    df_jogos = pd.DataFrame(dados_partida)

    # Descarta coluna desnecessária
    df_jogos = df_jogos.drop(columns='__v')

    # Separa os rounds para tratamento
    df_rounds = df_jogos[['round']].copy()

    # Faz a transposta para colocar cada round em uma linha e as variáveis em colunas
    df_rounds_t = df_rounds.T

    # Explode todas as colunas para gera um registro para cada movimento
    df_rounds_detalhe = df_rounds_t.reset_index(drop=True).apply(pd.Series.explode).reset_index(drop=True)

    # Gera as informações da partida
    df_jogos = df_jogos.drop(columns='round')
    df_jogos = df_jogos.reset_index(drop=True)
    df_jogos = df_jogos.drop_duplicates()

    # Junta as informações da partida com os rounds
    df_partida = pd.concat([df_jogos, df_rounds_detalhe], axis=1)
    df_partida = df_partida.fillna(method='ffill')

    return df_partida


def normaliza_dados_witch_maze(
        caminho_arquivo_entrada: str,
        caminho_pasta_saída: str = 'data_analysis/output_data/') -> None:
    """
        Recebe o caminho para um arquivo de saída do banco de dados do jogo
        Witch Maze. Esse arquivo deve conter uma lista de jsons referentes aos
        dados coletados de cada partida.
        Imprime na pasta de saída uma arquivo .csv com os dados normalizados.
        Args:
            caminho_arquivo_entrada: Caminho para um arquivo txt
            caminho_pasta_saída: Caminho para pasta onde o csv gerado
                será  salvo.
        Returns:
            Não retorna. Escreve em disco na
    """
    with open(caminho_arquivo_entrada, 'r') as data_file:
        json_data = data_file.read()

    json_carregado = loads(json_data)

    df_partidas_normalizadas = None
    for i, dado_partida in enumerate(json_carregado):
        if df_partidas_normalizadas is None:
            df_partidas_normalizadas = normaliza_dados_partida(dado_partida)
        else:
            df_partidas_normalizadas = pd.concat([
                df_partidas_normalizadas,
                normaliza_dados_partida(dado_partida)])
    df_partidas_normalizadas.to_csv(
        caminho_pasta_saída + '/partidas_normalizadas.csv', index=False)
