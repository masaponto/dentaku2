# !/usr/bin/env python

import tensorflow as tf
import numpy as np
from mnist import model

x = tf.placeholder("float", [None, 784])
sess = tf.Session()

with tf.variable_scope("convolutional"):
    keep_prob = tf.placeholder("float")
    y_conv2, variables = model.convolutional(x, keep_prob)

saver = tf.train.Saver(variables)
saver.restore(sess, "mnist/model/cnn_mnist.ckpt")


def cnn(input_x):
    return sess.run(y_conv2, feed_dict={x: input_x, keep_prob: 1.0}).flatten().tolist()


def main():
    from tensorflow.examples.tutorials.mnist import input_data

    mnist = input_data.read_data_sets('mnist/MNIST_data', one_hot=True)
    input_x = mnist.train.images[0]
    label = mnist.train.labels[0].tolist()
    y = cnn(input_x.reshape(1, 784))
    print(y.index(max(y)), label.index(max(label)))


if __name__ == "__main__":
    main()