#!/usr/bin/env python

import nose
from nose.tools import ok_, eq_
import sys
import os
sys.path.append(os.pardir)
import dentaku_data
from tensorflow.examples.tutorials.mnist import input_data

class TestDentakuData:
    op = 'plus'
    path = f'/operator_data/{op}_data.csv'
    plus = dentaku_data.load_csv_data(path)

    mnist = input_data.read_data_sets('MNIST_data', one_hot=True)

    def test_load_csv_data(self):
        eq_(self.plus.shape, (20, 784))

    def test_append_data(self):
        images = self.mnist.train.images
        image_ops = dentaku_data.append_data(images, self.plus)

        eq_(image_ops.shape, (55020, 784))

    def test_fix_labels(self):
        labels = self.mnist.train.labels
        fixed_labels = dentaku_data.fix_labels(labels, 4)

        eq_(fixed_labels.shape, (55000, 14))

    def test_append_labes(self):
        labels = self.mnist.train.labels
        appended_labels = dentaku_data.append_labels(labels, [20, 20, 20, 20])

        eq_(appended_labels.shape, (55080, 14))

    def test_generate_label_matrix(self):
        label_matrix = dentaku_data.generate_new_label_matrix(3, 3, 2)

        eq_(label_matrix.tolist(), [[0, 0, 1], [0, 0, 1], [0, 0, 1]])
