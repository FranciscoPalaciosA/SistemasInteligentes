import numpy as np
import os

import matplotlib as mpl
import matplotlib.pyplot as plt
import random


# Need X = [[]], y = []
def shapeData():
  # https://archive.ics.uci.edu/ml/datasets/Tic-Tac-Toe+Endgame
  f = open("tic-tac-toe.data", "r")
  Lines = f.readlines() 
  random.shuffle(Lines)
  X = []
  y = []
  for line in Lines: 
    d = line.rstrip('\n').split(',')
    y.append(d.pop())
    X.append(d)

  return X, y

def get_sets(x):
  test_size = int(len(x)/8)
  return x[0: test_size], x[test_size:len(x)] # test, train
  
X, y = shapeData()

X_test, X_train = get_sets(X)
y_test, y_train = get_sets(y)

print('X_test', len(X_test))
print('X_train', len(X_train))
print('y_test', len(y_test))
print('y_train', len(y_train))

from sklearn.tree import DecisionTreeClassifier

tree_clf = DecisionTreeClassifier(max_depth = 4)
tree_clf.fit(X_train,y_train)

from sklearn import tree
import graphviz

features = [
'top-left-square',
'top-middle-square',
'top-right-square',
'middle-left-square',
'middle-middle-square',
'middle-right-square',
'bottom-left-square',
'bottom-middle-square',
'bottom-right-square']

dot = tree.export_graphviz(tree_clf, out_file=None, 
                           feature_names=features,
                           class_names=['X win', 'X lose'],
                           filled=True, rounded=True,  
                           special_characters=True) 

# we create a graph from dot source using graphviz.Source
graph = graphviz.Source(dot) 
graph.render(filename="tic-tac-toe-tree-shuffled", format='pdf', view=True) 