import tensorflow as tf
import numpy as np
import pandas as pd
import sys

def learnStart(data1, data2, data3):
    data = pd.read_csv('server/gpascore.csv')
    data = data.dropna()

    yData = np.array(data['admit'].values)
    xData = []
    for i, rows in data.iterrows():
        xData.append( [ rows['gre'], rows['gpa'], rows['rank'] ] )
    xData = np.array(xData)

    model = tf.keras.models.Sequential([
        tf.keras.layers.Dense(64, activation="tanh"),
        tf.keras.layers.Dense(128, activation="tanh"),
        tf.keras.layers.Dense(1, activation="sigmoid"),
    ])

    model.compile(optimizer="adam", loss="binary_crossentropy", metrics=['accuracy'])
    model.fit(xData, yData, epochs=50)

    data1 = float(data1)
    data2 = float(data2)
    data3 = float(data3)

    pre = model.predict([ [data1, data3, data3] ])
    print(str(pre[0]) + "Com")
    

if __name__ == "__main__":
    learnStart(sys.argv[1], sys.argv[2], sys.argv[3])
