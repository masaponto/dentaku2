#!/usr/bin/env python

from tensorflow.examples.tutorials.mnist import input_data
import os
import numpy as np


def load_csv_data(file_path):
    """
    Load csv file asa numpy array
    :param file_path: path to csv file
    :return: numpy array
    """
    dir_name = os.path.dirname(os.path.abspath(os.path.abspath(__file__)))
    path = dir_name + file_path
    data = np.loadtxt(path, dtype=np.float32, delimiter=',')
    data = data / 255
    return data


def append_data(origin, data):
    """
    Append data
    :param origin: original data
    :param data: additional data
    :return:
    """
    return np.r_[origin, data]


def fix_labels(origin, add_num):
    """
    Fix lebals (teacher vector) to add cass
    :param origin: original labels
    :param add_num: additional number
    :return:
    """
    assert (add_num > 0)

    return np.c_[origin, np.zeros((origin.shape[0], add_num))]


def generate_new_label_matrix(row, column, one_ind):
    """
    Generate matrix for label (teacher signal)
    :param row: The number of row
    :param column: The number of column
    :param one_ind: An index to set to 1, the other elements are set to 0
    :return: label matrix
    """
    assert (column > one_ind)
    new_labels = np.zeros((row, column))
    new_labels[:, one_ind] = 1
    return new_labels


def append_labels(origin, data_nums):
    """
    Append labels teacher signal.
    If you want to add 3 class whose number of data are 10, 20, 10 respectively.
    Then the data_nums will be [10, 20, 10].
    :param origin: original label matrix
    :param data_nums: [int] list of the number of data for each class
    :return: label matrix
    """
    add_class_num = len(data_nums)
    origin_class_num = origin.shape[1]

    fixed_labels = fix_labels(origin, add_class_num)

    for i in range(add_class_num):
        new_labels = generate_new_label_matrix(data_nums[i], origin_class_num + add_class_num, origin_class_num + i)
        fixed_labels = np.r_[fixed_labels, new_labels]

    return fixed_labels


def expand_mnist(images, labels, paths):
    data_nums = []
    for path in paths:
        data = load_csv_data(path)
        images = append_data(images, data)
        data_nums.append(data.shape[0])

    labels = append_labels(labels, data_nums)

    return images, labels


def main():
    mnist = input_data.read_data_sets('MNIST_data', one_hot=True)

    operator_symbols = ['plus', 'minus', 'mult', 'div']
    paths = [f'/operator_data/{op}_data.csv' for op in operator_symbols]

    train_images, train_labels = expand_mnist(mnist.train.images, mnist.train.labels, paths)

    mnist.train._images = train_images
    mnist.train._labels = train_labels

    test_images, test_labels = expand_mnist(mnist.test.images, mnist.test.labels, paths)

    mnist.test._images = test_images
    mnist.test._labels = test_labels

if __name__ == "__main__":
    main()
