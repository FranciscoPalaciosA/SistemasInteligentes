import numpy as np
import os

import matplotlib as mpl
import matplotlib.pyplot as plt
import random

# Need X = [[]], y = []
def shapeData():
    # https://archive.ics.uci.edu/ml/datasets/Divorce+Predictors+data+set
    f = open("divorce.csv", "r")
    Lines = f.readlines()
    random.shuffle(Lines)
    X = []
    y = []
    for line in Lines:
        d = line.rstrip('\n').split(';')
        y.append(d.pop())
        X.append(d)

    return X, y


def get_sets(x):
    test_size = int(len(x) / 8)
    return x[0:test_size], x[test_size:len(x)]  # test, train


X, y = shapeData()

X_test, X_train = get_sets(X)
y_test, y_train = get_sets(y)

from sklearn.tree import DecisionTreeClassifier

tree_clf = DecisionTreeClassifier(max_features=5,
                                  random_state=14,
                                  max_depth=4)
tree_clf.fit(X_train, y_train)

from sklearn import tree
import graphviz

features = [
    'Atr1', 'Atr2', 'Atr3', 'Atr4', 'Atr5', 'Atr6', 'Atr7', 'Atr8', 'Atr9',
    'Atr10', 'Atr11', 'Atr12', 'Atr13', 'Atr14', 'Atr15', 'Atr16', 'Atr17',
    'Atr18', 'Atr19', 'Atr20', 'Atr21', 'Atr22', 'Atr23', 'Atr24', 'Atr25',
    'Atr26', 'Atr27', 'Atr28', 'Atr29', 'Atr30', 'Atr31', 'Atr32', 'Atr33',
    'Atr34', 'Atr35', 'Atr36', 'Atr37', 'Atr38', 'Atr39', 'Atr40', 'Atr41',
    'Atr42', 'Atr43', 'Atr44', 'Atr45', 'Atr46', 'Atr47', 'Atr48', 'Atr49',
    'Atr50', 'Atr51', 'Atr52', 'Atr53', 'Atr54'
]

classNames = ['No', 'Yes']
dot = tree.export_graphviz(tree_clf,
                           out_file=None,
                           feature_names=features,
                           class_names=classNames,
                           filled=True,
                           rounded=True,
                           special_characters=True)

# we create a graph from dot source using graphviz.Source
graph = graphviz.Source(dot)
graph.render(filename="divorced", format='pdf', view=False)

correct = 0
for i in range(0, len(y_test)):
    probs = tree_clf.predict([X_test[i]])
    if y_test[i] == probs[0]:
        correct += 1

print('Correct percentage = ', correct / len(y_test) * 100)

while True:
  ind1, val1, ind2, val2, ind3, val3 = input("Enter your values: ").split()
  randomPrediction = []
  for i in range(54):
    randomPrediction.append(random.randrange(4))
  randomPrediction[int(ind1)+1] = val1
  randomPrediction[int(ind2)+1] = val2
  randomPrediction[int(ind3)+2] = val3
  print('Prediction = ', classNames[int(tree_clf.predict([randomPrediction])[0])])
