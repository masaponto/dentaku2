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
saver.restore(sess, "mnist/model/cnn_dentaku.ckpt")

operators = {10: '+', 11: '-', 12: '*', 13: '/'}


def fix_output(output):
    if output in operators:
        return operators[output]
    else:
        return output


def cnn(input_x):
    y = sess.run(y_conv2, feed_dict={
                 x: input_x, keep_prob: 1.0}).flatten().tolist()
    return y.index(max(y))


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/estimate', methods=["POST"])
def estimate():
    try:
        input_x = (
            (255 - np.array(request.json["input"])) / 255.0).reshape(1, 784)

        output = cnn(input_x)
        return jsonify({"estimated": fix_output(output)})

    except Exception as e:
        print(e)
        return jsonify({"error": e})


@app.route('/csv', methods=["POST"])
def feature_to_csv():
    try:
        input_x = (255 - np.array(request.json["input"])).reshape(1, 784)

        print(np.array(request.json["input"]))
        print(input_x)

        input_csv = [str(x) for x in input_x[0].tolist()]
        input_csv = ','.join(input_csv)

        return jsonify({"feature": input_csv})

    except Exception as e:
        print(e)
        return jsonify({"error": e})


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
