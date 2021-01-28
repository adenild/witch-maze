# -*- coding: utf-8 -*-
"""
Created on Fri Dec 11 12:11:26 2020

@author: Thiago Russo
@coauthor: Thiago Luis Pinho
"""
import pandas as pd
from json import loads
import argparse

from os.path import join
from collections import Counter

parser = argparse.ArgumentParser()
parser.add_argument(
    '-f', '--filepath',
    help='Input JSON filepath'
)
args = parser.parse_args()


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

    # Explode todas as colunas para gerar um registro para cada movimento

    df_rounds_dropped_index = df_rounds_t.reset_index(drop=True)
    df_rounds_exploded = df_rounds_dropped_index.apply(pd.Series.explode)
    df_rounds_detalhe = df_rounds_exploded.reset_index(drop=True)

    # Gera as informações da partida
    df_jogos = df_jogos.drop(columns='round')
    df_jogos = df_jogos.reset_index(drop=True)
    df_jogos = df_jogos.drop_duplicates()

    # Junta as informações da partida com os rounds
    df_partida = pd.concat([df_jogos, df_rounds_detalhe], axis=1)
    df_partida = df_partida.fillna(method='ffill')

    # Tratando valor das colunas
    df_partida['user_id'] = df_partida['user_id'].replace(
        '(user_id=)', '', regex=True
    )

    return df_partida


def normaliza_dados_witch_maze(
        caminho_arquivo_entrada: str,
        caminho_pasta_saída: str = './',
) -> None:
    """
        Recebe o caminho para um arquivo de saída do banco de dados do jogo
        Witch Maze. Esse arquivo deve conter uma lista de jsons referentes aos
        dados coletados de cada partida.
        Imprime na pasta de saída uma arquivo .csv com os dados normalizados.
        Args:
            caminho_arquivo_entrada: Caminho para um arquivo txt
            caminho_pasta_saída: Caminho para pasta onde o csv gerado
                será salvo.
            prefixo: Qual prefixo será adicionado ao início dos arquivos de
                saída
        Returns:
            Não retorna. Escreve em disco na
    """
    with open(caminho_arquivo_entrada, 'r') as data_file:
        json_data = data_file.read()
    
    json_carregado = loads(json_data)

    contador_partidas = Counter()
    contagem_erros = 0
    for dado_partida in json_carregado:
        try:
            df_partidas_normalizadas = normaliza_dados_partida(dado_partida)

            codigo_usuario = df_partidas_normalizadas['user_id'][0]
            algoritmo_usado = df_partidas_normalizadas['used_alg'][0]
            tipo_jogador = df_partidas_normalizadas['game_type'][0]

            # Assumindo que as partidas vem ordenadas cronologicamente e que a
            # partida de jogador sempre vem antes do controle,
            # podemos incrementar o número de vezes que um mesmo usuário
            # aparecem e induzir a sua contagem
            if tipo_jogador == "player":
                contador_partidas.update([codigo_usuario])
            contagem_partida = contador_partidas[codigo_usuario]
            df_partidas_normalizadas['contagem_partida'] = contagem_partida

            # Foi especificado pelo clinete uqe o nome de cada partida deve ser
            # composto pelo código do usuário, game + a contagem da partida,
            # o algoritmo usado para aleatorização e se aquela partida foi
            # feita por um jogador ou pelo controle
            nome_arquivo = "_".join([
                codigo_usuario,
                "game" + str(contagem_partida),
                algoritmo_usado,
                tipo_jogador
            ])

            df_partidas_normalizadas.to_csv(
                join(caminho_pasta_saída,  nome_arquivo + '.csv'),
                index=False)
        except Exception as e:
            print(e)
            print("Erro ao converter partida de _ID:", dado_partida['_id'])
            print("Prosseguindo execução.")
            contagem_erros += 1
    print(contagem_erros, len(json_carregado))


if __name__ == '__main__':
    if args.filepath is None:
        print("Please, write a filepath path using -f command.")
        print("Use -h for more information.")
        exit()
    else:
        normaliza_dados_witch_maze(args.filepath)
        # normaliza_dados_witch_maze(".//data_analysis//JSON_2_Jogos.txt", ".//data_analysis//", 'teste')