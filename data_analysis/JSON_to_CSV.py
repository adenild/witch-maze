# -*- coding: utf-8 -*-
"""
Created on Fri Dec 11 12:11:26 2020

@author: Thiago Russo
"""
import pandas as pd

# TRATAMENTO DE DADOS PARA O DATASET DE TREINAMENTO
# Faz a carga do df
df_jogos = pd.read_json('/data/WitchMaze/JSON_1_Jogo.txt')

df_jogos.head()
df_jogos.info()

# Descarta coluna desnecessária
df_jogos = df_jogos.drop(columns='__v')

# Separa os rounds para tratamento
df_rounds = df_jogos[['round']].copy()

df_rounds.head()

# Faz a transposta para colocar cada round em uma linha e as variáveis em colunas
df_rounds_t = df_rounds.T

df_rounds_t.head()
df_rounds_t.info()

# Explode todas as colunas para gera um registro para cada movimento
df_rounds_detalhe = df_rounds_t.reset_index(drop=True).apply(pd.Series.explode).reset_index(drop=True)

df_rounds_detalhe.shape
df_rounds_detalhe.head()
df_rounds_detalhe.info()

# Gera as informações da partida
df_jogos = df_jogos.drop(columns='round')
df_jogos = df_jogos.reset_index(drop=True)
df_jogos = df_jogos.drop_duplicates()
df_jogos.head()

# Junta as informações da partida com os rounds
df_partida = pd.concat([df_jogos, df_rounds_detalhe], axis=1)
df_partida = df_partida.fillna(method='ffill')

df_partida.info()
df_partida.head()

df_partida.to_csv('/data/WitchMaze/Partida.csv', index=False)

