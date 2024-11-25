import * as tf from '@tensorflow/tfjs-node';
import path from 'path';

class MLService {
  private diseaseModel: tf.LayersModel | null = null;
  private cropRecommendationModel: tf.LayersModel | null = null;

  async loadModels() {
    try {
      // Load disease detection model
      this.diseaseModel = await tf.loadLayersModel(
        `file://${path.join(process.env.ML_MODEL_PATH!, 'disease_model/model.json')}`
      );

      // Load crop recommendation model
      this.cropRecommendationModel = await tf.loadLayersModel(
        `file://${path.join(process.env.ML_MODEL_PATH!, 'crop_model/model.json')}`
      );

      console.log('ML models loaded successfully');
    } catch (error) {
      console.error('Error loading ML models:', error);
      throw error;
    }
  }

  async detectDisease(imageBuffer: Buffer) {
    try {
      if (!this.diseaseModel) {
        throw new Error('Disease detection model not loaded');
      }

      // Preprocess image
      const tensor = await this.preprocessImage(imageBuffer);
      
      // Make prediction
      const prediction = await this.diseaseModel.predict(tensor) as tf.Tensor;
      const results = Array.from(prediction.dataSync());
      
      // Get disease class with highest probability
      const maxIndex = results.indexOf(Math.max(...results));
      
      return {
        disease: this.getDiseaseClass(maxIndex),
        confidence: results[maxIndex]
      };
    } catch (error) {
      console.error('Error in disease detection:', error);
      throw error;
    }
  }

  async recommendCrops(soilData: any, weatherData: any) {
    try {
      if (!this.cropRecommendationModel) {
        throw new Error('Crop recommendation model not loaded');
      }

      // Prepare input data
      const input = this.preprocessCropData(soilData, weatherData);
      
      // Make prediction
      const prediction = await this.cropRecommendationModel.predict(input) as tf.Tensor;
      const results = Array.from(prediction.dataSync());
      
      // Get top 3 recommended crops
      return this.getTopCrops(results);
    } catch (error) {
      console.error('Error in crop recommendation:', error);
      throw error;
    }
  }

  private async preprocessImage(imageBuffer: Buffer) {
    // Convert image to tensor and preprocess
    const decoded = tf.node.decodeImage(imageBuffer);
    const resized = tf.image.resizeBilinear(decoded, [224, 224]);
    const expanded = resized.expandDims(0);
    const normalized = expanded.div(255.0);
    
    return normalized;
  }

  private preprocessCropData(soilData: any, weatherData: any) {
    // Normalize and prepare input data for crop recommendation
    const input = tf.tensor2d([[
      soilData.ph,
      soilData.nitrogen,
      soilData.phosphorus,
      soilData.potassium,
      weatherData.temperature,
      weatherData.humidity,
      weatherData.rainfall
    ]]);
    
    return input;
  }

  private getDiseaseClass(index: number): string {
    const diseases = [
      'Healthy',
      'Bacterial Leaf Blight',
      'Brown Spot',
      'Leaf Blast'
      // Add more disease classes as needed
    ];
    return diseases[index];
  }

  private getTopCrops(predictions: number[]) {
    const crops = [
      'Rice',
      'Wheat',
      'Corn',
      'Soybeans',
      'Cotton'
      // Add more crops as needed
    ];

    return predictions
      .map((prob, index) => ({ crop: crops[index], probability: prob }))
      .sort((a, b) => b.probability - a.probability)
      .slice(0, 3);
  }
}

export default new MLService();