# !/usr/bin/env python

from tensorflow.examples.tutorials.mnist import input_data
import tensorflow as tf
import model
import dentaku_data


def main():
    mnist = input_data.read_data_sets('MNIST_data', one_hot=True)

    operator_symbols = ['plus', 'minus', 'mult', 'div']
    paths = [f'/operator_data/{op}_data.csv' for op in operator_symbols]

    train_images, train_labels = dentaku_data.expand_mnist(mnist.train.images, mnist.train.labels, paths)
    mnist.train._images = train_images
    mnist.train._labels = train_labels
    mnist.train._num_examples = train_images.shape[0]

    test_images, test_labels = dentaku_data.expand_mnist(mnist.test.images, mnist.test.labels, paths)
    mnist.test._images = test_images
    mnist.test._labels = test_labels
    mnist.test._num_examples = test_images.shape[0]

    with tf.variable_scope("convolutional"):
        x = tf.placeholder(tf.float32, shape=[None, 784])
        keep_prob = tf.placeholder("float")
        y_conv, variables = model.convolutional(x, keep_prob)

    y_ = tf.placeholder(tf.float32, shape=[None, 14])
    cross_entropy = tf.reduce_mean(
        tf.nn.softmax_cross_entropy_with_logits(labels=y_, logits=y_conv))
    train_step = tf.train.AdamOptimizer(1e-4).minimize(cross_entropy)
    correct_prediction = tf.equal(tf.argmax(y_conv, 1), tf.argmax(y_, 1))
    accuracy = tf.reduce_mean(tf.cast(correct_prediction, tf.float32))

    saver = tf.train.Saver(variables)

    with tf.Session() as sess:

        sess.run(tf.global_variables_initializer())
        for i in range(20000):
            batch = mnist.train.next_batch(50)
            if i % 100 == 0:
                train_accuracy = accuracy.eval(feed_dict={
                    x: batch[0], y_: batch[1], keep_prob: 1.0})
                print('step %d, training accuracy %g' % (i, train_accuracy))
            train_step.run(feed_dict={x: batch[0], y_: batch[1], keep_prob: 0.5})

        print('test accuracy %g' % accuracy.eval(feed_dict={
            x: mnist.test.images, y_: mnist.test.labels, keep_prob: 1.0}))

        save_path = saver.save(sess, "model/cnn_dentaku.ckpt")
        print("Model saved in file: %s" % save_path)


if __name__ == "__main__":
    main()