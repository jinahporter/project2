import pandas as pd


def likes(df):
    return df.sort_values(by='likes', desc).head(10)
