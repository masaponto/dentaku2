# !/usr/bin/env python

import tensorflow as tf
import numpy as np
from mnist import model
from flask import Flask, render_template, request, jsonify

app = Flask(__name__, template_folder='build', static_folder='build')
x = tf.placeholder("float", [None, 784])
sess = tf.Session()

with tf.variable_scope("convolutional"):
    keep_prob = tf.placeholder("float")
    y_conv2, variables = model.convolutional(x, keep_prob)

saver = tf.train.Saver(variables)
saver.restore(sess, "mnist/model/cnn_mnist.ckpt")


def cnn(input_x):
    return sess.run(y_conv2, feed_dict={x: input_x, keep_prob: 1.0}).flatten().tolist()


@app.route('/')
def index():
    return render_template('index.html')


#@app.route('/estimate', methods=["POST"])
# def estimate():
#    try:
#        input_x = (np.array(request.json["input"],
#                            dtype=np.uint8) / 255.0).reshape(1, 784)
#        output = convolutional(input_x)
#
#        return jsonify({"estimated": output})
#
#    except Exception as e:
#        print(e)
#        return jsonify({"error": e})


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)


'''
def main():
    from tensorflow.examples.tutorials.mnist import input_data

    mnist = input_data.read_data_sets('mnist/MNIST_data', one_hot=True)
    input_x = mnist.train.images[0]
    label = mnist.train.labels[0].tolist()
    y = cnn(input_x.reshape(1, 784))
    print(y.index(max(y)), label.index(max(label)))
'''
