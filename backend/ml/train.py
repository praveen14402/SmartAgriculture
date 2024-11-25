import tensorflow as tf
from tensorflow.keras import layers, models
import numpy as np
import os

def create_disease_detection_model():
    model = models.Sequential([
        layers.Conv2D(32, (3, 3), activation='relu', input_shape=(224, 224, 3)),
        layers.MaxPooling2D((2, 2)),
        layers.Conv2D(64, (3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),
        layers.Conv2D(64, (3, 3), activation='relu'),
        layers.Flatten(),
        layers.Dense(64, activation='relu'),
        layers.Dense(4, activation='softmax')  # 4 classes: healthy + 3 diseases
    ])
    return model

def create_crop_recommendation_model():
    model = models.Sequential([
        layers.Dense(64, activation='relu', input_shape=(7,)),  # 7 input features
        layers.Dropout(0.2),
        layers.Dense(32, activation='relu'),
        layers.Dropout(0.2),
        layers.Dense(5, activation='softmax')  # 5 crop types
    ])
    return model

def train_disease_model(model, train_data, train_labels, epochs=10):
    model.compile(
        optimizer='adam',
        loss='sparse_categorical_crossentropy',
        metrics=['accuracy']
    )
    
    model.fit(train_data, train_labels, epochs=epochs)
    return model

def train_crop_model(model, train_data, train_labels, epochs=10):
    model.compile(
        optimizer='adam',
        loss='sparse_categorical_crossentropy',
        metrics=['accuracy']
    )
    
    model.fit(train_data, train_labels, epochs=epochs)
    return model

def save_models(disease_model, crop_model):
    # Save disease detection model
    disease_model.save('models/disease_model')
    
    # Save crop recommendation model
    crop_model.save('models/crop_model')

if __name__ == "__main__":
    # Create and train disease detection model
    disease_model = create_disease_detection_model()
    # Add your training data here
    # train_disease_model(disease_model, train_data, train_labels)
    
    # Create and train crop recommendation model
    crop_model = create_crop_recommendation_model()
    # Add your training data here
    # train_crop_model(crop_model, train_data, train_labels)
    
    # Save models
    save_models(disease_model, crop_model)