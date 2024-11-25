import React from 'react';
import { motion } from 'framer-motion';
import Webcam from 'react-webcam';
import { Camera, Upload, RefreshCw } from 'lucide-react';

const DiseaseDetection = () => {
  const [isCapturing, setIsCapturing] = React.useState(false);
  const [capturedImage, setCapturedImage] = React.useState<string | null>(null);
  const webcamRef = React.useRef<Webcam>(null);

  const capture = React.useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
      setIsCapturing(false);
      // Here you would typically send the image to your backend for analysis
    }
  }, [webcamRef]);

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Disease Detection</h2>

        <div className="space-y-6">
          {/* Camera/Image Preview Section */}
          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative">
            {isCapturing ? (
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-full h-full object-cover"
              />
            ) : capturedImage ? (
              <img 
                src={capturedImage} 
                alt="Captured" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <Camera className="w-16 h-16 text-gray-400" />
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCapturing(true)}
              className="px-6 py-3 bg-green-600 text-white rounded-lg flex items-center space-x-2"
            >
              <Camera className="w-5 h-5" />
              <span>Start Camera</span>
            </motion.button>

            {isCapturing && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={capture}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg flex items-center space-x-2"
              >
                <Camera className="w-5 h-5" />
                <span>Capture</span>
              </motion.button>
            )}

            {capturedImage && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCapturedImage(null);
                  setIsCapturing(false);
                }}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg flex items-center space-x-2"
              >
                <RefreshCw className="w-5 h-5" />
                <span>Reset</span>
              </motion.button>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg flex items-center space-x-2"
            >
              <Upload className="w-5 h-5" />
              <span>Upload Image</span>
            </motion.button>
          </div>

          {/* Results Section */}
          {capturedImage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-6 bg-gray-50 rounded-lg"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Analysis Results</h3>
              <p className="text-gray-600">Processing image for disease detection...</p>
              {/* Add your disease detection results here */}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default DiseaseDetection;