"""
## Author: Francisco Palacios Arriaga
## Credits: Amit Yadav from Coursera, https://www.coursera.org/projects/linear-regression
## Version: 1.0.0, 1 Sept 2020
## Maintainer: Francisco Palacios Arriaga
## Email: f.palacios.arriaga@gmail.com
## Dataset: Computer Hardware Data Set, https://archive.ics.uci.edu/ml/datasets/Computer+Hardware
"""

import numpy as np
import matplotlib.pyplot as plt
class LinearModel:
    def __init__(self, num_features):
        self.num_features = num_features
        self.W = np.random.randn(num_features, 1) # Array containing thetas
        self.b = np.random.randn()

    def forward_pass(self, X):
        y = self.b + np.dot(X, self.W)
        return y

    def compute_loss(self, y, y_true):
        loss = np.sum(np.square(y - y_true))
        return loss/(2*y.shape[0])

    def backward_pass(self, X, y_true, y_hat):
        m = y_hat.shape[0]
        db = np.sum(y_hat - y_true)/m
        dW = np.sum(np.dot(np.transpose(y_hat - y_true), X), axis=0)/m
        return dW, db

    def update_params(self, dW, db, lr):
        self.W = self.W - lr * np.reshape(dW, (self.num_features, 1))
        self.b = self.b - lr * db

    def train(self, x_train, y_train, iterations, lr):
        losses = []
        for i in range(iterations):
            y_hat = self.forward_pass(x_train)
            loss = self.compute_loss(y_hat, y_train)
            dW, db = self.backward_pass(x_train, y_train, y_hat) # Gradient of loss
            self.update_params(dW, db, lr)
            losses.append(loss)
            if i % int(iterations/10) == 0:
                print('Iter: {}, Current loss: {:.4f}'.format(i, loss))
        return losses

def get_sets(x):
  test_size = int(len(x)/4)
  return x[0: test_size], x[test_size:len(x)] # test, train

# Read the csv

import pandas as pd
import io
df = pd.read_csv('linearRegression.csv')
df = df.sample(frac = 1)

x1 = df.x1.values
x2 = df.x2.values
x3 = df.x3.values
x4 = df.x4.values
x5 = df.x5.values
x = np.array([x1,x2,x3,x4,x5]).transpose()

y = df.y.values
y = np.reshape(y, (y.shape[0], 1))
# print(x.shape, y.shape)
# print(x[0], y[0])

x_test, x_train = get_sets(x)
y_test, y_train = get_sets(y)
# print(len(x_test), len(x_train))
# print(len(y_test), len(y_train))

model = LinearModel(5)
losses = model.train(x_train, y_train, 100000, 0.0000001)

# plt.plot(losses)
print(model.W, model.b)

y_preds = model.forward_pass(x_test)
model.compute_loss(y_preds, y_test)

plt.plot(range(len(y_test)), y_test, 'r.', label='Test')
plt.plot(range(len(y_test)), y_preds, 'b.', label='Predictions')
plt.legend()
plt.xlabel('# of instance')
plt.ylabel('Performance')
plt.show()

individual_test = 46
print(model.forward_pass(x_test[individual_test]), y_test[individual_test])
