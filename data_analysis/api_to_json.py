import pandas as pd
import requests
from os.path import join

BASE_URL = 'https://safe-basin-68612.herokuapp.com/'

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

    return df_partida

def normaliza_dados_witch_maze(
        caminho_pasta_saída: str = './',
        prefixo: str = "") -> None:
    """
        Busca os dados de Partida diretamente na API e imprime na pasta de saída
        um arquivo .csv com os dados normalizados para cada partida.
        Args:
            caminho_pasta_saída: Caminho para pasta onde o csv gerado
                será salvo.
            prefixo: Qual prefixo será adicionado ao início dos arquivos de
                saída
        Returns:
            Não retorna. Escreve em disco na
    """
    res = requests.get(BASE_URL+'data').json()

    lista_df_partidas_normalizadas = []
    for dado_partida in res:
        try:
            lista_df_partidas_normalizadas.append(
                normaliza_dados_partida(dado_partida))
        except Exception as e:
            print(e)
            print("Erro ao converter partida de _ID:", dado_partida['_id'])
            print("Prosseguindo execução.")

    for df_partidas_normalizada in lista_df_partidas_normalizadas:
        df_partidas_normalizada.to_csv(
            join(caminho_pasta_saída, prefixo + str(df_partidas_normalizada['_id'][0]) + '.csv'),
            index=False)

if __name__ == "__main__":
    normaliza_dados_witch_maze('./output', "game")