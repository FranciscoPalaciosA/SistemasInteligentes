# Common imports
import numpy as np
import os

# To plot pretty figures
import matplotlib as mpl
import matplotlib.pyplot as plt
mpl.rc('axes', labelsize=14)
mpl.rc('xtick', labelsize=12)
mpl.rc('ytick', labelsize=12)

# Where to save the figures
PROJECT_ROOT_DIR = ""
CHAPTER_ID = "decision_trees"

def image_path(fig_id):
    return os.path.join(PROJECT_ROOT_DIR, "images", fig_id)

def save_fig(fig_id, tight_layout=True):
    print("Saving figure", fig_id)
    if tight_layout:
        plt.tight_layout()
    plt.savefig(image_path(fig_id) + ".png", format='png', dpi=300)

from sklearn.datasets import load_iris
from sklearn.tree import DecisionTreeClassifier

iris = load_iris()
# Print data set
print("iris data set")
print(iris)

X = iris.data[:, 2:]
y = iris.target

#hyper parameter max depth
tree_clf = DecisionTreeClassifier(max_depth = 3)
tree_clf.fit(X,y)

# print("tree classiefier configuration")
# print (tree_clf)
# print("")

#make prediction

print("""class 0 is Iris Setosa
#class 1 is Iris Versicolor
#class 2 is Iris Virginica""")

probs = tree_clf.predict_proba([[5, 1.5]])
print("probability of class for query",[[5, 1.5]],probs)

pred =  tree_clf.predict([[5, 1.5]])
print("prediction of class for query",[[5, 1.5]],pred)

from sklearn import tree
import graphviz

print('PRINT --- ', iris.feature_names[2:])

# dot is a graph description language
dot = tree.export_graphviz(tree_clf, out_file=None, 
                           feature_names=iris.feature_names[2:],
                           class_names=iris.target_names,
                           filled=True, rounded=True,  
                           special_characters=True) 

# we create a graph from dot source using graphviz.Source
graph = graphviz.Source(dot) 
graph.render(format='pdf', view=False) 
